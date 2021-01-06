import React, { useState, useRef, useEffect, useContext } from "react"
import { useQuery } from "react-query"
import Paginate from "react-paginate"
import { useRouter } from "next/router"
import styles from "./styles/paginated.module.scss"
import CharacterItem from "./characterItem"
import Spinner from "react-loader-spinner"
import { getUrl } from "../utils/utils"
import EpisodeItem from "./episodeItem"
import { getResults } from "./api"
import { controlsContext } from "./controlsContext"

function PaginatedResults({
  resultsFor,
  id,
  page,
  filters,
  search,
  parentRef,
}) {
  const router = useRouter()

  console.log(page)
  const [selectedPage, setSelectedPage] = useState(page || 1)

  const { controls } = useContext(controlsContext)

  console.log("Paginated results re-rendered ✅✅✅")

  useEffect(() => {
    setSelectedPage(page)
  }, [page])

  let queryId
  if (id) {
    queryId = [resultsFor, id, filters]
  } else if (page) {
    queryId = [resultsFor, page, filters, search]
  } else {
    queryId = [resultsFor, 1, filters, search]
  }

  console.log(getUrl(resultsFor, id, page, filters))
  const { status, data } = useQuery(queryId, async () => {
    return await getResults(
      controls,
      getUrl(resultsFor, id, page, filters, search)
    )
    // return fetch(getUrl(resultsFor, id, page, filters, search))
    //   .then((r) => r.json())
    //   .then((r) => {
    //     if (id) {
    //       return r
    //     } else {
    //       return r
    //     }
    //   })
  })

  const paginationRef = useRef()

  useEffect(() => {
    if (data && data.results) {
      // paginationRef.current.scrollIntoView()
      parentRef.current.scrollIntoView()
    }
  }, [data])

  const pagesNum = useRef(1)

  if (data && data.info) {
    pagesNum.current = data.info.pages
  }

  console.log(router.query.page)
  if (!router.query.page) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: Number(selectedPage) },
    })
  } else {
    console.log(router.query.page)
  }

  console.log(status)
  console.log(selectedPage)

  return (
    <div
      ref={paginationRef}
      style={{ width: "100%" }}
      className={styles.container}
    >
      {!id ? (
        <Paginate
          pageCount={pagesNum.current}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageClassName="page"
          pageLinkClassName="pageLink"
          activeClassName="active"
          containerClassName="paginationContainer"
          breakLabel="&nbsp;&nbsp;&nbsp;"
          breakClassName="break"
          nextClassName="nextBtn"
          previousClassName="prevBtn"
          onPageChange={({ selected }) => {
            console.log(selected + "👊👊")
            setSelectedPage(selected)
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page: Number(selected) + 1 },
            })
          }}
          disableInitialCallback
          initialPage={+selectedPage - 1}
          forcePage={+selectedPage - 1}
        />
      ) : null}
      <div className={styles.content}>
        {status === "loading" ? (
          <Spinner
            style={{ display: "inline" }}
            type="TailSpin"
            color="#24292e"
            height={30}
            width={30}
          />
        ) : status === "error" ? (
          <div>Unable to fetch characters!</div>
        ) : (
          <>
            {data.results ? (
              data.results.map((item) => {
                if (resultsFor === "characters") {
                  return (
                    <CharacterItem
                      id={item.id}
                      name={item.name}
                      img={item.image}
                      status={item.status}
                      species={item.species}
                      key={item.id}
                    />
                  )
                } else {
                  return <EpisodeItem id={item.id} />
                }
              })
            ) : (
              <div>Nothing to show here.</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PaginatedResults
