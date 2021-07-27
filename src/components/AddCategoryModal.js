import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'

const AddCategoryModal = ({ addNewCategory, closeModal }) => {

    const onSubitNewCategory = (event) => {
        event.preventDefault();
        addNewCategory(event.target.categoryName.value);
        event.target.categoryName.value = '';
    }

    return (
        <div className="add-category-modal">
            <span className="close-button" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></span>
            <h2>Add Category Modal</h2>
            <form onSubmit={onSubitNewCategory}>
                <ul className="entry-form">
                <li>
                <input type="text" name="categoryName" placeholder="New Category" />
                </li>
                <li className="submit-button">
                    <button type="submit" className="add-category-button">Add Category <FontAwesomeIcon icon={faPlusSquare} /></button>
                </li>
                <li className="submit-button">
                <button type="button" className="close-modal-button" onClick={closeModal}>Close <FontAwesomeIcon icon={faTimes} /></button>
                </li>
                </ul>
            </form>
        </div>
    )
}

export default AddCategoryModal;