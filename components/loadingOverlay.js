import React from "react"
import Spinner from "react-loader-spinner"
import styles from "./styles/loadingOverlay.module.scss"

function LoadingOverlay({ children, isActive }) {
  return (
    <div className={styles.overlayContainer}>
      {children}
      {isActive && (
        <div className={styles.overlay}>
          <Spinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            type="TailSpin"
            color="#24292e"
            height={30}
            width={30}
          />
        </div>
      )}
    </div>
  )
}

export default LoadingOverlay
