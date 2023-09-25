<template>
    <div class="manage" style="margin-top: 50px">

<!--        新增按钮-->
        <el-button @click="addBtn" type="primary" style="margin-left: 20px">新增+</el-button>
<!--        查询-->
        <el-form :inline="true" :model="userForm" style="margin-top: -40px; margin-left: 800px">
            <el-form-item>
                <el-input  placeholder="请输入姓名" v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchName">查询</el-button>
            </el-form-item>
        </el-form>

        <!--        新增用户表单-->
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                            v-model="form.birth"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
        <!--        表格-->
        <el-table :data="tableData" width="auto">

            <el-table-column
                    prop="name"
                    label="姓名"
                   >
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                   >
                <template slot-scope="scope">
                    <!--					要具体到哪儿个字段才能进行比较-->
                    <span>{{scope.row.sex===1?'男':'女'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    >
            </el-table-column>
            <el-table-column
                    prop="birth"
                    label="出生日期"
                    >
            </el-table-column>
            <el-table-column
                    prop="addr"
                    label="地址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" size="mini">修改</el-button>
                    <el-button @click="handleDel(scope.row.id)" size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--    分页    jumper:直接跳转-->
        <el-pagination
                @current-change="handlePage"
                layout="prev, pager, next, jumper"
                :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
    import {addUser, delUser, editUser, getUser} from '../api'

    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    age: '',
                    sex: '',
                    birth: '',
                    addr: ''
                },
                modelType: 0, // 复用表单，0 表示新增，1表示编辑
                tableData: [],
                total: 0,
                pageData: {
                    page: 1,
                    limit: 8
                },
                userForm: {
                    name: ''
                },
                rules: {
                    name: [
                        {required: true, message: "名字不能为空"},
                        {min: 2, max: 10, message: "长度必须在2-10为之间"}
                    ],
                    age: [
                        {required: true, message: "年龄不能为空"},
                    ],
                    birth: [
                        {required: true, message: "出生日期不能为空"},
                    ],
                    addr: [
                        {required: true, message: "地址不能为空"},
                    ],
                    sex: [
                        {required: true, message: "性别不能为空"},
                    ]
                }
            }
        },
        methods: {
            // 搜索、查找
            getList() {
                //	获取数据列表 ...this.userForm 查询需要传的参数，...pageData分页需要传的参数,都是以键值对的形式进行传递
                getUser({params: {...this.userForm, ...this.pageData}}).then(({data}) => {
                    console.log(data)
                    this.tableData = data.list
                    // 赋值总条数，如果没有就为0，防止报错
                    this.total = data.count || 0
                })

            },
            // 修改页码，上下页跳转，指定页面跳转
            handlePage(val) {
                this.pageData.page = val;
                this.getList();

            },
            // 点击新增与编辑新增用户
            addBtn() {
                this.dialogFormVisible = true;
                this.modelType = 0;
            },
            // 添加与编辑
            add() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 表示编辑
                        if (this.modelType === 0) {
                            // 新增，直接将form表单的数据添加即可
                            addUser(this.form).then(() => {
                                this.getList();
                                this.$message({
                                    type: 'success',
                                    message: '新增成功!'
                                });
                            })
                        } else {
                            //    不是0那么就是编辑，这里只有两种情况，调用的是edit后端接口
                            editUser(this.form).then(() => {
                                this.getList();
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            })
                        }
                        //关闭并清空表单
                        this.resetTable();
                    }
                })
            },
            // 删除
            handleDel(item) {
                //拿的到id
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delUser({id: item}).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 修改
            handleEdit(item) {
                // 如何进行回显？
                this.modelType =1;
                this.dialogFormVisible = true;
                // 拿到当前用户信息，进行深拷贝，否则报错
                this.form =　JSON.parse(JSON.stringify(item))

            },
            // 按照姓名进行查找
            searchName() {
                this.getList()
            },
            // 取消清除表单
            cancel() {
                this.resetTable()
            },
            // 清空表单数据,并关闭 tag弹窗
            resetTable() {
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
            }
        },
        // 通过mounted进行数据展示
        mounted() {
            this.getList();
        }
    }
</script>

<style lang="less" scoped>
    .manage {
        /*height: 90%;*/

        .manage-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .common-tabel {
            position: relative;
            height: calc(100% - 62px);

            .pager {
                position: absolute;
                bottom: 0;
                right: 20px;
            }
        }
    }

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>