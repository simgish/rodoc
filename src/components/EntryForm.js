import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import entryService from '../services/EntryService'
import { useState } from 'react';

const EntryForm = ({ addNewEntry }) => {

  const [theImage, setTheImage] = useState();

  const createEntry = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "uploadedImage",
      event.target.imageUpload.files[0],
      event.target.imageUpload.files[0].name
    );
    formData.append('category', event.target.category.value);
    formData.append('title', event.target.title.value);
    formData.append('summary', event.target.summary.value);
    formData.append('date', new Date());

    setTheImage(URL.createObjectURL(formData.get('uploadedImage')));

    entryService.createEntry(formData)
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
        <ul>
          <li>
            <img alt="" src={theImage} />
          </li>
        </ul>
      </form >
    </div>
  )
}

export default EntryForm;