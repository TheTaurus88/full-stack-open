const Login = ({ username, setUsername, password, setPassword, handleSubmitLogin }) => (
  <div>
    <h1>Login to application</h1>
    <form onSubmit={handleSubmitLogin}>
      <div>
        <label>
          username
          <input type="text" 
          value={username} 
          onChange={({ target }) => setUsername(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          password
          <input type="text"
          value={password} 
          onChange={({ target }) => setPassword(target.value)}/>
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </div>  
)

export default Login