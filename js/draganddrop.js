if (typeof kaj === "undefined") {
    var kaj = {};
}

/*
DragAndDrop object to handle drag and drop events.
@param main - main element selector
@param myFabric - MyFabric instance
*/
kaj.DragAndDrop = function(main, myFabric) {
    this._main = document.querySelector(main);
    this._main.addEventListener("dragenter", this._dragenter.bind(this));
    this._main.addEventListener("dragover", this._dragover.bind(this));
    this._main.addEventListener("drop", this._drop.bind(this));

    this._myFabric = myFabric;
}

/*
Handle dragenter event.
@param e - event
*/
kaj.DragAndDrop.prototype._dragenter = function(e) {
    e.stopPropagation();
    e.preventDefault();
}

/*
Handle dragover event.
@param e - event
*/
kaj.DragAndDrop.prototype._dragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
}

/*
Handle drop event - load images.
@param e - event
*/
kaj.DragAndDrop.prototype._drop = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this._myFabric.addImagesToCanvas(e.dataTransfer.files);
}
