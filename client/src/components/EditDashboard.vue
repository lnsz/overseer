<template>
  <div @scroll="updateCurrentSection" class="edit-dashboard">
    <div class="top-bar">
      <input
        class="title"
        v-model="model.general.name"
      />
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
          @click="scrollToSection(index)"
          :class="{ 'current': index == currentSection }"
          class="edit-menu-nav-button"
        >
          {{section.name}}
        </div>
        <ActionButton
          class="save-button"
          @click="saveDashboard"
          text="Save"
        />
      </div>
      <div class="edit-menu-content" id="edit-menu-content">
        <div
          v-for="(section, index) in sections"
          :key="index"
          :id="section.id"
          :ref="section.id"
          :class="{ 'current': currentSection == index }"
          @click="clickOnSection(index)"
          class="section"
        >
          <div class="section-name">
            {{section.name}}
          </div>
          <div
            class="input-row"
            style="width: 100%;"
            v-for="(input, contentIndex) in section.content"
            :key="contentIndex"
          >
            <div
              class= "permissions"
              v-if="input.type == 'permissions' && model.permissions && model.permissions.users"
            >
              <input
                class="input-field user-search"
                v-model="userSearch"
                placeholder="Search"
                @input="searchForUsername"
              />
              <div
                class="user-role-picker"
                v-if="username && !(model.permissions.users.map(x => x.username).includes(username))"
              >
                <div class="username">
                  {{username}}
                </div>
                <select @change="addUserPermission">
                  <option
                    v-for="(role) in roleOptions"
                    :value="role"
                    :key="role"
                  >
                    {{role}}
                  </option>
                </select>
              </div>
              <div
                v-for="(user, userIndex) in model.permissions.users.filter(x => x.username.startsWith(userSearch))"
                class="user-role-picker"
                :key="userIndex"
              >
                <div class="username">
                  {{user.username}}
                </div>
                <select
                  v-model="user.role"
                  @change="removeNone"
                  :disabled="user.username == creator"
                >
                  <option
                    v-for="(role) in roleOptions"
                    :value="role"
                    :key="role"
                  >
                    {{role}}
                  </option>
                </select>
              </div>
            </div>
            <div class="input-left-side" v-if="input.type != 'permissions'">
              {{input.name}}
            </div>
            <div class="input-right-side">
              <div v-if="input.type == 'text'">
                <textarea
                  class="input-field text-input"
                  v-model="model[section.id][input.field]"
                >
                </textarea>
              </div>
              <div v-else-if="input.type == 'number'">
                <input
                  class="input-field number-input"
                  type="number"
                  v-model="model[section.id][input.field]"
                />
              </div>
              <div v-else-if="input.type == 'toggle'">
                <ToggleButton
                  color="#42b983"
                  :width="50"
                  :height="25"
                  sync
                  v-model="model[section.id][input.field]"
                />
              </div>
              <div v-else-if="input.type == 'color'">
                <div class="color-input">
                  <div class="input-field color-demo" :style="{background: model[section.id][input.field]}" />
                  <input
                    class="input-field"
                    v-model="model[section.id][input.field]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueScrollTo from 'vue-scrollto'
import { ToggleButton } from 'vue-js-toggle-button'
import { UserApi } from '../api'
import ActionButton from '@/components/ActionButton.vue'
import { Dashboard } from '../types'

@Component({
  components: {
    ActionButton,
    ToggleButton
  }
})
export default class EditDashboard extends Vue {
  // Props
  @Prop({ default: {} })
  private dashboard: Dashboard

  // Data
  private model = {
    general: {
      name: '',
      description: '',
      refreshTimer: 30
    },
    style: {},
    layout: {},
    tileSettings: {},
    permissions: {
      users: []
    }
  }
  private currentSection = 0
  private isScrolling = false
  private userSearch = ''
  private username = ''
  private creator = ''
  private roleOptions = ['none', 'viewer', 'editor', 'admin']

  // Mounted
  private mounted(): void {
    this.model.general.name = this.dashboard.name
    this.model.general.description = this.dashboard.description
    this.model.general.refreshTimer = this.dashboard.refreshTimer
    this.model.style = this.dashboard.style
    this.model.layout = this.dashboard.layout
    this.model.tileSettings = this.dashboard.tileSettings
    this.model.permissions = this.dashboard.permissions
    this.creator = this.dashboard.creator
  }

  // Methods
  private addUserPermission(e: Event): void {
    this.model.permissions.users.push({
      username: this.username,
      role: (event.target as HTMLInputElement).value
    })
  }

  private removeNone(): void {
    this.model.permissions.users = this.model.permissions.users.filter((x) => {
      return x.role !== 'none'
    })
  }

  private scrollToSection(index: number): void {
    const options = {
      container: '.edit-dashboard',
      duration: 300,
      easing: 'ease',
      onStart: () => { this.isScrolling = true },
      onDone: () => { this.isScrolling = false }
    }
    if (!this.isScrolling) {
      VueScrollTo.scrollTo(
        `#${this.sections[index].id}`,
        options.duration, options
      )
    }
  }

  private clickOnSection(index: number): void {
    if (this.currentSection < index) { this.scrollToSection(index) }
  }

  private updateCurrentSection(): void {
    for (const [index, section] of this.sections.entries()) {
      const rect = this.$refs[section.id][0].getBoundingClientRect()
      const viewHeight = Math.max(this.$refs[section.id][0].clientHeight, window.innerHeight)
      if (rect.bottom >= window.innerHeight / 6 && rect.top - viewHeight < 0) {
        this.currentSection = index
        break
      }
    }
  }

