import React from "react"
import Loading from "../components/Loading/"

export const isSearched = searchTerm => item => {
  return searchTerm === ""
    ? item
    : item.filter(item =>
        item.title.toLowerCase().match(searchTerm.toLowerCase())
      )
}

export const withLoading = Component => ({ isLoading, ...rest }) => {
  return isLoading ? <Loading /> : <Component {...rest} />
}

export const updateSearchTopStoriesState = (hits, page) => prevState => {
  const { searchKey, results } = prevState
  const oldHits = results && results[searchKey] ? results[searchKey].hits : []
  const updatedHits = [...oldHits, ...hits]
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  }
}
