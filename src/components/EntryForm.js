import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import entryService from '../services/EntryService'

const EntryForm = ({ addNewEntry }) => {

  const createEntry = (event) => {
    event.preventDefault();

    console.log(event.target.imageUpload.files[0]);

    const formData = new FormData();
    formData.append(
      "UploadedImage",
      event.target.imageUpload.files[0],
      event.target.imageUpload.files[0].name
    );

    const newEntry = {
      category: event.target.category.value,
      title: event.target.title.value,
      summary: event.target.summary.value,
      imageUpload: formData,
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
              <option value="" defaultValue="">Select a Category</option>
              <option value="Schedule">Schedule</option>
              <option value="Schoolwork">Schoolwork</option>
              <option value="Bedtime">Bedtime</option>
            </select>
          </li>
          <li className="title-input">
            <input type="text" name="title" autoComplete="off" placeholder="Title" />
          </li>
          <li>
            <textarea className="summary-content" name="summary" rows="10" placeholder="Summary"></textarea>
          </li>
          <li>
            <input type="file" name="imageUpload" accept="image/*" />
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