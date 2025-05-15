import { NAV_THEME } from '~/lib/constants'

const LIGHT_THEME = { ...NAV_THEME.light }
const DARK_THEME = { ...NAV_THEME.dark }

export const screenOptions = isDark => ({
  headerStyle: {
    backgroundColor: isDark ? DARK_THEME.background : LIGHT_THEME.background,
  },
  headerTintColor: isDark ? DARK_THEME.text : LIGHT_THEME.text,
  drawerStyle: {
    backgroundColor: isDark ? DARK_THEME.background : LIGHT_THEME.background,
  },
  drawerActiveTintColor: isDark ? DARK_THEME.primary : LIGHT_THEME.primary,
  drawerInactiveTintColor: isDark ? DARK_THEME.text : LIGHT_THEME.text,
})
