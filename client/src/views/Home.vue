<template>
  <div class="container">
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
    <div class="content">
      <div class="slideshow">
        <div class="img" />
        <div class="text">
          <b> Title </b>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </div>
      </div>
      <div class="view-dashboard">
        <router-link v-bind:to="{ name: 'DashboardList' }" tag="button" class="view-dashboard-button">
          View Dashboards
        </router-link>
      </div>
      <div class="extra" />
    </div>
  </div>
</template>

<style lang="scss" >
  $background-color: #333333;
  $text-color: #F2ECFF;
  $button-color: #42b983;
  $button-hover-color: #00C896;

  h1 {
    font-weight: normal;
  }
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: $background-color;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px 3vw 20px 3vw;
    margin-bottom: 70px;
  }
  .slideshow {
    display: flex;
    justify-content: center;
  }
  .img {
    width: 600px;
    height: 400px;
    background: #616161;
  }
  .text {
    padding-left: 30px;
    width: 200px;
    color: $text-color;
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
    color: $text-color;
    padding: 5px;
  }
  .nav-button:hover {
    text-decoration: underline;
  }
  #sign-up {
    border: 1px solid $text-color;
    border-radius: 3px;
  }
  #sign-up:hover {
    background: $text-color;
    color: $background-color;
    text-decoration: none;
  }
  .title {
    font-size: 30px;
    color: $text-color;
  }
  .view-dashboard {
    display: flex;
    justify-content: center;
    padding: 50px;
  }
  .view-dashboard-button {
    cursor: pointer;
    padding: 15px;
    font-size: 20px;
    border: none;
    text-decoration: none;
    border-radius: 3px;
    background-color: $button-color;
    color: $text-color;
  }
  .view-dashboard-button:hover {
    background-color: $button-hover-color;
  }
  .extra {
    height: 500px;
    background: #616161;
  }
  .hamburger {
    width: 20px;
    height: 3px;
    background-color: $text-color;
    margin: 5px 7px;
  }

  @media only screen and (max-width: 700px){
    .nav-bar{
      display: none;
    }
    .mobile-nav-bar {
      cursor: pointer;
      border: 1px solid $text-color;
      border-radius: 3px;
      display: inline;
      padding: 3px;
    }
  }
</style>
