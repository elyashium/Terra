import React from 'react';
import '../App.css';

const CarbonEmissionsReport = () => {
    return (
        <div className="carbon-emissions-report">
            <h1 className="report-title">Climate Crisis: Carbon Emissions Report</h1>

            <div className="report-section">
                <h2 className="section-title alarming-stats-title">Some Alarming Statistics</h2>
                <ul className="alarming-stats-list">
                    <li>
                        <span className="stat-icon">!</span>
                        The global average carbon footprint is about 4 tons per person with the highest in the United States (16 tons).
                    </li>
                    <li>
                        <span className="stat-icon">!</span>
                        One-fourth of the earth's species are likely to face extinction within the next 40 years if climate change continues to increase at the current rate.
                    </li>
                    <li>
                        <span className="stat-icon">!</span>
                        Reduction in greenhouse gas emissions can help prevent up to 3 million premature deaths yearly by the year 2100.
                    </li>
                    <li>
                        <span className="stat-icon">!</span>
                        If each of the 140 million homes in a city replaces its incandescent light bulb with an energy-efficient CFL lamp, it can save enough energy to power over 3 million homes in a year.
                    </li>
                </ul>
            </div>

            <div className="report-section">
                <h2 className="section-title">How Carbon Emissions have increased in past 50 years</h2>
                <div className="graph-placeholder">
                    <img src="src\images\50years.png" alt="" />
                </div>
                <p className="graph-description">
                    The graph shows how carbon emission have rapidly increasing in past years. The graph has been exponentially growing since the year 1960. Slight Downfall of the graph can be noticed in the year 2020. This exponential growth of carbon emissions depicts the risk to humanity posed by harmful emissions and its thousands of adverse effects.
                </p>
            </div>

            <div className="report-section">
                <h2 className="section-title">India's Persepective on Emission Statistics</h2>
                <div className="graph-placeholder">
                <img src="src\images\CountryWise.webp" alt="" />
                </div>
                <p className="graph-description">
                    We can see the country-wise emission stats in the graph alongside. It shows how Saudi Arabia and Canada are one of the highest carbon emitters while countries with less area and population like Japan also fall under one of the worldwide highest emission's categories.
                </p>
            </div>
        </div>
    );
};

export default CarbonEmissionsReport;