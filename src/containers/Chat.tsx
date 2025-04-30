import { useState } from 'react'
import { View, ScrollView } from 'react-native'

import { sendMessage } from '~/handler/chat'

import { Input } from '~/reusables/ui/input'

import ChatMessage from '~/components/ChatMessage'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  return (
    <View className='flex-1 w-full bg-background'>
      <ScrollView className='flex-1 px-4 pt-4'>
        { messages.map(msg => (<ChatMessage key={msg.id} {...msg} />)) }
      </ScrollView>
      <View className='flex-row items-center gap-2 p-4 border-t border-border'>
        <Input
          autoFocus
          inputMode='text'
          className='flex-1'
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage({ message, setMessage, setMessages })}
          returnKeyType="send"
        />
      </View>
    </View>
  )
}

export default Chat
