import { Link } from "react-router-dom";

const EntryList = ({ entries }) => {

  const updateEntry = (id) => {
    return;
    // let entryToEdit = entries.find((e) => e.id === id);
  }

  return (
    <div className="entry-list-container">
      <ul>
        {entries.map(entry => {
          return (
            <li key={entry.id} onClick={() => updateEntry(entry.id)}>
              <Link to={`/edit-entry/${entry.id}`}>
                {entry.title} - {entry.images.length} photos
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EntryList;