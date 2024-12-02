import React, { useState } from 'react'
import '../app.css'
import CarbonEmissionsReport from './CarbonEmissionReport';
export default function Learn() {
    const [activeSection, setActiveSection] = useState(null);

    const carbonSections = [
        {
            title: "What is a Carbon Footprint?",
            content: (
                <>
                    <p>A carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) generated by our actions. It encompasses:</p>
                    <ul>
                        <li>Direct emissions from personal activities</li>
                        <li>Indirect emissions from the production of goods and services we consume</li>
                        <li>Measured in metric tons of carbon dioxide equivalent (CO2e)</li>
                    </ul>
                    <p>The average global carbon footprint is approximately 4 tons per person annually, but in developed countries like the United States, it can be as high as 16 tons per person.</p>

                    <div className="carbon-breakdown">
                        <h4>Carbon Footprint Comparison</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Country/Region</th>
                                    <th>Average Annual Carbon Footprint (tons)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>United States</td>
                                    <td>16.2</td>
                                </tr>
                                <tr>
                                    <td>China</td>
                                    <td>7.4</td>
                                </tr>
                                <tr>
                                    <td>India</td>
                                    <td>1.9</td>
                                </tr>
                                <tr>
                                    <td>Global Average</td>
                                    <td>4.0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )
        },
        {
            title: "Detailed Breakdown of Carbon Emissions",
            content: (
                <>
                    <h4>Major Emission Sources</h4>
                    <div className="emission-breakdown">
                        <div className="emission-category">
                            <strong>Transportation (29%)</strong>
                            <ul>
                                <li>Personal vehicle use</li>
                                <li>Air travel</li>
                                <li>Public transportation</li>
                                <li>Shipping and logistics</li>
                            </ul>
                            <p className="category-impact">
                                Impact: Shifting to electric vehicles and reducing air travel can significantly lower personal emissions.
                            </p>
                        </div>
                        <div className="emission-category">
                            <strong>Electricity & Heating (25%)</strong>
                            <ul>
                                <li>Home energy consumption</li>
                                <li>Industrial power generation</li>
                                <li>Fossil fuel power plants</li>
                                <li>Renewable energy alternatives</li>
                            </ul>
                            <p className="category-impact">
                                Impact: Transitioning to renewable energy sources can dramatically reduce carbon emissions.
                            </p>
                        </div>
                        <div className="emission-category">
                            <strong>Food & Agriculture (24%)</strong>
                            <ul>
                                <li>Meat production</li>
                                <li>Dairy farming</li>
                                <li>Crop cultivation</li>
                                <li>Food transportation</li>
                            </ul>
                            <p className="category-impact">
                                Impact: Plant-based diets and local food sourcing can significantly reduce agricultural emissions.
                            </p>
                        </div>
                        <div className="emission-category">
                            <strong>Manufacturing & Construction (21%)</strong>
                            <ul>
                                <li>Industrial processes</li>
                                <li>Material production</li>
                                <li>Building construction</li>
                                <li>Consumer goods manufacturing</li>
                            </ul>
                            <p className="category-impact">
                                Impact: Sustainable manufacturing and circular economy practices can minimize industrial carbon footprints.
                            </p>
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Comprehensive Reduction Strategies",
            content: (
                <>
                    <div className="reduction-strategies">
                        <div className="strategy-category">
                            <h4>Personal Transportation</h4>
                            <ul>
                                <li>Use electric or hybrid vehicles</li>
                                <li>Bike or walk for short distances</li>
                                <li>Use public transportation</li>
                                <li>Carpool or use ride-sharing</li>
                                <li>Combine errands to reduce trips</li>
                            </ul>
                            <div className="strategy-impact">
                                <strong>Potential Reduction:</strong>
                                <p>Switching to electric vehicles can reduce personal transportation emissions by up to 50%.</p>
                            </div>
                        </div>
                        <div className="strategy-category">
                            <h4>Home Energy Efficiency</h4>
                            <ul>
                                <li>Install solar panels</li>
                                <li>Use LED lighting</li>
                                <li>Improve home insulation</li>
                                <li>Use smart thermostats</li>
                                <li>Choose energy-efficient appliances</li>
                            </ul>
                            <div className="strategy-impact">
                                <strong>Potential Reduction:</strong>
                                <p>Energy-efficient home upgrades can reduce household emissions by 30-40%.</p>
                            </div>
                        </div>
                        <div className="strategy-category">
                            <h4>Dietary Changes</h4>
                            <ul>
                                <li>Reduce meat consumption</li>
                                <li>Choose local and seasonal produce</li>
                                <li>Minimize food waste</li>
                                <li>Opt for plant-based proteins</li>
                                <li>Support sustainable agriculture</li>
                            </ul>
                            <div className="strategy-impact">
                                <strong>Potential Reduction:</strong>
                                <p>A plant-based diet can reduce an individual's carbon footprint by up to 73%.</p>
                            </div>
                        </div>
                        <div className="strategy-category">
                            <h4>Consumption & Waste</h4>
                            <ul>
                                <li>Practice the 3 Rs: Reduce, Reuse, Recycle</li>
                                <li>Buy second-hand items</li>
                                <li>Choose products with minimal packaging</li>
                                <li>Compost organic waste</li>
                                <li>Support circular economy brands</li>
                            </ul>
                            <div className="strategy-impact">
                                <strong>Potential Reduction:</strong>
                                <p>Proper waste management can reduce personal waste-related emissions by up to 25%.</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Technological Innovations in Carbon Reduction",
            content: (
                <>
                    <p>Emerging technologies are playing a crucial role in combating climate change and reducing carbon emissions:</p>
                    <div className="tech-innovations">
                        <div className="innovation-category">
                            <h4>Carbon Capture and Storage (CCS)</h4>
                            <ul>
                                <li>Captures CO2 from industrial processes</li>
                                <li>Stores carbon underground or repurposes it</li>
                                <li>Potential to reduce emissions by up to 90%</li>
                            </ul>
                        </div>
                        <div className="innovation-category">
                            <h4>Renewable Energy Advancements</h4>
                            <ul>
                                <li>Improved solar panel efficiency</li>
                                <li>Offshore wind farm technologies</li>
                                <li>Advanced energy storage solutions</li>
                            </ul>
                        </div>
                        <div className="innovation-category">
                            <h4>Sustainable Agriculture Tech</h4>
                            <ul>
                                <li>Precision farming techniques</li>
                                <li>Vertical farming</li>
                                <li>Lab-grown meat alternatives</li>
                            </ul>
                        </div>
                        <div className="innovation-category">
                            <h4>Electric and Hydrogen Transportation</h4>
                            <ul>
                                <li>Advanced electric vehicle batteries</li>
                                <li>Hydrogen fuel cell technology</li>
                                <li>Sustainable public transportation</li>
                            </ul>
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Global Impact and Future Outlook",
            content: (
                <>
                    <p>Climate change is a critical global challenge. The Intergovernmental Panel on Climate Change (IPCC) warns that to limit global warming to 1.5°C above pre-industrial levels, we must:</p>
                    <ul>
                        <li>Reduce global carbon emissions by 45% by 2030</li>
                        <li>Achieve net-zero emissions by 2050</li>
                        <li>Transition to renewable energy sources</li>
                        <li>Implement sustainable urban planning</li>
                        <li>Protect and restore natural ecosystems</li>
                    </ul>
                    <div className="future-projections">
                        <h4>Climate Action Milestones</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Global Emission Target</th>
                                    <th>Key Objectives</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2030</td>
                                    <td>45% Reduction</td>
                                    <td>Renewable Energy Expansion</td>
                                </tr>
                                <tr>
                                    <td>2040</td>
                                    <td>70% Reduction</td>
                                    <td>Industrial Decarbonization</td>
                                </tr>
                                <tr>
                                    <td>2050</td>
                                    <td>Net-Zero Emissions</td>
                                    <td>Global Sustainability</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>Individual actions, when combined, can create significant systemic change and contribute to global sustainability efforts.</p>
                </>
            )
        }
    ];


    return (
        <div className="learn-carbon-container">

            <div className="what-carbon">
                <h2>Hmm..I'm not sure about what Carbon FootPrints are 🤔</h2>
                <div className="what-carbon-txt">A carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) that are generated by our actions.
                    The average carbon footprint for a person in the United States is 16 tons, one of the highest rates in the world. Globally, the average carbon footprint is closer to 4 tons. To have the best chance of avoiding a 2℃ rise in global temperatures, the average global carbon footprint per year needs to drop to under 2 tons by 2050.
                    Lowering individual carbon footprints from 16 tons to 2 tons doesn’t happen overnight! By making small changes to our actions, like eating less meat, taking fewer connecting flights and line drying our clothes, we can start making a big difference.
                    Key contributors to an individual's carbon footprint include:
                    Energy use (electricity, heating, and cooling).
                    Transportation (cars, airplanes, and public transit).
                    Diet choices (meat, dairy, and food waste).
                    Consumption patterns (clothing, electronics, and packaging).
                </div>
            </div>

            <CarbonEmissionsReport />


            <div className="learn-carbon-header">
                <h2>Comprehensive Guide to Carbon Footprints</h2>
                <p>Understanding and Reducing Your Environmental Impact</p>
            </div>

            <div className="carbon-sections">
                {carbonSections.map((section, index) => (
                    <div key={index} className="carbon-section">
                        <div
                            className="section-title"
                            // If the current section is already active, set it to null (close it)
                            // If it's not active, set it to the current index (open it)
                            onClick={() => setActiveSection(activeSection === index ? null : index)}
                        >
                            <h3>{section.title}</h3>
                            <span>{activeSection === index ? '−' : '+'}</span>
                        </div>
                        {activeSection === index && (
                            <div className="section-content">
                                {section.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}