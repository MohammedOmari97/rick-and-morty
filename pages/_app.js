import "../styles/globals.scss"
import "../styles/pagination.scss"
import CacheConfigProvider from "../components/cacheConfigProvider"
import ControlsProvider from "../components/controlsContext"

function MyApp({ Component, pageProps }) {
  return (
    <ControlsProvider>
      <CacheConfigProvider>
        <Component {...pageProps} />
      </CacheConfigProvider>
    </ControlsProvider>
  )
}

export default MyApp
