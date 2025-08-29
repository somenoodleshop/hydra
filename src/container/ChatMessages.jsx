import { useState } from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { useMutation } from '@tanstack/react-query'

import request from '~/util/request'
import useConfig from '~/hook/useConfig'
import { handleSubmit } from '~/handler/chat'

import { Input } from '~/reusables/ui/input'
import { Text } from '~/reusables/ui/text'

import Message from '~/component/Message'

const providers = { 'gpt-5': 'openai', 'claude-opus-4-0': 'anthropic' }

const ChatMessages = props => {
  const config = useConfig()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const mutation = useMutation({
    mutationFn: messages => request.post(`${config.apiUrl}/chat`, { provider: providers[props.model], messages }),
    onSuccess: data => {
      setMessages([...messages, { role: 'assistant', content: data.response }])
      setMessage('')
    }
  })

  return (
    <>
      <View className='flex w-full h-[86%]'>
        { Platform.OS === 'web' && props.noSessions && messages.length === 0 && (
          <View className='flex-1 w-full items-center justify-center'>
            <Text>Start a new chat!</Text>
          </View>
        ) }
        <ScrollView contentContainerClassName='flex-1'>
          { messages.map(msg => (<Message key={msg.id} {...msg} />)) }
        </ScrollView>
      </View>
      <View className='flex w-full h-[7%] items-center justify-center'>
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
    </>
  )
}

export default ChatMessages
