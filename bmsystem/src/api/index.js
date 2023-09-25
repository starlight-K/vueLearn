import http from '../utils/request'

// 请求首页数据
export const getData=()=>{
    // 返回promise对象
    return http.get('/home/getData')
}

export const addUser=(data)=>{
    return http.post('/user/add',data)
}

export const delUser = (data) => {
    return http.post('/user/del', data)
}

export const editUser=(data)=>{
    return http.post('/user/edit',data)
}
// 查找,查找一般是get方法
export const getUser=(params)=>{
    return http.get('/user/getUser',params)
}

// 登录拦截
export const getMenu=(params)=>{
    return http.post('/permission/getMenu',params)
}
