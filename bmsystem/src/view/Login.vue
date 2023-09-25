<template>
    <div class="bg">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">
                后台登录
            </h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="亲，请输入用户名" >
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="亲，请输入密码" >
                </el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    import { getMenu } from '../api'
    import Cookie from 'js-cookie'
    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:"",
                    password:"",
                },
                rules:{
                    username:[{required:true,message:"请输入用户名",trigger:"blur"},{ min: 3, max: 14, message: '长度在 3 到 14 个字符', trigger: 'blur' }
                    ],
                    password:[{required:true,message:"请输入密码",trigger:"blur"},,{ min: 3,  message: '密码长度要大于3', trigger: 'blur' }],
                    code:[{required:true,message:"请输入验证码",trigger:"blur"}],
                }
            }
        },
        methods:{
            submitLogin(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        // 输入校验后，请求后台
                        getMenu(this.loginForm).then(({data})=>{
                            console.log(data)
                            if(data.code ===20000) {
                                //登录成功,token信息存储cookie用户不同模块之间的通信
                                Cookie.set('token',data.data.token)
                                // 获取菜单的数据，出入store中
                                 this.$store.commit('setMenu',data.data.menu)
                                //动态路由的添加,通过$router 对不同用户的动态路由进行添加
                                // this.$store.commit('addMenu',this.$router)
                                // 跳转页面
                                this.$router.push('/home')
                            }else {
                                this.$message.error(data.data.message);
                            }
                        })
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: aliceblue;
        border:1px solid blueviolet;
        /*box-shadow: 0 0 25px #f885ff;*/
        opacity: 0.8;
    }
    .loginTitle{
        margin: 0px auto 48px auto;
        text-align: center;
        font-size: 40px;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .bg{
        background: url("../assets/images/bg.jpg");
        width: 100%;
        height: 100%;
        position: fixed;
        background-size: 100% 110%;
    }
</style>

