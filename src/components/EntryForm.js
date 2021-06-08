const EntryForm = () => {

  const addEntry = (event) => {
    event.preventDefault();
    console.log('new entry: ', event.target.title.value);
  }

  return(
    <form onSubmit={addEntry}>
      <input type="text" name="title" />
      <button type="submit">Add</button>
    </form>
  )
}

export default EntryForm;