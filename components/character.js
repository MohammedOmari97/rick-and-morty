import React from "react"
import { useQuery } from "react-query"
import EpisodeItem from "./episodeItem"
import Spinner from "react-spinner-material"
import styles from "./styles/character.module.scss"

function Character({ id }) {
  const { status, data } = useQuery(["character", { id }], () => {
    return fetch(`https://rickandmortyapi.com/api/character/${id}`).then((r) =>
      r.json()
    )
  })

  console.log(id)
  console.log(data)

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <div className={styles.spinnerWrapper}>
          <Spinner radius={30} stroke={2} color="#999" />
        </div>
      ) : status === "error" ? (
        <div>Unable to fetch characters.</div>
      ) : (
        <>
          <img src={data.image} />
          <div className={styles.characterHeader}>
            <h3>{data.name}</h3> <span>({data.species})</span>
          </div>
          <div className={styles.gender}>
            {data.gender}{" "}
            <img src={`/${data.gender}.svg`} alt={`${data.gender} icon`} />
          </div>
          <div className={`${styles.status} ${styles[`${data.status}`]}`}>
            <span
              className={`${styles.statusDot} ${styles[`${data.status}`]}`}
            ></span>{" "}
            {data.status}
          </div>
          <div className={styles.details}>
            <div>
              <span>Origin:</span> {data.origin.name}
            </div>
            <div>
              <span>Location:</span> {data.location.name}
            </div>
          </div>
          <div className={styles.episodes}>
            <h3>Episodes</h3>
            {data.episode.map((episode) => {
              const episodeUrlParts = episode.split("/").filter(Boolean)
              const episodeId = episodeUrlParts[episodeUrlParts.length - 1]

              return <EpisodeItem id={episodeId} />
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Character
