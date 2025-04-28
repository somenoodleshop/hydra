import { useState } from 'react'
import { View, ScrollView } from 'react-native'

import { Input } from '~/reusables/ui/input'
import { Text } from '~/reusables/ui/text'

const ChatBubble = props => {
  return (
    <View 
      className={`max-w-[80%] px-4 py-2 mb-2 ${
        props.isSent 
          ? 'bg-secondary/30 rounded-2xl rounded-br-sm self-end' 
          : 'self-start'
      }`}
    >
      <Text 
        className={props.isSent ? 'text-foreground' : 'text-foreground'}
      >
        { props.message }
      </Text>
    </View>
  )
}

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      isSent: false,
      timestamp: new Date()
    }
  ])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      isSent: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
  }

  return (
    <View className='flex-1 w-full bg-background'>
      <ScrollView className='flex-1 px-4 pt-4'>
        { messages.map(msg => (<ChatBubble key={msg.id} {...msg} />)) }
      </ScrollView>
      <View className='flex-row items-center gap-2 p-4 border-t border-border'>
        <Input
          autoFocus
          inputMode='text'
          className='flex-1'
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
      </View>
    </View>
  )
}

export default Chat
