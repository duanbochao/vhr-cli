<template>

  <div class="container">
    <div class="login" v-loading.fullscreen.lock="loading">
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item>
          <h2>系统登录</h2>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      checked: false,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {

    login () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.postRequest("/doLogin", this.form).then(resp => {
            this.loading = false
            this.$store.commit("login", resp.data.data)
            var path = this.$route.query.redirect;
            this.$router.replace({ path: path == '/' || path == undefined ? '/home' : path });
          })

        } else {
          this.$notify.error({
            title: '错误',
            message: '请填写完整信息'
          });
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: url('http://img4.imgtn.bdimg.com/it/u=3210700219,1849066843&fm=26&gp=0.jpg'); */
  background-size: cover;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.login {
  width: 350px;
  height: 350px;
  border: 1px solid #eaeaea;
  padding: 0px 30px;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 3%;
  background: white;
  /* background-color: rgba(228, 249, 252, 0.5); */
}
</style>
