import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '~/reusables/ui/context-menu'
import { Text } from '~/reusables/ui/text'

const CM = props => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        { props.children }
      </ContextMenuTrigger>
      <ContextMenuContent>
        { props.items.map(item => (
          <ContextMenuItem key={item.label} onPress={item.onPress}>
            <Text>{ item.label }</Text>
          </ContextMenuItem>
        )) }
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default CM
