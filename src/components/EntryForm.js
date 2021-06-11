import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
// import { useDispatch } from 'react-redux'
// import { createEntry } from '../actions/CreateEntry'
import entryService from '../services/EntryService'

const EntryForm = ({addNewEntry}) => {

  // const dispatch = useDispatch();

  const createEntry = (event) => {
    event.preventDefault();
    
    const newEntry = {
      title: event.target.title.value,
      content: 'fake content',
      date: new Date()
    }

    entryService.createEntry(newEntry)
      .then(response => {
        console.log('response: ', response.data);
        addNewEntry(response.data);
      })
    // dispatch(createEntry(newEntry));
  }

  return(
    <form onSubmit={createEntry}>
      <input type="text" name="title" />
      <button type="submit"><FontAwesomeIcon icon={faPlusSquare} /></button>
    </form>
  )
}

export default EntryForm;