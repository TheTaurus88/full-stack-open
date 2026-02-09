const Form = ({filter, handleChange}) => {
  return (
    <div>
      <form>
      find countries
      <input value={filter} onChange={handleChange}></input>
      </form>
    </div>
  )
}

export default Form