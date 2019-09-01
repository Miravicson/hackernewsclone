import React from "react"
import Button from "../Button"
import classnames from "classnames"
import PropTypes from "prop-types"

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const buttonClass =
    activeSortKey === sortKey
      ? ["button-inline", "button-active"]
      : ["button-inline"]

  const smartButtonClass = classnames("button-inline", {
    "button-active": sortKey === activeSortKey
  })
  return (
    <Button onClick={() => onSort(sortKey)} className={smartButtonClass}>
      {children}
    </Button>
  )
}

export default Sort

Sort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  activeSortKey: PropTypes.string.isRequired
}
