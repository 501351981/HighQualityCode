export default class Selector {
    constructor(){
        this.dataModel = null;
        this.selectedNodes = [];
        this.oberserver = [];
    }
    setDataModel(dataModel){
        this.dataModel = dataModel;
    }
    add(node){
        this.selectedNodes.push(node);
        this.dataModel.setDirty();
        this._emitSelectChange();
    }
    remove(node){
        const index = this.selectedNodes.indexOf(node);
        if(index > -1){
            this.selectedNodes.splice(index, 1);
        }
        this.dataModel.setDirty()
        this._emitSelectChange();
    }
    clear(){
        this.selectedNodes = [];
        this.dataModel.setDirty();
        this._emitSelectChange();
    }
    getSelectedNodes(){
        return this.selectedNodes;
    }
    addSelectChangeListener(callback){
        this.oberserver.push(callback);
    }
    removeSelectChangeListener(callback){
        const index = this.oberserver.indexOf(callback);
        if(index > -1){
            this.oberserver.splice(index, 1);
        }
    }
    _emitSelectChange(){
        this.oberserver.forEach(callback => callback(this.selectedNodes));
    }
}