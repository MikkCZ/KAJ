/*
Initialize menu object after document is loaded
*/
document.addEventListener("DOMContentLoaded", function(event) {
    var myFabric = new MyFabric("fabric");
    var dragAndDrop = new DragAndDrop("main", myFabric);
    var history = new History(myFabric);
    var menu = new Menu(myFabric, "#menu-link", "#menu");
    if (window.location.protocol == "file:") {
        var runningLocal = document.createElement("span");
        runningLocal.id = "local";
        runningLocal.innerHTML = "local";
        document.querySelector("header").appendChild(runningLocal);
    }
});
