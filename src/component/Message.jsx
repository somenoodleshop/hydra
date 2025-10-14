import { View } from 'react-native'

import { Text } from '~/reusables/ui/text'

import Markdown from '~/component/Markdown'

const Message = props => {
  const isAssistant = props.role === 'assistant'
  return (
    <View className={`${isAssistant ? 'items-start' : 'items-end'} w-full px-4 py-2 mb-3`}>
      <View className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${!isAssistant && 'bg-muted/50 rounded-bl-md'}`}>
        <Text className={`text-sm leading-relaxed ${!isAssistant && 'text-foreground'}`}>
          <Markdown>{props.content}</Markdown>
        </Text>
      </View>
    </View>
  )
}

export default Message
