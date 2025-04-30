export const sendMessage = api => () => {
  const newMessage = {
    id: Date.now().toString(),
    message: api.message.trim(),
    isSent: true,
    timestamp: new Date()
  }

  api.setMessages(prev => [...prev, newMessage])
  api.setMessage('')
}
