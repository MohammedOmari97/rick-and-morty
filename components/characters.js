import React, { useState, useContext } from "react"
import { useQuery } from "react-query"
import Spinner from "react-spinner-material"
import { controlsContext } from "./controlsContext"

function Characters() {
  const [enabled, setEnabled] = useState(false)
  const { status, data } = useQuery(["characters"], getCharacters, {
    enabled,
  })

  const { controls } = useContext(controlsContext)

  // console.log(controls)

  function getCharacters() {
    return new Promise((resolve, reject) => {
      console.log("outside setTimeout")
      setTimeout(() => {
        console.log("inside setTimeout")
        if (Math.random() < controls.errorRate) {
          return reject(new Error("Failed to fetch characters"))
        }

        let results = fetch("https://rickandmortyapi.com/api/character")
          .then((r) => r.json())
          .then((r) => r.results)

        resolve(results)
      }, controls.fetchTimeMin + Math.random() * (controls.fetchTimeMax - controls.fetchTimeMin))
    })
  }

  // console.log(data)

  // return <div>Hello</div>

  // const cache = useQueryCache()

  if (status === "loading") {
    return <Spinner radius={30} stroke={2} color="#999" />
  }
  if (status === "error") {
    return <p>something wrong happend</p>
  }

  return (
    <div>
      <div>
        {data?.length > 0 ? (
          data.map((character) => <li key={character.id}>{character.name}</li>)
        ) : (
          <div>Nothing to show here</div>
        )}
      </div>
      <button
        onClick={() => {
          setEnabled(true)
        }}
      >
        get all characters
      </button>
    </div>
  )
}

export default Characters
