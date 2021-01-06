import React, { useEffect } from "react"
import Layout from "../components/layout"
import Results from "../components/results"
import { useRouter } from "next/router"

function Characters() {
  const router = useRouter()

  return (
    <Layout>
      <Results resultsFor="characters" page={router.query.page} />
    </Layout>
  )
}

export default Characters
