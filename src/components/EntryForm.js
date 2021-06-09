import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { createEntry } from '../actions/CreateEntry'

const EntryForm = () => {

  const dispatch = useDispatch();

  const addEntry = (event) => {
    event.preventDefault();
    const newEntry = {
      title: event.target.title.value,
      content: 'fake content'
    }
    dispatch(createEntry(newEntry));
  }

  return(
    <form onSubmit={addEntry}>
      <input type="text" name="title" />
      <button type="submit"><FontAwesomeIcon icon={faPlusSquare} /></button>
    </form>
  )
}

export default EntryForm;