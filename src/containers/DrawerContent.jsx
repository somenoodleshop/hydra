import { View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'

import mockData from '~/mock/data.json'

import usePersistentStorage from '~/hook/usePersistentStorage'

import Sessions from '~/containers/Sessions'
import SettingsButton from '~/atom/SettingsButton'

const DrawerContent = props => {
  const [sessions] = usePersistentStorage('sessions', mockData.sessions)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Sessions 
          sessions={sessions} 
          onSessionSelect={sessionId => props.navigation.navigate('index', { sessionId })}
        />
      </DrawerContentScrollView>
      <View style={{ height: 64, paddingLeft: 30, alignItems: 'flex-start', justifyContent: 'center' }}>
        <SettingsButton onPress={() => props.navigation.navigate('settings')} />
      </View>
    </View>
  )
}

export default DrawerContent
