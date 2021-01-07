<template>
<body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">StreetView Login</h3>
    <el-form-item>
      <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        prefix-icon="el-icon-key"
        v-model="loginForm.password"
        placeholder="请输入密码"
        show-password
        @keyup.enter.native="login"
      ></el-input>
    </el-form-item>
    <el-alert
      :title="alertTitle"
      :closable="false"
      type="error"
      v-show="responseResult"
    >{{failReason}}</el-alert>
    <el-form-item style="width: 100%">
      <el-button
        type="primary"
        style="width: 48%;background: #505458;border: none"
        @click="login"
      >登录</el-button>
      <el-button
        type="primary"
        style="width: 48%;background: #505458;border: none"
        @click="register"
      >注册</el-button>
    </el-form-item>
  </el-form>
</body>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      responseResult: false,
      failReason: "",
      alertTitle: ""
    };
  },
  methods: {
    login() {
      this.$axios
        .post("https://localhost:5001/api/login/login", this.loginForm)
        .then(successResponse => {
          let loginRes = successResponse.data;
          if (loginRes.success) {
            this.$store.commit("setUserInfo", loginRes.userInfo);
            this.$store.commit("setTaskInfo", {taskID:loginRes.defaultTaskID,taskType:loginRes.taskType});
            this.$router.replace({
              path: "/streetView"
            });
          } else {
            this.failReason = "else" + loginRes.reason;
            this.responseResult = true;
            this.alertTitle = "登录失败";
          }
        })
        .catch(e => {
          this.failReason = "catch" + e.message;
          this.responseResult = true;
          this.alertTitle = "登录失败";
        });
    },
    register() {
      this.$axios
        .post("https://localhost:5001/api/login/register", this.loginForm)
        .then(successResponse => {
          let loginRes = successResponse.data;
          if (loginRes.success) {
			this.alertTitle = "注册成功";
			this.failReason = this.loginForm.username+"注册成功";
            this.responseResult = true;
          } else {
            this.alertTitle = "注册失败";
            this.failReason = "else" + loginRes.reason;
            this.responseResult = true;
          }
        })
        .catch(e => {
          this.alertTitle = "注册失败";
          this.failReason = "catch" + e.message;
          this.responseResult = true;
        });
    }
  }
};
</script>

<style>
#poster {
  background: url("../assets/logo.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 250px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 20px auto;
  text-align: center;
  color: #505458;
}
</style>
