if (typeof kaj === "undefined") {
    var kaj = {};
}

/*
Menu object constructor (DOM is already in HTML)
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
Open navigation menu
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
Close navigation menu
*/
kaj.Menu.prototype._closeNav = function() {
    this._openedWithClick = false;
    this._openedWithHover = false;
    this._menuLink.classList.remove("opened");
    this._menu.classList.remove("opened");
}

/*
Open/close navigation menu
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

kaj.Menu.prototype._setBackgroundColor = function(e) {
    this._myFabric.setBackgroundColor(e.target.value);
}

/*
Load image on canvas background
@param e - event
*/
kaj.Menu.prototype._loadBackgroundImage = function(e) {
    var fr = new FileReader();
    fr.addEventListener("load", function(e) {
        this._myFabric.setBackgroundImage(e.target.result);
    }.bind(this));
    fr.readAsDataURL(e.target.files[0]);
}

kaj.Menu.prototype._setStrokeWidth = function(e) {
    this._strokeWidth = parseInt(e.target.value);
}

kaj.Menu.prototype._setColor = function(e) {
    this._color = e.target.value;
}

kaj.Menu.prototype._addLineToCanvas = function() {
    this._myFabric.addLine(this._color);
}

kaj.Menu.prototype._addEllipseToCanvas = function() {
    this._myFabric.addEllipse(this._strokeWidth, this._color);
}

kaj.Menu.prototype._addRectangleToCanvas = function() {
    this._myFabric.addRectangle(this._strokeWidth, this._color);
}

kaj.Menu.prototype._addArrowToCanvas = function() {
    this._myFabric.addArrow(this._strokeWidth, this._color);
}

kaj.Menu.prototype._addTextToCanvas = function() {
    this._myFabric.addText("Click to edit", this._color);
}

/*
Load images and add it to canvas
@param e - event
*/
kaj.Menu.prototype._addImageToCanvas = function(e) {
    this._myFabric.addImagesToCanvas(e.target.files);
}

kaj.Menu.prototype._offerSave = function(download, data) {
    var a = document.createElement("a");
    a.setAttribute("download", download);
    a.setAttribute("href", data);
    this._menu.appendChild(a);
    a.click();
    this._menu.removeChild(a);
}

/*
Save canvas content to file
*/
kaj.Menu.prototype._saveToFile = function() {
    this._myFabric.renderAll();
    this._offerSave("KAJ-stankmic.png", document.querySelector("#fabric").toDataURL());
}

/*
Save canvas content to file
*/
kaj.Menu.prototype._saveCroppedToFile = function() {
    this._offerSave("KAJ-stankmic.png", this._myFabric.getCroppedDataURL());
}

kaj.Menu.prototype._saveAsSVG = function() {
    var base64SVG = window.btoa(this._myFabric.toSVG());
    this._offerSave("KAJ-stankmic.svg", "data:image/svg+xml;base64,"+base64SVG);
}
