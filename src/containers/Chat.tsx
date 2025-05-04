import { useState } from 'react'
import { View, ScrollView } from 'react-native'

import mockData from '~/mock/data.json'

import usePersistentStorage from '~/hook/usePersistentStorage'
import { sendMessage } from '~/handler/chat'

import { Input } from '~/reusables/ui/input'

import ChatMessage from '~/components/ChatMessage'
import Sessions from '~/containers/Sessions'

const handleSessionSelect = api => id => {
  api.setCurrentSession(id)
  api.setMessages(mockData.messages[id])
}

const Chat = () => {
  const [currentSession, setCurrentSession] = useState(mockData.sessions[0].id)
  const [sessions, setSessions] = usePersistentStorage('sessions', mockData.sessions)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockData.messages[currentSession])

  return (
    <View className='flex-1 w-full bg-background flex-row'>
      <View className='h-full border-r border-border px-2 pt-4 w-[20%]'>
        <Sessions
          sessions={sessions}
          onSessionSelect={handleSessionSelect({ setCurrentSession, setMessages })}
        />
      </View>
      <View className='h-full flex-1 w-[80%]'>
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
            placeholder='Type a message...'
            onSubmitEditing={sendMessage({ message, setMessage, setMessages })}
            returnKeyType='send'
          />
        </View>
      </View>
    </View>
  )
}

export default Chat
