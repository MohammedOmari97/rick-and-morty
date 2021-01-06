import React from "react"
import Link from "next/link"
import styles from "./styles/characterItem.module.scss"

function Character({ id, name, img, species, status }) {
  return (
    <Link href={`/character/${id}`}>
      <a style={{ width: "70%", textDecoration: "none", color: "inherit" }}>
        <div className={styles.character}>
          <img src={img} />
          <div className={styles.characterHeader}>
            <div className={styles.charName}>
              <h4>{name}</h4> <span>({species})</span>
            </div>
            <div className={styles.charStatus}>
              <span className={`${styles[`${status}`]}`}></span> {status}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Character
