<template>
  <div class="register-page">
    <div class="form-container">
      <div class="form" style="z-index: 1;">
        <input class="field text-field" type="text" placeholder="Name" v-model="name" />
        <input class="field text-field" type="text" placeholder="Email" v-model="email" />
        <input class="field text-field" type="text" placeholder="Username" v-model="username" />
        <input class="field text-field" type="password" placeholder="Password" v-model="password" />
        <ActionButton @click="console.log('register')" text="Sign Up" />
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from '@/components/ActionButton'

export default {
  name: 'Register',
  components: {
    ActionButton
  },
  data () {
    return {
      email: '',
      name: '',
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .register-page {
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
