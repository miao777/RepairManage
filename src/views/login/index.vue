<template>
  <div class="login-container">
    <canvas id="canvas" ref="myCanvas" />
    <div class="login-form-container">
      <div class="login-form">
        <div class="login-left">
          <img src="@/images/logorepair.jpg" alt class="img">
          <p class="title">{{ $t('login.title') }}</p>
          <p>{{ $t('login.version') }}</p>
        </div>
        <div class="login-right">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">{{ $t('login.tip') }}</h3>
            </div>

            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                v-focus
                :placeholder="$t('user.username')"
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
                :placeholder="$t('user.password')"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              size="large"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >{{ $t('login.login') }}</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { initCanvas } from '@/utils/canvas'
export default {
  name: 'Login',
  directives: {
    focus: {
      inserted(el, binding) { // 元素刚插入到页面中的时候
        const element = el.getElementsByTagName('input')[0]
        element.focus() // 光标移入
      }
    }
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur,change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur,change' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
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
    this.refresh()
    this.$nextTick(() => {
      initCanvas(this.$refs.myCanvas)
    })
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then((res) => {
              if (res.success) {
                this.$router.push({ path: this.redirect || '/' })
              } else {
                this.$refs.loginForm.resetFields()
                this.$refs.loginForm.clearValidate()
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    refresh() {
      const num = sessionStorage.getItem('num')
      if (num === '1') {
        sessionStorage.setItem('num', '0')
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$font_primary_color: #283443;
$light_gray: #fff;
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
      color: $font_primary_color;
      font-size: 16px;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $font_primary_color inset !important;
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
$font_primary_color: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100%;
  width: 100%;
  position: relative;
  // background-color: $font_primary_color;
  // background-image: url('../../images/bg.png');
  overflow: hidden;
  #canvas {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .login-form-container {
    position: absolute;
    top: 25%;
    width: 100%;
  }
  .login-form {
    background-color: #eee;
    z-index: 10;
    width: 1000px;
    margin: auto;
    max-width: 100%;
    padding: 35px 20px;
    // margin: 10% auto 0;
    overflow: hidden;
  }
  .login-left {
    width: 50%;
    text-align: center;
    padding-top: 60px;
    float: left;
    img {
      width: 140px;
    }
  }
  .login-right {
    width: 50%;
    padding: 35px 15px 35px 35px;
    border-left: 1px solid #00000055;
    float: left;
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
      font-size: 26px;
      color: $font_primary_color;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
</style>
