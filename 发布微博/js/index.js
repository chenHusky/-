class Issue{
	constructor() {
	    this.o = document
		this.btn = document.querySelector("#btn")
		this.container = document.querySelector("#container")
		this.closeBtn = this.container.querySelector("#closeBtn")
		this.showBox = this.container.querySelector("#showBox")
		this.contentBox = this.showBox.querySelector("#contentBox")
		this.userName = this.container.querySelector("#userName")
		this.inputBox = this.container.querySelector("#inputBox")
		this.submitBtn = this.container.querySelector("#submitBtn")
		
		this.init()
	}
	
	init(){
		// 创建遮幕
		this.div = document.createElement("div")
		document.body.appendChild(this.div)
		// 创建撤回按钮
		this.ul = document.createElement("ul")
		this.ul.className = "menu";
		this.ul.innerHTML = "<li>撤回</li>";
		
		
		this.bindEvent()
	}
	// 绑事件
	bindEvent(){
		// 点击弹出发布框
		this.btn.onclick = this.openBox.bind(this)
		
		// 点击X关闭发布框
		this.closeBtn.onclick = this.closeBox.bind(this)
		
		// 点击提交按钮将当前时间和输入内容发布到发布框
		this.submitBtn.onclick = this.submitContent.bind(this)
		
		// 点击右键弹出菜单
		this.contentBox.oncontextmenu = e => {
			
			// 将该事件源用this.E记录，用于撤回时找到该事件源
			this.E = e.target
			// console.log(this.E)
			this.contextMenu(e)}
		
		// 点击鼠标关闭弹出菜单
		
		this.o.onmouseup = this.closeContextMenu.bind(this)
		
		// 点击删除删除内容
		this.ul.onmousedown = this.delContext.bind(this)
	}
	
	// 发布内容
	submitContent(){
		// 获取时间
		this.Time = this.getTime() 
		// console.log(this.Time)
		
		// 获取内容
		this.contentText = this.inputBox.value
		
		// 发布在发布框
		if (this.contentText ==""){
			this.contentBox.innerHTML ==""
		}else{
			// span用于储存当前信息的发布的时间戳
			this.contentBox.innerHTML += `<p id="fontTypes">${this.Time} </br> <i id= "fontTypeC">${this.contentText}</i> <span id="memoryTime">${this.startTime}</span></p>`
			this.inputBox.value =""
		}
		
		
	}
	
	// 弹出右键菜单
	contextMenu(e){
		// console.log(e)
		// 菜单出现在鼠标位置
		document.body.appendChild(this.ul);
		this.ul.style.left = e.clientX + "px";
		this.ul.style.top = e.clientY + "px";
		
		
		// 阻止默认事件
		if(e.preventDefault){
			e.preventDefault()
		}else{
			window.event.returnValue = false;
		}
	}
	// 关闭右键菜单
	closeContextMenu(){
		if(this.ul){
			this.ul.remove()
		}
	}
	
	
	// 获取时间
	getTime(){
		this.nowTime = new Date;
		// 记录当前时间戳，用于计算撤回时间是否超出2min
		this.startTime = this.nowTime.getTime()
		this.year = this.nowTime.getFullYear();
		this.month = this.nowTime.getMonth();
		this.date = this.nowTime.getDate();
		this.hour = this.nowTime.getHours();
		this.minute = this.nowTime.getMinutes();
		return `${this.year} 年 ${this.month} 月 ${this.date} 日 ${this.hour} 时 ${this.minute} 分`
	}
	
	
	// 弹出发布框
	openBox(){
		this.container.style.display = "block";
		
		this.div.className="modal" 
		
	}
	
	// 关闭发布框
	closeBox(){
		this.container.style.display = "none"
		this.div.classList.remove("modal")
	}
	// 删除
	delContext(){
		// console.log(this.E)
		// 将存储在span内的时间戳提取出来
		this.starTimeCopy = this.E.querySelector("span").innerText
		// 获得当前时间的时间戳
		this.newtime = new Date 
		this.endTime = this.newtime.getTime()
		// console.log(this.endTime)
		// 判断前后两次的时间戳差值是否大于2min
		if(this.endTime - this.starTimeCopy < 120000){
			this.contentBox.removeChild(this.E)
		}
		else{
			alert('超过2分钟无法撤回')
		}
	}
}

new Issue()