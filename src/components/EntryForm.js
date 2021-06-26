import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import entryService from '../services/EntryService'
import { useState } from 'react';

const EntryForm = ({ addNewEntry }) => {

  const [selectedImages, setSelectedImages] = useState([]);

  const createEntry = (event) => {
    event.preventDefault();

    const formData = new FormData();

    console.log('selectedImages: ', selectedImages);

    formData.append(
      "uploadedImage",
      event.target.imageUpload.files[0],
      event.target.imageUpload.files[0].name
    );

    // for (var x = 0; x < ins; x++) {
    //   fd.append("fileToUpload[]", document.getElementById('fileToUpload').files[x]);
    // }

    formData.append('category', event.target.category.value);
    formData.append('title', event.target.title.value);
    formData.append('summary', event.target.summary.value);
    formData.append('date', new Date());

    // setTheImage(URL.createObjectURL(formData.get('uploadedImage')));

    entryService.createEntry(formData)
      .then(response => {
        console.log('response: ', response.data);
        addNewEntry(response.data);
      })
  }

  const imageWasSelected = (event) => {
    console.log(event.target.files[0]);
    const selectedImage = event.target.files[0];
    setSelectedImages(selectedImages.concat(selectedImage));
  }

  const removeImage = (lastModified) => {
    const newSelectedImages = selectedImages.filter((img) => img.lastModified !== lastModified);
    setSelectedImages(newSelectedImages);
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
            <input type="file" name="imageUpload" accept="image/*" onChange={imageWasSelected} />
          </li>
          <li className="submit-button">
            <button type="submit">Add Entry <FontAwesomeIcon icon={faPlusSquare} /></button>
          </li>
        </ul>
        <ul>
          {selectedImages.map(function (image, index) {
            return (
              <li key={index} className="image-wrapper">
                <span className="image-close-button" onClick={() => removeImage(image.lastModified)}><FontAwesomeIcon icon={faTimes} /></span>
                <img alt="" className="image-selected-preview" src={URL.createObjectURL(image)} />
              </li>
            )
          })}
        </ul>
      </form >
    </div>
  )
}

export default EntryForm;