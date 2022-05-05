<template lang="html">
    <el-card class="box-card">
        <div class="search-bar">
            <el-form :inline="true" :model="searchData" class='search-form'>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input style="display: none;"></el-input>
                        <el-form-item label="指标编号">
                            <el-input v-model="searchData.indicatorCode" placeholder="指标编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="指标名称">
                            <el-input v-model="searchData.indicatorName" placeholder="指标名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="指标类型">
                            <el-input v-model="searchData.indicatorType" placeholder="指标类型"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input style="display: none;"></el-input>
                        <el-form-item label="主管部门">
                            <el-input v-model="searchData.deptName" placeholder="主管部门"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-input style="display: none;"></el-input>
                        <el-form-item label="是否发布">
                            <el-select v-model="searchData.isIssue" placeholder="请选择" style='width:177px'>
                                <el-option value=''>全部</el-option>
                                <el-option :value='1'>是</el-option>
                                <el-option :value='0'>否</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否管架指标">
                            <el-select v-model="searchData.isPipe" placeholder="请选择" style='width:150px'>
                                <el-option value=''>全部</el-option>
                                <el-option :value='1'>是</el-option>
                                <el-option :value='0'>否</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="fl">
                <el-button type="text" size='small' @click="handleReset">重置</el-button>
                <el-button type="primary" size='small' icon="el-icon-search" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div  class="tools-bar">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogVisible = true;dialogTitle='新增指标'">新增指标</el-button>
        </div>
        <div>
            <el-table
                v-loading.body="tableLoading"
                ref="singleTable"
                :data="tableData"
                border
                highlight-current-row
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="indicatorCode"
                    label="指标编号"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="indicatorName"
                    label="指标名称"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="indicatorType"
                    label="指标类型"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="startDate"
                    label="启用时间"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="generate"
                    label="生成周期"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="statisticalType"
                    min-width="200"
                    label="统计类型">
                </el-table-column>
                <el-table-column
                    prop="isCollect"
                    label="是否可汇总"
                    width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.isCollect ? '是' : '否'}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dataLayout"
                    label="数据格式"
                    width="120" />
                <el-table-column
                    prop="dataUnit"
                    label="数据单位"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="isIssue"
                    label="是否发布"
                    width="120">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isIssue" type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isGround"
                    label="是否落地"
                    width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.isIssue ? '是' : '否'}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isPipe"
                    label="是否管架指标"
                    width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.isPipe ? '是' : '否'}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isCountdown"
                    label="是否跨年"
                    width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.isCountdown ? '是' : '否'}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="linkMan"
                    label="联系人"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="联系人电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="联系人邮箱"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="deptName"
                    label="主管部门"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="isPastDue"
                    label="是否过期"
                    width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isPastDue" type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="indicatorsBelonging"
                    label="指标归属"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="170">
                    <template slot-scope="scope">
                        <div>
                            <el-button
                                type="text"
                                size="small"
                                @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                                type="text"
                                size="small"
                                style='color:#F56C6C'
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-bar">
                <el-button type='danger' size='small' :disabled='multipleSelection.length?false:true' @click='batchDelete'>批量删除</el-button>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 25, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalRecord">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                :title="dialogTitle"
                width="80%"
                :visible.sync="dialogVisible"
                @close="onDialogClose()">
                <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="指标编号" prop="indicatorCode">
                                <el-input v-model="dataForm.indicatorCode" placeholder="指标编号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="指标名称" prop="indicatorName">
                                <el-input v-model="dataForm.indicatorName" placeholder="指标名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="指标类型" prop="indicatorType">
                                <el-input v-model="dataForm.indicatorType" placeholder="指标类型"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="启用时间" prop="startDate">
                                <el-date-picker
                                    v-model="dataForm.startDate"
                                    type="date"
                                    style='width:100%'
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="生成周期" prop="generate">
                                <el-select v-model="dataForm.generate" placeholder="请选择">
                                    <el-option label='年' :value='1'/>
                                    <el-option label='月' :value='2'/>
                                    <el-option label='日' :value='3'/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="统计类型" prop="statisticalType">
                                <el-input v-model="dataForm.statisticalType" placeholder="统计类型"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否可汇总" prop="isCollect">
                                <el-select v-model="dataForm.isCollect" placeholder="请选择">
                                    <el-option label='是' :value='1'/>
                                    <el-option label='否' :value='0'/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="数据格式" prop="dataLayout">
                                <el-input v-model="dataForm.dataLayout" placeholder="数据格式"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="数据单位" prop="dataUnit">
                                <el-input v-model="dataForm.dataUnit" placeholder="数据单位"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否发布" prop="isIssue">
                                <el-select v-model="dataForm.isIssue" placeholder="请选择">
                                    <el-option label='是' :value='1'/>
                                    <el-option label='否' :value='0'/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否落地" prop="isGround">
                                <el-select v-model="dataForm.isGround" placeholder="请选择">
                                    <el-option label='是' :value='1'/>
                                    <el-option label='否' :value='0'/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否管架指标" prop="isPipe">
                                <el-select v-model="dataForm.isPipe" placeholder="请选择">
                                    <el-option label='是' :value='1'/>
                                    <el-option label='否' :value='0'/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="是否跨年" prop="isCountdown">
                                <el-select v-model="dataForm.isCountdown" placeholder="请选择">
                                    <el-option label='是' :value='1'/>
                                    <el-option label='否' :value='0'/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人" prop="linkMan">
                                <el-input v-model="dataForm.linkMan" placeholder="联系人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人电话" prop="phone">
                                <el-input v-model="dataForm.phone" placeholder="联系人电话"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人邮箱" prop="email">
                                <el-input v-model="dataForm.email" placeholder="联系人邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="主管部门" prop="deptName">
                                <el-input v-model="dataForm.deptName" placeholder="主管部门"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否过期" prop="isPastDue">
                                <el-select v-model="dataForm.isPastDue" placeholder="请选择">
                                    <el-option label='是' :value='1'/>
                                    <el-option label='否' :value='0'/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="指标归属" prop="indicatorsBelonging">
                                <el-input v-model="dataForm.indicatorsBelonging" placeholder="指标归属"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                        </el-col>
                    </el-row>
                    <el-divider content-position="left"><i class="el-icon-folder-remove"></i></el-divider>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="业务定义" prop="businessDefinition">
                                <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="dataForm.businessDefinition">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="业务口径" prop="businessScope">
                                <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="dataForm.businessScope">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="备注" prop="memo">
                                <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="dataForm.memo">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onDialogSubmit()" v-if="dialogTitle=='修改指标信息'">保存</el-button>
                    <el-button type="primary" @click="onDialogSubmit()" v-else>立即创建</el-button>
                </div>
            </el-dialog>

    </el-card>
