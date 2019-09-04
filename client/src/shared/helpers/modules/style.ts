const backgroundCSS = (style: any): object => {
  if (style && style.background && style.background.color) {
    const color = style.background.color
    if (color.includes('gradient')) {
      return { background: color }
    }
    return { 'background-color': color }
  }
  return {}
}

const fontCSS = (style: any): object => {
  if (style && style.font) {
    return {
      color: style.font.color,
      fontFamily: style.font.family,
      fontSize: `${style.font.size}px`,
      fontWeight: style.font.weight,
      fontStyle: style.font.style
    }
  }
  return {}
}

const borderCSS = (style: any): object => {
  if (style && style.border) {
    return {
      border: `${style.border.width || 1}px ${style.border.style || 'solid'}  ${style.border.color || 'black'}`,
      borderRadius: `${style.border.radius}%`,
    }
  }
  return {}
}

const shadowCSS = (style: any): object => {
  return (style && style.shadow && style.shadow.enabled) ?
    { boxShadow: '3px 3px 10px rgba(0, 0, 0, 1)' } :
    { boxShadow: 'none' }
}

const alignmentCSS = (text: any): object => {
  if (text) {
    let justifyContent = ''
    let alignItems = ''
    switch (text.verticalAlignment) {
      case 'top':
        justifyContent = 'flex-start'
        break
      case 'bottom':
        justifyContent = 'flex-end'
        break
      default:
        justifyContent = 'center'
    }
    switch (text.horizontalAlignment) {
      case 'left':
        alignItems = 'flex-start'
        break
      case 'right':
        alignItems = 'flex-end'
        break
      default:
        alignItems = 'center'
    }
    return {
      justifyContent,
      alignItems
    }
  }
  return {}
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
  fontCSS,
  borderCSS,
  shadowCSS,
  alignmentCSS,
  iframeCSS
}
