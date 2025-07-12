import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import usePersistentStorage from 'hook/usePersistentStorage'

import ChatMessages from 'containers/ChatMessages'
import Sessions from 'containers/Sessions'
import SettingsButton from 'components/SettingsButton'

const Chat = ()=> {
  const navigation = useNavigation()
  const route = useRoute()
  const [currentSession, setCurrentSession] = useState('')
  const [sessions, setSessions] = usePersistentStorage('sessions', [])

  useEffect(() => {
    if (route.params?.sessionId) {
      setCurrentSession(route.params.sessionId)
    }
  }, [route.params?.sessionId])

  return (
    <View className='flex-1 w-full bg-background flex-row'>
      { Platform.OS === 'web' && sessions.length > 0 && (
        <View className='h-full border-r border-border px-2 pt-4 w-[20%]'>
          <Sessions sessions={sessions} onSessionSelect={setCurrentSession} />
          <SettingsButton onPress={() => navigation.navigate('settings')} />
        </View>
      ) }
      <ChatMessages currentSession={currentSession} noSessions={sessions.length === 0} />
    </View>
  )
}

export default Chat
