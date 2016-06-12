if (typeof kaj === "undefined") {
    var kaj = {};
}

/*
Menu object for handling menu click events (DOM is already in HTML).
@param myFabric - MyFabric instance
@param menuLink - menu link selector
@param menu - menu selector
*/
kaj.Menu = function(myFabric, menuLink, menu) {
    this._myFabric = myFabric;

    this._menuLink = document.querySelector(menuLink);
    this._menuLink.addEventListener("click", this._toggleNav.bind(this));

    this._menu = document.querySelector(menu);
    this._openedWithClick = false;
    this._openedWithHover = false;
    this._strokeWidth = 10;
    this._color = "#000000";

    this._addMenuListeners();
}

/*
Registers listeners for the menu elements.
*/
kaj.Menu.prototype._addMenuListeners = function() {
    document.querySelector("#background").addEventListener("change", this._setBackgroundColor.bind(this));

    document.querySelector("#stroke-width").addEventListener("change", this._setStrokeWidth.bind(this));
    document.querySelector("#color").addEventListener("change", this._setColor.bind(this));

    document.querySelector("#add-line").addEventListener("click", this._addLineToCanvas.bind(this));
    document.querySelector("#add-ellipse").addEventListener("click", this._addEllipseToCanvas.bind(this));
    document.querySelector("#add-rect").addEventListener("click", this._addRectangleToCanvas.bind(this));
    document.querySelector("#add-arrow").addEventListener("click", this._addArrowToCanvas.bind(this));
    document.querySelector("#add-text").addEventListener("click", this._addTextToCanvas.bind(this));
    document.querySelector("#add-image").addEventListener("change", this._addImageToCanvas.bind(this));

    document.querySelector("#save").addEventListener("click", this._saveToFile.bind(this));
    document.querySelector("#save-cropped").addEventListener("click", this._saveCroppedToFile.bind(this));
    document.querySelector("#save-svg").addEventListener("click", this._saveAsSVG.bind(this));
}

/*
Open navigation menu.
@param e - event
*/
kaj.Menu.prototype._openNav = function(e) {
    if (e.target == this._menuLink) {
        this._openedWithClick = true;
    } else if (e.target == this._menu) {
        this._openedWithHover = true;
    }
    this._menuLink.classList.add("opened");
    this._menu.classList.add("opened");
}

/*
Close navigation menu.
*/
kaj.Menu.prototype._closeNav = function() {
    this._openedWithClick = false;
    this._openedWithHover = false;
    this._menuLink.classList.remove("opened");
    this._menu.classList.remove("opened");
}

/*
Open/close navigation menu.
@param e - event
*/
kaj.Menu.prototype._toggleNav = function(e) {
    if (e.target == this._menuLink) {
        if (this._openedWithClick || this._openedWithHover) {
            this._closeNav(e);
        } else {
            this._openNav(e);
        }
    } else if (e.target == this._menu && !this._openedWithClick) {
        if (this._openedWithHover) {
            this._closeNav(e);
        } else {
            this._openNav(e);
        }
    }
}

/*
Change canvas background color.
@param e - event
*/
kaj.Menu.prototype._setBackgroundColor = function(e) {
    this._myFabric.setBackgroundColor(e.target.value);
}

/*
Load image as canvas background.
@param e - event
*/
kaj.Menu.prototype._loadBackgroundImage = function(e) {
    var fr = new FileReader();
    fr.addEventListener("load", function(e) {
        this._myFabric.setBackgroundImage(e.target.result);
    }.bind(this));
    fr.readAsDataURL(e.target.files[0]);
}

/*
Change stroke width for new canvas objects.
@param e - event
*/
kaj.Menu.prototype._setStrokeWidth = function(e) {
    this._strokeWidth = parseInt(e.target.value);
}

/*
Change color for new canvas objects.
@param e - event
*/
kaj.Menu.prototype._setColor = function(e) {
    this._color = e.target.value;
}

/*
Add new line to canvas.
*/
kaj.Menu.prototype._addLineToCanvas = function() {
    this._myFabric.addLine(this._strokeWidth, this._color);
}

/*
Add new ellipse to canvas.
*/
kaj.Menu.prototype._addEllipseToCanvas = function() {
    this._myFabric.addEllipse(this._strokeWidth, this._color);
}

/*
Add new rectangle to canvas.
*/
kaj.Menu.prototype._addRectangleToCanvas = function() {
    this._myFabric.addRectangle(this._strokeWidth, this._color);
}

/*
Add new arrow to canvas.
*/
kaj.Menu.prototype._addArrowToCanvas = function() {
    this._myFabric.addArrow(this._strokeWidth, this._color);
}

/*
Add new text to canvas.
*/
kaj.Menu.prototype._addTextToCanvas = function() {
    this._myFabric.addText("Click to edit", this._color);
}

/*
Add images to canvas.
@param e - event
*/
kaj.Menu.prototype._addImageToCanvas = function(e) {
    this._myFabric.addImagesToCanvas(e.target.files);
}

/*
Open save image dialog.
@param filename - name of the file to download
@param dataURL - image data URL
*/
kaj.Menu.prototype._offerSave = function(filename, dataURL) {
    var a = document.createElement("a");
    a.setAttribute("download", filename);
    a.setAttribute("href", dataURL);
    this._menu.appendChild(a);
    a.click();
    this._menu.removeChild(a);
}

/*
Save canvas content as PNG.
*/
kaj.Menu.prototype._saveToFile = function() {
    this._myFabric.renderAll();
    this._offerSave("KAJ-stankmic.png", this._myFabric.getDataURL());
}

/*
Save cropped canvas content as PNG.
*/
kaj.Menu.prototype._saveCroppedToFile = function() {
    this._offerSave("KAJ-stankmic.png", this._myFabric.getCroppedDataURL());
}

/*
Save canvas content as SVG.
*/
kaj.Menu.prototype._saveAsSVG = function() {
    var base64SVG = window.btoa(this._myFabric.toSVG());
    this._offerSave("KAJ-stankmic.svg", "data:image/svg+xml;base64,"+base64SVG);
}
