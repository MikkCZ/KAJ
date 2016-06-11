if (typeof kaj === "undefined") {
    var kaj = {};
}

/*
MyFabric object constructor
@param id - canvas id
*/
kaj.MyFabric = function(id) {
    this._canvas = new fabric.Canvas(id);
    this._main = document.querySelector("main");
    this._resizeCanvas();
    window.addEventListener("resize", this._resizeCanvas.bind(this), false);
    window.addEventListener("keyup", this._keyup.bind(this));
}

kaj.MyFabric.prototype.addText = function(text) {
    this._canvas.add(new fabric.IText(text));
}

/*
Resize canvas on full <main> size
*/
kaj.MyFabric.prototype._resizeCanvas = function() {
    this._canvas.setHeight(this._main.offsetHeight);
    this._canvas.setWidth(this._main.offsetWidth);
    this._canvas.renderAll();
}

/*
Handle key up event
@param e - event
*/
kaj.MyFabric.prototype._keyup = function(e) {
    const del = 46;
    var key = e.keyCode ? e.keyCode : e.which;
    switch (key) {
        case del:
            this._deleteSelected();
            break;
    }
}

/*
Set canvas background image
@param url - image url (can be data url)
*/
kaj.MyFabric.prototype.setBackgroundImage = function(url) {
    fabric.Image.fromURL(url);
    fabric.Image.fromURL(url, function(img) {
        this._canvas.setBackgroundImage(img);
        this._canvas.renderAll();
    }.bind(this));
}

/*
Add image to canvas
@param url - image url (can be data url)
*/
kaj.MyFabric.prototype.addImage = function(url) {
    fabric.Image.fromURL(url);
    fabric.Image.fromURL(url, function(img) {
        this._canvas.add(img);
    }.bind(this));
}

kaj.MyFabric.prototype.addImagesToCanvas = function(files) {
    var callback = function(e) {
        this.addImage(e.target.result);
    }.bind(this);
    for(var i = 0; i<files.length; i++) {
        var imageType = /^image\//;
        if (!imageType.test(files[i].type)) {
            continue;
        }
        var fr = new FileReader();
        fr.addEventListener("load", callback);
        fr.readAsDataURL(files[i]);
    }
}

/*
Delete currently selected object from canvas
*/
kaj.MyFabric.prototype._deleteSelected = function() {
    this._canvas.getActiveObject().remove();
}

/*
Get current canvas content as data URL
@return base64 png image from the current canvas content
*/
kaj.MyFabric.prototype.getDataURL = function() {
    this._canvas.deactivateAll();
    this._canvas.renderAll();
    return this._canvas.toDataURL();
}

/*
Get current canvas cropped content as data URL
@return base64 png image from the current canvas content
*/
kaj.MyFabric.prototype.getCroppedDataURL = function() {
    var tmpCanvas = new fabric.Canvas();
    tmpCanvas.setHeight(this._canvas.getHeight());
    tmpCanvas.setWidth(this._canvas.getWidth());

    var g = new fabric.Group();
    for (var i = 0; i<this._canvas.getObjects().length; i++) {
        var item = this._canvas.item(i);
        g.addWithUpdate(fabric.util.object.clone(item));
    }
    tmpCanvas.add(g);

    var crop = g.getBoundingRect();
    var dataURL = tmpCanvas.toDataURL({
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height
    });
    tmpCanvas.clear();
    return dataURL;
}

kaj.MyFabric.prototype.addCanvasListener = function(event, callback) {
    this._canvas.on(event, callback);
}

kaj.MyFabric.prototype.removeCanvasListener = function(event, callback) {
    this._canvas.off(event, callback);
}

kaj.MyFabric.prototype.renderAll = function() {
    this._canvas.renderAll();
}

kaj.MyFabric.prototype.toJSON = function() {
    return JSON.stringify(this._canvas);
}

kaj.MyFabric.prototype.loadFromJSON = function(json, callback) {
    this._canvas.loadFromJSON(json, callback);
}
