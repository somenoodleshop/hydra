export const createNewSession = ({ sessions, setSessions, setCurrentSession }) => () => {
  const session = { id: Date.now().toString(), name: 'Untitled Chat' }
  setSessions([...sessions, session])
  setCurrentSession(session.id)
}

export const handleCurrentSession = ({ navigation, setCurrentSession }) => sessionId => {
  navigation.navigate('index', { sessionId })
  setCurrentSession(sessionId)
}

export const handleDelete = ({ currentSession, sessions, setSessions }) => () => {
  setSessions(sessions.filter(session => session.id !== currentSession))
}

export const handleSubmit = ({ message, messages, mutation, setMessage, setMessages }) => () => {
  mutation.mutate([...messages, { role: 'user', content: message }])
  setMessage('')
  setMessages([...messages, { role: 'user', content: message }])
}
