import { View } from 'react-native'

import { Button } from '~/reusables/ui/button'
import { Text } from '~/reusables/ui/text'

import ContextMenu from '~/component/ContextMenu'

const Sessions = props => (
  <View style={{ gap: 8 }}>
    { props.sessions.map(session => (
      <Button
        key={session.id}
        variant='link'
        onPress={() => props.onSessionSelect(session.id)}
        className='w-full items-start'
      >
        <ContextMenu items={props.menu}>
          <Text>{ session.name }</Text>
        </ContextMenu>
      </Button>
    )) }
  </View>
)

export default Sessions
