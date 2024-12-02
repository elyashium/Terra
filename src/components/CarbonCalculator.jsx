import "../CarbonCalculator.css"
import Header from "./Header"
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

export default function CarbonCalculator() {
    return (

        <>
            <Header />
            <main>
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
                                            Get Your Ecosavvy Score
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
            </main>


        </>
    )
}
