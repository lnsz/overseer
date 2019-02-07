<template>
  <div class="fab">
    <button
      class="fab-button"
      @mouseover="setHovering(true)"
      @mouseleave="setHovering(false)"
      :class="{
        'visible': isVisible,
        'active': isActive
      }"
      @click="toggleOpen"
    >
      <font-awesome-icon
        class="icon"
        :icon="isActive ? 'times' : 'bars'"
      />
    </button>
    <button
      class="fab-option edit"
      @click="$emit('edit-dashboard')"
      @mouseover="setHovering(true)"
      @mouseleave="setHovering(false)"
      :class="{
        'visible': isVisible,
        'active': isActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="edit"
      />
    </button>
    <button
      class="fab-option new"
      @click="$emit('create-tile')"
      @mouseover="setHovering(true)"
      @mouseleave="setHovering(false)"
      :class="{
        'visible': isVisible,
        'active': isActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="plus"
      />
    </button>
    <button
      class="fab-option copy"
      @mouseover="setHovering(true)"
      @mouseleave="setHovering(false)"
      :class="{
        'visible': isVisible,
        'active': isActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="copy"
      />
    </button>
    <button
      class="fab-option star"
      @mouseover="setHovering(true)"
      @mouseleave="setHovering(false)"
      :class="{
        'visible': isVisible,
        'active': isActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="star"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Fab',
  props: {
    isCursorVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false,
      isHovering: false
    }
  },
  methods: {
    setHovering (value) {
      this.isHovering = value
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
    }
  },
  computed: {
    isVisible () {
      return this.isCursorVisible || this.isHovering
    },
    isActive () {
      return this.isVisible && this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .fab {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  .icon {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }
  .fab-button {
    width: 70px;
    height: 70px;
    bottom: -100px;
    right: 50px;
    z-index: 2;
    transition: all 0.5s ease;
    position: absolute;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 25px;
    border: none;
    text-decoration: none;
    border-radius: 100%;
    background-color: color('green');
    color: color('text');
  }
  .fab-button.visible {
    transform: translateY(-150px);
  }
  .fab-button.active {
    width: 50px;
    height: 50px;
    transform: translate(-10px, -160px);
    background-color: color('foreground');
  }
  .fab-button.visible:hover {
    transform: translateY(-151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: shade(color('green'), 20%);
  }
  .fab-button.active:hover {
    transform: translate(-10px, -161px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-button.visible:active {
    transform: translateY(-149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: shade(color('green'), 20%);
  }
  .fab-button.active:active {
    transform: translate(-10px, -159px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option {
    width: 70px;
    height: 70px;
    position: absolute;
    bottom: -100px;
    right: 50px;
    visibility: hidden;
    z-index: 1;
    transition: all 0.2s ease;
    position: absolute;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 25px;
    border: none;
    text-decoration: none;
    border-radius: 100%;
    background-color: color('foreground');
    color: color('text');
  }
  .fab-option.visible {
    transform: translateY(-150px);
  }
  .fab-option.active {
    visibility: visible;
  }
  .fab-option.edit.active:hover {
    transform: translate(-100px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.new.active:hover {
    transform: translate(-200px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.copy.active:hover {
    transform: translate(-300px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.star.active:hover {
    transform: translate(-400px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.edit.active:active {
    transform: translate(-100px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.new.active:active {
    transform: translate(-200px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.copy.active:active {
    transform: translate(-300px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.star.active:active {
    transform: translate(-400px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: color('yellow');
  }
  .fab-option.edit.active {
    transform: translate(-100px, -150px);
  }
  .fab-option.new.active {
    transform: translate(-200px, -150px);
  }
  .fab-option.copy.active {
    transform: translate(-300px, -150px);
  }
  .fab-option.star.active {
    transform: translate(-400px, -150px);
  }

</style>
