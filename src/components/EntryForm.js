import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import entryService from '../services/EntryService'

const EntryForm = ({ addNewEntry }) => {

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
  }

  return (
    <div className="entry-form">
      <form onSubmit={createEntry}>
        <ul className="entry-form">
          <li className="category-select">
            <select name="category">
              <option value="Schedule">Schedule</option>
              <option value="Schoolwork">Schoolwork</option>
              <option value="Bedtime">Bedtime</option>
            </select>
          </li>
          <li className="title-input">
            <input type="text" name="title" autocomplete="off" placeholder="Title" />
          </li>
          <li>
            {/* <label>Summary</label> */}
            <textarea className="summary-content" name="summaryContent" rows="10" placeholder="Summary"></textarea>
          </li>
          <li className="submit-button">
            <button type="submit">Add Entry <FontAwesomeIcon icon={faPlusSquare} /></button>
          </li>
        </ul>
      </form >
    </div>
  )
}

export default EntryForm;