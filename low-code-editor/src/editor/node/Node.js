export default class Node {
    constructor({graphView, dataModel, id, attributes={}}) {
        this.graphView = graphView;
        this.dataModel = dataModel;
        this.id = id;
        this.attributes = attributes;
        this.type = 'node';
    }
    getAttributes(){
        //获取节点所有属性
        return this.attributes;
    }
    getAttribute(key){
        //获取某个属性
        return this.attributes[key];
    }
    setAttributes(attributes){
        //设置节点所有属性
        this.attributes = attributes;
        this.dataModel.setDirty();
    }
    setAttribute(key, value){
        //设置某个属性
        this.attributes[key] = value;
        this.dataModel.setDirty();
    }
    containsPoint(pointX, pointY){
        //判断一个点是否在图形内部，由具体的子类实现
    }
    draw(){
        //绘制图形，具体怎么绘制，由具体的子类实现，是圆形就画圆，是矩形就画矩形
    }
    getBoundingBox(){
        //获取图形包围盒，由具体的子类实现
    }
    drawBoundingBox(){
        let ctx = this.graphView.getCtx();
        let scale = this.graphView.getScale();
        let boundingBox = this.getBoundingBox();
        ctx.beginPath();
        ctx.rect(
            boundingBox.x * scale,
            boundingBox.y * scale,
            boundingBox.width * scale,
            boundingBox.height * scale
        );
        ctx.closePath();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2* scale;
        ctx.stroke();
    }
    move(dx, dy){
        //移动图形，由具体的子类实现
        this.dataModel.setDirty();
    }
}
