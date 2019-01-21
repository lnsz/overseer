import Api from '@/services/Api'

export default {
  fetchTiles () {
    return Api().get(`dashboards/${params.dashboard_id}/tiles`)
  },

  createTile (params) {
    return Api().post(`dashboards/${params.dashboard_id}/tiles`, params)
  },

  updateTile (params) {
    return Api().put(`dashboards/${params.dashboard_id}/tiles/${params.tile_id}`, params)
  },

  getTile (params) {
    return Api().get(`dashboards/${params.dashboard_id}/tiles/${params.tile_id}`)
  },

  deleteTile (id) {
    return Api().delete(`dashboards/${params.dashboard_id}/tiles/${params.tile_id}`)
  }
}
