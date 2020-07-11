import React, { useState, useReducer } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"

import Layout from "../components/layout"
import SEO from "../components/seo"

let netlifyIdentity
if (typeof window !== "undefined") {
  netlifyIdentity = require("netlify-identity-widget")
}

const ADD_TODO = gql`
  mutation AddTodo($body: String!) {
    addTodo(body: $body) {
      id
    }
  }
`

const UPDATE_TODO_COMPLETED = gql`
  mutation UpdateTodoCompleted($id: ID!) {
    updateTodoCompleted(id: $id) {
      body
      completed
    }
  }
`

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      body
      completed
    }
  }
`

// const todosReducer = (state, action) => {
//   switch (action.type) {
//     case "addTodo":
//       return [{ completed: false, body: action.payload }, ...state]
//     case "toggleTodoCompleted":
//       const newState = [...state]
//       console.log(action.payload)
//       newState[action.payload] = {
//         completed: !state[action.payload].completed,
//         body: state[action.payload].body,
//       }
//       return newState
//   }
// }

const TodoPage = () => {
  const [newTodoBody, setNewTodoBody] = useState("")
  // const [todos, setTodos] = useState([])
  // const [todos, dispatch] = useReducer(todosReducer, [])
  // data we need is coming from the query below so don't need 2nd const {data} here
  const [addTodo] = useMutation(ADD_TODO)
  const [updateTodoCompleted] = useMutation(UPDATE_TODO_COMPLETED)
  const { loading, error, data, refetch } = useQuery(GET_TODOS)
  console.log(data)

  const handleSubmit = async e => {
    e.preventDefault()
    await addTodo({ variables: { body: newTodoBody } })
    // dispatch({ type: "addTodo", payload: newTodoBody })
    setNewTodoBody("")
    await refetch()
  }

  return (
    <Layout>
      <SEO title="Todo" />
      <h1>This is the Todo Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Add a todo</label>
        <p>
          <input
            name="name"
            value={newTodoBody}
            onChange={e => setNewTodoBody(e.target.value)}
          />
        </p>
        <input type="submit" value="Add" />
      </form>
      {loading && <div>loading...</div>}
      {error && <div>{console.log(error.message)}No Todos</div>}
      {!loading && !error && (
        <ul style={{ listStyle: "none", marginLeft: "0" }}>
          {data.todos.map(todo => (
            <li key={todo.id}>
              <input
                onChange={async () => {
                  await updateTodoCompleted({ variables: { id: todo.id } })
                  await refetch()
                }}
                checked={todo.completed}
                type="checkbox"
              />
              <span style={{ marginLeft: "10px" }}>{todo.body}</span>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => {
          console.log(netlifyIdentity.currentUser())
        }}
      >
        Log current user
      </button>
    </Layout>
  )
}

export default TodoPage
