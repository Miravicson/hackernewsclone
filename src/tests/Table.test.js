import React from "react"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Table from "../components/Table"
// import { SORTS } from "../constants"

Enzyme.configure({ adapter: new Adapter() })
describe("Table:", () => {
  const props = {
    list: [
      { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
      { title: "2", author: "2", num_comments: 1, points: 2, objectID: "z" }
    ],
    sortKey: "NONE",
    isSortReverse: false,
    onSort: () => {},
    onDismiss: () => {}
  }

  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Table {...props} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it("shows to items in the list", () => {
    const element = shallow(<Table {...props} />)
    expect(element.find(".table-row").length).toBe(2)
  })

  test("it should match snapshot", () => {
    const list = []
    const component = renderer.create(<Table {...props} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
