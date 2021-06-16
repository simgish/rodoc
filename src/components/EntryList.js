const EntryList = ({ entries }) => {

  const updateEntry = (id) => {
    console.log(id);
  }

  return (
    <div className="entry-list-container">
      <ul>
        {entries.map(entry => {
          return (
            <li key={entry.id} onClick={() => updateEntry(entry.id)}>
              {entry.title}
              {/* <img className="img-responsive" alt="" src={`data:image/png;base64,${entry.uploadedImage}`} /> */}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EntryList;