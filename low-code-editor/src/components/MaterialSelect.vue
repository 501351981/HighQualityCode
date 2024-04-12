<template>
<div class="material-select-wrapper">
    <div class="title">
        拖动物料到画布
    </div>
    <div v-for="(item, index) in materialList"
         :key="index"
         class="material-select-item"
         draggable
         @dragstart="dragStartHandler($event, item)"
    >
        <img :src="item.icon"
             width="40px"
             style="margin-right: 4px"
             :draggable="false"
        >
        <span>{{item.label}}</span>
    </div>
</div>
</template>

<script>
import circlePng from "../assets/circle.png";
import rectPng from "../assets/rect.png"
import trianglePng from "../assets/triangle.png"
import orangePng from "../assets/orange.png"
export default {
    name: "MaterialSelect",
    data(){
        return {
            materialList: [
                {
                    label: '圆形',
                    icon: circlePng,
                    type: 'circle',
                    defaultAttributes: {
                        radius: 30,
                        backgroundColor: '#ff0000',
                        borderWidth: 2,
                        borderColor: "#a000a0"
                    }
                },
                {
                    label: '矩形',
                    icon: rectPng,
                    type: 'rect',
                    defaultAttributes: {
                        width: 100,
                        height: 100,
                        backgroundColor: "#0000FF",
                        borderWidth: 2
                    }
                },
                {
                    label: '三角形',
                    icon: trianglePng,
                    type: 'poly',
                    defaultAttributes: {
                        points:[
                            [50, 0],
                            [0, 100],
                            [100, 100]
                        ],
                        backgroundColor: "#377e22",
                        borderWidth: 2
                    }
                },
                {
                    label: '多边形',
                    icon: orangePng,
                    type: 'poly',
                    defaultAttributes: {
                        points:[
                            [50, 0],
                            [0, 100],
                            [100, 100],
                            [100, 0],
                        ],
                        backgroundColor: "#f2a93b",
                        borderWidth: 2
                    }
                },
            ]
        }
    },
    methods:{
        dragStartHandler(ev, item){
            ev.dataTransfer.setData('config', JSON.stringify(item))
        }
    }
};
</script>

<style scoped lang="less">
.material-select-wrapper {
    width:  200px;

    .title {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
    }
    .material-select-item {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #eee;
        cursor: move;
    }

}
</style>