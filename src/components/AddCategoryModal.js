import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'

const AddCategoryModal = ({ addNewCategory }) => {

    const onSubitNewCategory = (event) => {
        event.preventDefault();
        addNewCategory(event.target.categoryName.value);
    }

    return (
        <div className="add-category-modal">
            <span className="close-button"><FontAwesomeIcon icon={faTimes} /></span>
            <h2>Add Category Modal</h2>
            <form onSubmit={onSubitNewCategory}>
                <ul className="entry-form">
                <li>
                <input type="text" name="categoryName" placeholder="New Category" />
                </li>
                <li className="submit-button">
                    <button type="submit">Add Category <FontAwesomeIcon icon={faPlusSquare} /></button>
                </li>
                </ul>
            </form>
        </div>
    )
}

export default AddCategoryModal;