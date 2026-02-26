const Logout = ({ name, handleLogout }) => (
  <div>
    <h2>Welcome {name}</h2>
    <button onClick={handleLogout}>logout</button>
  </div>  
)

export default Logout