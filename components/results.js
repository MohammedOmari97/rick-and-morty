import React from "react"
import styles from "./styles/results.module.scss"
import Tabs from "./tabs"
import PaginatedResults from "./paginatedResults"
import InfiniteLoadingResults from "./infiniteLoadingResults"
import Character from "./character"
import { useRouter } from "next/router"

function Results({ resultsFor, id, page, type, filters, search }) {
  const router = useRouter()
  // const type = router.query?.id?.length > 0 ? router.query.id : null || null
  // console.log(type)
  // console.log(router)
  console.log(router)

  console.log(search)

  if (resultsFor === "character") {
    return <Character id={id} />
  }

  return (
    <div className={styles.container}>
      <Tabs
        disabled={router.pathname === "/"}
        tabs={["Infinite Loading", "Pagination"]}
        render={(selectedTab) => {
          console.log(selectedTab)
          return (
            <>
              {selectedTab === "infinite loading" ? (
                <InfiniteLoadingResults
                  resultsFor={resultsFor}
                  filters={filters}
                  search={search}
                />
              ) : selectedTab === "pagination" ? (
                <PaginatedResults
                  resultsFor={resultsFor}
                  id={id}
                  page={page}
                  filters={filters}
                  search={search}
                />
              ) : null}
            </>
          )
        }}
        selectedTab={type}
        onClick={(tab) => {
          // router.push(`/${resultsFor.toLowerCase()}/${tab.toLowerCase()}`)
          router.push({
            pathname: `/${resultsFor.toLowerCase()}/${tab.toLowerCase()}`,
            query: { ...router.query },
          })
        }}
        // setSelectedTab={setSelectedTab}
      />
    </div>
  )
}

export default Results
