export const createEntry = (entry) => {
  console.log(entry);
  return {
    type: 'NEW_ENTRY',
    data: {
      title: entry.title,
      content: entry.content,
      important: true,
      date: new Date()
    }
  }
}