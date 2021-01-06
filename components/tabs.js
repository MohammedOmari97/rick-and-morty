import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "./styles/tabs.module.scss"

function Tabs({ render, tabs, selectedTab, onClick, disabled }) {
  const [selected, setSelected] = useState(selectedTab)
  // console.log(selected)
  // console.log(selectedTab)
  const router = useRouter()
  console.log(router.query.pathname)
  // console.log(selectedTab === selected)
  // console.log(selectedTab)
  // console.log(selected)
  // console.log(setSelectedTab)

  useEffect(() => {
    setSelected(selectedTab)
  }, [selectedTab])

  return (
    <>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            return (
              <button
                key={tab}
                className={styles.tab}
                onClick={() => {
                  // setSelected(tab)
                  onClick(tab.toLowerCase())
                  // router.push(`${window.location.host}/${tab.toLowerCase()}`)
                  // setSelectedTab(tab)
                }}
                disabled={disabled}
              >
                {tab}
                <div
                  className={styles.background}
                  style={{
                    display:
                      selected?.toLowerCase() === tab.toLowerCase() ||
                      selectedTab?.toLowerCase() === tab.toLowerCase()
                        ? "block"
                        : "none",
                  }}
                ></div>
              </button>
            )
          })}
          {/* <div
            onClick={() => setSelected("Characters")}
            className={styles.tab}
          >
            Characters
            <div
              className={styles.background}
              style={{ display: selected === "Characters" ? "block" : "none" }}
            ></div>
          </div>
          <div
            onClick={() => setSelected("Episodes")}
            className={styles.tab}
          >
            Episodes
            <div
              className={styles.background}
              style={{ display: selected === "Episodes" ? "block" : "none" }}
            ></div>
          </div> */}
        </div>
      </div>
      {render ? render(selectedTab || selected) : null}
    </>
  )
}

export default Tabs
