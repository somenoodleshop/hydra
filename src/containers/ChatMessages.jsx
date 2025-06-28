import { useState } from 'react'
import { Platform, ScrollView, View } from 'react-native'

import { sendMessage } from '~/handler/chat'

import { Input } from '~/reusables/ui/input'

import Message from '~/components/Message'

const ChatMessages = props => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  return (
    <View className='h-full flex-1 w-[80%]'>
      { Platform.OS === 'web' && props.noSessions && (
        <View className='h-full flex-1 w-[80%] items-center justify-center'>
          <Text>Start a new chat!</Text>
        </View>
      ) }
      <ScrollView className='flex-1 px-4 pt-4'>
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
          onSubmitEditing={sendMessage({ message, setMessage, setMessages })}
          returnKeyType='send'
        />
      </View>
    </View>
  )
}

export default ChatMessages
