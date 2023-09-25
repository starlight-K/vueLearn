import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import user from './mockServeData/user'
import permission from './mockServeData/permission'

// 定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

// 用户列表数据
// 增
Mock.mock('/api/user/add','post',user.createUser)
// 删
Mock.mock('/api/user/del', 'post', user.deleteUser)
// 改
Mock.mock('/api/user/edit','post',user.updateUser)
// 查,因为查询会涉及到模糊查询，所以需要通过正则表达式去实现
// Mock.mock('api/user/getUser',user.getUserList)
Mock.mock(/api\/user\/getUser/,user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)