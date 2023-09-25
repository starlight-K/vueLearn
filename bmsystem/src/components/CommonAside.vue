<template>
	<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
		:collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<h3>{{isCollapse?'后台':'后台管理系统'}}</h3>
		<!-- // 没有子菜单 -->
		<el-menu-item v-for="item in nochilder" :key="item.name" :index="item.name" @click="clickMenu(item)">
			<i :class="`el-icon-${item.icon}`"></i>
			<span slot="title">{{item.label}}</span>
		</el-menu-item>

		<!-- // 有子菜单 -->
		<el-submenu v-for="item in hasChilder" :key="item.label" :index="item.label">
			<template slot="title">
				<i :class="`el-icon-${item.icon}`"></i>
				<span slot="title"> {{item.label}}</span>
			</template>
			<el-menu-item-group v-for="subitem in item.children" :key="subitem.name">
				<el-menu-item :index="subitem.name" @click="clickMenu(subitem)">{{subitem.label}}</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>
<script>
	import Cookie from "js-cookie"
	export default {
		data() {
			return {
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			clickMenu(item) {
				// 当页面的路由与跳转的路由不一致，才允许跳转
				// if (this.$route !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) 
				this.$router.push(item.path);
				// 调用moutation数据
				this.$store.commit('selectMenu', item)
			}

		},
		// 计算属性，菜单栏，肯定是在页面加载的时候就进行调用数据
		computed: {
			// 没有子菜单
			nochilder() {
				return this.menuData.filter(item => !item.children)
			},
			// 有子菜单
			hasChilder() {
				return this.menuData.filter(item => item.children)
			},
			isCollapse() {
				return this.$store.state.tab.isCollapse
			},
			//数据定义在computed类里面相当于定义在了data中还可以根据不同的情况动态获取数据
			menuData() {
				// 判断当前数据，如果缓存中没有，那么取sotre中获取
				return  JSON.parse(Cookie.get('menu')) || this.$store.tab.menu
			}
		}
	}
</script>

<style lang="less">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	.el-menu {
		height: 100vh;

		h3 {
			color: #fff;
			text-align: center;
			line-height: 48px;
			font-size: 16px;
			font-weight: 400;
		}
	}

	.el-menu {
		border-right: none;
	}
</style>