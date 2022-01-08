import { MoonIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const {toggleColorMode } = useColorMode()
  // const isDark = colorMode === 'dark'
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
      // isChecked={isDark}
      onClick={toggleColorMode}
    />
  )
}
