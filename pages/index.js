// import Head from "next/head"
// import styles from "../styles/Home.module.scss"
// import Devtools from "../components/devtools"
// import CacheConfigProvider from "../components/cacheConfigProvider"
// import ControlsProvider from "../components/controlsContext"
// import Options from "../components/options"
// import Results from "../components/results"
import Layout from "../components/layout"
import Results from "../components/results"

export default function Home() {
  return (
    <Layout>
      <Results />
    </Layout>
  )

  // console.log("rendering")
  // return (
  //   <ControlsProvider>
  //     <CacheConfigProvider>
  //       <div className={styles.container}>
  //         <Head>
  //           <title>Create Next App</title>
  //           <link rel="icon" href="/favicon.ico" />
  //           <link
  //             href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
  //             rel="stylesheet"
  //           ></link>
  //         </Head>

  //         <div className={styles.content}>
  //           <Options />
  //           <Results />
  //         </div>

  //         <Devtools />
  //       </div>
  //     </CacheConfigProvider>
  //   </ControlsProvider>
  // )
}
