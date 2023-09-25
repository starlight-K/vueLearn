<template>
	<div>
		<el-container>
		  <el-aside width="auto">
			  <CommonAside/>
		  </el-aside>
		  <el-container>
		    <el-header>
				<CommonHead/>
			</el-header>
			  <CommonTag/>

			  <el-main>
				<!-- // 路由出口，路由匹配到的组件将会在这里渲染 -->
				<router-view></router-view>
			</el-main>
		  </el-container>
		</el-container>

	</div>
</template>

<script>
	import CommonAside from '../components/CommonAside'
	import CommonHead from '../components/CommonHead'
	import CommonTag from '../components/CommonTag'
	export default{
		data() {
			return {
				
			}
		},
		components:{
			CommonAside,
			CommonHead,
			CommonTag
		}
	}
</script>


<style scoped>
    .el-header {
        padding: 0;
    }
	.el-main {
		margin-top: -20px;
	}
	.CommonTag {
		margin-top: 10px;
		margin-bottom:-20px;
		z-index: 999;
	}
</style>