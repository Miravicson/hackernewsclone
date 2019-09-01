import React from "react"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"

import Search from "../components/Search"

describe("Search", () => {
  const dummyProps = {
    searchTerm: "redux",
    onChange: () => {},
    onSubmit: () => {}
  }
  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Search {...dummyProps}>Search</Search>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test("it should match snapshot", () => {
    const component = renderer.create(<Search {...dummyProps}>Search</Search>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
