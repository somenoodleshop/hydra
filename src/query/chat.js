import request from 'util/request'

export const getMessages = {
  queryKey: ['messages'],
  queryFn: () => request.get(`/session/${sessionId}`)
}
