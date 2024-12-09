import '../Form.css';

import React, { useState, useEffect } from "react";
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Spinner,
    Stack,
    Text,
    Flex,
    Slider,
    SliderTrack,
    SliderThumb,
    SliderFilledTrack,
} from "@chakra-ui/react";


import { InputRightElement, InputGroup } from "@chakra-ui/react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import ThugLifeCard from "./ThugLifeCard";
import AverageCalculator from "./AverageCalculator";
import BarGraph from "./Graph";
import Header from './Header';

const CarbonFootprintCalculator = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isLessThanAverage, setisLessThanAverage] = useState(true);
    const [percent, setPercent] = useState(0);
    const [familyMembers, setFamilyMembers] = useState(1);
    const [railFam, setRailFam] = useState(1);
    const [flightFam, setFlightFam] = useState(1);
    const [formData, setFormData] = useState({
        family: 0,
        electricity: 0,
        water: 0,
        gas: 0,
        petrol: 0,
        telecommunication: 0,
        dairy: 0,
        meat: 0,
        tobacco: 0,
        restaurant: 0,
        medicine: 0,
        education: 0,
        cosmetic: 0,
        rail: 0,
        flight: 0,
        insurance: 0,
        clothing: 0,
    });

    // const userData = {
    //   bills: 500,
    //   food: 300,
    //   healthEducation: 200,
    //   transport: 150,
    //   miscellaneous: 100,
    // };
    const [bills, setBills] = useState(0);
    const [food, setFood] = useState(0);
    const [transport, setTransport] = useState(0);
    const [misc, setMisc] = useState(0);
    const [health, setHealth] = useState(0);

    const userData = {
        bills: bills,
        food: food,
        healthEducation: health,
        transport: transport,
        miscellaneous: misc,
    };

    const handleSliderChange = (value) => {
        setFormData({ ...formData, ["family"]: parseInt(value) });
        setFamilyMembers(value);
    };

    const steps = [
        {
            label: "Step 1: Monthly Bills",
            fields: [
                "family",
                "electricity",
                "water",
                "gas",
                "petrol",
                "telecommunication",
            ],
        },
        {
            label: "Step 2: Food and Beverages",
            fields: ["dairy", "meat", "tobacco", "restaurant"],
        },
        {
            label: "Step 3: Health and Education",
            fields: ["medicine", "eduction", "cosmetic"],
        },
        {
            label: "Step 4: Transport",
            fields: ["rail", "flight"],
        },
        {
            label: "Step 5: Miscellaneous",
            fields: ["insurance", "plastic", "clothing"],
        },
        {
            label: "Your Ecosavvy Score is here",
        },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const currentFields = steps[currentStep].fields;
    const isSecondLastStep = currentStep === steps.length - 2;
    const isLastStep = currentStep === steps.length - 1;

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const calculateScore = async () => {
        let score = 0;
        const electricity_rate = 0.15; //0.15 for 1 kwh electricity
        const electricity_emission_factor = 0.857;
        const water_rate = 0.667; 
        const water_emission_factor = 0.0816;
        const gas_rate = 1.11;
        const gas_emission_factor = 2.3;
        const petrol_rate = 1.01;
        const dairy_emission_factor = 1.2;
        const meat_emission_factor = 36;
        const tobacco_price_per_pac = 6.11;
        const tobacco_emission_factor = 0.28;
        const restaurant_ef = 2.594;
        const clothing_ef = 1.2;
    
        const promises = [];
    
     
        const CLIMATIQ_API_KEY = 'SMHS49B5Y948X8775PSD2C6JN0'; 
    
      
        for (const fieldName in formData) {
            if (formData.hasOwnProperty(fieldName)) {
                const value = parseFloat(formData[fieldName]); // Convert the field value to a number
    
                // Check the field name and perform specific calculations
                switch (fieldName) {
                    case "electricity":
                        if (value != 0) {
                            score += (value / electricity_rate) * electricity_emission_factor;
                            setBills(bills + value);
                        }
                        break;
                 
    
                    case "medicine":
                        if (value != 0) {
                            promises.push(
                                fetch("https://api.climatiq.io/data/v1/estimate", {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${CLIMATIQ_API_KEY}`,
                                    },
                                    body: JSON.stringify({
                                        emission_factor: {
                                            activity_id: "health_care-type_basic_pharmaceutical_products_and_pharmaceutical_preparations",
                                            data_version: "^2",
                                        },
                                        parameters: {
                                            money: value,
                                            money_unit: "inr",
                                        },
                                    })
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    score += data.co2e;
                                    setHealth(health + data.co2e);
                                })
                                .catch((err) => {
                                    console.error("Error in medicine API call:", err);
                                })
                            );
                        }
                        break;
    
                    case "education":
                        if (value != 0) {
                            
                            promises.push(
                                fetch("https://api.climatiq.io/data/v1/estimate", {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${CLIMATIQ_API_KEY}`,
                                    },
                                    body: JSON.stringify({
                                        emission_factor: {
                                            activity_id: "education-type_education_services",
                                            data_version: "^2",
                                        },
                                        parameters: {
                                            money: value,
                                            money_unit: "inr",
                                        },
                                    })
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    score += data.co2e;
                                    setHealth(health + data.co2e);
                                })
                                .catch((err) => {
                                    console.error("Error in education API call:", err);
                                })
                            );
                        }
                        break;
    
                    case "rail":
                        if (value != 0) {
                            promises.push(
                                fetch("https://api.climatiq.io/data/v1/estimate", {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${CLIMATIQ_API_KEY}`,
                                    },
                                    body: JSON.stringify({
                                        emission_factor: {
                                            activity_id: "passenger_train-route_type_national_rail-fuel_source_na",
                                            data_version: "^2",
                                        },
                                        parameters: {
                                            passengers: railFam,
                                            distance: value,
                                            distance_unit: "km",
                                        },
                                    })
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    score += data.co2e;
                                    setTransport(transport + data.co2e);
                                })
                                .catch((err) => {
                                    console.error("Error in rail API call:", err);
                                })
                            );
                        }
                        break;
    
                    case "flight":
                        if (value != 0) {
                            promises.push(
                                fetch("https://api.climatiq.io/data/v1/estimate", {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${CLIMATIQ_API_KEY}`,
                                    },
                                    body: JSON.stringify({
                                        emission_factor: {
                                            activity_id: "passenger_flight-route_type_domestic-aircraft_type_na-distance_na-class_na-rf_excluded-distance_uplift_included",
                                            data_version: "^2",
                                        },
                                        parameters: {
                                            passengers: flightFam,
                                            distance: value,
                                            distance_unit: "km",
                                        },
                                    })
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    score += data.co2e;
                                    setTransport(transport + data.co2e);
                                })
                                .catch((err) => {
                                    console.error("Error in flight API call:", err);
                                })
                            );
                        }
                        break;
    
                   
                }
            }
        }
    
        await Promise.all(promises);
    
        setPercent(Math.round((Math.abs(score - 1333) * 100) / 1333), 2);
        if (score >= 1333) {
            setisLessThanAverage(false);
        }
        console.log(score, "score");
        return score;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log("object", name, " ", value);
        // Fetch the selected option's string value
        setFormData({ ...formData, [name]: value });
    };

    const handleRailModeChange = (e) => {
        if (e.target.value == "alone") {
            setRailFam(1);
        } else {
            setRailFam(formData.family);
        }
    };

    const handleFlightModeChange = (e) => {
        if (e.target.value == "alone") {
            setFlightFam(1);
        } else {
            setFlightFam(formData.family);
        }
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            await calculateScore();
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const activeLinkStyle = {
        fontWeight: "bold",
        color: "darkgreen",
        borderBottom: "2px solid darkgreen",
        borderRadius: "10px 10px 0 0", // Rounded top corners
        paddingBottom: "8px",
        fontSize: "18px",
    };

    const inactiveLinkStyle = {
        color: "black",
        borderRadius: "10px 10px 0 0", // Rounded top corners
        paddingBottom: "8px",
    };

    const navContainerStyle = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "white",
        padding: "10px",
    };

    const emojiStyle = {
        fontSize: "1.5em",
        marginRight: "5px",
    };










    return (
        <>
            <Header />
            <div>
                <br />

                <Box
                    w={["80%"]}
                    m="auto"
                    bg="rgba(255, 255, 255, 0.2)"
                    backdropFilter="blur(10px)"
                    borderRadius="10px"
                    p="20px"
                    mx="auto"
                    border={["none", "1px"]}
                    borderColor={["", "gray.300"]}
                >
                    <nav style={navContainerStyle}>
                        <NavLink
                            isActive={() => currentStep === 0}
                            style={currentStep === 0 ? activeLinkStyle : inactiveLinkStyle}
                        >
                            <span role="img" aria-label="Monthly Bills" style={emojiStyle}>
                                💸
                            </span>
                            Monthly Bills
                        </NavLink>
                        <NavLink
                            isActive={() => currentStep === 1}
                            style={currentStep === 1 ? activeLinkStyle : inactiveLinkStyle}
                        >
                            <span role="img" aria-label="Food And Beverages" style={emojiStyle}>
                                🍔
                            </span>
                            Food And Beverages
                        </NavLink>
                        <NavLink
                            isActive={() => currentStep === 2}
                            style={currentStep === 2 ? activeLinkStyle : inactiveLinkStyle}
                        >
                            <span
                                role="img"
                                aria-label="Health And Education"
                                style={emojiStyle}
                            >
                                🏥
                            </span>
                            Health And Education
                        </NavLink>
                        <NavLink
                            isActive={() => currentStep === 3}
                            style={currentStep === 3 ? activeLinkStyle : inactiveLinkStyle}
                        >
                            <span role="img" aria-label="Transport" style={emojiStyle}>
                                🚗
                            </span>
                            Transport
                        </NavLink>
                        <NavLink
                            isActive={() => currentStep === 4}
                            style={currentStep === 4 ? activeLinkStyle : inactiveLinkStyle}
                        >
                            <span role="img" aria-label="Miscellaneous" style={emojiStyle}>
                                🛍️
                            </span>
                            Miscellaneous
                        </NavLink>
                        <NavLink
                            isActive={() => currentStep === 5}
                            style={currentStep === 5 ? activeLinkStyle : inactiveLinkStyle}
                        >
                            <span role="img" aria-label="Result" style={emojiStyle}>
                                📊
                            </span>
                            Result
                        </NavLink>
                    </nav>
                    <form onSubmit={handleSubmit}>
                        <Stack ml={100} mr={100} mb={10}>
                            <br />
                            {currentStep === 0 && (
                                <div>
                                    <FormControl>
                                        <FormLabel>
                                            Number of Family Members: {familyMembers}
                                        </FormLabel>
                                        <Slider
                                            defaultValue={1}
                                            min={1}
                                            max={10}
                                            name="family"
                                            onChange={handleSliderChange}
                                            colorScheme="green"
                                            focusBorderColor="green.500"
                                            focusShadow="0 0 0 2px green.300"
                                        >
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb fontSize="sm" boxSize={6}>
                                                <Box
                                                    fontWeight="bold"
                                                    fontSize="xs"
                                                    p={1}
                                                    borderRadius="md"
                                                >
                                                    {familyMembers}
                                                </Box>
                                            </SliderThumb>
                                        </Slider>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Electricity Bill:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="electricity"
                                                // value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Electric bill in USD..."
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Water Bill:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="water"
                                                //value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Water bill in USD..."
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Gas Bill:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="gas"
                                                //  value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Gas Pipeline or Biogas bill in USD..."
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Petrol Bill:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="petrol"
                                                // value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Expenditure on Fuel in USD..."
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Telecommunication Bill:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="telecommunication"
                                                // value={formData.age}
                                                onChange={handleChange}
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                                placeholder="Telecommunication bill including WiFi, Phone Recharge and Similar stuff.."
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <br />
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div>
                                    <FormControl>
                                        <FormLabel>Dairy Product Consumption:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="dairy"
                                                // value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Dairy Item Consumption in liters for the month"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                    fontStyle: "italic",
                                                }}
                                                children="litres"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Consumption of Meat/ Non-veg food:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="meat"
                                                //value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Non-Veg (including eggs) or Meat Consumption in kg for the month"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                    fontStyle: "italic",
                                                }}
                                                children="kg"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Money spend on Beverages/Tobacco:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="tobacco"
                                                //  value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Expenditure on Tobacco and Beverages"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Restaurants and Accommodation bills:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="restaurant"
                                                // value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Restaurant and hotel bills"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <br />
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div>
                                    <FormControl>
                                        <FormLabel>Money Spend on Pharmacy (Medicine):</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="medicine"
                                                onChange={handleChange}
                                                placeholder="Monthly Medical Expenditure"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>
                                            Monthly Expenditure on Childern's Education:
                                        </FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="education"
                                                //value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Expenditure on Education"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Money spend on Cosmetics/Personal Care:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="cosmetic"
                                                //  value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Monthly Expenditure on Personal Care stuff including facewash, creams, lotions.."
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <br />
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div>
                                    <FormControl>
                                        <FormLabel>Train Journey</FormLabel>
                                        <Flex direction="row" align="center">
                                            {/* Dropdown for selecting travel mode */}
                                            <Select
                                                placeholder="Select mode"
                                                onChange={handleRailModeChange}
                                                focusBorderColor="green.500"
                                                marginRight="2"
                                            >
                                                <option value="alone">Alone</option>
                                                <option value="withFamily">With Family</option>
                                            </Select>

                                            {/* Input for entering rail journey cost */}
                                            <InputGroup>
                                                <Input
                                                    type="number"
                                                    name="rail"
                                                    onChange={handleRailModeChange}
                                                    focusBorderColor="green.500"
                                                    focusShadow="0 0 0 2px green.300"
                                                    placeholder="Distance in kms"
                                                />
                                                <InputRightElement
                                                    style={{
                                                        backgroundColor: "#D3D3D3",
                                                        borderRadius: "2px",
                                                        width: "100px",
                                                    }}
                                                    children="kilometers"
                                                />
                                            </InputGroup>
                                        </Flex>
                                    </FormControl>
                                    <br />
                                    <FormControl>
                                        <FormLabel>Flight Journey</FormLabel>
                                        <Flex direction="row" align="center">
                                            {/* Dropdown for selecting travel mode */}
                                            <Select
                                                placeholder="Select mode"
                                                onChange={handleFlightModeChange}
                                                focusBorderColor="green.500"
                                                marginRight="2"
                                            >
                                                <option value="alone">Alone</option>
                                                <option value="withFamily">With Family</option>
                                            </Select>

                                            {/* Input for entering rail journey cost */}
                                            <InputGroup>
                                                <Input
                                                    type="number"
                                                    name="flight"
                                                    onChange={handleChange}
                                                    focusBorderColor="green.500"
                                                    focusShadow="0 0 0 2px green.300"
                                                    placeholder="Distance in kms"
                                                />
                                                <InputRightElement
                                                    style={{
                                                        backgroundColor: "#D3D3D3",
                                                        borderRadius: "2px",
                                                        width: "100px",
                                                    }}
                                                    children="kilometers"
                                                />
                                            </InputGroup>
                                        </Flex>
                                    </FormControl>
                                    <br />
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div>
                                    <FormControl>
                                        <FormLabel>Insurance Bill:</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="insurance"
                                                //  value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Average Monthly Insurance Bill"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Clothing and Shopping</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                name="clothing"
                                                //  value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Average Monthly Cost on Clothing and Accessories"
                                                focusBorderColor="green.500"
                                                focusShadow="0 0 0 2px green.300"
                                            />
                                            <InputRightElement
                                                style={{
                                                    backgroundColor: "#D3D3D3",
                                                    borderRadius: "2px",
                                                    width: "100px",
                                                }}
                                                children="USD"
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <br />
                                </div>
                            )}

                            {currentStep > 0 && !isLastStep && (
                                <Button
                                    type="button"
                                    colorScheme="blue"
                                    background="blueviolet"
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                >
                                    Previous
                                </Button>
                            )}

                            {!isSecondLastStep && !isLastStep && (
                                <Button
                                    type="button"
                                    colorScheme="green"
                                    background="darkgreen"
                                    onClick={nextStep}
                                >
                                    Next
                                </Button>
                            )}

                            {isSecondLastStep && (
                                <Flex gap="20px">
                                    <Button
                                        type="submit"
                                        colorScheme="pink"
                                        // onClick={calculateScore}
                                        width="150%"
                                        isLoading={isLoading}
                                    >
                                        Get Your carbon Footprint
                                    </Button>
                                </Flex>
                            )}
                            {isLastStep && (
                                <div>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-around"
                                        ml="20px"
                                    >
                                        <ThugLifeCard isHappy={isLessThanAverage} />
                                        <AverageCalculator
                                            percent={percent}
                                            isPositive={isLessThanAverage}
                                        />
                                    </Flex>
                                    <br />
                                    <Text fontSize="large">
                                        Get Your Carbon Emission Stats Below:
                                    </Text>
                                    <br />
                                    <BarGraph data={userData} />
                                </div>
                            )}
                        </Stack>
                    </form>
                </Box>
            </div>
        </>
    );
};

export default CarbonFootprintCalculator;
