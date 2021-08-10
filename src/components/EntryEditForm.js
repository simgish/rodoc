import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import AddCategoryModal from './AddCategoryModal';
import EmoticonSelector from './EmoticonSelector';
import db from '../firebase.config';
import { storage } from '../firebase.config';
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';

const EntryEditForm = ({ addNewCategory, categories }) => {
  const user = useContext(UserContext).user;
  const entries = useContext(UserContext).entries;
  const setEntries = useContext(UserContext).setEntries;
  const [entryToEdit, setEntryToEdit] = useState({});
  const { entryId } = useParams();

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  let promises = [];
  let imageFirebaseUrls = [];

  useEffect(() => {
    let entryData = entries.find((e) => e.id === entryId);
    setEntryToEdit(entryData);
  }, [entryId, entries])

  const editEntry = (entryId, entry) => {
    db.collection(`users/${user.uid}/entries`)
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEntries(data);
      });
  }

  const deleteEntry = async () => {
    imageFirebaseUrls = imageFirebaseUrls.concat(entryToEdit.images);
    setImagesToDelete(imageFirebaseUrls);
    await deleteImagesFromStorage();
    const newEntries = entries.filter((e) => e.id !== entryToEdit.id);

    db.collection(`users/${user.uid}/entries`).doc(entryId).delete().then(() => {
      console.log('deleted entry: ', entryToEdit);
    })
      .catch(error => {
        throw new Error(`Error deleting entry: ${error}`);
      });
    
    setEntries(newEntries);
  }

  const handleFirebaseUploads = async () => {
    for (let i = 0; i < selectedImages.length; i++) {
      const fileName = selectedImages[i].name.substr(selectedImages[i].name.lastIndexOf('\\') + 1).split('.')[0];
      const extension = selectedImages[i].type.split('/')[1];
      const uniqueFilename = fileName + '-' + Math.random().toString(36).substr(2, 9) + '.' + extension;

      const uploadTask = storage.ref(`/images/${user.uid}/${uniqueFilename}`).put(selectedImages[i]).then(snapshot => {
        return snapshot.ref.getDownloadURL();   // Return a promise with the download link
      }).then(downloadURL => {
        imageFirebaseUrls.push({ fileName: uniqueFilename, downloadUrl: downloadURL });
      })
        .catch(error => {
          console.log(`Failed to upload file and get link - ${error}`);
        });
      promises.push(uploadTask);
    }
  }

  const deleteImagesFromStorage = async () => {
    for (let i = 0; i < imageFirebaseUrls.length; i++) {
      const deleteTask = storage.ref(`/images/${user.uid}/${imageFirebaseUrls[i].fileName}`);

      deleteTask.delete().then(() => {
        console.log('deleted: ', imageFirebaseUrls[i]);
      }).catch((error) => {
        console.log(`Failed to delete file - ${error}`);
      });
    }
  }

  const updateEntry = async (event) => {
    event.preventDefault();
    await deleteImagesFromStorage();
    await handleFirebaseUploads();
    const selectedEmotion = event.target.emotion.value || 'neutral';

    Promise.all(promises).then(() => {
      imageFirebaseUrls = imageFirebaseUrls.concat(entryToEdit.images);
      const entry = {
        isHidden: false,
        isDraft: false,
        emotion: selectedEmotion,
        category: event.target.category.value,
        title: event.target.title.value,
        summary: event.target.summary.value,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: imageFirebaseUrls
      }

      return entry;

    }).then((entry) => {
      db.collection(`users/${user.uid}/entries`).doc(entryId).update(entry).then(() => {
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
    document.getElementById('imageUpload').value = '';
  }

  const removeSelectedImage = (lastModified) => {
    const newSelectedImages = selectedImages.filter((img) => img.lastModified !== lastModified);
    setSelectedImages(newSelectedImages);
  }

  const removeExistingImage = (fileName) => {
    const newExistingImages = entryToEdit.images.filter((img) => img.fileName !== fileName);
    setEntryToEdit({ ...entryToEdit, images: newExistingImages });
    setImagesToDelete(imagesToDelete.concat(fileName));
  }

  const categorySelected = (e) => {
    if (e.target.value === 'addNewCategory') {
      setShowAddCategoryModal(true);
    } else {
      setEntryToEdit({ ...entryToEdit, category: e.target.value });
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

  const handleEmotionChange = (e) => {
    setEntryToEdit({ ...entryToEdit, emotion: e.target.value });
  }

  const renderExistingImages = () => {
    if (!Array.isArray(entryToEdit?.images)) {
      return;
    } else {
      // console.log(entryToEdit.images);
    }
    return (
      <ul className="images-list">
        {entryToEdit.images.map(function (image, index) {
          return (
            <li key={index} className="image-wrapper">
              <span className="image-close-button" onClick={() => removeExistingImage(image.fileName)}><FontAwesomeIcon icon={faTimes} /></span>
              <img alt="" className="image-selected-preview" src={image.downloadUrl} />
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
          <li>
            <EmoticonSelector name="emotion" value={entryToEdit?.emotion} handleEmotionChange={handleEmotionChange} />
          </li>
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
            <input type="text" name="title" autoComplete="off" placeholder="Title" defaultValue={entryToEdit?.title || ''} onChange={() => { }} />
          </li>
          <li>
            <textarea className="summary-content" name="summary" rows="10" placeholder="Summary" defaultValue={entryToEdit?.summary || ''} onChange={() => { }}></textarea>
          </li>
          <li>
            <input type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={imageWasSelected} />
          </li>
          <ul className="images-list">
            {selectedImages.map(function (image, index) {
              return (
                <li key={index} className="image-wrapper">
                  <span className="image-close-button" onClick={() => removeSelectedImage(image.lastModified)}><FontAwesomeIcon icon={faTimes} /></span>
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
          <li className="submit-button">
            <a href="#" onClick={() => deleteEntry()}>Delete</a>
          </li>
        </ul>
      </form >

      {renderAddCategoryModal()}

    </div>
  )
}

export default EntryEditForm;