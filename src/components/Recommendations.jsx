import React from "react";
import {
    Box,
    Text,
    Link,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";

const Recommendations = () => {
    return (
        <Box mx={20} my={20}>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'green', color: 'white' }} >
                            <Box as="span" flex="1" textAlign="left">
                                Give it a Rest
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Power your computer down when you’re away. A computer turned off uses at least 65% less energy than a computer left on or idle on a screen saver.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'violet', color: 'black' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Phantom Power
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Did you know that many electronics continue using energy even when powered down? This is true of any charger, television, printer, etc. Use a power strip to easily unplug these electronics when not in use.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Cut down on air conditioning
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Cut usage of the most power-intensive appliance in your car. Running your air conditioning less frequently or raising the temperature so that your system does not work as hard will reduce your carbon footprint.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'blue', color: 'white' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Switch to CFLs
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Compact fluorescent light bulbs (CFLs) use 75% less energy than incandescent and last up to 10 times longer.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'indigo', color: 'white' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Avoid flying if possible
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Traveling by air spews more greenhouse gas than traveling by car. To help put this in perspective, a single round-trip flight across the U.S. produces roughly 2 tons of carbon dioxide per person, which equals about 10 percent of a U.S. citizen’s annual carbon footprint. If you can fly less often, it’s an effective way to reduce your carbon footprint.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'orange', color: 'white' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Look for an ENERGY STAR® symbol when buying new products
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        You can reduce how much energy your home uses by updating to ENERGY STAR® appliances that are much more efficient than older and non-rated appliances. Smart kitchen gadgets connect to your smart home system for the most convenient and efficient operation. Our guide to energy-saving kitchen appliances can help you make informed choices.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'purple', color: 'white' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Recycle
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Take a few steps to a recycling center in your building to deposit aluminum cans, plastics, glass, office paper, newspaper, cardboard. Pickup of office electronics, bulk metal and surplus furniture can be arranged by contacting Facilities Work Management.          </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'teal', color: 'white' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Get a Little Exercise
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Consider walking or riding a bike to campus if the distance is reasonable. Walk from you bus or subway stop to your office or lab. Faculty and staff carpoolers pay reduced or no fee to park on campus, depending on size of carpool.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'yellow', color: 'black' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Adapt Vegetarian meals
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Having non-vegetarian meals increases the carbon emission, also vegetarianism promotes humanity and love for animals.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'pink', color: 'black' }}>
                            <Box as="span" flex="1" textAlign="left">
                                Buy only what you need
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        We live in a time of abundance, so it is easy to fall into the habit of buying things on a whim that you may end up not really needing. Be mindful when shopping to avoid wasteful purchases that could drive up your carbon footprint.
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>
            <Box mt={10}>
                <Text>
                    Wanna get some recommendations? Click{" "}
                    <Link href="https://www.constellation.com/energy-101/energy-innovation/how-to-reduce-your-carbon-footprint.html" target="_blank" color="blue.500" textDecoration="underline">
                        here
                    </Link>
                </Text>

                {/* Rest of your content */}
            </Box>
        </Box>
    );
};

export default Recommendations;