import { DrawerActions } from '@react-navigation/native'
import { Pressable } from 'react-native'

import { Menu } from 'lib/icons/Menu'

const MenuToggle = props => (
  <Pressable
    className='ml-3 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
    <Menu className='text-foreground' size={24} strokeWidth={1.25} />
  </Pressable>
)

export default MenuToggle
