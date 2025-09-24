import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import usePersistentStorage from '~/hook/usePersistentStorage'
import { createNewSession, handleCurrentSession, handleDelete } from '~/handler/chat'

import ChatMessages from '~/container/ChatMessages'
import DropdownMenu from '~/component/DropdownMenu'
import NewChatButton from '~/atom/NewChatButton'
import Sessions from '~/container/Sessions'
import SettingsButton from '~/atom/SettingsButton'

const models = {
  'gpt-5': 'GPT-5',
  'claude-opus-4-0': 'Claude Opus 4.0'
}

const menu = [
  { label: 'Edit', event: 'onEdit' },
  { label: 'Delete', event: 'onDelete' }
]

const Chat = ()=> {
  const navigation = useNavigation()
  const route = useRoute()
  const [currentSession, setCurrentSession] = useState('')
  const [model, setModel] = usePersistentStorage('model', '')
  const [sessions, setSessions] = usePersistentStorage('sessions', [])

  useEffect(() => {
    if (route.params?.sessionId) { setCurrentSession(route.params.sessionId) }
  }, [route.params?.sessionId])

  useEffect(() => {
    if (sessions.length) {
      const [session] = sessions
      setCurrentSession(session.id)
    }
  }, [])

  const updateTitle = title => {
    setSessions(sessions.map(session => session.id === currentSession ? { ...session, name: title } : session))
  }

  return (
    <View className='flex-1 w-full bg-background flex-row'>
      { Platform.OS === 'web' && (
        <View className='flex w-[20%] h-full'>
          <View className='flex w-full h-[7%] items-end justify-center'>
            <NewChatButton onPress={createNewSession({ sessions, setSessions, setCurrentSession })} />
          </View>
          <View className='flex w-full h-[86%] pr-6'>
            <Sessions
              {...{ currentSession, menu, sessions }}
              onSessionSelect={handleCurrentSession({ navigation, setCurrentSession })}
              onDelete={handleDelete({ currentSession, sessions, setSessions })}
            />
          </View>
          <View className='flex w-full h-[7%] items-start justify-center'>
            <SettingsButton onPress={() => navigation.navigate('settings')} />
          </View>
        </View>
      ) }
      <View className='flex w-[80%]'>
        <View className='flex w-full h-[7%] flex-row items-center justify-between'>
          <DropdownMenu value={model} onChange={m => setModel(m.value)} selected={models[model]} options={models} />
        </View>
        <ChatMessages {...{ currentSession, model, updateTitle }} noSessions={sessions.length === 0} />
      </View>
    </View>
  )
}

export default Chat
