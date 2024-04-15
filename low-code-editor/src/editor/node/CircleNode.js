import Node from './Node';
export default class CircleNode extends Node {
    constructor({graphView, dataModel, id, attributes={}}) {
        super({graphView, dataModel, id, attributes});
        this.type = 'circle';
    }
    containsPoint(pointX, pointY){
        //判断一个点是否在圆形内部，可以根据圆心和(pointX, pointY)的距离判断
        //实现待定
        let distanceSquared = Math.pow(pointX - this.attributes.x, 2) + Math.pow(pointY - this.attributes.y,2);
        let radiusSquared = Math.pow(this.attributes.radius, 2);
        return distanceSquared <= radiusSquared;
    }
    draw(){
        let ctx = this.graphView.getCtx();
        let scale = this.graphView.getScale();

        ctx.beginPath();
        ctx.arc(
            this.attributes.x * scale,
            this.attributes.y * scale,
            this.attributes.radius * scale,
            0,
            Math.PI*2,
            true
        );
        ctx.closePath();
        ctx.fillStyle = this.attributes.backgroundColor || 'transparent';
        ctx.fill();
        ctx.strokeStyle = this.attributes.borderColor || 'transparent';
        ctx.lineWidth = this.attributes.borderWidth * scale;
        ctx.stroke();
    }
    getBoundingBox(){
        return {
            x: this.attributes.x - this.attributes.radius,
            y: this.attributes.y - this.attributes.radius,
            width: this.attributes.radius * 2 ,
            height: this.attributes.radius * 2
        };
    }
    move(dx, dy){
        super.move(dx, dy);
        this.attributes.x += dx;
        this.attributes.y += dy;
    }
    setCenter(x, y){
        super.setCenter(x, y);
        this.attributes.x = x;
        this.attributes.y = y;
    }
}