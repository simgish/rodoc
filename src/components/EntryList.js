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
            <Link to={`/edit-entry/${entry.id}`}>
              <li key={entry.id} onClick={() => updateEntry(entry.id)}>
                {entry.title} - {entry.images.length} photos
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default EntryList;