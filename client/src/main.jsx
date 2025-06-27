import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'

// Create a simple theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
