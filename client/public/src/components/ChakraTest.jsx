import React from 'react';
import * as Chakra from '@chakra-ui/react';

// Log all available exports from Chakra UI
const ChakraTest = () => {
  console.log('Available Chakra UI exports:', Object.keys(Chakra));
  
  return (
    <div>
      <h1>Chakra UI Test</h1>
      <Chakra.Box>This is a Chakra UI Box</Chakra.Box>
    </div>
  );
};

export default ChakraTest; 