import React, { useState } from "react"

const Form = () => {
  const [name, setName] = useState("")
  const [level, setLevel] = useState("")
  const [message, setmessage] = useState("This site is amazing...")
  return (
    <form
      method="post"
      netlify-honeypot="bot-field"
      data-netlify="true"
      name="contact"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <label htmlFor="name">Who are you? </label>
      <p>
        <input
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </p>
      <label htmlFor="level">How great is Launch School?</label>
      <p>
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          name="level"
          id="level"
        >
          <option value="more">So great</option>
          <option value="more">Pretty great</option>
          <option value="most">The most greatest</option>
        </select>
      </p>
      <label htmlFor="message">Write a nice message to us: </label>
      <p>
        <textarea
          name="message"
          value={message}
          onChange={e => setmessage(e.target.value)}
        />
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  )
}

export default Form
