import { View } from 'react-native'

import { Button } from '~/reusables/ui/button'
import { Text } from '~/reusables/ui/text'

const Sessions = props => {
  return (
    <View style={{ gap: 8 }}>
      { props.sessions.map(session => (
        <Button
          key={session.id}
          variant='link'
          onPress={() => props.onSessionSelect(session.id)}
          className='w-full items-start'
        >
          <Text className='text-sm'>{ session.name }</Text>
        </Button>
      )) }
    </View>
  )
}

export default Sessions
