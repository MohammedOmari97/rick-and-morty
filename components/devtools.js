import React, {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react"
import { ReactQueryDevtoolsPanel } from "react-query/devtools"
import styles from "./styles/devtools.module.scss"
import { controlsContext } from "./controlsContext"
import { useQueryClient } from "react-query"

function Devtools() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const queryClient = useQueryClient()

  const { dispatch } = useContext(controlsContext)

  const [staleTime, setStaleTime] = useState(1000)
  const [cacheTime, setCacheTime] = useState(5 * 60 * 1000)
  const [errorRate, setErrorRate] = useState(0.1)
  const [fetchTimeMin, setFetchTimeMin] = useState(500)
  const [fetchTimeMax, setFetchTimeMax] = useState(1000)

  useEffect(() => {
    console.log(cacheTime, staleTime)
    dispatch({ type: "set-stale-time", payload: { staleTime } })
    dispatch({ type: "set-cache-time", payload: { cacheTime } })
    dispatch({ type: "set-error-rate", payload: { errorRate } })
    dispatch({ type: "set-fetch-time-min", payload: { fetchTimeMin } })
    dispatch({ type: "set-fetch-time-max", payload: { fetchTimeMax } })
  }, [cacheTime, errorRate, fetchTimeMax, fetchTimeMin, staleTime])

  const devtoolsRef = useRef()

  useLayoutEffect(() => {
    if (isDragging) {
      function run(e) {
        let containerHeight = window.innerHeight - e.pageY

        if (containerHeight < 250) {
          // setIsOpen(false)
        } else {
          if (devtoolsRef.current) {
            devtoolsRef.current.style.height = containerHeight + "px"
          }
        }
      }

      document.addEventListener("mousemove", run)
      document.addEventListener("mouseup", handleDragEnd)
      return () => {
        document.removeEventListener("mousemove", run)
        document.removeEventListener("mouseup", handleDragEnd)
      }
    }
  }, [isDragging])

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className={styles.devtoolsLogo}
      ></div>
    )
  }

  function handleDragStart(e) {
    if (e.button !== 0) return

    setIsDragging(true)
  }

  function handleDragEnd() {
    setIsDragging(false)
  }

  return (
    <div ref={devtoolsRef} className={styles.container}>
      <div
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        className={styles.resizer}
      ></div>
      <div className={styles.devtoolsPanel}>
        <div className={styles.fetchOptions}>
          <fieldset>
            <label htmlFor="stale time">Stale time</label>
            <input
              onChange={(e) => setStaleTime(Number(e.target.value))}
              id="stale time"
              type="number"
              value={staleTime}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="cache time">Cache time</label>
            <input
              onChange={(e) => setCacheTime(Number(e.target.value))}
              id="cache time"
              type="number"
              value={cacheTime}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="error rate">Error rate</label>
            <input
              id="error rate"
              type="number"
              min={0}
              max={1}
              step={0.1}
              onChange={(e) => setErrorRate(Number(e.target.value))}
              value={errorRate}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="min fetch">Fetch time min</label>
            <input
              onChange={(e) => setFetchTimeMin(Number(e.target.value))}
              id="min fetch"
              type="number"
              placeholder="1000"
              value={fetchTimeMin}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="max fetch">Fetch time max</label>
            <input
              onChange={(e) => setFetchTimeMax(Number(e.target.value))}
              id="max fetch"
              type="number"
              placeholder="5000"
              value={fetchTimeMax}
            />
          </fieldset>
        </div>
        <div className={styles.extraOptions}>
          <button
            className={styles.danger}
            onClick={() => {
              queryClient.clear()
            }}
          >
            Clear Cache
          </button>
        </div>
        <ReactQueryDevtoolsPanel className={styles.reactQueryDevtoolsPanel} />
      </div>
      <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
        Close
      </button>
    </div>
  )
}

export default Devtools
