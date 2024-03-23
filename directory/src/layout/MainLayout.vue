<template>
    <div class="main-wrapper">
        <PageHeader class="header"/>
        <div class="main">
            <PageLeft class="left" />
            <div class="right">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from "@/layout/PageHeader";
import PageLeft from "@/layout/PageLeft";
export default {
    name: "MainLayout",
    components:{
        PageHeader,
        PageLeft
    }
};
</script>

<style scoped lang="less">
.main-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .header {
        height: 40px;
        border-bottom: 1px solid gray;
        display: flex;
        align-items: center;
    }
    .main{
        flex: 1;
        display: flex;
        overflow: hidden;
        .left {
            width: 200px;
            border-right: 1px solid gray;
            height: 100%;
        }
        .right{
            flex: 1;
            height: calc(100vh - 40px);
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
}
</style>