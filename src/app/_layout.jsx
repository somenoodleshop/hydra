import '~/global.css'

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { PortalHost } from '@rn-primitives/portal'

import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar'

import Nav from '~/components/Nav'

const LIGHT_THEME: Theme = { ...DefaultTheme, colors: NAV_THEME.light }
const DARK_THEME: Theme = { ...DarkTheme, colors: NAV_THEME.dark }

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
  const hasMounted = React.useRef(false)
  const { colorScheme, isDarkColorScheme, toggleColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  useEffect(() => { toggleColorScheme() }, [])

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) { return }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background')
    }
    setAndroidNavigationBar(colorScheme)
    setIsColorSchemeLoaded(true)
    hasMounted.current = true
  }, [])

  if (!isColorSchemeLoaded) { return null }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Nav isDarkColorScheme={isDarkColorScheme} />
      <PortalHost />
    </ThemeProvider>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect
