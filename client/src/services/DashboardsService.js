import Api from '@/services/Api'

export default {
  fetchDashboards () {
    return Api().get('dashboards')
  },

  createDashboard (params) {
    return Api().post('dashboards', params)
  },

  updateDashboard (params) {
    console.log(params)
    return Api().put(`dashboards/${params.dashboard_id}`, params)
  },

  getDashboard (params) {
    console.log(params)
    return Api().get(`dashboards/${params.dashboard_id}`)
  },

  deleteDashboard (params) {
    return Api().delete(`dashboards/${params.dashboard_id}`)
  }
}
