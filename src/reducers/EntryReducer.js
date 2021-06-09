const EntryReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ENTRY':
      return [...state, action.data]
    default:
      return state
  }
}

export default EntryReducer;