<template>
  <div class="register-page">
    <div class="form-container">
      <div class="form" style="z-index: 1;">
        {{error}}
        <input class="field text-field" type="text" placeholder="Name" v-model="name" />
        <input class="field text-field" type="text" placeholder="Email" v-model="email" />
        <input class="field text-field" type="text" placeholder="Username" v-model="username" />
        <input class="field text-field" type="password" placeholder="Password" v-model="password" />
        <ActionButton @click="register" text="Sign Up" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import ActionButton from '@/components/ActionButton.vue'
  import { UserApi } from '../api'

  @Component({
    components: {
      ActionButton
    }
  })
  export default class Register extends Vue {
    // Data
    private email = ''
    private name = ''
    private username = ''
    private password = ''
    private error = ''

    // Methods
    private async register(): Promise<void> {
      let res = await UserApi.createUser({
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      })
      if (res.data && res.data.success) {
        res = await UserApi.login({
          username: this.username,
          password: this.password
        })
        if (res.data && res.data.success) {
          this.$store.dispatch('login', this.username)
          this.$emit('login')
        } else {
          this.error = res.data.error
        }
      } else {
        if (res.data && res.data.error && res.data.error.errors) {
          const errors = res.data.error.errors
          this.error = errors[Object.keys(errors)[0]].message
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .register-page {
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
    color: bgColor('secondary');
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
    border: 1px solid bgColor('primary');
  }

</style>
