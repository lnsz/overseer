import Api from '@/services/Api'

export default {
  fetchDashboards () {
    return Api().get('dashboards')
  },

  addDashboard (params) {
    return Api().post('dashboards', params)
  },

  updateDashboard (params) {
    return Api().put('dashboards/' + params.id, params)
  },

  getDashboard (params) {
    return Api().get('dashboards/' + params.id)
  },

  deleteDashboard (id) {
    return Api().delete('dashboards/' + id)
  }
}
