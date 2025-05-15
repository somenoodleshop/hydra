import { View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'

import mockData from 'mock/data.json'

import usePersistentStorage from 'hook/usePersistentStorage'

import Sessions from 'containers/Sessions'

const DrawerContent = props => {
  const [sessions] = usePersistentStorage('sessions', mockData.sessions)

  return (
    <DrawerContentScrollView {...props}>
      <View className='flex-1 px-4 pt-4'>
        <Sessions 
          sessions={sessions} 
          onSessionSelect={(sessionId) => {
            props.navigation.navigate('chat', { sessionId })
          }} 
        />
      </View>
    </DrawerContentScrollView>
  )
}

export default DrawerContent
