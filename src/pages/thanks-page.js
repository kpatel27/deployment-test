import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ThanksPage = () => (
  <Layout>
    <SEO title="Thanks Page" />
    <h1>Thanks =)</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ThanksPage
