<template>
    <div>
        <search-form :gutter="20" :fields="fields" @search="searchHandler" />
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import SearchForm from "../../base/components/search-form";
export default {
    name: 'UserList',
    components:{
        SearchForm
    },
    data() {
        return {
            userListSource: [{
                name: '王小虎',
                sex: '男',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                name: '李冰冰',
                sex: '女',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                name: '赵德华',
                sex: '男',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                name: '刘娜',
                sex: '女',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            fields: [
                {
                    key: 'name',
                    label: '姓名',
                    component: 'input',
                    componentProps: {
                        placeholder: '输入姓名模糊查询'
                    }
                },
                {
                    key: 'sex',
                    label: '性别',
                    component: 'select',
                    componentProps: {
                        placeholder: '按性别查询',
                        options: [
                            {label: '男', value: '男'},
                            {label: '女', value: '女'},
                        ]
                    }
                }
            ],
            searchKeywords: {}
        };
    },
    computed:{
        tableData(){
            const {name, sex} = this.searchKeywords;
            if(!name && !sex){
                return this.userListSource;
            }
            let data = this.userListSource;
            if(name){
                data = data.filter(item => item.name.includes(name));
            }
            if(sex){
                data = data.filter(item => item.sex === sex);
            }
          return data;
      }
    },
    mounted() {

    },
    methods: {
        searchHandler(formData){
            this.searchKeywords = formData;
        }
    }
};
</script>
