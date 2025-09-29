import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

const Message = props => (
  <View className={`${props.role === 'assistant' ? 'items-start' : 'items-end'} max-w-[100%] px-4 py-2 mb-2 rounded-2xl`}>
    <Text>{ props.content }</Text>
  </View>
)

export default Message
