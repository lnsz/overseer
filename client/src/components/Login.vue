<template>
  <div class="login-page">
    <div class="form-container">
      <div class="form" style="z-index: 1;">
        {{error}}
        <form @submit.prevent="test">
          <input
            class="field text-field"
            type="text"
            placeholder="Username"
            v-model="username"
          />
          <input
            class="field text-field"
            type="password"
            placeholder="Password"
            v-model="password"
          />
          <ActionButton @click="login" submit text="Login" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import strings from '../shared/constants/strings'
  import { UserApi } from '../api'
  import ActionButton from '@/components/ActionButton.vue'

  @Component({
    components: {
      ActionButton
    }
  })
  export default class Login extends Vue {
    // Data
    private username = ''
    private password = ''
    private error = ''

    // Methods
    private async login(): Promise<void> {
      const res = await UserApi.login({
        username: this.username,
        password: this.password
      })
      if (res.data && res.data.success) {
        this.$store.dispatch('login', this.username)
        this.$emit('login')
      } else {
        this.error = res.data.error
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .login-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: bgColor('default');
  }

  .filters{
    display: flex;
    justify-content: space-between;
    margin: 0 30px 0 30px;
  }
  .title {
    text-align: center;
    font-size: 25px;
    color: textColor('secondary');
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
    color: bgColor('secondary');
    font-weight: 500;
  }
  .field {
    margin: 5px 0 5px 0;
    padding: 10px 15px 10px 15px;
    color: textColor('default');
    background: #272727;
    border: 1px solid #272727;
    resize: none;
    border-radius: 3px;
    width: 278px;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .field:focus {
    border: 1px solid bgColor('primary');
  }
</style>
