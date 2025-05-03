export const sendMessage = api => () => {
  const newMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: api.message.trim(),
    timestamp: new Date()
  }

  api.setMessages(prev => [...prev, newMessage])
  api.setMessage('')
}
