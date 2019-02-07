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

export const iframeCSS = (zoomLevel) => {
  const scale = zoomLevel !== 0 ? 1 / zoomLevel : 1
  return {
    'width': `${zoomLevel * 100}%`,
    'height': `${zoomLevel * 100}%`,
    '-ms-zoom': `${scale}`,
    '-moz-transform': `scale(${scale}, ${scale})`,
    '-moz-transform-origin': '0 0',
    '-o-transform': `scale(${scale}, ${scale})`,
    '-o-transform-origin': '0 0',
    '-webkit-transform': `scale(${scale}, ${scale})`,
    '-webkit-transform-origin': '0 0'
  }
}
