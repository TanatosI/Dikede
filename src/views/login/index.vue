<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img src="../../assets/common/logo.png" alt="" width="100px" height="100px">
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-mobile" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账户"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 验证码 ↓ -->
      <el-form-item prop="username" class="random">
        <span class="svg-container">
          <i class="el-icon-first-aid-kit" />
        </span>
        <el-input
          v-model="loginForm.verificationCode"
          placeholder="验证码"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
        <img :src="resimg" alt="" @click="verification">
      </el-form-item>
      <!-- 验证码 ↑ -->

      <el-button class="loginbut" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { loginAPI, randomAPI } from '@/api/user'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      resimg: '',
      loginForm: {
        username: 'admin',
        password: '111111',
        verificationCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      user: {
        loginName: 'admin',
        password: '111111',
        code: '1975',
        clientToken: '',
        loginType: 0
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.verification()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async verification() {
      const vfCode = Math.floor(Math.random())
      const res = await randomAPI(vfCode)
      this.resimg = res.config.url
      console.log(res)
    },
    async handleLogin() {
      try {
        const { data } = await loginAPI(this.user)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
// Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      width: 100%;
      height: 80px;
      font-size: 26px;
      margin: 0px;
      text-align: center;
      font-weight: bold;
      img {
        z-index: 1;
        position: absolute;
        left: 0;
        top: -80px;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.loginbut{
  width:100%;
  height:50px;
  margin-bottom:10px;
  border-radius: 5px;
  background-image:linear-gradient(to right, rgb(81, 92, 169),rgb(36, 64, 186));
}

.login-container .login-form[data-v-37dfd6fc] {
    position: relative;
    width: 520px;
    height: 390px;
    max-width: 100%;
    padding: 0px 35px;
    margin: 200px auto;
    // overflow: hidden; // 禁止超出隐藏 让logo 显示
    background-image:linear-gradient(to bottom, rgba(36, 177, 199),rgba(65, 96, 228));
    border-radius: 10px;
}
// input 背景色和 边框
.login-container .el-form-item {
    border: 1px solid #e2e2e2;
    background-image:linear-gradient(to right, rgb(102, 114, 201),rgba(100, 126, 241));
    border-radius: 5px;
}

.login-container .svg-container[data-v-37dfd6fc] {
    padding: 6px 5px 6px 15px;
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}

.random {
    img {
      position: absolute;
      right: 1px;
      bottom: 1px;
    }
}
</style>
