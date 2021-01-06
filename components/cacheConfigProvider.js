import React, { useContext, useEffect } from "react"
import { controlsContext } from "./controlsContext"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function CacheConfigProvider({ children }) {
  const {
    controls: { staleTime, cacheTime },
  } = useContext(controlsContext)

  console.log(staleTime, cacheTime)

  // const config = {
  //   queries: {
  //     staleTime: controls.staleTime,
  //     cacheTime: controls.cacheTime,
  //   },
  // }

  // const queryClient = useMemo(() => {
  //   return new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         staleTime,
  //         cacheTime,
  //       },
  //     },
  //   })
  // }, [staleTime, cacheTime])

  useEffect(() => {
    queryClient.setDefaultOptions({ queries: { cacheTime, staleTime } })
  }, [cacheTime, staleTime])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  // return (
  //   <ReactQueryCacheProvider queryCache={queryCache}>
  //     <ReactQueryConfigProvider config={config}>
  //       {children}
  //     </ReactQueryConfigProvider>
  //   </ReactQueryCacheProvider>
  // )
}

export default CacheConfigProvider
