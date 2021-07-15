import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import AddCategoryModal from './AddCategoryModal';
import db from '../firebase.config';
import { storage } from '../firebase.config';

const EntryForm = ({ addNewEntry, addNewCategory, categories }) => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const promises = [];
  let imageFirebaseUrls = [];

  const handleFirebaseUploads = async (event) => {

    for (let i = 0; i < selectedImages.length; i++) {
      const uploadTask = storage.ref(`/images/${selectedImages[i].name}`).put(selectedImages[i]).then(snapshot => {
        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
      }).then(downloadURL => {
        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
        imageFirebaseUrls.push(downloadURL);
        return downloadURL;
     })
  
     .catch(error => {
        // Use to signal error if something goes wrong.
        console.log(`Failed to upload file and get link - ${error}`);
     });
      promises.push(uploadTask);

      // uploadTask.on('state_changed',
      //   (snapShot) => {
      //     // console.log(snapShot)
      //   }, (err) => {
      //     console.log(err)
      //   }, () => {
      //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      //       console.log('File available at', downloadURL);
      //       return downloadURL;
      //     });
      //     // storage.ref('images').child(selectedImages[i].name).getDownloadURL()
      //     //   .then(fireBaseUrl => {
      //     //     console.log(fireBaseUrl);
      //     //     imageFirebaseUrls.push(fireBaseUrl);
      //     //     return fireBaseUrl;
      //     //   })
      //   })
    }
  }

  const createEntry = async (event) => {
    event.preventDefault();
    await handleFirebaseUploads();
    Promise.all(promises).then(tasks => {
      Promise.all(tasks).then((downloadUrl) => {
        imageFirebaseUrls.push(downloadUrl);
      });

      console.log('images: ', imageFirebaseUrls);
      const date = new Date();
      const entry = {
        category: event.target.category.value,
        title: event.target.title.value,
        summary: event.target.summary.value,
        createdAt: date.toUTCString(),
        updatedAt: date.toUTCString(),
        images: imageFirebaseUrls,
        imagesLength: imageFirebaseUrls.length
      }

      console.log(entry);
      return entry;

      // return;
    }).then((entry) => {
      db.collection("entries").add(entry).then(firestoreResult => {
        entry.id = firestoreResult.id;
        addNewEntry(entry);
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