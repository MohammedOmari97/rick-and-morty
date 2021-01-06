import React from "react"
import Layout from "../../components/layout"
import Results from "../../components/results"
import { useRouter } from "next/router"

function Characters() {
  const router = useRouter()

  console.log(router)

  const { name } = router.query
  const search = { name }
  console.log(search)

  let type

  if (Array.isArray(router.query.id)) {
    type = router.query.id[0]
  } else if (typeof router.query.id === "string") {
    type = router.query.id
  } else {
    type = null
  }

  return (
    <Layout>
      <Results
        resultsFor="episodes"
        page={router.query.page}
        type={type}
        search={search}
      />
    </Layout>
  )
}

export default Characters
