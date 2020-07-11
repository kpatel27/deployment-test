import React, { useEffect } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

let netlifyIdentity
if (typeof window !== "undefined") {
  netlifyIdentity = require("netlify-identity-widget")
}

const IndexPage = () => {
  useEffect(() => {
    netlifyIdentity.init({
      namePlaceholder: "Name",
    })
  })
  return (
    <Layout>
      <SEO title="Home" />
      <h1>This is the Homepage</h1>
      <Link to="/about-page/">Go to the About page</Link> <br />
      <Link to="/github-api-page/">Go to the Github repos page</Link> <br />
      <Link to="/form-page/">Send me a message</Link> <br />
      <Link to="/todo-page/">Go to the Todos page</Link> <br />
      <hr />
      <button
        onClick={() => {
          netlifyIdentity.open()
        }}
      >
        Login / Logout
      </button>
      <br />
      <button
        onClick={() => {
          console.log(netlifyIdentity.currentUser())
        }}
      >
        Log Current User
      </button>
    </Layout>
  )
}

export default IndexPage
