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
    this._menuLink.addEventListener("click", this.toggleNav.bind(this));
    
    this._menu = document.querySelector(menu);
    
    this._openedWithClick = false;
    this._openedWithHover = false;
    
    document.querySelector("#color").addEventListener("change", this._setColor.bind(this));
    document.querySelector("#background").addEventListener("change", this._setBackgroundColor.bind(this));
    //document.querySelector("#background-image").addEventListener("change", this._loadBackgroundImage.bind(this));
    document.querySelector("#add-image").addEventListener("change", this._addImageToCanvas.bind(this));
    document.querySelector("#add-text").addEventListener("click", this._addTextToCanvas.bind(this));
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
@param e - event
*/
kaj.Menu.prototype._closeNav = function(e) {
    this._openedWithClick = false;
    this._openedWithHover = false;
    this._menuLink.classList.remove("opened");
    this._menu.classList.remove("opened");
}

/*
Open/close navigation menu
@param e - event
*/
kaj.Menu.prototype.toggleNav = function(e) {
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

kaj.Menu.prototype._setColor = function(e) {
    this._myFabric.setColor(e.target.value);
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

/*
Load images and add it to canvas
@param e - event
*/
kaj.Menu.prototype._addImageToCanvas = function(e) {
    this._myFabric.addImagesToCanvas(e.target.files);
}

kaj.Menu.prototype._addTextToCanvas = function() {
    this._myFabric.addText("Click to edit");
}

/*
Save canvas content to file
@param e - event
*/
kaj.Menu.prototype._saveToFile = function(e) {
    this._myFabric.renderAll();
    this._offerSave("KAJ-stankmic.png", document.querySelector("#fabric").toDataURL());
}

/*
Save canvas content to file
@param e - event
*/
kaj.Menu.prototype._saveCroppedToFile = function(e) {
    this._offerSave("KAJ-stankmic.png", this._myFabric.getCroppedDataURL());
}

kaj.Menu.prototype._saveAsSVG = function(e) {
    var base64SVG = window.btoa(this._myFabric.toSVG());
    this._offerSave("KAJ-stankmic.svg", "data:image/svg+xml;base64,"+base64SVG);
}

kaj.Menu.prototype._offerSave = function(download, data) {
    var a = document.createElement("a");
    a.setAttribute("download", download);
    a.setAttribute("href", data);
    this._menu.appendChild(a);
    a.click();
    this._menu.removeChild(a);
}
