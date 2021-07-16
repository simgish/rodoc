const EntryList = ({ entries }) => {

  const updateEntry = (id) => {
    let entryToEdit = entries.find((e) => e.id === id);
    console.log(entryToEdit);
  }

  return (
    <div className="entry-list-container">
      <ul>
        {entries.map(entry => {
          return (
            <li key={entry.id} onClick={() => updateEntry(entry.id)}>
              {entry.title} - {entry.images.length} photos
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EntryList;