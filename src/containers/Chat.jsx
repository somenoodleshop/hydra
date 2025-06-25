import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'

import mockData from 'mock/data.json'

import useConfig from 'hook/useConfig'
import usePersistentStorage from 'hook/usePersistentStorage'
import { getMessages } from 'query/chat'

import { Text } from '~/reusables/ui/text'

import ChatMessages from 'containers/ChatMessages'
import Sessions from 'containers/Sessions'
import SettingsButton from 'components/SettingsButton'

const createSession = api => () => {
  api.mutate(api.messages)
}

const Chat = ()=> {
  const navigation = useNavigation()
  const route = useRoute()
  const config = useConfig()
  const [currentSession, setCurrentSession] = useState(mockData.sessions[0].id)
  const [sessions, setSessions] = usePersistentStorage('sessions', mockData.sessions)

  const { data = { messages: [] }, isLoading } = useQuery(getMessages)

  useEffect(() => {
    if (route.params?.sessionId) {
      setCurrentSession(route.params.sessionId)
    }
  }, [route.params?.sessionId])

  const mutation = useMutation({ mutationFn: messages => request.post(`${config.apiUrl}/chat`, messages) })

  return (
    <View className='flex-1 w-full bg-background flex-row'>
      {Platform.OS === 'web' && (
        <View className='h-full border-r border-border px-2 pt-4 w-[20%]'>
          <Sessions sessions={sessions} onSessionSelect={setCurrentSession} />
          <SettingsButton onPress={() => navigation.navigate('settings')} />
        </View>
      )}
      { !isLoading
        ? <ChatMessages currentSession={currentSession} messages={data.messages} />
        : <View className='h-full flex-1 w-[80%] items-center justify-center'>
            <Text>Loading messages...</Text>
          </View>
      }
    </View>
  )
}

export default Chat
