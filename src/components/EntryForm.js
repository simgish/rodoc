import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const EntryForm = () => {

  const addEntry = (event) => {
    event.preventDefault();
    console.log('new entry: ', event.target.title.value);
  }

  return(
    <form onSubmit={addEntry}>
      <input type="text" name="title" />
      <button type="submit"><FontAwesomeIcon icon={faPlusSquare} /></button>
    </form>
  )
}

export default EntryForm;