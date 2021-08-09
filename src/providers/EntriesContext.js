import React from 'react';

const EntriesContext = React.createContext(null);

const EntriesProvider = (props) => {
    const [entries, setEntries] = React.useState([]),
}

export const EntriesProvider = EntriesContext.Provider;

export default EntriesContext;