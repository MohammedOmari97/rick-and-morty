function getResults(controls, url) {
  return new Promise((resolve, reject) => {
    console.log("outside setTimeout")
    setTimeout(() => {
      console.log("inside setTimeout")
      if (Math.random() < controls.errorRate) {
        return reject(new Error("Failed to fetch characters"))
      }

      // let results = fetch("https://rickandmortyapi.com/api/character")
      let results = fetch(url).then((r) => r.json())
      // .then((r) => r.results)

      resolve(results)
    }, controls.fetchTimeMin + Math.random() * (controls.fetchTimeMax - controls.fetchTimeMin))
  })
}

function getCharacters(controls, url) {
  return new Promise((resolve, reject) => {
    console.log("outside setTimeout")
    setTimeout(() => {
      console.log("inside setTimeout")
      if (Math.random() < controls.errorRate) {
        return reject(new Error("Failed to fetch characters"))
      }

      // let results = fetch("https://rickandmortyapi.com/api/character")
      let results = fetch(url).then((r) => r.json())
      // .then((r) => r.results)

      resolve(results)
    }, controls.fetchTimeMin + Math.random() * (controls.fetchTimeMax - controls.fetchTimeMin))
  })
}

function getEpisodes(controls, url) {
  return new Promise((resolve, reject) => {
    console.log("outside setTimeout")
    setTimeout(() => {
      console.log("inside setTimeout")
      if (Math.random() < controls.errorRate) {
        return reject(new Error("Failed to fetch characters"))
      }

      // let results = fetch("https://rickandmortyapi.com/api/episode")
      let results = fetch(url).then((r) => r.json())
      // .then((r) => r.results)

      resolve(results)
    }, controls.fetchTimeMin + Math.random() * (controls.fetchTimeMax - controls.fetchTimeMin))
  })
}

function getCharacter(controls, url) {
  return new Promise((resolve, reject) => {
    console.log("outside setTimeout")
    setTimeout(() => {
      console.log("inside setTimeout")
      if (Math.random() < controls.errorRate) {
        return reject(new Error(`Failed to fetch character`))
      }

      let results = fetch(
        // `https://rickandmortyapi.com/api/character/${id}`
        url
      ).then((r) => r.json())

      resolve(results)
    }, controls.fetchTimeMin + Math.random() * (controls.fetchTimeMax - controls.fetchTimeMin))
  })
}

function getEpisode(controls, url) {
  return new Promise((resolve, reject) => {
    console.log("outside setTimeout")
    setTimeout(() => {
      console.log("inside setTimeout")
      if (Math.random() < controls.errorRate) {
        return reject(new Error(`Failed to fetch episode`))
      }

      let results = fetch(
        // `https://rickandmortyapi.com/api/episode/${id}`
        url
      ).then((r) => r.json())

      resolve(results)
    }, controls.fetchTimeMin + Math.random() * (controls.fetchTimeMax - controls.fetchTimeMin))
  })
}

export { getCharacters, getCharacter, getEpisodes, getEpisode, getResults }
