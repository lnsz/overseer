export const goToPage = (context, name, query = {}, params = {}) => {
  context.$router.push({ name: name, query: query, params: params })
}

export const openPageInNewTab = (context, name, query = {}, params = {}) => {
  let routeData = context.$router.resolve({ name: name, query: query, params: params })
  window.open(routeData.href, '_blank')
}
