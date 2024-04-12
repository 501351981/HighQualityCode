import GraphView from "@/editor/GraphView";
import DataModel from "@/editor/DataModel";
import Selector from "@/editor/Selector";
export function createEditor(dom, graphData = {}){
    if(typeof dom === 'string'){
        dom = document.querySelector(dom);
    }
    const graphView = new GraphView(dom, {
        width: graphData.width || 300,
        height: graphData.height || 300,
        backgroundColor: graphData.backgroundColor || '#fff',
    });
    const selector = new Selector();
    const dataModel = new DataModel(graphData, graphView, selector);

    //给选择器模型关联数据模型
    selector.setDataModel(dataModel);


    let mouseDown = false; //记录当前鼠标是不是按下，用于判断是否是拖拽
    graphView.addEventListener('mousedown', (event, point)=>{
        mouseDown = true;
        let clickedNode = dataModel.getClickedNode(point);
        //鼠标点中了一个元素的处理逻辑
        if(clickedNode){
           if(!selector.getSelectedNodes().length){
               //如果当前还没有选中任何元素，那么就选中这个元素
               selector.add(clickedNode);
           }else if(selector.getSelectedNodes().includes(clickedNode)){
               //如果当前已经选中这个元素，不处理，继续保持选中
           }else if(event.shiftKey){
               selector.add(clickedNode);
           }else{
               selector.clear();
               selector.add(clickedNode);
           }
        }else{
            selector.clear();
        }
    })

    graphView.addEventListener('mouseup', (event, point)=>{
        mouseDown = false;
    })

    graphView.addEventListener('mousemove', (event, point)=>{
        if(mouseDown){
            //如果鼠标按下，那么就拖拽
            let selectedNodes = selector.getSelectedNodes();
            if(selectedNodes.length){
                selectedNodes.forEach(node => node.move(event.movementX, event.movementY));
            }
        }
    })

    graphView.addEventListener('delete', (event)=>{
        let selectedNodes = selector.getSelectedNodes();
        [...selectedNodes].forEach(node => {
            dataModel.removeNode(node);
        });
    });

    return {
        graphView,
        dataModel,
        selector,
    }
}