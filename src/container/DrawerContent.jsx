import { View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'

import usePersistentStorage from '~/hook/usePersistentStorage'

import Sessions from '~/container/Sessions'
import SettingsButton from '~/atom/SettingsButton'

const DrawerContent = props => {
  const [sessions] = usePersistentStorage('sessions', [])

  return (
    <View className='flex-1'>
      <DrawerContentScrollView {...props}>
        <Sessions 
          sessions={sessions} 
          onSessionSelect={sessionId => props.navigation.navigate('index', { sessionId })}
        />
      </DrawerContentScrollView>
      <View className='h-16 pl-8 items-start justify-center'>
        <SettingsButton onPress={() => props.navigation.navigate('settings')} />
      </View>
    </View>
  )
}

export default DrawerContent
