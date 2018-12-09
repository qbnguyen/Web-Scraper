$(function() {
    renderPage();
    setupEventHandlers();
});

function renderPage() {
    // Send the GET request.
    $.get("/scrape").then(
        function(data) {
            console.log("data",data);
            renderTemplate({
            articles: data    
            });
        }
    );
}

function renderTemplate(data) {
    var source = $("#page-template").text();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#app").html(html);
}

function setupEventHandlers() {
    // Register an event handler that gets called whenever the hash part of the URL changes
    $(window).on("hashchange", renderPage);
    $(document).on("click", ".notes", function () {
        $("#notes").empty();
        var id = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/articles/" + id
        })
            .done(function (data) {
                console.log("data for notes", data)
                $("#notes").append("<h5 class='notesArticle'>" + data.title + "</h5>");
                $("#notes").append("<input id='titleInput' name='title' placeholder='enter a note title'>");
                $("#notes").append("<textarea id='bodyInput' name='noteBody' placeholder='enter your notes'></textarea>");
                $("#notes").append("<button data-id='" + data._id + "' id='saveNote'> Save </button>");
                if (data.notes) {
                    $("#titleInput").val(data.notes.title);
                    $("#bodyInput").val(data.notes.body);
                }
            });
    });
 
    $(document).on("click", "#saveNote", function () {
        var id = $(this).attr("data-id");
        console.log("id in save", id)
        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
                title: $("#titleInput").val(),
                body: $("#bodyInput").val()
            }
        })
            .done(function (data) {
                console.log("data after save note", data);
                $("#notes").empty();
            });
    });
}
