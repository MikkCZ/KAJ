if (typeof kaj === "undefined") {
    var kaj = {};
}

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

kaj.History.prototype._registerHistory = function(e) {
    this._myFabric.renderAll();
    this._myFabric.addCanvasListener("after:render", this._pushHistoryBind);
    this._myFabric.addCanvasListener("object:added", this._pushHistoryBind);
    this._myFabric.addCanvasListener("object:modified", this._pushHistoryBind);
}

kaj.History.prototype._deregisterHistory = function(e) {
    this._myFabric.removeCanvasListener("after:render", this._pushHistoryBind);
    this._myFabric.removeCanvasListener("object:added", this._pushHistoryBind);
    this._myFabric.removeCanvasListener("object:modified", this._pushHistoryBind);
}

kaj.History.prototype._pushHistory = function() {
    var json = this._myFabric.toJSON();
    console.log(json);
    window.history.pushState({canvasJSON:json}, "", "");
}

kaj.History.prototype._popHistory = function(e) {
    this._deregisterHistory();
    var json = e.state.canvasJSON;
    console.log(json);
    this._myFabric.loadFromJSON(json, this._registerHistory.bind(this));
}
