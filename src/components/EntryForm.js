import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import AddCategoryModal from './AddCategoryModal';
import db from '../firebase.config';
import { storage } from '../firebase.config';

const EntryForm = ({ addNewEntry, addNewCategory, categories }) => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const createEntry = async (event) => {
    event.preventDefault();
    let imageNames = [];
    let imageSrcs = [];

    for (let i = 0; i < selectedImages.length; i++) {
      imageNames.push(selectedImages[i].name);
      imageSrcs.push(URL.createObjectURL(selectedImages[i]));
      console.log('filename: ', selectedImages[i].name);
      const uploadTask = storage.ref(`/images/${selectedImages[i].name}`).put(selectedImages[i]);
      uploadTask.on('state_changed',
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err) => {
          //catches the errors
          console.log(err)
        }, () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage.ref('images').child(selectedImages[i].name).getDownloadURL()
            .then(fireBaseUrl => {
              // setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
              console.log(fireBaseUrl);
            })
        })
    }
    return;

    const date = new Date();
    const entry = {
      category: event.target.category.value,
      title: event.target.title.value,
      summary: event.target.summary.value,
      createdAt: date.toUTCString(),
      updatedAt: date.toUTCString(),
      images: imageNames,
      imageSrcs: imageSrcs,
    }

    await db.collection("entries").add(entry).then(firestoreResult => {
      entry.id = firestoreResult.id;
      addNewEntry(entry);
    });

  };

  const imageWasSelected = (event) => {
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

  const closeAddCategoryModal = () => {
    setShowAddCategoryModal(false);
  }

  const renderAddCategoryModal = () => {
    if (showAddCategoryModal) {
      return <AddCategoryModal addNewCategory={addNewCategory} closeModal={closeAddCategoryModal} />
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

      {renderAddCategoryModal()}

    </div>
  )
}

export default EntryForm;