import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import AddCategoryModal from './AddCategoryModal';
import db from '../firebase.config';
import { storage } from '../firebase.config';
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';

const EntryEditForm = ({ editEntry, entries, addNewCategory, categories }) => {
  const [entryToEdit, setEntryToEdit] = useState({});
  const { entryId } = useParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  let promises = [];
  let imageFirebaseUrls = [];

  useEffect(() => {
    let entryData = entries.find((e) => e.id === entryId);
    setEntryToEdit(entryData);
  }, [entryId, entries])

  const handleFirebaseUploads = async (event) => {
    for (let i = 0; i < selectedImages.length; i++) {
      const fileName = selectedImages[i].name.substr(selectedImages[i].name.lastIndexOf('\\') + 1).split('.')[0];
      const extension = selectedImages[i].type.split('/')[1];
      const uniqueFilename = fileName + '-' + Math.random().toString(36).substr(2, 9) + '.' + extension;

      const uploadTask = storage.ref(`/images/${uniqueFilename}`).put(selectedImages[i]).then(snapshot => {
        return snapshot.ref.getDownloadURL();   // Return a promise with the download link
      }).then(downloadURL => {
        imageFirebaseUrls.push(downloadURL);
      })
        .catch(error => {
          console.log(`Failed to upload file and get link - ${error}`);
        });
      promises.push(uploadTask);
    }
  }

  const updateEntry = async (event) => {
    event.preventDefault();
    // check to see if user has files to upload first
    // await handleFirebaseUploads();
    console.log(entryToEdit);

    Promise.all(promises).then(() => {
      console.log('images: ', imageFirebaseUrls);
      const date = new Date();
      const entry = {
        category: event.target.category.value,
        title: event.target.title.value,
        summary: event.target.summary.value,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        // images: imageFirebaseUrls
      }

      console.log(entry);
      return entry;

    }).then((entry) => {
      db.collection("entries").doc(entryId).update(entry).then(() => {
        editEntry(entryId, entry);
      })
        .catch(error => {
          throw new Error(`Error adding entry: ${error}`);
        });
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
    } else {
      setEntryToEdit({...entryToEdit, category: e.target.value});
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

  const resetForm = (event) => {
    setSelectedImages([]);
    event.target.reset();
  }

  const renderExistingImages = () => {
    if (!Array.isArray(entryToEdit?.images)) {
      return;
    } else {
      console.log(entryToEdit.images);
    }
    return (
      <ul className="images-list">
        {entryToEdit.images.map(function (image, index) {
          return (
            <li key={index} className="image-wrapper">
              <span className="image-close-button" onClick={() => removeImage(image.lastModified)}><FontAwesomeIcon icon={faTimes} /></span>
              <img alt="" className="image-selected-preview" src={image} />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="entry-form-wrapper">
      <form onSubmit={updateEntry}>
        <ul className="entry-form">
          <li className="category-select">
            <select name="category" value={entryToEdit?.category} onChange={categorySelected}>
              <option value="">Select a Category</option>
              <option value="addNewCategory">Add New Category...</option>
              {categories.map(function (category) {
                return <option value={category}>{category}</option>
              })}
            </select>
          </li>
          <li className="title-input">
            <input type="text" name="title" autoComplete="off" placeholder="Title" defaultValue={entryToEdit?.title || ''} onChange={() => {}} />
          </li>
          <li>
            <textarea className="summary-content" name="summary" rows="10" placeholder="Summary" defaultValue={entryToEdit?.summary || ''} onChange={() => {}}></textarea>
          </li>
          <li>
            <input type="file" name="imageUpload" accept="image/*" onChange={imageWasSelected} />
          </li>
          <ul className="images-list">
              {selectedImages.map(function (image, index) {
                return (
                  <li key={index} className="image-wrapper">
                    <span className="image-close-button" onClick={() => removeImage(image.lastModified)}><FontAwesomeIcon icon={faTimes} /></span>
                    <img alt="" className="image-selected-preview" src={URL.createObjectURL(image)} />
                  </li>
                )
              })}
            </ul>
          <li>
            {renderExistingImages()}
          </li>
          <li className="submit-button">
            <button type="submit" className="add-entry-button">Save</button>
          </li>
        </ul>
      </form >

      {renderAddCategoryModal()}

    </div>
  )
}

export default EntryEditForm;