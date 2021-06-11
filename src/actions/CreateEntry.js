export const createEntry = (entry) => {
  return {
    type: 'NEW_ENTRY',
    data: {
      title: entry.title,
      content: entry.content,
      important: true,
      date: entry.date
    }
  }
} 