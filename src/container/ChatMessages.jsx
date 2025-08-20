import { useState } from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { useMutation } from '@tanstack/react-query'

import request from '~/util/request'
import useConfig from '~/hook/useConfig'
import { handleSubmit } from '~/handler/chat'

import { Input } from '~/reusables/ui/input'
import { Text } from '~/reusables/ui/text'

import Message from '~/component/Message'

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
    <View className='flex-1 h-full w-full'>
      { Platform.OS === 'web' && props.noSessions && messages.length === 0 && (
        <View className='flex-1 w-full items-center justify-center'>
          <Text>Start a new chat!</Text>
        </View>
      ) }
      <ScrollView contentContainerClassName='flex-1 h-full w-full px-4 pt-4'>
        { messages.map(msg => (<Message key={msg.id} {...msg} />)) }
      </ScrollView>
      <View className='flex-row w-full items-center gap-2 p-4'>
        <Input
          autoFocus
          inputMode='text'
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
