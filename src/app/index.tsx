import * as React from 'react'
import { View } from 'react-native'

import Chat from '~/containers/Chat'

export default function Screen() {
  return (
    <View className='w-full flex-1 w-full justify-center items-center gap-5 p-6'>
      <Chat />
    </View>
  )
}
