import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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
                <span>{entry.title} - {entry.images.length} photos</span>
                <span className="created-date">{format(entry.createdAt.toDate(), 'iii, LLL Mo, yy')}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EntryList;