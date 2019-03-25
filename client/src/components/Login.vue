<template>
  <div class="login-page">
    <div class="form-container">
      <div class="form" style="z-index: 1;">
        {{error}}
        <input class="field text-field" type="text" placeholder="Username" v-model="username" />
        <input class="field text-field" type="password" placeholder="Password" v-model="password" />
        <ActionButton @click="login" text="Login" />
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

import ActionButton from '@/components/ActionButton'

export default {
  name: 'Login',
  components: {
    ActionButton
  },
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login () {
      let res = await UserService.login({
        username: this.username,
        password: this.password
      })
      if (res.data && res.data.success) {
        this.$emit('login')
      } else {
        this.error = res.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .login-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: color('background');
  }

  .filters{
    display: flex;
    justify-content: space-between;
    margin: 0 30px 0 30px;
  }
  .title {
    text-align: center;
    font-size: 25px;
    color: color('text');
    font-weight: 300;
    margin-bottom: 30px;
  }
  .form-container {
    display: flex;
    justify-content: center;
  }
  .form {
    cursor: auto;
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 30px;
    border-radius: 3px;
    color: color('foreground');
    font-weight: 500;
  }
  .field {
    margin: 5px 0 5px 0;
    padding: 10px 15px 10px 15px;
    color: color('text');
    background: #272727;
    border: 1px solid #272727;
    resize: none;
    border-radius: 3px;
    width: 278px;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .field:focus {
    border: 1px solid color('green');
  }

</style>
