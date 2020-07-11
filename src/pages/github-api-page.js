import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"

const AboutPage = () => {
  const [user, setUser] = useState()
  const [repos, setRepos] = useState([])

  const handleGetRepos = () => {
    axios
      .get(`https://api.github.com/users/${user}/repos`)
      .then(response => setRepos(response.data))
  }

  return (
    <Layout>
      <h1>Github API Page</h1>
      <input onChange={e => setUser(e.target.value)} />
      <button onClick={handleGetRepos}>Get my repos</button>
      <br />

      <ul>
        {repos.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <br />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default AboutPage
