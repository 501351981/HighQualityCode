import {createNode} from "@/editor/utils";
export default class DataModel {
    constructor(options = {}, graphView, selector){
        this.graphView = graphView;
        this.selector = selector;
        this.nodes = [];
        this.dirty = true; //通过增加标志量，看看是否需要重绘画布
        this.initNodes(options.nodes || [])
        requestIdleCallback(() =>this.checkDirty()); //浏览器空闲时检查是否应该重绘画布
    }
    checkDirty(){
        if(this.dirty){
            this.render();
            this.dirty = false;
        }
        requestIdleCallback(()=>this.checkDirty()); //持续监听
    }
    setDirty(){
        this.dirty = true;
    }
    render(){
       //绘制背景
        this.graphView.draw();

        //绘制图形节点
        this.nodes.forEach(node=>{
            node.draw();
        });

        //绘制选中节点的高亮边框
        let selectedNodes = this.selector && this.selector.getSelectedNodes() || [];
        for(let i = 0; i < selectedNodes.length; i++) {
            selectedNodes[i].drawBoundingBox();
        }
    }
    //height、 backgroundColor同上
    initNodes(nodes){
        //将图形节点的json格式的数据，变成我们前面抽象的CircleNode或RectNode
        nodes.forEach(nodeJson=>{
            let nodeObj = createNode(nodeJson.type, {
                id: nodeJson.id,
                attributes: nodeJson.attributes || {},
                graphView: this.graphView,
                dataModel: this
            });
            this.nodes.push(nodeObj);
        })
    }
    addNode(node){
        //添加node
        this.nodes.push(node);
        this.dirty = true;
    }
    removeNode(node){
        //删除node
        this.selector.remove(node);
        this.nodes = this.nodes.filter(item=>{
            return item !== node;
        });
        node = null;
        this.dirty = true;
    }
    getNodeById(id){
        //根据id查询node
        return this.nodes.find(item=>{
            return item.id === id;
        });
    }
    get maxId(){
        if(!this.nodes.length){
            return 0;
        }
        let maxId = this.nodes[0].id;
        for(let i = 0; i < this.nodes.length; i++){
            maxId = Math.max(maxId, this.nodes[i].id);
        }
        return maxId;
    }
    getClickedNode(point){
        //从后往前找，后面的渲染在上层
        for(let i = this.nodes.length - 1; i >= 0 ;i--){
            let node = this.nodes[i];
            if(node.containsPoint(point.x, point.y)){
                return node;
            }
        }
    }
    getJson(){
        //获取json数据
        return {
            width: this.graphView.width,
            height: this.graphView.height,
            backgroundColor: this.graphView.backgroundColor,
            nodes: this.nodes.map(node=>{
                return {
                    id: node.id,
                    type: node.type,
                    attributes: node.getAttributes(),
                }
            })
        }

    }
}