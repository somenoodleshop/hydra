import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

const Message = props => (
  <View className='items-center max-w-[80%] px-4 py-2 mb-2 rounded-2xl'>
    <Text>{ props.content }</Text>
  </View>
)

export default Message
