import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import usePersistentStorage from '~/hook/usePersistentStorage'
import { createNewSession, handleCurrentSession, handleDelete } from '~/handler/chat'

import { Button } from '~/reusables/ui/button'
import { Text } from '~/reusables/ui/text'

import ChatMessages from '~/container/ChatMessages'
import DropdownMenu from '~/component/DropdownMenu'
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

  return (
    <View className='flex-1 w-full bg-background flex-row'>
      { Platform.OS === 'web' && (
        <View className='flex w-[20%] h-full'>
          <View className='flex w-full h-[7%]'></View>
          <View className='flex w-full h-[86%]'>
            <Sessions
              {...{ sessions, menu }}
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
          <DropdownMenu value={model} onChange={m => setModel(m.value)} defaultValue={models[model]} options={models} />
          <Button
            variant='outline'
            className='w-[140px] mb-4 mt-4'
            onPress={createNewSession({ sessions, setSessions, setCurrentSession })}
          >
            <Text>New Chat</Text>
          </Button>
        </View>
        <ChatMessages {...{ currentSession, model }} noSessions={sessions.length === 0} />
      </View>
    </View>
  )
}

export default Chat
