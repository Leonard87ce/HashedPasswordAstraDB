import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('** Make sure your passwords match!!!!')
      return
    }

    axios.post('/signup', {
      userName,
      password
    })

    console.log('userName',userName);
    console.log('password',password);
    console.log('confirmPassword',confirmPassword);
    setError(null)
  }

  return (
    <body>
      <div className="center">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input type="text" required
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          />
          <span></span>
        </div>

        <div className="txt_field">
          <input type="password" required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
        </div>

        <div className="txt_field">
          <input type="password" required
          span
          placeholder="Check-Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span></span>
        </div>
        <input type="submit"/>
        <p>{error}</p>
      </form>
      </div>
    </body>
  );
}

export default App;
