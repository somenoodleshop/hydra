import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

const Message = props => (
  <View 
    className={`flex-1 items-center max-w-[80%] px-4 py-2 mb-2 bg-primary/70 rounded-2xl ${
      props.role === 'user' ? 'justify-end rounded-br-sm' : 'justify-start rounded-bl-sm'
    }`}
  >
    <Text className='text-background'>
      { props.content }
    </Text>
  </View>
)

export default Message
