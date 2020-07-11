import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"

const FormPage = () => (
  <Layout>
    <SEO title="Form Page" />
    <h1>This is the Form page</h1>
    <Form />
  </Layout>
)

export default FormPage
