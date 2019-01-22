<template>
  <div class="header">
    <div class="title">Overseer</div>
    <div class="nav-bar">
      <div class="nav-button" id="about">About</div>
      <div class="nav-button" id="pricing">Pricing</div>
      <div class="nav-button" id="sign-up">Sign Up</div>
      <div class="nav-button" id="login">Login</div>
    </div>
    <div class="mobile-nav-bar">
      <div class="hamburger" />
      <div class="hamburger" />
      <div class="hamburger" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .header {
    background: color('background');
    display: flex;
    justify-content: space-between;
    padding: 20px 3vw 20px 3vw;
    margin-bottom: 70px;
  }
  .mobile-nav-bar {
    display: none;
  }
  .nav-bar {
    display: flex;
    width: 400px;
    justify-content: space-evenly;
  }
  .nav-button {
    font-size: 18px;
    cursor: pointer;
    color: color('text');
    padding: 5px;
  }
  .nav-button:hover {
    text-decoration: underline;
  }
  #sign-up {
    border: 1px solid color('text');
    border-radius: 3px;
  }
  #sign-up:hover {
    background: color('text');
    color: color('background');
    text-decoration: none;
  }
  .title {
    font-size: 30px;
    color: color('text');
  }
  .hamburger {
    width: 20px;
    height: 3px;
    background-color: color('text');
    margin: 5px 7px;
  }

  @media only screen and (max-width: 700px){
    .nav-bar{
      display: none;
    }
    .mobile-nav-bar {
      cursor: pointer;
      border: 1px solid color('text');
      border-radius: 3px;
      display: inline;
      padding: 3px;
    }
  }
</style>
