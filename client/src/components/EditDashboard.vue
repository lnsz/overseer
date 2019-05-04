<template>
  <div @scroll="updateCurrentSection" class="edit-dashboard">
    <div class="top-bar">
      <div
        class="title"
        @input="updateName"
        contenteditable
      >
        {{dashboard.name}}
      </div>
      <div class="settings-button">
        <font-awesome-icon
          class="icon"
          icon="cog"
        />
      </div>
    </div>
    <div class="edit-menu" id='edit-menu'>
      <div class="edit-menu-nav">
        <div
          v-for="(section, index) in sections"
          :key="index"
          @click="scrollToSection(section.id)"
          :class="{ 'current': index == currentSection }"
          class="edit-menu-nav-button"
        >
          {{section.name}}
        </div>
      </div>
      <div class="edit-menu-content" id="edit-menu-content">
        <div
          v-for="(section, index) in sections"
          :key="index"
          :id="section.id"
          :ref="section.id"
          :class="{ 'current': currentSection == index }"
          class="section"
        >
          {{section.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'

export default {
  name: 'EditDashboard',
  props: {
    dashboard: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: '',
      url: '',
      description: '',
      backgroundColor: '',
      textColor: '',
      tileColor: '',
      primaryColor: '',
      secondaryColor: '',
      refreshTimer: 30000,
      rows: 3,
      columns: 3,
      marginX: 0,
      marginY: 0,
      verticalCompact: false,
      tileBorderRadius: 3,
      currentSection: 0,
      sections: [
        {
          id: 'section1',
          name: 'section 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum ex vel dui tristique, sit amet laoreet ante viverra. Duis eleifend augue id nisl imperdiet, vitae interdum mauris semper. Nunc congue tincidunt mauris ac ultricies. Pellentesque sagittis efficitur magna, in faucibus diam scelerisque a. Etiam id felis lobortis nibh gravida dapibus interdum eu ipsum. Sed iaculis lacinia arcu, ac pharetra velit. Praesent ac dignissim nunc. Maecenas iaculis felis eget congue dictum. Aliquam mattis eros vel tellus feugiat, sit amet luctus neque pharetra. Ut ultrices bibendum porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus nec ligula non odio suscipit blandit vel eu mi. Nulla feugiat lectus at elit varius pellentesque. Praesent aliquam risus diam, eget tristique enim feugiat in. Duis vulputate sit amet elit et gravida. Mauris vel est ac lacus porta pellentesque. Duis et mi id lacus luctus molestie eu et magna. Aenean turpis augue, dapibus ac neque vel, facilisis sagittis velit. Aliquam turpis ligula, dapibus mollis condimentum vitae, fringilla vitae nisi. Vivamus eget enim tortor. Nulla rutrum orci eu neque rhoncus commodo. Maecenas sem risus, imperdiet sed massa id, ornare vulputate quam. Cras massa orci, ornare nec sapien eget, imperdiet tempor eros. Pellentesque tempus velit sed metus maximus pretium. Sed elementum cursus orci sit amet aliquet. Nulla porttitor lobortis lacinia. Duis velit purus, fringilla sed ullamcorper eu, finibus vitae nunc. Sed purus nunc, gravida id rhoncus id, dapibus viverra urna. Nulla neque lorem, pellentesque at ultrices vel, suscipit sit amet nisl. Integer imperdiet congue erat imperdiet rhoncus. Vestibulum eu bibendum dolor, id bibendum risus. Ut a urna et orci lacinia faucibus. Nam placerat ornare lorem, a auctor erat rutrum sit amet. Donec sed nisl placerat, blandit magna eget, commodo nulla. Curabitur sodales quis mauris sed gravida. Nunc eu imperdiet urna. Ut sit amet libero eget metus vestibulum eleifend. Donec eros purus, fringilla fermentum nulla scelerisque, mattis venenatis felis. Quisque interdum in velit sed cursus. Maecenas vel justo euismod, feugiat augue vel, porttitor magna. Nullam eu mattis sapien. Phasellus vitae blandit velit. Maecenas ornare pulvinar ultricies. Sed sed neque lacus. Curabitur at mattis nunc. Proin molestie tortor sed commodo viverra. Ut ac tortor sagittis eros condimentum consectetur. Morbi suscipit, mauris non facilisis lobortis, ipsum turpis hendrerit enim, sed ornare lorem nunc nec massa. Ut id interdum magna. Praesent euismod neque odio, vel lacinia enim luctus eget. Aliquam non semper leo. Duis aliquet, ipsum at suscipit condimentum, neque ligula venenatis nulla, quis lacinia ligula nulla sit amet justo. Suspendisse potenti. Fusce urna arcu, malesuada ac rutrum a, hendrerit id libero. Quisque eu aliquam tortor. Proin lacinia felis mi, eu elementum ipsum mollis id. Fusce aliquet finibus arcu, at interdum purus consequat in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus ante, hendrerit et commodo at, ornare vel massa. Mauris ornare eget dui ac semper. Quisque sit amet sagittis lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed nisl dui, tincidunt sed sagittis non, tincidunt sed tellus.'
        },
        {
          id: 'section2',
          name: 'section 2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum ex vel dui tristique, sit amet laoreet ante viverra. Duis eleifend augue id nisl imperdiet, vitae interdum mauris semper. Nunc congue tincidunt mauris ac ultricies. Pellentesque sagittis efficitur magna, in faucibus diam scelerisque a. Etiam id felis lobortis nibh gravida dapibus interdum eu ipsum. Sed iaculis lacinia arcu, ac pharetra velit. Praesent ac dignissim nunc. Maecenas iaculis felis eget congue dictum. Aliquam mattis eros vel tellus feugiat, sit amet luctus neque pharetra. Ut ultrices bibendum porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus nec ligula non odio suscipit blandit vel eu mi. Nulla feugiat lectus at elit varius pellentesque. Praesent aliquam risus diam, eget tristique enim feugiat in. Duis vulputate sit amet elit et gravida. Mauris vel est ac lacus porta pellentesque. Duis et mi id lacus luctus molestie eu et magna. Aenean turpis augue, dapibus ac neque vel, facilisis sagittis velit. Aliquam turpis ligula, dapibus mollis condimentum vitae, fringilla vitae nisi. Vivamus eget enim tortor. Nulla rutrum orci eu neque rhoncus commodo. Maecenas sem risus, imperdiet sed massa id, ornare vulputate quam. Cras massa orci, ornare nec sapien eget, imperdiet tempor eros. Pellentesque tempus velit sed metus maximus pretium. Sed elementum cursus orci sit amet aliquet. Nulla porttitor lobortis lacinia. Duis velit purus, fringilla sed ullamcorper eu, finibus vitae nunc. Sed purus nunc, gravida id rhoncus id, dapibus viverra urna. Nulla neque lorem, pellentesque at ultrices vel, suscipit sit amet nisl. Integer imperdiet congue erat imperdiet rhoncus. Vestibulum eu bibendum dolor, id bibendum risus. Ut a urna et orci lacinia faucibus. Nam placerat ornare lorem, a auctor erat rutrum sit amet. Donec sed nisl placerat, blandit magna eget, commodo nulla. Curabitur sodales quis mauris sed gravida. Nunc eu imperdiet urna. Ut sit amet libero eget metus vestibulum eleifend. Donec eros purus, fringilla fermentum nulla scelerisque, mattis venenatis felis. Quisque interdum in velit sed cursus. Maecenas vel justo euismod, feugiat augue vel, porttitor magna. Nullam eu mattis sapien. Phasellus vitae blandit velit. Maecenas ornare pulvinar ultricies. Sed sed neque lacus. Curabitur at mattis nunc. Proin molestie tortor sed commodo viverra. Ut ac tortor sagittis eros condimentum consectetur. Morbi suscipit, mauris non facilisis lobortis, ipsum turpis hendrerit enim, sed ornare lorem nunc nec massa. Ut id interdum magna. Praesent euismod neque odio, vel lacinia enim luctus eget. Aliquam non semper leo. Duis aliquet, ipsum at suscipit condimentum, neque ligula venenatis nulla, quis lacinia ligula nulla sit amet justo. Suspendisse potenti. Fusce urna arcu, malesuada ac rutrum a, hendrerit id libero. Quisque eu aliquam tortor. Proin lacinia felis mi, eu elementum ipsum mollis id. Fusce aliquet finibus arcu, at interdum purus consequat in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus ante, hendrerit et commodo at, ornare vel massa. Mauris ornare eget dui ac semper. Quisque sit amet sagittis lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed nisl dui, tincidunt sed sagittis non, tincidunt sed tellus.'
        },
        {
          id: 'section3',
          name: 'section 3',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum ex vel dui tristique, sit amet laoreet ante viverra. Duis eleifend augue id nisl imperdiet, vitae interdum mauris semper. Nunc congue tincidunt mauris ac ultricies. Pellentesque sagittis efficitur magna, in faucibus diam scelerisque a. Etiam id felis lobortis nibh gravida dapibus interdum eu ipsum. Sed iaculis lacinia arcu, ac pharetra velit. Praesent ac dignissim nunc. Maecenas iaculis felis eget congue dictum. Aliquam mattis eros vel tellus feugiat, sit amet luctus neque pharetra. Ut ultrices bibendum porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus nec ligula non odio suscipit blandit vel eu mi. Nulla feugiat lectus at elit varius pellentesque. Praesent aliquam risus diam, eget tristique enim feugiat in. Duis vulputate sit amet elit et gravida. Mauris vel est ac lacus porta pellentesque. Duis et mi id lacus luctus molestie eu et magna. Aenean turpis augue, dapibus ac neque vel, facilisis sagittis velit. Aliquam turpis ligula, dapibus mollis condimentum vitae, fringilla vitae nisi. Vivamus eget enim tortor. Nulla rutrum orci eu neque rhoncus commodo. Maecenas sem risus, imperdiet sed massa id, ornare vulputate quam. Cras massa orci, ornare nec sapien eget, imperdiet tempor eros. Pellentesque tempus velit sed metus maximus pretium. Sed elementum cursus orci sit amet aliquet. Nulla porttitor lobortis lacinia. Duis velit purus, fringilla sed ullamcorper eu, finibus vitae nunc. Sed purus nunc, gravida id rhoncus id, dapibus viverra urna. Nulla neque lorem, pellentesque at ultrices vel, suscipit sit amet nisl. Integer imperdiet congue erat imperdiet rhoncus. Vestibulum eu bibendum dolor, id bibendum risus. Ut a urna et orci lacinia faucibus. Nam placerat ornare lorem, a auctor erat rutrum sit amet. Donec sed nisl placerat, blandit magna eget, commodo nulla. Curabitur sodales quis mauris sed gravida. Nunc eu imperdiet urna. Ut sit amet libero eget metus vestibulum eleifend. Donec eros purus, fringilla fermentum nulla scelerisque, mattis venenatis felis. Quisque interdum in velit sed cursus. Maecenas vel justo euismod, feugiat augue vel, porttitor magna. Nullam eu mattis sapien. Phasellus vitae blandit velit. Maecenas ornare pulvinar ultricies. Sed sed neque lacus. Curabitur at mattis nunc. Proin molestie tortor sed commodo viverra. Ut ac tortor sagittis eros condimentum consectetur. Morbi suscipit, mauris non facilisis lobortis, ipsum turpis hendrerit enim, sed ornare lorem nunc nec massa. Ut id interdum magna. Praesent euismod neque odio, vel lacinia enim luctus eget. Aliquam non semper leo. Duis aliquet, ipsum at suscipit condimentum, neque ligula venenatis nulla, quis lacinia ligula nulla sit amet justo. Suspendisse potenti. Fusce urna arcu, malesuada ac rutrum a, hendrerit id libero. Quisque eu aliquam tortor. Proin lacinia felis mi, eu elementum ipsum mollis id. Fusce aliquet finibus arcu, at interdum purus consequat in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus ante, hendrerit et commodo at, ornare vel massa. Mauris ornare eget dui ac semper. Quisque sit amet sagittis lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed nisl dui, tincidunt sed sagittis non, tincidunt sed tellus.'
        }
      ]

    }
  },
  mounted () {
    this.name = this.dashboard.name
    this.url = this.dashboard.url
    this.description = this.dashboard.description
    this.refreshTimer = this.dashboard.refreshTimer
    if (this.dashboard.style) {
      if (this.dashboard.style.color) {
        this.backgroundColor = this.dashboard.style.color.backgroundColor
        this.textColor = this.dashboard.style.color.textColor
        this.tileColor = this.dashboard.style.color.tileColow
        this.primaryColor = this.dashboard.style.color.primaryColor
        this.secondaryColor = this.dashboard.style.color.secondaryColor
      }
      if (this.dashboard.style.layout) {
        this.rows = this.dashboard.style.layout.rows
        this.columns = this.dashboard.style.layout.columns
        this.marginX = this.dashboard.style.layout.marginX
        this.marginY = this.dashboard.style.layout.marginY
        this.verticalCompact = this.dashboard.style.layout.verticalCompact
        this.tileBorderRadius = this.dashboard.style.layout.tileBorderRadius
      }
    }
  },
  methods: {
    scrollToSection (section) {
      const options = {
        container: '.edit-dashboard',
        duration: 300,
        easing: 'ease'
      }
      VueScrollTo.scrollTo(`#${section}`, options.duration, options)
    },
    updateCurrentSection () {
      for (let [index, section] of this.sections.entries()) {
        let rect = this.$refs[section.id][0].getBoundingClientRect()
        let viewHeight = Math.max(this.$refs[section.id][0].clientHeight, window.innerHeight)
        if (rect.bottom >= window.innerHeight / 3 && rect.top - viewHeight < 0) {
          this.currentSection = index
          break
        }
      }
    },
    updateName (e) {
      this.name = e.target.innerText
    },
    saveDashboard () {
      const newDashboard = {
        dashboard_id: this.$route.params.dashboard_id,
        name: this.name,
        description: this.description,
        creator: this.creator,
        stars: this.stars,
        copies: this.copies,
        refreshTimer: this.refreshTimer,
        style: {
          color: {
            backgroundColor: this.backgroundColor,
            textColor: this.textColor,
            tileColor: this.tileColor,
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor
          },
          layout: {
            rows: this.rows,
            columns: this.columns,
            marginX: this.marginX,
            marginY: this.marginY,
            verticalCompact: this.verticalCompact,
            tileBorderRadius: this.tileBorderRadius
          }
        }
      }
      this.$emit('update-dashboard', newDashboard)
      this.$emit('close')
    },
    deleteDashboard () {
      // TODO show warning
      this.$emit('delete-dashboard')
    }
  },
  computed: {
    tab () {
      return this.$route.query.tab
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";
    .edit-dashboard::-webkit-scrollbar {
      width: 0 !important;
      background: transparent;
    }
  .edit-dashboard {
    color: color('text');
    cursor: auto;
    width: calc(60vw - 20px);
    height: calc(85vh - 90px);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    margin: 80px 10px 10px 10px;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
    .top-bar {
      position: absolute;
      top: 0px;
      left: 0px;
      width: calc(100% - 60px);
      margin: 25px 20px 0px 20px;
      padding: 0 10px 15px 10px;
      border-bottom: 1px solid color('green');
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 24px;
        color: color('text');
        cursor: text;
      }
      .settings-button {
        cursor: pointer;
        color: color('text');
        font-size: 24px;
        &:hover {
          color: shade(color('text'), 20%);
        }
      }
    }
    .edit-menu {
      .edit-menu-nav {
        position: absolute;
        display: flex;
        flex-direction: column;
        right: 50px;
        .edit-menu-nav-button {
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          &.current {
            background: color('green');
          }
        }
      }
      .edit-menu-content {
        margin: 0 150px calc(80vh - 200px) 20px;
        .section {
          transition: opacity 0.3s ease;
          opacity: 0.5;
          border-bottom: 1px solid color('foreground');
          &.current {
            opacity: 1;
          }
        }
      }

    }

  }
</style>
