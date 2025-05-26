import request from 'util/request'

export const getMessages = async sessionId => ({
  queryKey: ['messages', sessionId],
  queryFn: () => request.get(`/session/${sessionId}`)
})
