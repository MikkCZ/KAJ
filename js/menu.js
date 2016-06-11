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
Load image and add it to canvas
@param e - event
*/
Menu.prototype._addImageToCanvas = function(e) {
    var fr = new FileReader();
    fr.addEventListener("load", function(e) {
        this._myFabric.addImage(e.target.result);
    }.bind(this));
    fr.readAsDataURL(e.target.files[0]);
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
