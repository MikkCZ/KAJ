/*
Initialize objects after document is loaded
*/
document.addEventListener("DOMContentLoaded", function(event) {
    var myFabric = new kaj.MyFabric("fabric", "main");
    var dragAndDrop = new kaj.DragAndDrop("main", myFabric);
    var history = new kaj.History(myFabric);
    var menu = new kaj.Menu(myFabric, "#menu-link", "#menu");
    if (window.location.protocol == "file:") {
        var runningLocal = document.createElement("span");
        runningLocal.id = "local";
        runningLocal.innerHTML = "local";
        document.querySelector("header").appendChild(runningLocal);
    }
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
