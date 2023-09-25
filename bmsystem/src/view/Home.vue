<template>
	<el-row style="margin-top: 35px">
		<el-col :span="8">
			<el-card class="box-card">
				<div class="user">
					<img src="../assets/images/user.png" alt="">
					<div class="userinfo">
						<p class="name">Admin-LZQ</p>
						<p class="access">超级管理员</p>
					</div>
				</div>
				<div class="login-info">

					<p>上次登录时间：<span>2023年6月19日</span></p>
					<p>上次登录地点：<span>深圳</span></p>
				</div></el-card>

			<el-card style="margin-top: 20px;">
				<el-table :data="tableData" style="width: 100%;height: auto;">
					<el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" />
				</el-table>
			</el-card>

		</el-col>


		<el-col :span="16">
			<div class="num">
				<el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
					<i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
					<div class="detail">
						<p class="price">￥{{item.value}}</p>
						<p class="desc">{{item.name}}</p>
					</div>
				</el-card>
			</div>
			<!-- // 折线图 -->
			<el-card style="height: 280px;">
				<div ref="echarts1" style="height: 280px;"></div>
			</el-card>
			<div class="graph">
				<!-- 柱状图 -->
				<el-card style="height: 230px;">
					<div ref="echarts2" style="height: 260px;"></div>
				</el-card>
				<!-- 饼图 -->
				<el-card style="height: 230px">
					<div ref="echarts3" style="height: 210px;"></div>
				</el-card>
			</div>

		</el-col>
	</el-row>
</template>

<script>
	import {
		getData
	} from '../api'
	import * as echarts from 'echarts'
	import {
		Tooltip
	} from 'element-ui'

	export default {
		data() {
			return {
				tableData: [],
				tableLabel: {
					name: '课程',
					todayBuy: '今日购买',
					monthBuy: '本月购买',
					totalBuy: '总购买'
				},
				countData: [{
						name: "今日支付订单",
						value: 1234,
						icon: "success",
						color: "#2ec7c9",
					},
					{
						name: "今日收藏订单",
						value: 210,
						icon: "star-on",
						color: "#ffb980",
					},
					{
						name: "今日未支付订单",
						value: 1234,
						icon: "s-goods",
						color: "#5ab1ef",
					},
					{
						name: "本月支付订单",
						value: 1234,
						icon: "success",
						color: "#2ec7c9",
					},
					{
						name: "本月收藏订单",
						value: 210,
						icon: "star-on",
						color: "#ffb980",
					},
					{
						name: "本月未支付订单",
						value: 1234,
						icon: "s-goods",
						color: "#5ab1ef",
					},
				]
			}
		},
		mounted() {
			getData().then(({
				data
			}) => {
				console.log(data)
				const {
					tableData
				} = data.data
				this.tableData = tableData

				// echats操作的一直是data.data中的数据，先把数据从data.data中进行解构
				const {
					orderData,
					userData,
					videoData
				} = data.data
				// 折线图初始化
				const echarts1 = echarts.init(this.$refs.echarts1)
				// 指定图标的数据
				var echartsOption1 = {}
				//处理 x y 轴 xAxis
				// 返回数据枚举
				const xAxis = Object.keys(orderData.data[0])
				const xAxisData = {
					data: xAxis
				}
				// 赋值x轴的数据,底部显示什么数据
				echartsOption1.xAxis = xAxisData
				// 定义y轴数据
				echartsOption1.yAxis = {},
					// 图例，和x轴的数据是一样的，一般是要设计的，固定
					echartsOption1.legend = xAxisData;
				// x对应每一项具体的数据，需要遍历进行赋值(key,value) =>(x,y)
				echartsOption1.series = [],
					echartsOption1.tooltip = {
						// 鼠标经过显示数据
						trigger: 'axis', // 坐标轴触发，主要在柱状图、折线图使用,axis 显示全部数据，item显示单个数据
						axisPointer: {
							type: 'line' // 默认位置线，可选：‘line’ |'shadow'
						}
					},
					xAxis.forEach(key => {
						echartsOption1.series.push({
							name: key,
							// map 返回一个新的对象，通过data可以找到对应的数据
							data: orderData.data.map(item => item[key]),
							type: 'line'
						})
					})
				//使用刚指定的配置项和数据显示图表
				echarts1.setOption(echartsOption1);

				// 柱状图,初始化
				const echarts2 = echarts.init(this.$refs.echarts2)
				const echartsOptions2 = {
					legend: {
						// 图例文字颜色
						textStyle: {
							color: "#333",
						},
					},
					grid: {
						left: "20%",
					},
					// 提示框
					tooltip: {
						trigger: "axis",
					},
					xAxis: {
						type: "category", // 类目轴
						data: userData.map(item => item.date),
						axisLine: {
							lineStyle: {
								color: "#17b3a3",
							},
						},
						axisLabel: {
							interval: 0,
							color: "#333",
						},
					},
					yAxis: [{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#17b3a3",
							},
						},
					}, ],
					color: ["#2ec7c9", "#b6a2de"],
					series: [{
							name: '新增用户',
							data: userData.map(item => item.new),
							type: 'bar'
						},
						{
							name: '活跃用户',
							data: userData.map(item => item.active),
							type: 'bar'
						}
					],
				}
				echarts2.setOption(echartsOptions2)

				const echarts3 = echarts.init(this.$refs.echarts3);
				const echartsOption3 = {
					tooltip: {
						trigger: "item",
					},
					color: [
						"#0f78f4", 
						"#dd536b",
						"#9462e5",
						"#a6a6a6",
						"#e1bb22",
						"#39c362",
						"#3ed1cf",
					],
					series: [{
						data: videoData,
						type: 'pie'
					}],
				}
				echarts3.setOption(echartsOption3)
			})
		}
	}
</script>

<style lang="less" scoped>
	.user {
		padding-bottom: 20px;
		margin-bottom: 20px;
		border-bottom: 1px solid #ccc;
		display: flex;
		align-items: center;
		img {
			margin-right: 40px;
			width: 150px;
			height: 150px;
			border-radius: 50%;
		}
		.userinfo {
			.name {
				font-size: 32px;
				margin-bottom: 10px;
			}
			.access {
				color: #999999;
			}
		}
	}
	.login-info {
		p {
			line-height: 28px;
			font-size: 14px;
			color: #999999;
			span {
				color: #666666;
				margin-left: 60px;
			}
		}
	}
	.num {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		height: 265px;
		.icon {
			width: 80px;
			height: 80px;
			font-size: 30px;
			text-align: center;
			line-height: 80px;
			color: #fff;
		}
		.detail {
			margin-left: 15px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.price {
				font-size: 30px;
				margin-bottom: 10px;
				line-height: 30px;
				height: 15px;
			}
			.desc {
				font-size: 14px;
				color: #999;
				text-align: center;
			}
		}
		.el-card {
			width: 32%;
			margin-bottom: 20px;
		}
	}
	.graph {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		.el-card {
			width: 48%;
		}
	}
</style>
