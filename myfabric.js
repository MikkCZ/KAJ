var MyFabric = function(id) {
    this._canvas = new fabric.Canvas(id);
    this._main = document.querySelector("main");
    this._resizeCanvas();
    window.addEventListener('resize', this._resizeCanvas.bind(this), false);
    window.addEventListener('keyup', this._keyup.bind(this));
}

MyFabric.prototype.test = function() {
    var hi = new fabric.Text("hi");
    this._canvas.add(hi);
}

MyFabric.prototype._resizeCanvas = function() {
    this._canvas.setHeight(this._main.offsetHeight);
    this._canvas.setWidth(this._main.offsetWidth);
    this._canvas.renderAll();
}

MyFabric.prototype._keyup = function(e) {
    var del = 46;
    var key = e.keyCode ? e.keyCode : e.which;
    switch (key) {
        case del:
            this._deleteSelected();
            break;
    }
}

MyFabric.prototype._deleteSelected = function() {
    this._canvas.getActiveObject().remove();
}

document.addEventListener("DOMContentLoaded", function(event) {
    var myFabric = new MyFabric('fabric');
    myFabric.test();
});
