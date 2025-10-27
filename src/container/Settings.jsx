import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'
import { ThemeToggle } from '~/reusables/ThemeToggle'

const Settings = () => {
  return (
    <View className='flex-1 w-full justify-center items-center gap-5 p-6'>
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
