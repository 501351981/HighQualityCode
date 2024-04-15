<template>
    <div class="edit-attributes-wrapper">
        <div class="title">属性编辑区</div>
        <div v-if="selectedNode">
            <el-form label-width="80px">
                <el-form-item label="id" prop="id">
                    <el-input v-model="nodeId" disabled />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="nodeId" disabled />
                </el-form-item>
                <el-form-item v-if="['circle', 'rect'].includes(nodeType)" label="x" prop="x">
                    <el-input v-model="attributes.x" @input="editAttr('x', +$event)"/>
                </el-form-item>
                <el-form-item v-if="['circle', 'rect'].includes(nodeType)" label="y" prop="y">
                    <el-input v-model="attributes.y" @input="editAttr('y', +$event)"/>
                </el-form-item>
                <el-form-item v-if="['circle'].includes(nodeType)" label="半径" prop="radius">
                    <el-input v-model="attributes.radius" @input="editAttr('radius', +$event)"/>
                </el-form-item>
                <el-form-item v-if="['rect'].includes(nodeType)" label="宽度" prop="width">
                    <el-input v-model="attributes.width" @input="editAttr('width', +$event)"/>
                </el-form-item>
                <el-form-item v-if="['rect'].includes(nodeType)" label="高度" prop="height">
                    <el-input v-model="attributes.height" @input="editAttr('height', +$event)"/>
                </el-form-item>
                <el-form-item label="背景色" prop="backgroundColor">
                    <el-input v-model="attributes.backgroundColor"
                              type="color"
                              @input="editAttr('backgroundColor', $event)"/>
                </el-form-item>
                <el-form-item label="边框宽度" prop="borderWidth">
                    <el-input v-model="attributes.borderWidth"
                              @input="editAttr('borderWidth', +$event)"/>
                </el-form-item>
                <el-form-item label="边框宽度" prop="borderColor">
                    <el-input v-model="attributes.borderColor"
                              type="color"
                              @input="editAttr('borderColor', $event)"/>
                </el-form-item>
                <el-form-item v-if="['poly'].includes(nodeType)" label="顶点" prop="points">
                    <el-input v-model="attributes.points"
                              @input="editAttr('points', $event)"/>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import lodash from "lodash";
export default {
    name: "EditAttributes",
    data(){
        return {
            selectedNode: null,
            nodeId: null,
            nodeType: null,
            attributes: {

            }
        }
    },
    mounted() {
        this.$eventBus.$on("nodeSelectChange", this.setSelectedNode.bind(this));
    },
    methods: {
        setSelectedNode(nodes){
            if(nodes.length > 0){
                this.selectedNode = nodes[0];
                this.nodeId = this.selectedNode.id;
                this.nodeType = this.selectedNode.type;
                let attributes = lodash.cloneDeep(this.selectedNode.attributes);
                if(this.nodeType === 'poly'){
                    attributes.points = JSON.stringify(attributes.points);
                }
                this.attributes = attributes;
                console.log(this.attributes);
            }else{
                this.selectedNode = null;
                this.attributes = {};
            }
        },
        editAttr(attr, value){
            try {
                if(this.nodeType === 'poly' && attr === 'points'){
                        value = JSON.parse(value);
                }
                this.selectedNode.setAttribute(attr, value);
            }catch (e){

            }
        }
    }
};
</script>

<style scoped lang="less">
.edit-attributes-wrapper{
    width: 300px;
    padding: 0 10px;

    .title {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
    }
}
</style>