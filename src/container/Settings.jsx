import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'
import { ThemeToggle } from '~/reusables/ThemeToggle'

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>
      <View className='space-y-2'>
        <Text className='text-xl font-bold'>Theme</Text>
        <View className='flex-row items-center justify-between'>
          <Text>Dark Mode</Text>
          <ThemeToggle />
        </View>
      </View>
    </View>
  )
}

export default Settings
