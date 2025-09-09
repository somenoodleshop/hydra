import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import usePersistentStorage from '~/hook/usePersistentStorage'
import { createNewSession, handleCurrentSession } from '~/handler/chat'

import { Button } from '~/reusables/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/reusables/ui/select'
import { Text } from '~/reusables/ui/text'

import ChatMessages from '~/container/ChatMessages'
import Sessions from '~/container/Sessions'
import SettingsButton from '~/atom/SettingsButton'

const models = {
  'gpt-5': 'GPT-5',
  'claude-opus-4-0': 'Claude Opus 4.0'
}

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
            <Sessions sessions={sessions} onSessionSelect={handleCurrentSession({ navigation, setCurrentSession })} />
          </View>
          <View className='flex w-full h-[7%] items-start justify-center'>
            <SettingsButton onPress={() => navigation.navigate('settings')} />
          </View>
        </View>
      ) }
      <View className='flex w-[80%]'>
        <View className='flex w-full h-[7%] flex-row items-center justify-between'>
          <Select value={model.value} onValueChange={m => setModel(m.value)}>
            <SelectTrigger className='min-w-[180px]'>
              <SelectValue placeholder='Select a model'>
                <Text>{ models[model] }</Text>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              { Object.keys(models).map(m => <SelectItem key={m} label={models[m]} value={m}><Text>{ m.label }</Text></SelectItem>) }
            </SelectContent>
          </Select>
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
