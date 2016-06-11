var DragAndDrop = function(main, myFabric) {
    this._main = document.querySelector(main);
    this._main.addEventListener("dragenter", this._dragenter.bind(this));
    this._main.addEventListener("dragover", this._dragover.bind(this));
    this._main.addEventListener("drop", this._drop.bind(this));
    this._myFabric = myFabric;
}

DragAndDrop.prototype._dragenter = function(e) {
    e.stopPropagation();
    e.preventDefault();
}

DragAndDrop.prototype._dragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
}

DragAndDrop.prototype._drop = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this._myFabric.addImagesToCanvas(e.dataTransfer.files);
}
