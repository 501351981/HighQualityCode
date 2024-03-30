<template>
  <div class="user-list">
      <button @click="cancelHandler">取消</button>
    <div v-for="item in userList" :key="item.id">{{item.name}}</div>
  </div>
</template>

<script>
import {getUsers} from '../../domain/user/service';

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
        cancelHandler() {
            this.cancel();
        }
    }
};
</script>
