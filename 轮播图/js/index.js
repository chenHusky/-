class Caroul{
	constructor(selector) {
	    this.container = document.querySelector(selector),
		this.ul = this.container.querySelector("ul")
		this.lis = this.ul.children;
		this.ol = this.container.querySelector("ol");
		this.btns = [];//放所有按钮
		this.goPrev = this.container.querySelector("#goPrev")
		this.goNext = this.container.querySelector("#goNext")
		this.index = 0
		this.lastIndex = 0
		this.Timer = null //定时器
		this.init()
		
	}
	
	// 初始化
	init(){
		// 根据图片数量创建按钮
		for(let i = 0;i<this.lis.length-1;i++){
			this.li = document.createElement("li")
			this.li.innerHTML = i +1
			this.ol.appendChild(this.li)
			this.btns.push(this.li)
			if(i === 0){
				this.li.classList.add("ac")
			}
		}
		
		this.bindEvent()
		this.autoChange()
	}
	
	
	// 绑事件
	
	bindEvent(){
		// 按钮点击
		for(let i = 0;i<this.btns.length;i++){
			this.btns[i].onclick = ()=> {
				this.index = i;
				this.changeImg();
			}
			
		}
		
		// 点击右翻页
		
		this.goNext.onclick = this.changeNext.bind(this)
		
		// 点击左翻页
		this.goPrev.onclick = this.changePrev.bind(this)
		
		this.container.onmouseenter = this.stopAutoChange.bind(this)
		this.container.onmouseleave = this.autoChange.bind(this)
	}
	
	// 700ms将图片切至对应位置
	changeImg(){
		// console.log(this.)
		tools.move(this.ul,'top',this.index * (-500),700)
		this.changeBtn()
		// console.log(this.index,this.lastIndex)
		this.lastIndex = this.index
	}
	
	// 切换按钮样式
	changeBtn(){
		this.btns[this.lastIndex].classList.remove("ac")
		this.btns[this.index].classList.add("ac")
	}
	
	// 向左切
	changePrev(){
		this.index--
		if(this.index >= 0) {
			this.changeImg()
		}
		else{
			this.changeImgMin()	
		}
	}
	// 第一张再向左切时，先将图片秒切至第lis.length张,再往左切一张
	changeImgMin(){
		setTimeout(function(){
			this.index = this.btns.length - 1;
			this.ul.style.top = -500*this.btns.length +"px"
			this.changeImg()
			// console.log(this.ul.style.top)
		}.bind(this),10)
		
	}
	
	
	// 向右切
	changeNext(){
		this.index++;
		if(this.index < this.btns.length) {
			this.changeImg()
		}
		else{
			tools.move(this.ul,'top',this.index * (-500),700)
			this.index = 0
			this.changeBtn()
			this.changeImgMax()
			this.lastIndex = this.index
		}
	}
	// 向右切超出图片总数，切回第一张
	changeImgMax(){
		setTimeout(function(){
			// console.log(this.index)
			this.ul.style.top = 0 +"px"
		}.bind(this),700)
	}
	
	// 自动轮播
	autoChange(){
		this.Timer = setInterval(this.changeNext.bind(this),2000)
	}
	
	// 关闭自动轮播
	
	stopAutoChange(){
		clearInterval(this.Timer)
	}
	
	
	
}

new Caroul("#div1")