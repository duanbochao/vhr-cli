<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <span style="font-size:24px;color:white">微人事</span>
        <div class="header_right">
          <div>
            <i class="el-icon-bell" style="padding-right:20px"></i>
            <el-dropdown style="padding:0 10px">
              <span class="el-dropdown-link" style="color:white">
                {{user.name}}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item disabled>设置</el-dropdown-item>
                <el-dropdown-item divided>注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <img style="width:45px;height:45px; border-radius: 20px;" :src="user.userface">
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside" style="background-color:#ececec" width="200px">
          <template v-for="(item,index) in routes">
            <el-menu unique-opened router class="el-menu-vertical-demo" :key="index+''">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="(c,index2) in item.children" :index="c.path" :key="index2">{{c.path}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </template>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
  },
  computed: {
    user () {
      console.log(this.$store.state.user);
      return this.$store.state.user
    },
    routes () {
      return this.$store.state.routes
    }
  },
}
</script>
<style scoped>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

.header {
  background-color: #20a0ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header_right {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
