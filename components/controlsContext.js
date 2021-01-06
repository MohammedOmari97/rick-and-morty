import React, { createContext, useEffect, useReducer } from "react"

export const controlsContext = createContext()

function ControlsProvider({ children }) {
  const [controls, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "set-stale-time") {
        console.log(state.staleTime)
        console.log(action.payload.staleTime)
        return { ...state, staleTime: action.payload.staleTime }
      } else if (action.type === "set-cache-time") {
        console.log(state.cacheTime)
        console.log(action.payload.cacheTime)
        return { ...state, cacheTime: action.payload.cacheTime }
      } else if (action.type === "set-error-rate") {
        return { ...state, errorRate: action.payload.errorRate }
      } else if (action.type === "set-fetch-time-min") {
        return { ...state, fetchTimeMin: action.payload.fetchTimeMin }
      } else if (action.type === "set-fetch-time-max") {
        return { ...state, fetchTimeMax: action.payload.fetchTimeMax }
      } else {
        return state
      }
    },
    {
      staleTime: 1000,
      cacheTime: 5 * 60 * 1000,
      errorRate: 0.1,
      fetchTimeMin: 1000,
      fetchTimeMax: 3000,
    }
  )

  useEffect(() => {
    console.log("🔴🔴🔴🔴🔴🔴🔴")
    console.log(controls)
  }, [controls])

  return (
    <controlsContext.Provider value={{ controls, dispatch }}>
      {children}
    </controlsContext.Provider>
  )
}

export default ControlsProvider
