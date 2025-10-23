import { View } from 'react-native'

import { Button } from '~/reusables/ui/button'
import { Input } from '~/reusables/ui/input'
import { Text } from '~/reusables/ui/text'

import ContextMenu from '~/component/ContextMenu'

const Sessions = props => (
  <View style={{ gap: 8 }}>
    { props.sessions.map(session => (
      props.editingSessionId === session.id ? <Input key={session.id} value={props.value} onChangeText={props.onChange} /> : (
        <ContextMenu items={props.menu} onEdit={() => props.onEdit(session.id)} onDelete={props.onDelete}>
          <Button
            key={session.id}
            variant={session.id === props.currentSession ? 'secondary' : 'ghost'}
            onPress={() => props.onSessionSelect(session.id)}
            className='w-full items-start'
          >
            <Text numberOfLines={1} ellipsizeMode='tail'>{ session.name }</Text>
          </Button>
        </ContextMenu>
      )
    )) }
  </View>
)

export default Sessions
