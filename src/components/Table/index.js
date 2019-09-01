import React from "react"
import PropTypes from "prop-types"

import Button from "../Button"
import Sort from "../Sort"

import { SORTS } from "../../constants"

const Table = ({ list, onDismiss, onSort, sortKey, isSortReverse }) => {
  const sortedList = SORTS[sortKey](list)
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList
  return (
    <div className="table">
      <div className="table-header">
        <span style={{ width: "40%" }}>
          <Sort sortKey="TITLE" onSort={onSort} activeSortKey={sortKey}>
            Title
          </Sort>
        </span>
        <span style={{ width: "30%" }}>
          <Sort sortKey="AUTHOR" onSort={onSort} activeSortKey={sortKey}>
            Author
          </Sort>
        </span>
        <span style={{ width: "10%" }}>
          <Sort sortKey="COMMENTS" onSort={onSort} activeSortKey={sortKey}>
            Comments
          </Sort>
        </span>
        <span style={{ width: "10%" }}>
          <Sort sortKey="POINTS" onSort={onSort} activeSortKey={sortKey}>
            Points
          </Sort>
        </span>
        <span style={{ width: "10%" }}>Archive</span>
      </div>
      {reverseSortedList.map(item => (
        <div key={item.objectID} className="table-row">
          <span style={{ width: "40%" }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: "30%" }}>{item.author}</span>
          <span style={{ width: "10%" }}>{item.num_comments}</span>
          <span style={{ width: "10%" }}>{item.points}</span>
          <span style={{ width: "10%" }}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Table

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  isSortReverse: PropTypes.bool.isRequired
}
