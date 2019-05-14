<template>
  <div class="nav-bar">
    <FontAwesomeIcon
      class="menu-button"
      :class="{ 'open': isMobileMenuOpen }"
      :icon="isMobileMenuOpen ? 'times' : 'bars'"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
    />
    <div
      class="nav-buttons"
      :class="{ 'open': isMobileMenuOpen }"
    >
      <NavButton
        v-for="(navLink) in navLinks"
        :key="navLink.name"
        :name="navLink.name"
        :page="navLink.page"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import NavButton from '@/components/NavButton.vue'
  import { NavLink } from '../types'

  @Component({
    components: {
      NavButton
    },
  })
  export default class NavBar extends Vue {
    @Prop({ default: [] })
    private navLinks: NavLink[]

    // Data
    private isMobileMenuOpen = false
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions.scss";

  .nav-bar {
    display: flex;
    align-items: center;
    .nav-buttons {
      display: flex;
    }
    .menu-button {
      font-size: fontsize('title');
      color: textColor('default');
      min-width: 26px;
      min-height: 26px;
      padding: 10px;
      border-radius: values('border-radius');
      display: none;
      cursor: pointer;
      &:hover {
        background: bgColor('reverse');
        color: textColor('reverse');
      }
    }
  }

  // Mobile view
  @media only screen and (max-width: breakpoints('mobile')) {
    .nav-bar {
      align-items: end;
      flex-direction: column;
      .nav-buttons {
        display: none;
        &.open {
          display: flex;
          flex-direction: column;
        }
      }
      .menu-button {
        display: inline;
        align-self: flex-end;
      }
    }
  }
</style>
