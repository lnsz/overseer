import Gateway from '../gateway'

export const TileApi = {
  fetchTiles(params) {
    return Gateway().get(`dashboards/${params.dashboard_id}/tiles`)
  },
  createTile(params) {
    return Gateway().post(`dashboards/${params.dashboard_id}/tiles`, params)
  },
  updateTile(params) {
    return Gateway().put(`dashboards/${params.dashboard_id}/tiles/${params.tile_id}`, params)
  },
  getTile(params) {
    return Gateway().get(`dashboards/${params.dashboard_id}/tiles/${params.tile_id}`)
  },
  deleteTile(params) {
    return Gateway().delete(`dashboards/${params.dashboard_id}/tiles/${params.tile_id}`)
  }
}
