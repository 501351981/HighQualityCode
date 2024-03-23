import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes";
Vue.use(VueRouter)

const routersInstance = new VueRouter({
    routes,
    mode: 'history'
});

routersInstance.beforeEach( async (to, from, next)=>{
    //before相关处理，如鉴权等
    next();
})


export default routersInstance;