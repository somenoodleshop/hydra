import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

const Message = props => (
  <View>
    <Text className='text-background'>
      { props.content }
    </Text>
  </View>
)

export default Message
