/*
Initializes objects after document is loaded.
*/
document.addEventListener("DOMContentLoaded", function(event) {
    var myFabric = new kaj.MyFabric("fabric", "main");
    var dragAndDrop = new kaj.DragAndDrop("main", myFabric);
    var history = new kaj.History(myFabric);
    var menu = new kaj.Menu(myFabric, "#menu-link", "#menu");
    // Add info to the header when running locally
    if (window.location.protocol == "file:") {
        var runningLocal = document.createElement("span");
        runningLocal.id = "local";
        runningLocal.innerHTML = "local";
        document.querySelector("header").appendChild(runningLocal);
    }
    // Register delete key for deleting selected objects from canvas
    window.addEventListener("keyup", function(e) {
        const del = 46;
        var key = e.keyCode ? e.keyCode : e.which;
        switch (key) {
            case del:
                myFabric.deleteSelected();
                break;
        }
    });
});
