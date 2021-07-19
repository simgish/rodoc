import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrin, faFrown } from '@fortawesome/free-solid-svg-icons'

const EntryList = ({ entries }) => {

  const updateEntry = (id) => {
    return;
    // let entryToEdit = entries.find((e) => e.id === id);
  }

  const renderEmoticon = (emoticon) => {
    if (emoticon === 'happy') {
      return <FontAwesomeIcon icon={faGrin} />
    } else if (emoticon === 'sad') {
      return <FontAwesomeIcon icon={faFrown} />
    }
  }

  return (
    <div className="entry-list-container">
      <ul>
        {entries.map(entry => {
          return (
            <li key={entry.id} onClick={() => updateEntry(entry.id)} className="happy">
              <Link to={`/edit-entry/${entry.id}`}>
                <span className="list-emoticon">{renderEmoticon('happy')}</span>
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