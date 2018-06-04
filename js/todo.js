(function(w){
	var addTodo = function(content){
		var newTodo = {content:content,isTodo:'false'}
		todo.listimg.push(newTodo)
		localStorage.todoListimg =  JSON.stringify(todo.listimg)
		todo.show()
		
	}
	var initTodo = function(selector){
		if(localStorage.todoListimg){
			todo.listimg = JSON.parse(localStorage.todoListimg)
		}
		if(localStorage.todoListed){
			todo.listed = JSON.parse(localStorage.todoListed)
		}
		console.log(todo.listimg)
		console.log(todo.listed)
		var todoInput = document.querySelector(selector)
		console.log(selector)
		console.log(todoInput)
		todoInput.onkeydown = function(e){
			if(e.key=='Enter'){
				addTodo(this.value)//当按下回车之后，调用addTodo方法把内容添加进去
				
			}
		}
		
		todo.show()
	}
	var  showTodo = function(){
//		console.log(todo.listimg)
//		console.log(todo.listed)
		//未完成列表
		var todoImg = document.querySelector('body > div.content > div.todoing')
//		console.log(todoImg)
		todoImg.innerHTML = ''
		for(var i=0;i<todo.listimg.length;i++){
			
			var newDiv = document.createElement('div')
			newDiv.dataset.index = i
			var checkBox = document.createElement('input')
			checkBox.dataset.index = i
			checkBox.type = 'checkbox'
			checkBox.onchange = function(e){
				console.log(e)
				todo.change(e)
				
			}
			
			var newP = document.createElement('input')
			newP.value = todo.listimg[i].content
			newP.dataset.index = i
			newP.onkeydown = function(e){
				var state = false
				if(e.key == 'Enter'){
					todo.edit(e,state)
				}
			}
			var newimg = document.createElement('img')
			newimg.src = 'img/gg.png'
			
			newDiv.appendChild(checkBox)
			newDiv.appendChild(newP)
			newDiv.appendChild(newimg)
			todoImg.appendChild(newDiv)
			
			
		}
		
		//已完成列表的显示
		var todoed = document.querySelector('.todoed')
		todoed.innerHTML = ''
		for(var i=0;i<todo.listed.length;i++){
			var newDiv = document.createElement('div')
			newDiv.dataset.index = i
			var checkBox = document.createElement('input')
			checkBox.dataset.index = i
			checkBox.type = 'checkbox'
			checkBox.checked = true
			checkBox.onchange = function(e){
//							console.log(e)
				todo.change(e)
			}
			
			var newP = document.createElement('input')
			newP.value = todo.listed[i].content
			newP.dataset.index = i
			newP.onkeydown = function(e){
				var state = true
				if(e.key == 'Enter'){
					todo.edit(e,state)
				}
			}
			var newimg = document.createElement('img')
			newimg.src = 'img/gg.png'
		
			newDiv.appendChild(checkBox)
			newDiv.appendChild(newP)
			newDiv.appendChild(newimg)
			todoed.appendChild(newDiv)
			
		}
		var doingCount =document.querySelector('body > div.content > div.doing> div')
		var downCount =document.querySelector('body > div.content > div.down> div')
		console.log(doingCount)
		doingCount.innerHTML = `${todo.listimg.length}`
		downCount.innerHTML = `${todo.listed.length}`
	
	}
	
	var changeTodo = function(e){
//					console.log(e)
		var index = e.target.dataset.index
		console.log(index)
		if(e.target.checked){
			var item =  todo.listimg.splice(index,1)
			item[0].isTodo = 'true'
			todo.listed.push(item[0])
		}else{
			var item =  todo.listed.splice(index,1)
			item[0].isTodo = 'false'
			todo.listimg.push(item[0])
		}
		
		
		
		localStorage.todoListimg = JSON.stringify(todo.listimg)
		localStorage.todoListed = JSON.stringify(todo.listed)
		todo.show()
	}
	var editTodo = function(e,s){
		console.log(s)
		var index = e.target.dataset.index
//		console.log(index)
		if(e.target.value == ''){
			if(s){
				todo.listed.splice(index,1)
			}else{
				todo.listimg.splice(index,1)
			}
		}else{
			if(s){
				todo.listed[index].content = e.target.value
			}else{
				todo.listimg[index].content = e.target.value
			}
		}
		
		console.log(todo.listed)
		console.log(todo.listimg)
		localStorage.todoListimg = JSON.stringify(todo.listimg)
		localStorage.todoListed = JSON.stringify(todo.listed)
		todo.show()
	}
	
	w.todo = {
		init:initTodo,
		add:addTodo,
		edit:editTodo,
		listimg:[],
		listed:[],
		show:showTodo,
		change:changeTodo
	}
	
	
	
	
	
	
	
})(window)

todo.init('#todoInput')

