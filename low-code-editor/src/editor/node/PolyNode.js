import Node from './Node';
import {getBoundingBox} from "@/editor/utils";
export default class PolyNode extends Node {
    constructor({graphView, dataModel, id, attributes={}}) {
        super({graphView, dataModel, id, attributes});
        this.type = 'poly';
    }
    containsPoint(pointX, pointY){
        //判断一个点是否在圆形内部，可以根据圆心和(pointX, pointY)的距离判断
        let points = this.attributes.points || [];
        if(points.length < 2) {
            return false;
        }
        let ctx = this.graphView.ctx;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for(let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.closePath();
        return ctx.isPointInPath(pointX, pointY);
    }
    draw(){
        //绘制图形，实现待定
        let points = this.attributes.points || [];
        if(points.length < 2) {
            return;
        }
        let ctx = this.graphView.ctx;
        let scale = this.graphView.getScale();
        ctx.beginPath();
        ctx.moveTo(points[0][0] * scale, points[0][1] * scale);
        for(let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0] * scale, points[i][1] * scale);
        }
        ctx.closePath();
        ctx.fillStyle = this.attributes.backgroundColor || 'transparent';
        ctx.fill();
        ctx.strokeStyle = this.attributes.borderColor || 'transparent';
        ctx.lineWidth = this.attributes.borderWidth * scale;
        ctx.stroke();
    }
    getBoundingBox(){
        //返回图形包围盒
        let points = this.attributes.points || [];
        return getBoundingBox(points);
    }
    move(dx, dy) {
        super.move(dx, dy);
        let points = this.attributes.points || [];
        for(let i = 0; i < points.length; i++) {
            points[i][0] += dx;
            points[i][1] += dy;
        }
    }
    setCenter(x, y){
        super.setCenter(x, y);
        let points = this.attributes.points;
        let boundingBox = this.getBoundingBox()
        let centerX = boundingBox.x + boundingBox.width/2;
        let centerY = boundingBox.y + boundingBox.height/2;
        let diffX = x - centerX;
        let diffY = y - centerY;
        this.attributes.points = points.map(point=> [point[0] + diffX, point[1] + diffY])
    }
}
