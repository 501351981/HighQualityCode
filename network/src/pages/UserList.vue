<template>
  <div class="user-list">
      <button @click="cancelHandler">取消</button>
    <div v-for="item in userList" :key="item.id">{{item.name}}</div>
  </div>
</template>

<script>
import {getUsers, updateUser} from '../../domain/user/service';

export default {
    name: 'UserList',
    data() {
        return {
            userList: [],
            cancel: null
        };
    },
    mounted() {
        this.getUserList();
        this.editUser();
    },
    methods: {
        getUserList() {
            getUsers((c)=>{
                this.cancel = c;
            }).then(res => {
                this.userList = res.data || [];
            }).catch(e=>{

            });
        },
        editUser(){
            updateUser(1,{
                name: '王五'
            }).then(res=>{
                console.log('修改成功');
            }).catch(e=>{
                console.log(e);
            })
        },
        cancelHandler() {
            this.cancel();
        }
    }
};
</script>
