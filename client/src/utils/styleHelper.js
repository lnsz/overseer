export const backgroundCSS = (color) => {
  if (color) {
    if (color.includes('gradient')) {
      return { 'background': color }
    }
    return { 'background-color': color }
  }
  return {}
}

export const textCSS = (color) => {
  return color ? { 'color': color } : color
}

export const iframeCSS = (rows, columns) => {
  const xScale = columns !== 0 ? 1 / columns : 1
  const yScale = rows !== 0 ? 1 / rows : 1
  return {
    'width': `${columns * 100}%`,
    'height': `${rows * 100}%`,
    '-ms-zoom': `${xScale}`,
    '-moz-transform': `scale(${xScale}, ${yScale})`,
    '-moz-transform-origin': '0 0',
    '-o-transform': `scale(${xScale}, ${yScale})`,
    '-o-transform-origin': '0 0',
    '-webkit-transform': `scale(${xScale}, ${yScale})`,
    '-webkit-transform-origin': '0 0'
  }
}

export const rowsCSS = (rows) => {
  return {
    'grid-template-rows':
      `repeat(${rows}, ${100 / rows}%)`
  }
}

export const columnsCSS = (columns) => {
  return {
    'grid-template-columns':
      `repeat(${columns}, ${100 / columns}%)`
  }
}
