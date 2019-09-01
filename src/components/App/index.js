import React, { Component } from "react"
import PropTypes from "prop-types"
import axios from "axios"

import Button from "../Button"
import Table from "../Table"
import Search from "../Search"
import { withLoading, updateSearchTopStoriesState } from "../../utils"

import "./index.css"

import {
  DEFAULT_HPP,
  DEFAULT_QUERY,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_BASE,
  PATH_SEARCH
} from "../../constants"

const ButtonWithLoading = withLoading(Button)
class App extends Component {
  _isMounted = false
  state = {
    results: null,
    searchKey: "",
    searchTerm: DEFAULT_QUERY,
    error: null,
    isLoading: false,
    sortKey: "NONE",
    isSortReverse: false
  }

  searchRef = null

  createRef = element => (this.searchRef = element)

  focusSearch = () => this.searchRef && this.searchRef.focus()

  onDismiss = id => {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]
    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId)
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    })
  }

  onSort = sortKey =>
    this.setState(prevState => ({
      sortKey,
      isSortReverse: prevState.sortKey === sortKey && !prevState.isSortReverse
    }))
  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm]
  }

  onSearchChange = ({ target: { value } }) => {
    this.setState({ searchTerm: value })
  }

  onSearchSubmit = event => {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm)
    }
    event.preventDefault()
  }

  setSearchTopStories(result) {
    const { hits, page } = result
    this.setState(updateSearchTopStoriesState(hits, page))
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true })
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  componentDidMount() {
    this._isMounted = true
    const { searchTerm } = this.state
    this.focusSearch()
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading,
      sortKey,
      isSortReverse
    } = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list =
      (results && results[searchKey] && results[searchKey].hits) || []

    if (error) {
      return <p>Something went wrong</p>
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTerm={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            searchRef={this.createRef}
          >
            Search
          </Search>
        </div>

        <Table
          list={list}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
          sortKey={sortKey}
          onSort={this.onSort}
          isSortReverse={isSortReverse}
        />

        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    )
  }
}

export default App
