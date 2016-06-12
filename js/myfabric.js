if (typeof kaj === "undefined") {
    var kaj = {};
}

/*
MyFabric object for canvas manipulation.
@param id - canvas id
@param menu - menu selector
*/
kaj.MyFabric = function(id, main) {
    this._canvas = new fabric.Canvas(id);
    this._canvas.setBackgroundColor("transparent");

    this._main = document.querySelector(main);
    this._resizeCanvas();
    window.addEventListener("resize", this._resizeCanvas.bind(this));
}

/*
Resize canvas on full <main> size.
*/
kaj.MyFabric.prototype._resizeCanvas = function() {
    this._canvas.setHeight(this._main.offsetHeight);
    this._canvas.setWidth(this._main.offsetWidth);
    this._canvas.renderAll();
}

/*
Re-render the canvas.
*/
kaj.MyFabric.prototype.renderAll = function() {
    this._canvas.renderAll();
}

/*
Get canvas content as SVG.
@return canvas content as SVG XML
*/
kaj.MyFabric.prototype.toSVG = function() {
    return this._canvas.toSVG();
}

/*
Serialize canvas to JSON.
@return JSON serialization of the canvas content
*/
kaj.MyFabric.prototype.toJSON = function() {
    return JSON.stringify(this._canvas);
}

/*
Deserialize and load canvas content to JSON. Old content is not preserved.
@param json - JSON serialization of the canvas content
@param callback - callback to call after the canvas is loaded
*/
kaj.MyFabric.prototype.loadFromJSON = function(json, callback) {
    this._canvas.loadFromJSON(json, callback);
}

/*
Add listener to canvas event.
@param event - event to listen
@param listener - listnener to add
*/
kaj.MyFabric.prototype.addCanvasListener = function(event, listener) {
    this._canvas.on(event, listener);
}

/*
Remove listener from canvas event.
@param event - event to remove from
@param listener - listnener to remove
*/
kaj.MyFabric.prototype.removeCanvasListener = function(event, listener) {
    this._canvas.off(event, listener);
}

/*
Delete currently selected object from canvas.
*/
kaj.MyFabric.prototype.deleteSelected = function() {
    this._canvas.getActiveObject().remove();
}

/*
Set brush mode stroke width.
@param strokeWidth - stroke width to set
*/
kaj.MyFabric.prototype.setBrushModeStrokeWidth = function(strokeWidth) {
    this._canvas.freeDrawingBrush.width = strokeWidth;
}

/*
Set brush mode color.
@param color - color to set
*/
kaj.MyFabric.prototype.setBrushModeColor = function(color) {
    this._canvas.freeDrawingBrush.color = color;
}

/*
Enter brush mode.
@param strokeWidth - stroke width to set
@param color - color to set
*/
kaj.MyFabric.prototype.enterBrushMode = function(strokeWidth, color) {
    this.setBrushModeStrokeWidth(strokeWidth);
    this.setBrushModeColor(color);
    this._canvas.isDrawingMode = true;
}

/*
Leave brush mode.
*/
kaj.MyFabric.prototype.leaveBrushMode = function() {
    this._canvas.isDrawingMode = false;
}

/*
Change canvas background color.
@param color - new background color
*/
kaj.MyFabric.prototype.setBackgroundColor = function(color) {
    this._canvas.setBackgroundColor(color);
    this._canvas.renderAll();
}

/*
Set image as canvas background.
@param url - image URL (can be data URL)
*/
kaj.MyFabric.prototype.setBackgroundImage = function(url) {
    fabric.Image.fromURL(url);
    fabric.Image.fromURL(url, function(img) {
        this._canvas.setBackgroundImage(img);
        this._canvas.renderAll();
    }.bind(this));
}

/*
Add new line.
@param strokeWidth - line stroke width
@param color - line color
*/
kaj.MyFabric.prototype.addLine = function(strokeWidth ,color) {
    var line = new fabric.Line(
        [50, 50, 250, 50],
        {
            padding: 5,
            left: 50,
            top: 50,
            strokeWidth: strokeWidth,
            stroke: color,
        }
    );
    this._canvas.add(line);
}

/*
Add new ellipse.
@param strokeWidth - ellipse stroke width
@param color - ellipse color
*/
kaj.MyFabric.prototype.addEllipse = function(strokeWidth, color) {
    var ellipse = new fabric.Ellipse(
        {
            left: 50,
            top: 50,
            rx: 250,
            ry: 100,
            strokeWidth: strokeWidth,
            stroke: color,
            fill: "transparent",
        }
    );
    this._canvas.add(ellipse);
}

/*
Add new rectangle.
@param strokeWidth - rectangle stroke width
@param color - rectangle color
*/
kaj.MyFabric.prototype.addRectangle = function(strokeWidth, color) {
    var rect = new fabric.Rect(
        {
            left: 50,
            top: 50,
            width: 150,
            height: 100,
            strokeWidth: strokeWidth,
            stroke: color,
            fill: "transparent",
        }
    );
    this._canvas.add(rect);
}

/*
Add new arrow.
@param strokeWidth - arrow stroke width
@param color - arrow color
*/
kaj.MyFabric.prototype.addArrow = function(strokeWidth, color) {
    var line = new fabric.Line(
        [50, 50, 100, 50],
        {
            padding: 5,
            left: 50,
            top: 50,
            originY: "center",
            strokeWidth: strokeWidth,
            stroke: color,
        }
    );
    var triangle = new fabric.Triangle(
        {
            angle: 90,
            left: line.x2-line.x1+line.left,
            top: line.top,
            originX: "center",
            originY: "center",
            height: strokeWidth*2,
            width: strokeWidth*2,
            fill: color,
        }
    );
    this._canvas.add(line);
    this._canvas.add(triangle);
}

/*
Add new interactive text.
@param text - text to show
@param color - text color
*/
kaj.MyFabric.prototype.addText = function(text, color) {
    var iText = new fabric.IText(text);
    iText.setColor(color);
    this._canvas.add(iText);
}

/*
Add new image.
@param url - image URL (can be data URL)
*/
kaj.MyFabric.prototype._addImage = function(url) {
    fabric.Image.fromURL(url);
    fabric.Image.fromURL(url, function(img) {
        this._canvas.add(img);
    }.bind(this));
}

/*
Add new images.
@param files - list of files
*/
kaj.MyFabric.prototype.addImagesToCanvas = function(files) {
    var callback = function(e) {
        this._addImage(e.target.result);
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
Get canvas content as data URL.
@return png image in base64 data URL format
*/
kaj.MyFabric.prototype.getDataURL = function() {
    this._canvas.deactivateAll();
    this._canvas.renderAll();
    return this._canvas.getElement().toDataURL();
}

/*
Get cropped canvas content as data URL.
@return png image in base64 data URL format
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
