/*
Menu object constructor (DOM is already in HTML)
@param myFabric - MyFabric instance
@param menuLink - menu link selector
@param menu - menu selector
*/
var Menu = function(myFabric, menuLink, menu) {
    this._myFabric = myFabric;
    this._menuLink = document.querySelector(menuLink);
    this._menuLink.addEventListener("click", this.toggleNav.bind(this));
    this._menu = document.querySelector(menu);
    this._openedWithClick = false;
    this._openedWithHover = false;
    document.querySelector("#background-image").addEventListener("change", this._loadBackgroundImage.bind(this));
    document.querySelector("#add-image").addEventListener("change", this._addImageToCanvas.bind(this));
    document.querySelector("#save").addEventListener("click", this._saveToFile.bind(this));
    document.querySelector("main").addEventListener("dragenter", this._stopEvent.bind(this));
    document.querySelector("main").addEventListener("dragover", this._stopEvent.bind(this));
    document.querySelector("main").addEventListener("drop", this._mainDrop.bind(this));
    this._pushHistoryBind = function () {
        this._pushHistory();
    }.bind(this);
    window.addEventListener('popstate', function(e) {
            this._popHistory(e)
        }.bind(this));
    this._registerHistory();
}

Menu.prototype._registerHistory = function(e) {
    this._myFabric._canvas.renderAll();
    this._myFabric._canvas.on('object:added', this._pushHistoryBind);
    this._myFabric._canvas.on('object:modified', this._pushHistoryBind);
}

Menu.prototype._deregisterHistory = function(e) {
    this._myFabric._canvas.off('object:added', this._pushHistoryBind);
    this._myFabric._canvas.off('object:modified', this._pushHistoryBind);
}

Menu.prototype._pushHistory = function(e) {
    var json = JSON.stringify(this._myFabric._canvas);
    console.log(json);
    window.history.pushState({canvasJSON:json}, "", "");
}

Menu.prototype._popHistory = function(e) {
    this._deregisterHistory();
    var json = e.state.canvasJSON;
    this._myFabric._canvas.loadFromJSON(json, this._registerHistory.bind(this));
}

Menu.prototype._stopEvent = function(e) {
    e.stopPropagation();
    e.preventDefault();
}

Menu.prototype._mainDrop = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this._addImagesToCanvas(e.dataTransfer.files);
}

/*
Open navigation menu
@param e - event
*/
Menu.prototype._openNav = function(e) {
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
Menu.prototype._closeNav = function(e) {
    this._openedWithClick = false;
    this._openedWithHover = false;
    this._menuLink.classList.remove("opened");
    this._menu.classList.remove("opened");
}

/*
Open/close navigation menu
@param e - event
*/
Menu.prototype.toggleNav = function(e) {
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
Load image on canvas background
@param e - event
*/
Menu.prototype._loadBackgroundImage = function(e) {
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
Menu.prototype._addImageToCanvas = function(e) {
    this._addImagesToCanvas(e.target.files);
}

Menu.prototype._addImagesToCanvas = function(files) {
    var callback = function(e) {
        this._myFabric.addImage(e.target.result);
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
Save canvas content to file
@param e - event
*/
Menu.prototype._saveToFile = function(e) {
    var a = document.createElement("a");
    a.setAttribute("download", "KAJ-stankmic.png");
    a.setAttribute("href", this._myFabric.getCroppedDataURL());
    this._menu.appendChild(a);
    a.click();
    this._menu.removeChild(a);
}
