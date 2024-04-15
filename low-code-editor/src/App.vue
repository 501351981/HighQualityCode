<template>
    <div id="app">
        <!--        物料选择-->
        <MaterialSelect/>
        <div class="graph-view-wrapper">
            <el-button @click="save" class="save-btn">保存画布数据</el-button>
            <div id="editor" @drop="dropHandler" @dragover="dragoverHandler"></div>
        </div>
        <EditAttributes/>
    </div>
</template>

<script>
import {createEditor} from "@/editor";
import MaterialSelect from "@/components/MaterialSelect";
import EditAttributes from "@/components/EditAttributes";
import defaultGraphData from "@/defaultGraphData.json";
import {createNode, getBoundingBox} from "@/editor/utils";
import lodash from 'lodash';
export default {
    name: 'App',
    components: {
        MaterialSelect,
        EditAttributes
    },

    mounted() {
        const {graphView, dataModel, selector} = createEditor("#editor", defaultGraphData);
        selector.addSelectChangeListener((selectedNodes)=>{
            console.log('selectedNodes', selectedNodes, this);
            this.$eventBus.$emit('nodeSelectChange', selectedNodes);
        })
        this.graphView = graphView;
        this.dataModel = dataModel;
        this.selector = selector;
    },
    methods:{
        dragoverHandler(event){
            event.preventDefault();
        },
        dropHandler(event){
            let {x, y} = this.graphView.getCanvasPointOfEvent(event);
            let config = JSON.parse(event.dataTransfer.getData('config'))
            let attributes = lodash.cloneDeep(config.defaultAttributes);

            let node = createNode(config.type, {
                graphView: this.graphView,
                dataModel: this.dataModel,
                id: this.dataModel.maxId + 1,
                attributes
            })
            node.setCenter(x, y);
            //添加到画布
            this.dataModel.addNode(node);
            //选中拖拽进来的节点
            this.selector.clear();
            this.selector.add(node);
        },
        save(){
            this.$alert(JSON.stringify(this.dataModel.getJson(), null, 2), '画布数据', {
                confirmButtonText: '确定'
            }).catch(_=>{

            });
        }
    }
};
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    height: 100vh;
    display: flex;
    .graph-view-wrapper{
        position: relative;
        flex: 1;
        background: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        .save-btn{
            position: absolute;
            right: 10px;
            top: 10px;
        }

    }
}
</style>
