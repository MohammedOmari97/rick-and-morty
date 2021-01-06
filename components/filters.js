import React, { useState } from "react"
import styles from "./styles/filters.module.scss"
import Select from "react-select"
import Button from "./button"
import { useRouter } from "next/router"

const selectStyles = {
  container: (provided) => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused
      ? "0 0 0 3px #2563EB88"
      : "0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    borderColor: state.isFocused ? "#2563EB" : provided.borderColor,
  }),
}

function Filters({ selectedTab }) {
  if (!selectedTab || selectedTab === "episodes") return null

  const router = useRouter()
  console.log(router)

  const [queries, setQueries] = useState({
    status: router.query.status,
    gender: router.query.gender,
    species: router.query.species,
  })
  console.log(queries)

  let { species, status, gender } = router.query
  console.log(species, status, gender)

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <span>Status: </span>
        <Select
          isClearable
          value={
            queries.status
              ? { value: queries.status, label: queries.status }
              : null
          }
          styles={selectStyles}
          options={[
            { value: "Alive", label: "Alive" },
            { value: "Dead", label: "Dead" },
            { value: "Unknown", label: "Unknown" },
          ]}
          onChange={(props, { action }) => {
            if (action === "clear") {
              let temp = { ...queries }
              delete temp.status
              setQueries(temp)
            } else {
              setQueries((queries) => ({ ...queries, status: props.value }))
            }
            // router.push({
            //   pathname: router.pathname,
            //   query: { ...router.query, status: props.value },
            // })
          }}
        />
      </div>
      <div className={styles.filter}>
        <span>Species: </span>
        <Select
          isClearable
          value={
            queries.species
              ? { value: queries.species, label: queries.species }
              : null
          }
          styles={selectStyles}
          options={[
            { value: "Human", label: "Human" },
            { value: "Alien", label: "Alien" },
            { value: "Robot", label: "Robot" },
            { value: "Humanoid", label: "Humanoid" },
            { value: "Mythological Creature", label: "Mythological Creature" },
            { value: "Disease", label: "Disease" },
            { value: "Unknown", label: "Unknown" },
          ]}
          onChange={(props, { action }) => {
            if (action === "clear") {
              let temp = { ...queries }
              delete temp.species
              setQueries(temp)
            } else {
              setQueries((queries) => ({ ...queries, species: props.value }))
            }
            // setQueries((queries) => ({ ...queries, species: props.value }))
            // router.push({
            //   pathname: router.pathname,
            //   query: { ...router.query, species: props.value },
            // })
          }}
        />
      </div>
      <div className={styles.filter}>
        <span>Gender: </span>
        <Select
          isClearable
          value={
            queries.gender
              ? { value: queries.gender, label: queries.gender }
              : null
          }
          styles={selectStyles}
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Unknown", label: "Unknown" },
            { value: "Genderless", label: "Genderless" },
          ]}
          onChange={(props, { action }) => {
            if (action === "clear") {
              let temp = { ...queries }
              delete temp.gender
              setQueries(temp)
            } else {
              setQueries((queries) => ({ ...queries, gender: props.value }))
            }
            // setQueries((queries) => ({ ...queries, gender: props.value }))
            // router.push({
            //   pathname: router.pathname,
            //   query: { ...router.query, gender: props.value },
            // })
          }}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            console.log(router)
            let temp = { ...router.query }
            for (let key in temp) {
              if (!(key in queries)) {
                if (key !== "id" && key !== "page" && key !== "name") {
                  console.log(key === "id")
                  console.log(key === "page")
                  console.log(key)
                  delete temp[key]
                }
              }
            }
            console.log(temp)
            if (router.query) {
              console.log(router)
              if (Array.isArray(router.query.id)) {
                router.push({
                  // pathname: `${router.pathname}/${router.query.id[0]}`,
                  pathname: `${router.pathname}`,
                  query: { ...temp, ...queries },
                })
              } else if (typeof router.query.id === "string") {
                console.log(router)
                console.log(router.pathname.split("/")[1])
                router.push({
                  pathname: `${router.pathname}`,
                  query: { ...temp, ...queries, page: 1 },
                })
              } else {
                router.push({
                  pathname: router.pathname,
                  query: { ...temp, ...queries },
                })
              }
            }
            // router.push({
            //   pathname: router.pathname,
            //   query: { ...temp, ...queries },
            // })
          }}
        >
          Filter
        </Button>
      </div>
    </div>
  )
}

export default Filters
