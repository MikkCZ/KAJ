/*
Menu object constructor (DOM is already in HTML)
*/
var Menu = function(menuLink, menu) {
    this._menuLink = document.querySelector(menuLink);
    this._menuLink.addEventListener("click", this.toggleNav.bind(this));
    this._menu = document.querySelector(menu);
    this._openedWithClick = false;
    this._openedWithHover = false;
}

/*
Open navigation menu
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
*/
Menu.prototype._closeNav = function(e) {
    this._openedWithClick = false;
    this._openedWithHover = false;
    this._menuLink.classList.remove("opened");
    this._menu.classList.remove("opened");
}

/*
Open/close navigation menu
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
Initialize menu object after document is loaded
*/
document.addEventListener("DOMContentLoaded", function(event) {
    var menu = new Menu("#menu-link", "#menu");
    if (window.location.protocol == "file:") {
        var runningLocal = document.createElement("span");
        runningLocal.id = "local";
        runningLocal.innerHTML = "local";
        document.querySelector("header").appendChild(runningLocal);
    }
});
