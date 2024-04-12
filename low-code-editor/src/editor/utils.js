import RectNode from "@/editor/node/RectNode";
import CircleNode from "@/editor/node/CircleNode";
import PolyNode from "@/editor/node/PolyNode";
export function createNode(type, {graphView, dataModel, id, attributes={}}){
    switch (type) {
        case "rect":
            return new RectNode({graphView, dataModel, id, attributes});
        case "circle":
            return new CircleNode({graphView, dataModel, id, attributes});
        case "poly":
            return new PolyNode({graphView, dataModel, id, attributes});
        default:{

        }
    }
}

export function getBoundingBox(points){
    if(points.length < 2) {
        return {x: 0, y: 0, width: 0, height: 0};
    }
    let minX = points[0][0];
    let minY = points[0][1];
    let maxX = points[0][0];
    let maxY = points[0][1];
    for(let i = 1; i < points.length; i++) {
        minX = Math.min(points[i][0], minX);
        maxX = Math.max(points[i][0], maxX);
        minY = Math.min(points[i][1], minY);
        maxY = Math.max(points[i][1], maxY);
    }
    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}