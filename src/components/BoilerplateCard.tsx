import { View } from 'react-native'
import { LayoutAnimationConfig } from 'react-native-reanimated'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { Info } from 'lucide-react-native'

import { Avatar, AvatarFallback, AvatarImage } from '~/reusables/ui/avatar'
import { TooltipContent, TooltipTrigger } from '~/reusables/ui/tooltip'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/reusables/ui/card'
import { Tooltip } from '~/reusables/ui/tooltip'
import { Button } from '~/reusables/ui/button'
import { Progress } from '~/reusables/ui/progress'
import { Text } from '~/reusables/ui/text'

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg'

const BoilerplateCard = props => {
  return (
    <Card className='w-full max-w-sm p-6 rounded-2xl'>
      <CardHeader className='items-center'>
        <Avatar alt="Rick Sanchez's Avatar" className='w-24 h-24'>
          <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
        <AvatarFallback>
          <Text>RS</Text>
        </AvatarFallback>
      </Avatar>
      <View className='p-3' />
      <CardTitle className='pb-2 text-center'>Rick Sanchez</CardTitle>
      <View className='flex-row'>
        <CardDescription className='text-base font-semibold'>Scientist</CardDescription>
        <Tooltip delayDuration={150}>
          <TooltipTrigger className='px-2 pb-0.5 active:opacity-50'>
            <Info size={14} strokeWidth={2.5} className='w-4 h-4 text-foreground/70' />
          </TooltipTrigger>
          <TooltipContent className='py-2 px-4 shadow'>
            <Text className='native:text-lg'>Freelance</Text>
          </TooltipContent>
        </Tooltip>
      </View>
    </CardHeader>
    <CardContent>
      <View className='flex-row justify-around gap-3'>
        <View className='items-center'>
          <Text className='text-sm text-muted-foreground'>Dimension</Text>
          <Text className='text-xl font-semibold'>C-137</Text>
        </View>
        <View className='items-center'>
          <Text className='text-sm text-muted-foreground'>Age</Text>
          <Text className='text-xl font-semibold'>70</Text>
        </View>
        <View className='items-center'>
          <Text className='text-sm text-muted-foreground'>Species</Text>
          <Text className='text-xl font-semibold'>Human</Text>
        </View>
      </View>
    </CardContent>
    <CardFooter className='flex-col gap-3 pb-0'>
      <View className='flex-row items-center overflow-hidden'>
        <Text className='text-sm text-muted-foreground'>Productivity:</Text>
        <LayoutAnimationConfig skipEntering>
          <Animated.View
            key={props.progress}
            entering={FadeInUp}
            exiting={FadeOutDown}
            className='w-11 items-center'
          >
            <Text className='text-sm font-bold text-sky-600'>{props.progress}%</Text>
          </Animated.View>
        </LayoutAnimationConfig>
      </View>
      <Progress value={props.progress} className='h-2' indicatorClassName='bg-sky-600' />
      <View />
      <Button
        variant='outline'
        className='shadow shadow-foreground/5'
        onPress={props.updateProgressValue}
      >
          <Text>Update</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BoilerplateCard
