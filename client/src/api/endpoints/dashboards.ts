import Gateway from '../gateway'

export default {
  fetchDashboards() {
    return Gateway().get('dashboards')
  },
  createDashboard(params) {
    return Gateway().post('dashboards', params)
  },
  updateDashboard(params) {
    return Gateway().put(`dashboards/${params.dashboard_id}`, params)
  },
  getDashboard(params) {
    return Gateway().get(`dashboards/${params.dashboard_id}`)
  },
  deleteDashboard(params) {
    return Gateway().delete(`dashboards/${params.dashboard_id}`)
  }
}
