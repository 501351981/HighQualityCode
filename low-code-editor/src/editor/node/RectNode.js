import Node from './Node';
export default class RectNode extends Node {
    constructor({graphView, dataModel, id, attributes={}}) {
        super({graphView, dataModel, id, attributes});
        this.type = 'rect';
    }
    containsPoint(pointX, pointY){
        //判断一个点是否在圆形内部，可以根据圆心和(pointX, pointY)的距离判断
        let x = this.attributes.x;
        let y = this.attributes.y;
        let width = this.attributes.width;
        let height = this.attributes.height;
        return pointX >= x && pointY >= y && pointX <= (x + width) && pointY <= (y + height);
    }
    draw(){
        let ctx = this.graphView.getCtx();
        let scale = this.graphView.getScale();

        ctx.beginPath();
        ctx.rect(
            this.attributes.x * scale,
            this.attributes.y * scale,
            this.attributes.width * scale,
            this.attributes.height * scale
        );
        ctx.fillStyle = this.attributes.backgroundColor || 'transparent';
        ctx.fill();
        ctx.strokeStyle = this.attributes.borderColor || 'transparent';
        ctx.lineWidth = this.attributes.borderWidth * scale;
        ctx.stroke();
    }
    getBoundingBox() {
        return {
            x: this.attributes.x,
            y: this.attributes.y,
            width: this.attributes.width,
            height: this.attributes.height
        }
    }
    move(dx, dy) {
        super.move(dx, dy);
        this.attributes.x += dx;
        this.attributes.y += dy;
    }
    setCenter(x, y){
        super.setCenter(x, y);
        this.attributes.x = x - this.attributes.width/2;
        this.attributes.y = y - this.attributes.height/2;
    }
}
