import React, { useContext, useEffect } from "react"
import { useInfiniteQuery } from "react-query"
import styles from "./styles/infiniteLoading.module.scss"
import CharacterItem from "./characterItem"
import EpisodeItem from "./episodeItem"
import Spinner from "react-loader-spinner"
import Button from "./button"
import { getUrl, getParameterByName } from "../utils/utils"
import { controlsContext } from "./controlsContext"
import { getResults } from "./api"

function InfiniteLoadingResults({ resultsFor, filters, search, parentRef }) {
  let queryId = [resultsFor, filters, search]

  const { controls } = useContext(controlsContext)

  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
    status,
  } = useInfiniteQuery(
    queryId,
    async ({ pageParam = 0 }) => {
      return await getResults(
        controls,
        getUrl(resultsFor, null, pageParam, filters, search)
      )
      // return fetch(
      //   // `https://rickandmortyapi.com/api/character/?page=${pageParam}`
      //   getUrl(resultsFor, null, pageParam, filters, search)
      // )
      //   .then((r) => r.json())
    },
    {
      getNextPageParam: (lastPage, _pages) => {
        // console.log(lastPage)
        // console.log(pages)
        if (!lastPage.info) return undefined
        const page = getParameterByName("page", lastPage.info.next)
        return page
      },
    }
  )

  useEffect(() => {
    if (data && data.pages.length === 1) {
      parentRef.current.scrollIntoView()
    }
  }, [data])

  // window.__options__ = options

  // if (!options) return null

  console.log(data)

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <Spinner
          style={{ display: "inline" }}
          type="TailSpin"
          color="#24292e"
          height={30}
          width={30}
        />
      ) : status === "error" ? (
        <div className={styles.error}>Unable to fetch...</div>
      ) : (
        <div className={styles.content}>
          {/* {JSON.stringify(options.data.pages, null, 2)} */}
          <>
            {data.pages ? (
              data.pages.map((page) => {
                if (!page.results)
                  return (
                    <div style={{ marginTop: "20px" }}>
                      Nothing to show here.
                    </div>
                  )
                return (
                  <>
                    {page.results.map((item) => {
                      if (resultsFor === "characters") {
                        return (
                          <CharacterItem
                            id={item.id}
                            name={item.name}
                            img={item.image}
                            status={item.status}
                            species={item.species}
                          />
                        )
                      } else {
                        return <EpisodeItem id={item.id} />
                      }
                    })}
                  </>
                )
              })
            ) : (
              <div>Nothing to show here.</div>
            )}
          </>
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? (
              <>
                Loading{" "}
                <Spinner
                  style={{ display: "inline" }}
                  type="TailSpin"
                  color="#24292e"
                  height={20}
                  width={20}
                />
              </>
            ) : hasNextPage ? (
              "load more"
            ) : (
              "nothing more to load"
            )}
          </Button>
          {/* <button
            onClick={() => options.fetchNextPage()}
            disabled={isFetchingNextPage || !hasNextPage}
          >
            {options.isFetchingNextPage
              ? "loading"
              : options.hasNextPage
              ? "load more"
              : "nothing more to load"}
          </button> */}
          {/* <div>
            {options.isFetching && !options.isFetchingNextPage
              ? "loading..."
              : null}
          </div> */}
        </div>
      )}
    </div>
  )
}

export default InfiniteLoadingResults
