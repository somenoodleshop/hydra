import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

const ChatMessage = props => (
  <View 
    className={`max-w-[80%] px-4 py-2 mb-2 ${
      props.isSent 
        ? 'bg-secondary/30 rounded-2xl rounded-br-sm self-end' 
        : 'self-start'
    }`}
  >
    <Text 
      className={props.isSent ? 'text-foreground' : 'text-foreground'}
    >
      { props.message }
    </Text>
  </View>
)

export default ChatMessage
