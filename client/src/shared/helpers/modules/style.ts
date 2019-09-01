const backgroundCSS = (color: string): object => {
  if (color) {
    if (color.includes('gradient')) {
      return { background: color }
    }
    return { 'background-color': color }
  }
  return {}
}

const textCSS = (color: string): object => {
  return color ? {color} : {}
}

const iframeCSS = (zoomLevel: number): object => {
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

export const StyleHelper = {
  backgroundCSS,
  textCSS,
  iframeCSS
}
