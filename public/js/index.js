$(function() {
    renderPage();
});

function renderPage() {
    // Send the GET request.
    $.get("/").then(
        function() {
            renderTemplate({
                
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
}