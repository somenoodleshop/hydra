import { useState } from 'react'
import { Platform, View } from 'react-native'

import mockData from '~/mock/data.json'

import usePersistentStorage from '~/hook/usePersistentStorage'

import ChatMessages from '~/containers/ChatMessages'
import Sessions from '~/containers/Sessions'

const Chat = () => {
  const [currentSession, setCurrentSession] = useState(mockData.sessions[0].id)
  const [sessions, setSessions] = usePersistentStorage('sessions', mockData.sessions)

  return (
    <View className='flex-1 w-full bg-background flex-row'>
      {Platform.OS === 'web' && (
        <View className='h-full border-r border-border px-2 pt-4 w-[20%]'>
          <Sessions sessions={sessions} onSessionSelect={setCurrentSession} />
        </View>
      )}
      <ChatMessages {...{ currentSession }} />
    </View>
  )
}

export default Chat
