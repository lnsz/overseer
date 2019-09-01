const GRID_VALUES = {
  MAX_ROWS: 60,
  MAX_COLUMNS: 60
}

const getRowHeight = (): number => {
  return window.innerHeight / GRID_VALUES.MAX_COLUMNS
}

const getTileWidth = (rows: number): number => {
  return GRID_VALUES.MAX_ROWS / rows
}

const getTileHeight = (columns: number): number => {
  return GRID_VALUES.MAX_COLUMNS / columns
}

const validateLayout = (layout: any): any => {
  return layout &&
    layout.x != null &&
    layout.y != null &&
    layout.width != null &&
    layout.height != null
}

const parseLayout = (layout: any, index: number): object => {
  return {
    x: layout.x,
    y: layout.y,
    w: layout.width,
    h: layout.height,
    i: index
  }
}

const getLayout = (tiles: any[]): any[] => {
  return tiles.map((tile, index) => {
    return (validateLayout(tile.layout)) ? parseLayout(tile.layout, index) : null
  }).filter((x) => x)
}

export const GridHelper = {
  GRID_VALUES,
  getRowHeight,
  getTileHeight,
  getTileWidth,
  getLayout
}
