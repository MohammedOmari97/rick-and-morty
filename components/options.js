import React from "react"
import styles from "./styles/options.module.scss"
import Image from "next/image"
import Tabs from "./tabs"
import Filters from "./filters"
import Search from "./search"
import { useRouter } from "next/router"

function Options() {
  const router = useRouter()
  const type = router.pathname.split("/")[1] || null

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/ri.png"
          alt="rick and morty logo"
          priority={true}
          quality={100}
          width={300}
          height={80}
        />
      </div>
      <Tabs
        tabs={["Characters", "Episodes"]}
        render={(selectedTab) => {
          return (
            <>
              <Filters selectedTab={selectedTab} />
              <Search selectedTab={selectedTab} />
            </>
          )
        }}
        onClick={(tab) => {
          router.push(`/${tab}`)
        }}
        selectedTab={type}
      />
    </div>
  )
}

export default Options
