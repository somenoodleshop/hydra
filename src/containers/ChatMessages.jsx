import { useState } from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { useMutation } from '@tanstack/react-query'

import request from '~/util/request'
import useConfig from '~/hook/useConfig'

import { Input } from '~/reusables/ui/input'
import { Text } from '~/reusables/ui/text'

import Message from '~/components/Message'

const handleSubmit = ({ message, messages, mutation, setMessage, setMessages }) => () => {
  mutation.mutate([...messages, { role: 'user', content: message }])
  setMessage('')
  setMessages([...messages, { role: 'user', content: message }])
}

const ChatMessages = props => {
  const config = useConfig()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const mutation = useMutation({
    mutationFn: messages => request.post(`${config.apiUrl}/chat`, { provider: 'openai', messages }),
    onSuccess: data => {
      setMessages([...messages, { role: 'assistant', content: data.response }])
      setMessage('')
    }
  })

  return (
    <View className='flex-1 h-full w-[80%]'>
      { Platform.OS === 'web' && props.noSessions && messages.length === 0 && (
        <View className='h-full flex-1 w-[80%] items-center justify-center'>
          <Text>Start a new chat!</Text>
        </View>
      ) }
      <ScrollView contentContainerClassName='flex-1 h-full px-4 pt-4'>
        { messages.map(msg => (<Message key={msg.id} {...msg} />)) }
      </ScrollView>
      <View className='flex-row w-[50%] items-center gap-2 p-4 border-t border-border'>
        <Input
          autoFocus
          inputMode='text'
          className='flex-1 w-[50%]'
          value={message}
          onChangeText={setMessage}
          placeholder='Type a message...'
          onSubmitEditing={handleSubmit({ message, messages, mutation, setMessage, setMessages })}
          returnKeyType='send'
        />
      </View>
    </View>
  )
}

export default ChatMessages
