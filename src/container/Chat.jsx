import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import usePersistentStorage from '~/hook/usePersistentStorage'

import { Button } from '~/reusables/ui/button'
import { Text } from '~/reusables/ui/text'

import ChatMessages from '~/containers/ChatMessages'
import Sessions from '~/containers/Sessions'
import SettingsButton from '~/atom/SettingsButton'

const createNewSession = ({ setSessions, setCurrentSession }) => () => {
  const session = { id: Date.now().toString(), name: 'Untitled Chat' }
  setSessions([...sessions, session])
  setCurrentSession(session.id)
}

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
    <View className='flex-1 w-full bg-background'>
      <View className='flex-1 w-full h-[5%] justify-end'>
        <Button
          variant='outline'
          className='mb-4 mt-4 w-[5%]'
          onPress={createNewSession({ setSessions, setCurrentSession })}
        >
          <Text>New Chat</Text>
        </Button>
      </View>
      <View className='flex-1 w-full h-full bg-background flex-row'>
        { Platform.OS === 'web' && sessions.length > 0 && (
          <View className='h-full border-r border-border px-2 pt-4 w-[20%]'>
            <Sessions sessions={sessions} onSessionSelect={setCurrentSession} />
            <SettingsButton onPress={() => navigation.navigate('settings')} />
          </View>
        ) }
        <ChatMessages currentSession={currentSession} noSessions={sessions.length === 0} />
      </View>
    </View>
  )
}

export default Chat
