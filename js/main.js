/*
Initialize menu object after document is loaded
*/
document.addEventListener("DOMContentLoaded", function(event) {
    var myFabric = new kaj.MyFabric("fabric");
    var dragAndDrop = new kaj.DragAndDrop("main", myFabric);
    var history = new kaj.History(myFabric);
    var menu = new kaj.Menu(myFabric, "#menu-link", "#menu");
    if (window.location.protocol == "file:") {
        var runningLocal = document.createElement("span");
        runningLocal.id = "local";
        runningLocal.innerHTML = "local";
        document.querySelector("header").appendChild(runningLocal);
    }
});