  private updateField(e: Event, section: number, field: string): void {
    this.model[section][field] = (e.target as HTMLInputElement).innerText
  }

  private saveDashboard(): void {
    const newDashboard = {
      dashboard_id: this.$route.params.dashboard_id,
      name: this.model.general.name,
      description: this.model.general.description,
      refreshTimer: this.model.general.refreshTimer,
      style: this.model.style,
      layout: this.model.layout,
      tileSettings: this.model.tileSettings,
      permissions: this.model.permissions
    }
    this.$emit('update-dashboard', newDashboard)
    this.$emit('close')
  }

  private deleteDashboard(): void {
    // TODO show warning
    this.$emit('delete-dashboard')
  }

  private async searchForUsername(): Promise<void> {
    const res = await UserApi.getUser({ username: this.userSearch })
    this.username = res.data.username ? res.data.username : null
  }

  // Computed
  get sections(): any {
    const visibleSections = [
      {
        id: 'general',
        name: 'General',
        content: [
          {
            name: 'Description',
            field: 'description',
            type: 'text'
          },
          {
            name: 'Refresh Timer (minutes)',
            field: 'refreshTimer',
            type: 'number'
          }
        ]
      },
      {
        id: 'layout',
        name: 'Layout',
        content: [
          {
            name: 'Rows',
            field: 'rows',
            type: 'number'
          },
          {
            name: 'Columns',
            field: 'columns',
            type: 'number'
          },
          {
            name: 'Horizontal Margin',
            field: 'marginX',
            type: 'number'
          },
          {
            name: 'Show Grid',
            field: 'showGrid',
            type: 'toggle'
          },
          {
            name: 'Free Placement',
            field: 'freePlacement',
            type: 'toggle'
          }
        ]
      },
      {
        id: 'style',
        name: 'Style',
        content: [
          {
            name: 'Background Color',
            field: 'backgroundColor',
            type: 'color'
          },
          {
            name: 'Primary Color',
            field: 'primaryColor',
            type: 'color'
          },
          {
            name: 'Secondary Color',
            field: 'secondaryColor',
            type: 'color'
          }
        ]
      }
    ]
    // TODO: Only if user has admin access
    visibleSections.push({
      id: 'permissions',
      name: 'Permissions',
      content: [
        {
          name: 'Private',
          field: 'private',
          type: 'toggle'
        },
        {
          name: 'Users',
          field: 'users',
          type: 'permissions'
        }
      ]
    })
    return visibleSections
  }
}
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .edit-dashboard {
    color: textColor('default');
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
    &::-webkit-scrollbar {
      width: 0 !important;
      background: transparent;
    }
    .top-bar {
      position: absolute;
      top: 0px;
      left: 0px;
      width: calc(100% - 60px);
      margin: 25px 20px 0px 20px;
      padding: 0 10px 15px 10px;
      border-bottom: 1px solid bgColor('primary');
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 30px;
        color: textColor('default');
        cursor: text;
        border: none;
        background: transparent;
      }
      .settings-button {
        cursor: pointer;
        color: textColor('default');
        font-size: 30px;
        &:hover {
          color: shade(textColor('default'), 20%);
        }
      }
    }
    .edit-menu {
      .edit-menu-nav {
        position: absolute;
        display: flex;
        flex-direction: column;
        right: 50px;
        text-align: right;
        height: calc(85vh - 90px);
        .edit-menu-nav-button {
          font-weight: 300;
          font-size: 18px;
          border-radius: 3px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          &.current {
            background: bgColor('primary');
          }
        }
        .save-button {
          position: absolute;
          bottom: 10px;
        }
      }
      .edit-menu-content {
        margin: 0 200px calc(80vh - 50px) 20px;
        .section {
          transition: opacity 0.5s ease;
          opacity: 0.3;
          border-bottom: 1px solid bgColor('secondary');
          padding: 15px 0 15px 0;
          &.current {
            opacity: 1;
          }
          .section-name {
            font-size: 20px;
            padding-bottom: 10px;
          }
          .input-row {
            font-weight: 300;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            padding: 10px;
            .color-input {
              display: flex;
              flex-direction: row;
            }
            .permissions {
              display: flex;
              flex-direction: column;
              align-content: center;
              justify-self: center;
              width: 100%;
              .user-role-picker {
                display: flex;
                width: 25%;
                align-self: center;
                justify-content: space-between;
                align-content: center;
                padding-bottom: 10px;
                height: 24px;
                .username {
                  font-weight: 300;
                  font-size: 16px;
                }
              }
            }
            .input-left-side {
              align-self: center;
            }
            .input-field {
              background: bgColor('default');
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
              font-family: 'Roboto', sans-serif;
              font-size: 16px;
              transition: all 0.2s ease;
              color: textColor('default');
              background: bgColor('default');
              border: 1px solid bgColor('secondary');
              padding: 7px;
              border-radius: 3px;

              &:focus {
                border: 1px solid bgColor('primary');
              }
              &.number-input {
                width: 30px;
              }
              &.text-input {
                width: 15vw;
                resize: none;
              }
              &.color-demo {
                width: 15px;
                height: 15px;
                margin-right: 5px;
                align-self: center;
              }
              &.user-search {
                margin-bottom: 10px;
                width: 40%;
                align-self: center;
                margin-bottom: 25px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>