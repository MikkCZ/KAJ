var History = function(myFabric) {
    this._myFabric = myFabric;
    this._pushHistoryBind = function () {
        this._pushHistory();
    }.bind(this);
    window.addEventListener('popstate', function(e) {
            this._popHistory(e)
        }.bind(this));
    this._registerHistory();
}

History.prototype._registerHistory = function(e) {
    this._myFabric.renderAll();
    this._myFabric.addCanvasListener("object:added", this._pushHistoryBind);
    this._myFabric.addCanvasListener("object:modified", this._pushHistoryBind);
}

History.prototype._deregisterHistory = function(e) {
    this._myFabric.removeCanvasListener("object:added", this._pushHistoryBind);
    this._myFabric.removeCanvasListener("object:modified", this._pushHistoryBind);
}

History.prototype._pushHistory = function(e) {
    var json = this._myFabric.toJSON();
    console.log(json);
    window.history.pushState({canvasJSON:json}, "", "");
}

History.prototype._popHistory = function(e) {
    this._deregisterHistory();
    var json = e.state.canvasJSON;
    this._myFabric.loadFromJSON(json, this._registerHistory.bind(this));
}