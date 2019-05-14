export const gridValues = {
  MAX_ROWS: 60,
  MAX_COLUMNS: 60
}

export const rowHeight = (windowHeight) => {
  return windowHeight / gridValues.MAX_COLUMNS
}

export const getTileWidth = (rows) => {
  return gridValues.MAX_ROWS / rows
}

export const getTileHeight = (columns) => {
  return gridValues.MAX_COLUMNS / columns
}

const validateLayout = (layout) => {
  return layout &&
    layout.x != null &&
    layout.y != null &&
    layout.width != null &&
    layout.height != null
}

const parseLayout = (layout, index) => {
  return {
    'x': layout.x,
    'y': layout.y,
    'w': layout.width,
    'h': layout.height,
    'i': index
  }
}

export const getLayout = (tiles) => {
  return tiles.map((tile, index) => {
    return (validateLayout(tile.layout)) ? parseLayout(tile.layout, index) : null
  }).filter(x => x)
}
