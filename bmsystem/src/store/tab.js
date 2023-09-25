import Cookie from 'js-cookie'
export default {
	state: {
		isCollapse: false, // 控制菜单的展开与收起
		tabsList: [{
			path: '/',
			name: 'home',
			label: '首页',
			icon: 's-home',
			url: 'Home/Home'
		}, ] ,// 面包屑数据
		menu:[],
	},
	mutations: {
		// 修改菜单的展开和收齐方法
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse
		},
		// 修改和更新面包蟹数据
		//state 固定写法，获取到state对象
		selectMenu(state, val) {
			// 判断添加数据是否为首页
			if (val.name !== 'home') {
				// 返回当前数据的索引，不存在返回-1
				const index = state.tabsList.findIndex(item => item.name === val.name)
				if (index === -1) {
					//  不存在就行一个添加面包屑的操作
					state.tabsList.push(val);
				}
			}
		},
		// 删除指定的tag
		closeTag(state, item) {
			// 查找索引，并进行删除
			const index = state.tabsList.findIndex(val => val.name === item.name);
			state.tabsList.splice(index, 1);
		},
		setMenu(state,val) {
			state.menu = val
			// 将数据存入浏览器缓存中，因为动态获取的数据，刷新页面之后，就会消失
			Cookie.set('menu',JSON.stringify(val))
		}
		// 根据不同的用户获取动态路由
/*		addMenu(state,router) {
			// 判断缓存中是否又数据
			if(!Cookie.get('menu')) return;
			const  menu  = JSON.parse(Cookie.get('menu'))
			state.menu =menu;
			// 组装动态路由的数据
			const menuArray = [];
			menu.forEach(item =>{
				if(item.children) {
					item.children  = item.children.map(item=>{
						item.component = ()=> import(`../view/${item.path}`)
						return item;
					})
					menuArray.push(...item.children)
				}else {
					item.component = ()=> import(`../view/${item.path}`)
					menuArray.push(item)
				}
			})
			menuArray.forEach(item=>{
				router.addRoute('Main',item)
			})
		}*/
	}
}