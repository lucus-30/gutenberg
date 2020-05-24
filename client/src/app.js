import React, { useReducer } from "react"
import { Layout, Input, Select, List, Card, Descriptions } from "antd"
import Api from "services/api"

const { Header, Content } = Layout
const { Option } = Select

const initialState = {
  field: "title",
  query: "",
  isLoading: false,
  books: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        field: action.payload,
      }
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_BOOKS":
      return {
        ...state,
        isLoading: false,
        books: action.payload,
      }
    default:
      return state
  }
}

const SearchResults = ({dataSource}) => {
  return (
    <List 
      grid={{ gutter: 16, column: 4 }}
      dataSource={dataSource}
      renderItem={item => (
        <List.Item>
          <Card title={item.title}>
            <Descriptions column={1}>
              <Descriptions.Item label="Authors">{item.authors}</Descriptions.Item>
              <Descriptions.Item label="Publication Date">{item.publication_date.split("-").reverse().join("/")}</Descriptions.Item>
              <Descriptions.Item label="Authors">{item.authors}</Descriptions.Item>
              <Descriptions.Item label="Subjects">{item.subjects}</Descriptions.Item>
              <Descriptions.Item label="Publisher">{item.publisher}</Descriptions.Item>
            </Descriptions>
          </Card>
        </List.Item>
      )}
    />
  )  
}

const App = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)
  const searchHandler = query => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    })
    Api.Search({
      field: state.field,
      query,
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_BOOKS",
          payload: data,
        })
        dispatch({
          type: "SET_LOADING",
          payload: false,
        })
      })
      .catch(console.log)
  }
  const books =
    state.books.length > 0 ? <SearchResults dataSource={state.books} /> : null
  return (
    <Layout>
      <Header className="header" style={{ background: "#fff" }}>
        <Input.Group compact style={{ margin: "16px 0" }}>
          <Select defaultValue="title">
            <Option value="title">Title</Option>
            <Option value="authors">Author</Option>
          </Select>
          <Input.Search
            placeholder="input search text"
            enterButton
            style={{ width: "30%" }}
            onSearch={searchHandler}
          />
        </Input.Group>
      </Header>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: "91vh",
          }}
        >
          {books}
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
