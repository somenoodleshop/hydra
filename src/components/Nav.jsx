import { Drawer } from 'expo-router/drawer'
import { Stack } from 'expo-router/stack'
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


import MenuButton from '~/atom/MenuButton'
import DrawerContent from '~/containers/DrawerContent'

import { screenOptions } from '~/style'

const Nav = props => {
  const navigation = useNavigation()

  return Platform.OS === 'web' ? (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false }}
      />
    </Stack>
  ) : (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerLeft: () => <MenuButton {...{ navigation }} />,
          ...screenOptions(props.isDarkColorScheme),
        }}
      >
        <Drawer.Screen
          name='index'
          options={{
            headerLeft: () => <MenuButton {...{ navigation }} />,
            title: ''
          }}
        />
        <Drawer.Screen
          name='settings'
          options={{ title: '', headerRight: '' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default Nav
