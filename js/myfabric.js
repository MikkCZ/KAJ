if (typeof kaj === "undefined") {
    var kaj = {};
}

/*
MyFabric object constructor
@param id - canvas id
*/
kaj.MyFabric = function(id) {
    this._canvas = new fabric.Canvas(id);
    this._canvas.setBackgroundColor("transparent");
    this._main = document.querySelector("main");
    this._color = "#000000";
    this._strokeWidth = 10;
    window.addEventListener("resize", this._resizeCanvas.bind(this), false);
    window.addEventListener("keyup", this._keyup.bind(this));
    this._resizeCanvas();
}

kaj.MyFabric.prototype.addText = function(text) {
    var iText = new fabric.IText(text);
    iText.setColor(this._color);
    this._canvas.add(iText);
}

kaj.MyFabric.prototype.addLine = function() {
    var line = new fabric.Line(
        [50, 50, 250, 50],
        {
            padding: 5,
            left: 50,
            top: 50,
            stroke: this._color
        }
    );
    this._canvas.add(line);
}

kaj.MyFabric.prototype.addArrow = function() {
    var line = new fabric.Line(
        [50, 50, 100, 50],
        {
            padding: 5,
            left: 50,
            top: 50,
            stroke: this._color,
            originY: "center",
            strokeWidth: this._strokeWidth
        }
    );
    var triangle = new fabric.Triangle(
        {
            angle: 90,
            fill: this._color,
            left: line.x2-line.x1+line.left,
            top: line.top,
            height: line.strokeWidth*2,
            width: line.strokeWidth*2,
            originX: "center",
            originY: "center"
        }
    );
    this._canvas.add(line);
    this._canvas.add(triangle);
}

kaj.MyFabric.prototype.addRectangle = function() {
    var rect = new fabric.Rect(
        {
            left: 50,
            top: 50,
            width: 150,
            height: 100,
            fill: "transparent",
            stroke: this._color,
            strokeWidth: this._strokeWidth
        }
    );
    this._canvas.add(rect);
}

kaj.MyFabric.prototype.addEllipse = function() {
    var ellipse = new fabric.Ellipse(
        {
            left: 50,
            top: 50,
            rx: 250,
            ry: 100,
            fill: "transparent",
            stroke: this._color,
            strokeWidth: this._strokeWidth
        }
    );
    this._canvas.add(ellipse);
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

kaj.MyFabric.prototype.setColor = function(color) {
    this._color = color;
}

kaj.MyFabric.prototype.setStrokeWidth = function(width) {
    this._strokeWidth = width;
}

kaj.MyFabric.prototype.setBackgroundColor = function(color) {
    this._canvas.setBackgroundColor(color);
    this._canvas.renderAll();
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

kaj.MyFabric.prototype.toSVG = function() {
    return this._canvas.toSVG();
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
