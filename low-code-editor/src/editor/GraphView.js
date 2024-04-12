export default class GraphView {
    constructor(dom, options = {}){
        this.dom = dom;
        this.canvas = null; //canvas的DOM
        this.ctx = null; //canvas上下文
        this.width = options.width;
        this.height = options.height;
        this.backgroundColor = options.backgroundColor;
        this.observer = {}; //存储不同事件的观察者
        this.scale = window.devicePixelRatio; //缩放比例，为了在mac上效果更清晰
        this.blur = true;
        this.init();
    }
    init(){
        //创建canvas的DOM
        //绘制编辑器的背景
        //监听鼠标事件
        //监听键盘事件
        let canvas = document.createElement('canvas');
        canvas.width = this.width * window.devicePixelRatio;
        canvas.height = this.height * window.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';
        this.dom.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this._listenMouseEvents();
        this._listenKeyboardEvents();
    }
    getCtx(){
        //返回canvas上下文，供外部绘制图形
        return this.ctx;
    }
    getScale(){
        return this.scale;
    }
    getCanvasPointOfEvent(event){
        const rect = this.canvas.getBoundingClientRect(); // 获取Canvas元素相对于视口的位置
        const x = event.clientX - rect.left; // 计算鼠标点击位置相对于Canvas的x坐标
        const y = event.clientY - rect.top; // 计算鼠标点击位置相对于Canvas的y坐标
        return {x, y};
    }
    _listenMouseEvents(){
        //私有方法：监听鼠标事件
        this.canvas.addEventListener('mousedown', (e) => {
            this.observer['mousedown'] && this.observer['mousedown'].forEach(callback =>{
                callback(e, this.getCanvasPointOfEvent(e));
            })
        })
        this.canvas.addEventListener('mouseup', (e) => {
           this.observer['mouseup'] && this.observer['mouseup'].forEach(callback =>{
               callback(e);
           })
        });
        this.canvas.addEventListener('mousemove', (e) => {
            this.observer['mousemove'] && this.observer['mousemove'].forEach(callback =>{
                callback(e);
            })
        });
        //画布失焦
        document.addEventListener('click', (e)=>{
            if(e.target !== this.canvas){
                this.observer['blur'] && this.observer['blur'].forEach(callback =>{
                    callback(e);
                })
                this.blur = true;
            }else if(this.blur){
                this.blur = false;
                this.observer['focus'] && this.observer['focus'].forEach(callback =>{
                    callback(e);
                })
            }
        })
    }
    _listenKeyboardEvents(){
        //私有方法：监听键盘事件
        document.addEventListener('keydown', (e) => {
            if(this.blur){
                return;
            }
            if(e.key === 'Delete' || e.key === 'Backspace'){
                this.observer['delete'] && this.observer['delete'].forEach(callback =>{
                    callback(e);
                })
            }
            this.observer['keydown'] && this.observer['keydown'].forEach(callback =>{
                callback(e);
            })
        });
    }
    addEventListener(type, callback){
        //供外部添加不同事件的回调方法，GraphView不关心事件交给谁处理
        if(!this.observer[type]){
            this.observer[type] = [];
        }
        this.observer[type].push(callback);
    }
    removeEventListener(type, callback){
        //供外部移除不同事件的回调方法
        if(!this.observer[type]){
            return;
        }
        if(!callback){
            this.observer[type] = [];
            return;
        }
        this.observer[type] = this.observer[type].filter(item => item !== callback);
    }
    draw(){
        //绘制背景
        this.ctx.clearRect(0, 0, this.width * this.scale, this.height * this.scale);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width * this.scale, this.height * this.scale);
        this.ctx.closePath();
    }
}