</template>
<script>
import { getUserList } from '@/api/permission'
import axios from 'axios'
export default {
    data() {
        return {
            totalRecord: 0,
            pageSize: 10,
            tableLoading: false,
            dialogVisible: false,
            dialogTitle: '新增指标',
            rules: {
                indicatorName: [
                    {
                        required: true,
                        message: '指标名称不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '真实姓名长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                indicatorCode: [
                    {
                        required: true,
                        message: '指标编号不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '指标编号长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: '联系电话不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^(13|15|18|14|17)[0-9]{9}$/,
                        message: '联系人电话格式不正确',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur, change'
                    }
                ]
            },
            searchData: {
                indicatorCode: undefined,
                indicatorName: undefined,
                indicatorType: undefined,
                deptName: undefined,
                isPipe: undefined,
                isIssue: undefined
            },
            dataForm: {
                id: '',
                indicatorCode: '',
                indicatorName: '',
                indicatorType: '',
                deptName: '',
                linkMan: '',
                email: '',
                phone: '',
                dataLayout: '',
                generate: '',
                dataUnit: '',
                isPipe: '',
                isCollect: '',
                isIssue: '',
                isGround: '',
                isCountdown: '',
                isPastDue: '',
                indicatorsBelonging: '',
                businessDefinition: '',
                businessScope: '',
                memo: '',
                statisticalType: ''
            },
            tableData: [],
            multipleSelection: []
        }
    },
    created() {
        this.getInit()
    },
    methods: {
        async initList() {
            const data = await getUserList()
            this.tableData = data
        },
        getInit() {
            axios.get('http://localhost:3003/apiConfig', {
                params: this.searchData
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.tableData = response.data
                    }
                }, () => {
                    console.log('这里是用了vue-source,后端没有接口')
                })
        },
        statusFormat(row, column, cellValue) {
            return { '0': '停用', '1': '启用' }[cellValue] || ''
        },
        onDialogClose() {
            this.dataForm.tempRoleIds = []
            this.$refs.dataForm.resetFields()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.onSearch()
        },
        handleCurrentChange(val) {
            this.onSearch({ pageNumber: val })
        },
        handleReset() {
            this.searchData = {
                indicatorCode: undefined,
                indicatorName: undefined,
                indicatorType: undefined,
                deptName: undefined,
                isPipe: undefined,
                isIssue: undefined
            }
            this.onSearch()
        },
        onSearch({ pageNumber = 1 } = {}) {
            this.getInit()
        },
        handleChangeStatus(index, row) {},
        handleDelete(index, row) {
            this.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log('-row--', row)
                axios.delete('http://localhost:3003/apiConfig' + row.id)
                    .then((response) => {
                        this.getInit()
                    }, () => {
                        console.log('这里是用了vue-source,后端没有接口')
                    })
            })
        },
        handleEdit(index, row) {
            this.dialogVisible = true
            this.dialogTitle = '修改指标信息'
            Object.assign(this.dataForm, row)
        },
        onDialogSubmit() {
            console.log('---', this.dataForm)
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        batchDelete() {
        }
    }
}
</script>

<style lang="scss">
.fr{
    float:right;
}
.fl{
    float:left;
}
.search-bar{
    overflow: hidden;
    display:flex;
}
.search-form{
    width: 80%;
}
</style>

<style>
.tools-bar{
    margin-bottom:20px;
}
.pagination-bar{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.el-dialog{
    height: 600px;
    overflow-y: auto;
}
.dialog-footer{
    position:sticky;
    bottom:0;
}
</style>
