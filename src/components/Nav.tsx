import { useState } from 'react'
import { View } from 'react-native'


import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '~/reusables/ui/navigation-menu'
import { Text } from '~/reusables/ui/text'

const Nav = () => {
  const [value, setValue] = useState('')

  const handleChange = value => {
    console.log('Nav value changed')
    console.log(value)
    setValue(value)
  }
  
  return (
    <View>
      <NavigationMenu value={value} onValueChange={handleChange}>
        <NavigationMenuList>
          <NavigationMenuLink href='/' value='home'>
            <Text>Home</Text>
          </NavigationMenuLink>
          <NavigationMenuLink href='/chat' value='chat'>
            <Text>Chat</Text>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </View>
  )
}

export default Nav
