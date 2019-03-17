<template>
  <div class="register-page">
    <Header />
      <div style="height: 60vh; width: 100vw; bottom: 0px; position: absolute; background-color: #616161;"/>
    <div class="form-container">
      <div class="form" style="z-index: 1;">
        Name
        <input class="field text-field" type="text" placeholder="Name" v-model="name" />
        Email
        <input class="field text-field" type="text" placeholder="Email" v-model="email" />
        Username
        <input class="field text-field" type="text" placeholder="Username" v-model="username" />
        Password
        <input class="field text-field" type="password" placeholder="Password" v-model="password" />
        <button class="button" @click="register">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'RegisterPage',
  components: {
    Header
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
 .button {
    margin-top: 15px;
    align-self: center;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
    cursor: pointer;
    padding: 10px 20px 10px 20px;
    font-size: 20px;
    border: none;
    text-decoration: none;
    border-radius: 3px;
    background-color: color('green');
    color: color('text');
  }
  .button:hover {
    transform: translateY(-1px);
    box-shadow: 3px 3px 11px rgba(0, 0, 0, 1);
    background-color: shade(color('green'), 20%);
  }
  .button:active {
    transform: translateY(1px);
    box-shadow: none;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  }
  .filters{
    display: flex;
    justify-content: space-between;
    margin: 0 30px 0 30px;
  }
  .new-dashboard-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: color('background');
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
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 30px;
    background-color: color('foreground');
    border-radius: 3px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
    color: color('background');
    font-weight: 500;
  }
  .field {
    margin: 5px 0 5px 0;
    padding: 10px;
    color: color('text');
    background: color('background');
    border: 1px solid color('background');
    resize: none;
    border-radius: 3px;
    width: 278px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }
  .field:focus {
    border: 1px solid color('green');
  }

</style>
