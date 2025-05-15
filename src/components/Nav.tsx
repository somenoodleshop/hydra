import { Drawer } from 'expo-router/drawer'
import { Stack } from 'expo-router/stack'
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeToggle } from '~/reusables/ThemeToggle'
import MenuToggle from './MenuToggle'
import DrawerContent from './DrawerContent'
import { screenOptions } from '~/style'

interface NavProps {
  isDarkColorScheme: boolean
}

const Nav = ({ isDarkColorScheme }: NavProps) => {
  const navigation = useNavigation()

  return Platform.OS === 'web' ? (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Home',
          headerRight: () => <ThemeToggle />
        }}
      />
    </Stack>
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerLeft: () => <MenuToggle {...{ navigation }} />,
          headerRight: () => <ThemeToggle />,
          ...screenOptions(isDarkColorScheme),
        }}
      >
        <Drawer.Screen
          name='index'
          options={{ title: 'Home' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default Nav
