import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import usePersistentStorage from '~/hook/usePersistentStorage'
import { createNewSession } from '~/handler/chat'

import { Button } from '~/reusables/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/reusables/ui/select'
import { Text } from '~/reusables/ui/text'

import ChatMessages from '~/container/ChatMessages'
import Sessions from '~/container/Sessions'
import SettingsButton from '~/atom/SettingsButton'

const models = [
  { label: 'GPT-4o', value: 'gpt-4o' },
  { label: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet' }
]

const Chat = ()=> {
  const navigation = useNavigation()
  const route = useRoute()
  const [currentSession, setCurrentSession] = useState('')
  const [model, setModel] = usePersistentStorage('model', {})
  const [sessions, setSessions] = usePersistentStorage('sessions', [])

  useEffect(() => {
    if (route.params?.sessionId) { setCurrentSession(route.params.sessionId) }
  }, [route.params?.sessionId])

  return (
    <View className='flex-1 w-full bg-background flex-row'>
      { Platform.OS === 'web' && (
        <View className='flex w-[20%] h-full' style={{ border: '1px solid red' }}>
          <View className='flex w-full h-[7%]' style={{ border: '1px solid blue' }}></View>
          <View className='flex w-full h-[86%]' style={{ border: '1px solid blue' }}>
            <Sessions sessions={sessions} onSessionSelect={setCurrentSession} />
          </View>
          <View className='flex w-full h-[7%]' style={{ border: '1px solid blue' }}>
            <SettingsButton onPress={() => navigation.navigate('settings')} />
          </View>
        </View>
      ) }
      <View className='flex w-[80%]' style={{ border: '1px solid red' }}>
        <View className='flex w-full h-[7%] flex-row items-center justify-between' style={{ border: '1px solid blue' }}>
          <Select value={model.value} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue>
                <Text>{ model.label || 'Select a model' }</Text>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              { models.map(m => <SelectItem {...m}><Text>{ m.label }</Text></SelectItem>) }
            </SelectContent>
          </Select>
          <Button
            variant='outline'
            className='w-fit mb-4 mt-4'
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
