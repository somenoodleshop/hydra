import { View } from 'react-native'

import Chat from '~/container/Chat'

export default function Screen() {
  return (
    <View className='flex-1 w-full justify-center items-center gap-5 p-6'>
      <Chat />
    </View>
  )
}
