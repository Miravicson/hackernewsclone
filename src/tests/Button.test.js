import React from "react"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"
import Button from "../components/Button"

describe("Test for the Button component", () => {
  const onClick = () => {}
  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Button onClick={onClick}>Give Me More</Button>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test("has a valid snapshot", () => {
    const compoonent = renderer.create(
      <Button onClick={onClick}>Give Me More</Button>
    )
    let tree = compoonent.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
