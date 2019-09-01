import React from "react"
import PropTypes from "prop-types"

const Search = ({ searchTerm, onChange, children, onSubmit, searchRef }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      name="search"
      id=""
      onChange={onChange}
      value={searchTerm}
      ref={searchRef}
    />
    <button type="submit">{children}</button>
  </form>
)

export default Search

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  searchRef: PropTypes.func
}
