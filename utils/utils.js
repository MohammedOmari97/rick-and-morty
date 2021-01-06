const baseUrl = "https://rickandmortyapi.com/api"

export function getQueryParams(page, filters, search) {
  let queryParams = ""
  let before = false
  if (
    !page &&
    !filters?.status &&
    !filters?.gender &&
    !filters?.species &&
    !search?.name
  ) {
    return ""
  } else {
    queryParams += "?"
    if (page) {
      queryParams += `page=${page}`
      before = true
    }

    if (filters?.status) {
      queryParams += `${before ? "&" : ""}status=${filters.status}`
      before = true
    }

    if (filters?.gender) {
      queryParams += `${before ? "&" : ""}gender=${filters.gender}`
      before = true
    }

    if (filters?.species) {
      queryParams += `${before ? "&" : ""}species=${filters.species}`
      before = true
    }

    if (search?.name) {
      queryParams += `${before ? "&" : ""}name=${search?.name}`
      before = true
    }
  }

  return queryParams
}

export function getUrl(resultsFor, id = null, page = null, filters, search) {
  if (resultsFor === "characters") {
    return `${baseUrl}/character/${getQueryParams(page, filters, search)}`
    // if (page) {
    //   return `${baseUrl}/character/?page=${page}`
    // } else {
    //   return `${baseUrl}/character`
    // }
  } else if (resultsFor === "episodes") {
    console.log(`${baseUrl}/episode/${getQueryParams(page, filters, search)}`)
    return `${baseUrl}/episode/${getQueryParams(page, filters, search)}`
    // if (page) {
    //   return `${baseUrl}/episode/?page=${page}`
    // } else {
    //   return `${baseUrl}/episode`
    // }
  } else if (resultsFor === "character") {
    return `${baseUrl}/character/${id}`
  } else if (resultsFor === "episode") {
    return `${baseUrl}/episode/${id}`
  } else {
    return null
  }
}

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}
