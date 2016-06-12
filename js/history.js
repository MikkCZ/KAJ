if (typeof kaj === "undefined") {
    var kaj = {};
}

/*
History object to handle browser history.
@param myFabric - MyFabric instance
*/
kaj.History = function(myFabric) {
    this._myFabric = myFabric;

    this._pushHistoryBind = function () {
        this._pushHistory();
    }.bind(this);

    window.addEventListener("popstate", function(e) {
        this._popHistory(e)
    }.bind(this));
    this._registerHistory();

    this._pushHistory();
}

/*
Registers listeners for the history events.
*/
kaj.History.prototype._registerHistory = function() {
    //this._myFabric.addCanvasListener("after:render", this._pushHistoryBind);
    this._myFabric.addCanvasListener("object:added", this._pushHistoryBind);
    this._myFabric.addCanvasListener("object:modified", this._pushHistoryBind);
    this._myFabric.addCanvasListener("object:removed", this._pushHistoryBind);
}

/*
Remove listeners from the history events.
*/
kaj.History.prototype._deregisterHistory = function() {
    //this._myFabric.removeCanvasListener("after:render", this._pushHistoryBind);
    this._myFabric.removeCanvasListener("object:added", this._pushHistoryBind);
    this._myFabric.removeCanvasListener("object:modified", this._pushHistoryBind);
    this._myFabric.removeCanvasListener("object:removed", this._pushHistoryBind);
}

/*
Push new history state.
*/
kaj.History.prototype._pushHistory = function() {
    var json = this._myFabric.toJSON();
    //console.log(json);
    window.history.pushState({canvasJSON:json}, "", "");
}

/*
Restore history state.
@param e - event
*/
kaj.History.prototype._popHistory = function(e) {
    var json = e.state.canvasJSON;
    //console.log(json);
    this._deregisterHistory();
    this._myFabric.loadFromJSON(json, function(e) {
        this._myFabric.renderAll();
        this._registerHistory();
    }.bind(this));
}
