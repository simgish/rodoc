const AddCategoryModal = ({ addNewCategory }) => {
    return (
        <div>
            <h2>Add Category Modal</h2>
            <button onClick={() => addNewCategory('jlkasdf')}>Add Category</button>
        </div>
    )
}

export default AddCategoryModal;