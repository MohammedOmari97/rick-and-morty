import React from "react"
import { useRouter } from "next/router"
import Layout from "../../components/layout"
import Results from "../../components/results"

function Character() {
  const router = useRouter()
  console.log(router)
  let id = router?.query?.id?.length > 0 ? router.query.id[0] : null

  return (
    <div>
      <Layout>
        <Results resultsFor="character" id={id} />
      </Layout>
    </div>
  )
}

export default Character
