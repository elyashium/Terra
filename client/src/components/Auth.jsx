import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Flex,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const Auth = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate login API call
    setTimeout(() => {
      // Store user in localStorage (in a real app, you'd store a token)
      localStorage.setItem('terraUser', JSON.stringify({
        email: loginForm.email,
        name: loginForm.email.split('@')[0],
        isLoggedIn: true
      }));
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setIsLoading(false);
      navigate('/profile');
    }, 1500);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate signup API call
    setTimeout(() => {
      // Store user in localStorage (in a real app, you'd store a token)
      localStorage.setItem('terraUser', JSON.stringify({
        email: signupForm.email,
        name: signupForm.name,
        isLoggedIn: true
      }));
      
      toast({
        title: 'Account created',
        description: 'Welcome to Terra!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setIsLoading(false);
      navigate('/profile');
    }, 1500);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'black'}
      color={'white'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            terra.
          </Heading>
          <Text fontSize={'lg'} color={'gray.400'}>
            Track your carbon footprint and make a difference
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'gray.900'}
          boxShadow={'lg'}
          p={8}
          width={{ base: '90vw', sm: '400px' }}
        >
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <form onSubmit={handleLoginSubmit}>
                  <Stack spacing={4}>
                    <FormControl id="login-email" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input 
                        type="email" 
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                      />
                    </FormControl>
                    <FormControl id="login-password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                      >
                        <Link color={'green.400'}>Forgot password?</Link>
                      </Stack>
                      <Button
                        type="submit"
                        bg={'green.400'}
                        color={'white'}
                        _hover={{
                          bg: 'green.500',
                        }}
                        isLoading={isLoading}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel>
                <form onSubmit={handleSignupSubmit}>
                  <Stack spacing={4}>
                    <FormControl id="name" isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input 
                        type="text" 
                        name="name"
                        value={signupForm.name}
                        onChange={handleSignupChange}
                      />
                    </FormControl>
                    <FormControl id="email" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input 
                        type="email" 
                        name="email"
                        value={signupForm.email}
                        onChange={handleSignupChange}
                      />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="confirm-password" isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={signupForm.confirmPassword}
                          onChange={handleSignupChange}
                        />
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        type="submit"
                        loadingText="Submitting"
                        size="lg"
                        bg={'green.400'}
                        color={'white'}
                        _hover={{
                          bg: 'green.500',
                        }}
                        isLoading={isLoading}
                      >
                        Sign up
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Auth; 