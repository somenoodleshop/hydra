import request from 'util/request'

export const getMessages = {
  queryKey: ['messages'],
  queryFn: () => request.get(`/session/${sessionId}`)
}

export const createSession = {
  queryKey: ['session'],
  queryFn: () => request.post('/chat')
}
