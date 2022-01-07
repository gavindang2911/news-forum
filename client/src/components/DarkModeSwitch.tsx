import { HamburgerIcon, MoonIcon } from '@chakra-ui/icons'
import { useColorMode, Switch, IconButton, Button, useColorModeValue } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      aria-label=''
      icon={<MoonIcon />}
      // position="fixed"
      top="1rem"
      colorScheme={useColorModeValue('purple', 'blue')}
      // right="1rem"
      // color="green"
      // paddingLeft='16'
      isChecked={isDark}
      onClick={toggleColorMode}
    />
  )
}
