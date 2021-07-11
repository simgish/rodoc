import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import entryService from '../services/EntryService'
import { useState } from 'react';
import AddCategoryModal from './AddCategoryModal';
import db from '../firebase.config';

const EntryForm = ({ addNewEntry, addNewCategory, categories }) => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // const createEntry = (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();

  //   for (let i = 0; i < selectedImages.length; i++) {
  //     formData.append(`selectedImages[${i}]`, selectedImages[i]);
  //   }

  //   formData.append('category', event.target.category.value);
  //   formData.append('title', event.target.title.value);
  //   formData.append('summary', event.target.summary.value);
  //   formData.append('date', new Date());

  //   entryService.createEntry(formData)
  //     .then(response => {
  //       console.log('response: ', response.data);
  //       addNewEntry(response.data);
  //     })
  // }

  const createEntry = async (event) => {
    event.preventDefault();
    const date = new Date();

    await db.collection("entries").add({
      title: event.target.title.value,
      summary: event.target.summary.value,
      createdAt: date.toUTCString(),
      updatedAt: date.toUTCString(),
    });
  };

  const imageWasSelected = (event) => {
    console.log(event.target.files[0]);
    const selectedImage = event.target.files[0];
    setSelectedImages(selectedImages.concat(selectedImage));
  }

  const removeImage = (lastModified) => {
    const newSelectedImages = selectedImages.filter((img) => img.lastModified !== lastModified);
    setSelectedImages(newSelectedImages);
  }

  const categorySelected = (e) => {
    if (e.target.value === 'addNewCategory') {
      setShowAddCategoryModal(true);
    }
  }

  const renderAddCategoryModal = () => {
    if (showAddCategoryModal) {
      return <AddCategoryModal addNewCategory={addNewCategory} />
    }
  }

  return (
    <div className="entry-form">
      <form onSubmit={createEntry}>
        <ul className="entry-form">
          <li className="category-select">
            <select name="category" onChange={categorySelected}>
              <option value="">Select a Category</option>
              <option value="addNewCategory">Add New Category...</option>
              {categories.map(function (category) {
                return <option value={category}>{category}</option>
              })}
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
            <button type="submit" className="add-entry-button">Add Entry <FontAwesomeIcon icon={faPlusSquare} /></button>
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
      
      { renderAddCategoryModal() }
      
    </div>
  )
}

export default EntryForm;