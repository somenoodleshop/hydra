import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

const Message = props => (
  <View 
    className={`max-w-[80%] px-4 py-2 mb-2 ${
      props.role === 'user'
        ? 'bg-primary/70 rounded-2xl rounded-br-sm'
        : 'bg-primary/70 rounded-2xl rounded-bl-sm'
    }`}
  >
    <Text 
      className={props.role === 'user' ? 'text-background' : 'text-foreground'}
    >
      { props.content }
    </Text>
  </View>
)

export default Message
