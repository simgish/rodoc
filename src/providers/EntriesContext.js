import React from 'react';

const EntriesContext = React.createContext({});

export const EntriesProvider = EntriesContext.Provider;

export default EntriesContext;