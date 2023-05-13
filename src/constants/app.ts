import { extendTheme } from '@chakra-ui/react'

export const APP_NAME = 'Sistema Pecuária'
export const PRIMARY_APP_COLOR = '#81b33b'
export const CHACKRA_UI_THEME = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    }
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Raleway'
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold'
      },
      sizes: {
        large: {
          fontSize: 'lg',
          px: 7,
          py: 4
        }
      },
      variants: {
        solid: {
          bg: 'brand.700',
          color: 'white',
          _hover: {
            bg: 'brand.800'
          }
        }
      },
      defaultProps: {
        size: 'lg',
        variant: 'solid'
      }
    }
  }
})
