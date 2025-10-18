import { Pressable, View } from 'react-native'

import { cn } from '~/lib/utils'
import { SquarePlus } from '~/lib/icons/SquarePlus'
import { MessageSquarePlus } from '~/lib/icons/MessageSquarePlus'

const NewChatButton = props => (
  <Pressable
    onPress={props.onPress}
    className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
  >
    {({ pressed }) => (
      <View
        className={cn(
          'flex-1 aspect-square pt-0.5 justify-center items-start',
          pressed && 'opacity-70'
        )}
      >
        <MessageSquarePlus className='text-foreground' size={30} strokeWidth={1.25} />
      </View>
    )}
  </Pressable>
)

export default NewChatButton
