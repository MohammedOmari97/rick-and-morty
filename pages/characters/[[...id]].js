import React from "react"
import Layout from "../../components/layout"
import Results from "../../components/results"
import { useRouter } from "next/router"

function Characters() {
  const router = useRouter()

  console.log(router)

  const { status, gender, species, name } = router.query
  const filters = { status, gender, species }
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
        resultsFor="characters"
        page={router.query.page || 1}
        type={type}
        filters={filters}
        search={search}
      />
    </Layout>
  )
}

export default Characters
