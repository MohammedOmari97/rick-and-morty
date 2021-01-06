import React from "react"
import { useQuery } from "react-query"
import styles from "./styles/episodeItem.module.scss"
import Spinner from "react-loader-spinner"

function EpisodeItem({ id }) {
  const { status, data } = useQuery(["episode", id], () => {
    return fetch(`https://rickandmortyapi.com/api/episode/${id}`).then((r) =>
      r.json()
    )
  })

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <div className={styles.spinnerWrapper}>
          <Spinner
            style={{ display: "inline" }}
            type="TailSpin"
            color="#24292e"
            height={15}
            width={15}
          />
        </div>
      ) : (
        <div className={styles.content}>
          <h4>{data.name}</h4>
          <div className={styles.details}>
            <span>Episode:</span> {data.episode.substring(4, 6)} |
            <span>Season:</span> {data.episode.substring(1, 3)}
          </div>
        </div>
      )}
    </div>
  )
}

export default EpisodeItem
