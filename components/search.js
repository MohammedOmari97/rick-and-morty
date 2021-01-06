import React, { useState } from "react"
import Button from "./button"
import { useRouter } from "next/router"
import styles from "./styles/search.module.scss"

function Search({ selectedTab }) {
  if (!selectedTab) return null

  const router = useRouter()
  const [text, setText] = useState()

  return (
    <div className={styles.container}>
      <label htmlFor="search">Search {selectedTab}</label>
      <input
        id="search"
        value={text}
        type="text"
        placeholder={
          selectedTab?.substring(0, selectedTab.length - 1) + "'s name"
        }
        onChange={(e) => setText(e.target.value)}
      />
      {/* <button>Search</button> */}
      <Button
        onClick={() => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, name: text },
          })
        }}
      >
        Search
      </Button>
    </div>
  )
}

export default Search
