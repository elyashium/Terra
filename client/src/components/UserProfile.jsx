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
} from '@chakra-ui/react';
import BarGraph from './Graph';

const UserProfile = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [carbonHistory, setCarbonHistory] = useState([]);
  
  // Sample carbon footprint data
  const sampleData = [
    {
      id: 1,
      date: '2023-01-15',
      score: 1450,
      breakdown: {
        bills: 450,
        food: 320,
        healthEducation: 180,
        transport: 380,
        miscellaneous: 120,
      },
      isLessThanAverage: false,
      percentDiff: 8.8,
    },
    {
      id: 2,
      date: '2023-03-20',
      score: 1280,
      breakdown: {
        bills: 400,
        food: 280,
        healthEducation: 150,
        transport: 350,
        miscellaneous: 100,
      },
      isLessThanAverage: true,
      percentDiff: 3.9,
    },
    {
      id: 3,
      date: '2023-06-10',
      score: 1150,
      breakdown: {
        bills: 380,
        food: 250,
        healthEducation: 120,
        transport: 320,
        miscellaneous: 80,
      },
      isLessThanAverage: true,
      percentDiff: 13.7,
    },
  ];
  
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
    
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      
      // Get carbon history from localStorage
      const storedHistory = localStorage.getItem(`carbonHistory_${userData.email}`);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        setCarbonHistory(parsedHistory);
      } else {
        // If no history exists, use sample data for demonstration
        setCarbonHistory(sampleData);
      }
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
  
  const handleLogout = () => {
    localStorage.removeItem('terraUser');
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
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
    <Box bg="black" color="white" minH="100vh" py={5}>
      <Container maxW="container.xl">
        <Flex mb={5} justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            terra.
          </Heading>
          <Button colorScheme="red" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
        
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
          {/* User Profile Section */}
          <GridItem>
            <Card bg="gray.900" borderRadius="md">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar size="xl" name={user?.name} bg="green.500" />
                    <Box>
                      <Heading size="md">{user?.name}</Heading>
                      <Text>{user?.email}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <StatGroup mb={4}>
                  <Stat>
                    <StatLabel>Average Carbon Score</StatLabel>
                    <StatNumber>{averageScore}</StatNumber>
                    <StatHelpText>
                      {trend !== 0 && (
                        <>
                          <StatArrow type={trend < 0 ? 'decrease' : 'increase'} />
                          {Math.abs(trend).toFixed(1)}%
                        </>
                      )}
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Calculations</StatLabel>
                    <StatNumber>{carbonHistory.length}</StatNumber>
                    <StatHelpText>Total entries</StatHelpText>
                  </Stat>
                </StatGroup>
                <Button colorScheme="green" width="full" onClick={handleCalculateNew}>
                  Calculate New Footprint
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          
          {/* Carbon History Section */}
          <GridItem>
            <Card bg="gray.900" borderRadius="md">
              <CardHeader>
                <Heading size="md">Carbon Footprint History</Heading>
              </CardHeader>
              <CardBody>
                {carbonHistory.length === 0 ? (
                  <Text>No carbon footprint calculations yet. Start by calculating your footprint!</Text>
                ) : (
                  <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList mb={4} overflowX="auto" css={{ scrollbarWidth: 'none' }}>
                      {carbonHistory.map((entry) => (
                        <Tab key={entry.id} minW="120px">
                          {new Date(entry.date).toLocaleDateString()}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {carbonHistory.map((entry) => (
                        <TabPanel key={entry.id}>
                          <Stack spacing={4}>
                            <Flex justifyContent="space-between" alignItems="center">
                              <Heading size="md">Score: {entry.score}</Heading>
                              <Badge colorScheme={entry.isLessThanAverage ? "green" : "red"} p={2} borderRadius="md">
                                {entry.isLessThanAverage 
                                  ? `${entry.percentDiff}% below average` 
                                  : `${entry.percentDiff}% above average`}
                              </Badge>
                            </Flex>
                            <Divider />
                            <Box h="300px">
                              <BarGraph data={entry.breakdown} />
                            </Box>
                            <Text>
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
                <Text fontSize="sm" color="gray.400">
                  Track your progress over time to see how your habits affect your carbon footprint.
                </Text>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        
        {/* Tips Section */}
        <Box mt={8} bg="gray.900" p={6} borderRadius="md">
          <Heading size="md" mb={4}>Tips to Reduce Your Carbon Footprint</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <Box p={4} bg="gray.800" borderRadius="md">
              <Heading size="sm" mb={2}>Transportation</Heading>
              <Text>Use public transportation, carpool, bike, or walk whenever possible. Consider an electric vehicle for your next car purchase.</Text>
            </Box>
            <Box p={4} bg="gray.800" borderRadius="md">
              <Heading size="sm" mb={2}>Energy Usage</Heading>
              <Text>Switch to energy-efficient appliances, use LED bulbs, and consider renewable energy sources like solar panels for your home.</Text>
            </Box>
            <Box p={4} bg="gray.800" borderRadius="md">
              <Heading size="sm" mb={2}>Diet</Heading>
              <Text>Reduce meat consumption, especially beef. Choose locally sourced foods and reduce food waste by planning meals carefully.</Text>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile; 