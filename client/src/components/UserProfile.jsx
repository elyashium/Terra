import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Stack,
  Avatar,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  VStack,
  HStack,
} from '@chakra-ui/react';
import BarGraph from './Graph';
import '../App.css';

const API_URL = 'http://localhost:5000/api';

const UserProfile = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [carbonHistory, setCarbonHistory] = useState([]);
  
  // Calculate average score
  const averageScore = carbonHistory.length > 0
    ? Math.round(carbonHistory.reduce((acc, item) => acc + item.score, 0) / carbonHistory.length)
    : 0;
  
  // Calculate trend (compared to first entry)
  const trend = carbonHistory.length > 1
    ? ((carbonHistory[carbonHistory.length - 1].score - carbonHistory[0].score) / carbonHistory[0].score) * 100
    : 0;

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('terraUser');
    const token = localStorage.getItem('terraToken');
    
    if (loggedInUser && token) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      
      // Fetch user profile data from API
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          
          const data = await response.json();
          setUser(prevUser => ({
            ...prevUser,
            ...data.data
          }));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      
      // Fetch carbon footprint history from API
      const fetchCarbonHistory = async () => {
        try {
          const response = await fetch(`${API_URL}/carbon`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch carbon history');
          }
          
          const data = await response.json();
          
          if (data.data && data.data.length > 0) {
            setCarbonHistory(data.data);
          } else {
            // If no history exists, initialize with empty array
            setCarbonHistory([]);
          }
        } catch (error) {
          console.error('Error fetching carbon history:', error);
          setCarbonHistory([]);
        }
      };
      
      fetchUserData();
      fetchCarbonHistory();
    } else {
      // Redirect to login if not logged in
      navigate('/auth');
      toast({
        title: 'Not logged in',
        description: 'Please log in to view your profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setIsLoading(false);
  }, [navigate, toast]);
  
  const handleLogout = async () => {
    const token = localStorage.getItem('terraToken');
    
    try {
      // Call logout API
      await fetch(`${API_URL}/auth/logout`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('terraUser');
      localStorage.removeItem('terraToken');
      
      navigate('/');
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const handleCalculateNew = () => {
    navigate('/CarbonCalculator');
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh" bg="black" color="white">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Box className="secondPage" color="white" minH="100vh">
      <Container maxW="container.xl" py={10}>
        <Flex mb={8} justifyContent="space-between" alignItems="center">
          <Heading as="h1" className="title" fontSize="5xl">
            terra.
          </Heading>
          <Button 
            onClick={handleLogout}
            bg="transparent" 
            color="white" 
            border="1px solid white" 
            borderRadius="50px"
            _hover={{ 
              bg: "rgba(255,255,255,0.1)",
              transform: "scale(1.05)"
            }}
            transition="all 0.3s ease"
          >
            Logout
          </Button>
        </Flex>
        
        <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={8}>
          {/* User Profile Section */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              <Card 
                bg="rgba(20, 20, 20, 0.8)" 
                borderRadius="xl" 
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.4)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                overflow="hidden"
                transition="transform 0.3s ease"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <CardHeader pb={0}>
                  <Flex gap={6} alignItems="center" flexWrap="wrap">
                    <Avatar 
                      size="xl" 
                      name={user?.name} 
                      bg="green.500"
                      boxShadow="0 0 15px rgba(74, 222, 128, 0.5)"
                    />
                    <Box>
                      <Heading size="lg" fontFamily="Merriweather" mb={1}>{user?.name}</Heading>
                      <Text color="gray.300" fontFamily="Inter">{user?.email}</Text>
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <StatGroup mb={6} p={4} bg="rgba(0,0,0,0.3)" borderRadius="lg">
                    <Stat>
                      <StatLabel color="gray.300" fontSize="sm" fontFamily="Inter">Average Carbon Score</StatLabel>
                      <StatNumber fontSize="3xl" fontFamily="Merriweather">{averageScore || '—'}</StatNumber>
                      <StatHelpText color={trend < 0 ? "green.400" : "red.400"}>
                        {trend !== 0 && (
                          <>
                            <StatArrow type={trend < 0 ? 'decrease' : 'increase'} />
                            {Math.abs(trend).toFixed(1)}%
                          </>
                        )}
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel color="gray.300" fontSize="sm" fontFamily="Inter">Calculations</StatLabel>
                      <StatNumber fontSize="3xl" fontFamily="Merriweather">{carbonHistory.length}</StatNumber>
                      <StatHelpText color="gray.400">Total entries</StatHelpText>
                    </Stat>
                  </StatGroup>
                  <Button 
                    className="tryit"
                    onClick={handleCalculateNew}
                    width="full"
                    height="50px"
                    bg="white" 
                    color="black"
                    borderRadius="50px"
                    fontFamily="Inter"
                    fontWeight="700"
                    _hover={{ transform: "scale(1.05)" }}
                    transition="transform 0.3s ease"
                  >
                    Calculate New Footprint
                  </Button>
                </CardBody>
              </Card>
              
              {/* Environmental Impact Card */}
              <Card 
                bg="rgba(20, 20, 20, 0.8)" 
                borderRadius="xl" 
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.4)"
                border="1px solid rgba(255, 255, 255, 0.1)"
              >
                <CardHeader>
                  <Heading size="md" fontFamily="Merriweather">Your Environmental Impact</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontFamily="Inter" fontSize="md" mb={4}>
                    By tracking your carbon footprint, you're taking the first step toward a more sustainable lifestyle.
                  </Text>
                  {carbonHistory.length > 0 ? (
                    <HStack spacing={4} wrap="wrap">
                      <Badge colorScheme="green" p={2} borderRadius="md">Active Tracker</Badge>
                      {trend < 0 && <Badge colorScheme="green" p={2} borderRadius="md">Reducing Impact</Badge>}
                    </HStack>
                  ) : (
                    <Text color="gray.400" fontStyle="italic">Start calculating to see your impact</Text>
                  )}
                </CardBody>
              </Card>
            </VStack>
          </GridItem>
          
          {/* Carbon History Section */}
          <GridItem>
            <Card 
              bg="rgba(20, 20, 20, 0.8)" 
              borderRadius="xl" 
              boxShadow="0 4px 30px rgba(0, 0, 0, 0.4)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              h="100%"
            >
              <CardHeader>
                <Heading size="lg" fontFamily="Merriweather">Carbon Footprint History</Heading>
              </CardHeader>
              <CardBody>
                {carbonHistory.length === 0 ? (
                  <VStack spacing={6} py={10} align="center">
                    <Text fontSize="xl" fontFamily="Inter">No carbon footprint calculations yet.</Text>
                    <Button
                      className="tryit"
                      onClick={handleCalculateNew}
                      height="50px"
                      bg="white" 
                      color="black"
                      borderRadius="50px"
                      fontFamily="Inter"
                      fontWeight="700"
                      _hover={{ transform: "scale(1.05)" }}
                      transition="transform 0.3s ease"
                    >
                      Calculate Your Footprint
                    </Button>
                  </VStack>
                ) : (
                  <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList mb={6} overflowX="auto" css={{ scrollbarWidth: 'none' }}>
                      {carbonHistory.map((entry) => (
                        <Tab 
                          key={entry.id} 
                          minW="120px"
                          _selected={{ 
                            bg: "green.500", 
                            color: "white",
                            boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" 
                          }}
                        >
                          {new Date(entry.date).toLocaleDateString()}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {carbonHistory.map((entry) => (
                        <TabPanel key={entry.id}>
                          <Stack spacing={6}>
                            <Flex justifyContent="space-between" alignItems="center">
                              <Heading size="md" fontFamily="Merriweather">Score: {entry.score}</Heading>
                              <Badge 
                                colorScheme={entry.isLessThanAverage ? "green" : "red"} 
                                p={2} 
                                borderRadius="md"
                                boxShadow={entry.isLessThanAverage ? 
                                  "0 0 10px rgba(74, 222, 128, 0.5)" : 
                                  "0 0 10px rgba(245, 101, 101, 0.5)"}
                              >
                                {entry.isLessThanAverage 
                                  ? `${entry.percentDiff}% below average` 
                                  : `${entry.percentDiff}% above average`}
                              </Badge>
                            </Flex>
                            <Divider borderColor="rgba(255,255,255,0.2)" />
                            <Box 
                              h="300px" 
                              bg="rgba(0,0,0,0.3)" 
                              p={4} 
                              borderRadius="lg"
                              boxShadow="inset 0 0 10px rgba(0,0,0,0.5)"
                            >
                              <BarGraph data={entry.breakdown} />
                            </Box>
                            <Text fontFamily="Inter" fontSize="md">
                              {entry.isLessThanAverage
                                ? "Great job! Your carbon footprint is below average. Keep up the good work!"
                                : "Your carbon footprint is above average. Consider making some changes to reduce your impact."}
                            </Text>
                          </Stack>
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </Tabs>
                )}
              </CardBody>
              <CardFooter>
                <Text fontSize="sm" color="gray.400" fontFamily="Inter">
                  Track your progress over time to see how your habits affect your carbon footprint.
                </Text>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        
        {/* Tips Section */}
        <Box 
          mt={10} 
          bg="rgba(20, 20, 20, 0.8)" 
          p={8} 
          borderRadius="xl"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.4)"
          border="1px solid rgba(255, 255, 255, 0.1)"
        >
          <Heading size="lg" mb={6} fontFamily="Merriweather">Tips to Reduce Your Carbon Footprint</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            <Box 
              p={6} 
              bg="rgba(0,0,0,0.3)" 
              borderRadius="lg"
              boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Heading size="md" mb={4} fontFamily="Merriweather" color="green.400">Transportation</Heading>
              <Text fontFamily="Inter">Use public transportation, carpool, bike, or walk whenever possible. Consider an electric vehicle for your next car purchase.</Text>
            </Box>
            <Box 
              p={6} 
              bg="rgba(0,0,0,0.3)" 
              borderRadius="lg"
              boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Heading size="md" mb={4} fontFamily="Merriweather" color="green.400">Energy Usage</Heading>
              <Text fontFamily="Inter">Switch to energy-efficient appliances, use LED bulbs, and consider renewable energy sources like solar panels for your home.</Text>
            </Box>
            <Box 
              p={6} 
              bg="rgba(0,0,0,0.3)" 
              borderRadius="lg"
              boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)"
              border="1px solid rgba(255, 255, 255, 0.05)"
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Heading size="md" mb={4} fontFamily="Merriweather" color="green.400">Diet</Heading>
              <Text fontFamily="Inter">Reduce meat consumption, especially beef. Choose locally sourced foods and reduce food waste by planning meals carefully.</Text>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile; 