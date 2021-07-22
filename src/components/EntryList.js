import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons'
import Login from './Login';

const EntryList = ({ entries }) => {

  const updateEntry = (id) => {
    return;
    // let entryToEdit = entries.find((e) => e.id === id);
  }

  const renderEmoticon = (emotion) => {
    if (emotion === 'happy') {
      return <FontAwesomeIcon icon={faSmile} />
    } else if (emotion === 'sad') {
      return <FontAwesomeIcon icon={faFrown} />
    }
  }

  return (
    <div className="entry-list-container">
      <ul>
      <Login />
        {entries.map(entry => {
          return (
            <li key={entry.id} onClick={() => updateEntry(entry.id)} className="happy">
              <Link to={`/edit-entry/${entry.id}`}>
                <span className="left-group">
                  <span className="list-emoticon">{renderEmoticon('happy')}</span>
                <span>{entry.title} - {entry.images.length} photos</span>
                </span>
                <span className="right-group">
                <span className="created-date">{format(entry.createdAt.toDate(), 'iii, LLL M, yy')}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EntryList;