import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

let netlifyIdentity
if (typeof window !== "undefined") {
  netlifyIdentity = require("netlify-identity-widget")
}

const LoginPage = () => {
  useEffect(() => {
    netlifyIdentity.init({})
  })

  return (
    <Layout>
      <SEO title="Login" />
      <h1>Login</h1>
      <button
        onClick={() => {
          netlifyIdentity.open()
        }}
      >
        Login
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

export default LoginPage
