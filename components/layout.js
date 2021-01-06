import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Devtools from "./devtools"
// import CacheConfigProvider from "./cacheConfigProvider"
// import ControlsProvider from "./controlsContext"
import Options from "./options"

export default function Layout({ children }) {
  return (
    // <ControlsProvider>
    // <CacheConfigProvider>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <div className={styles.content}>
        <Options />
        {children}
      </div>

      <Devtools />
    </div>
    // </CacheConfigProvider>
    // </ControlsProvider>
  )
}
