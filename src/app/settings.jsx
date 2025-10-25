import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

import Settings from '~/container/Settings'

export default function Screen() {
  return (
    <View className='flex-1 w-full justify-center items-center gap-5 p-6'>
      <Settings />
    </View>
  )
} 
