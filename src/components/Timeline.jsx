import React from 'react'
import '../App.css'

const Timeline = () => {
    const timelineData = [
        {
            period: 'Before 1800s',
            color: '#2C3E50',
            description: 'Minimal emissions, natural CO2 balance',
            movement: 'Pre-Industrial Equilibrium',
            keyEvents: [
                'Natural carbon cycle',
                'Stable global temperatures',
                'Minimal human industrial impact'
            ],
            carbonLevel: '~280 ppm CO2',
            textColor: '#4ce3ff'
        },
        {
            period: '18th-19th Century',
            color: '#34495E',
            description: 'Industrial Revolution begins',
            movement: 'Industrial Revolution',
            keyEvents: [
                'Steam power emergence',
                'Coal becomes primary energy source',
                'Rapid industrialization'
            ],
            carbonLevel: '~300 ppm CO2',
            textColor: '#FFD700'
        },
        {
            period: '20th Century',
            color: '#2980B9',
            description: 'Massive industrial expansion',
            movement: 'Fossil Fuel Era',
            keyEvents: [
                'Oil and gas dominance',
                'Global transportation revolution',
                'Exponential emissions growth'
            ],
            carbonLevel: '~380 ppm CO2',
            textColor: '#05e177'
        },
        {
            period: 'Mid-20th Century',
            color: '#8E44AD',
            description: 'Environmental consciousness emerges',
            movement: 'Early Environmental Movement',
            keyEvents: [
                'Rachel Carson\'s "Silent Spring"',
                'First Earth Day',
                'Initial climate warnings'
            ],
            carbonLevel: '~410 ppm CO2',
            textColor: '#FF6B6B'
        },
        {
            period: 'Late 20th Century',
            color: '#16A085',
            description: 'Scientific consensus on climate change',
            movement: 'Climate Science Revolution',
            keyEvents: [
                'IPCC formation',
                'Kyoto Protocol',
                'Global climate research intensifies'
            ],
            carbonLevel: '~420 ppm CO2',
            textColor: '#3498DB'
        },
        {
            period: '21st Century',
            color: '#D35400',
            description: 'Climate crisis accelerates',
            movement: 'Climate Action Movement',
            keyEvents: [
                'Paris Agreement',
                'Renewable energy surge',
                'Youth climate protests'
            ],
            carbonLevel: '~415-430 ppm CO2',
            textColor: '#E74C3C'
        },
        {
            period: '2020s',
            color: '#C0392B',
            description: 'Critical climate intervention decade',
            movement: 'Systemic Climate Transformation',
            keyEvents: [
                'Net-zero pledges',
                'Extreme weather documentation',
                'Accelerated green technology'
            ],
            carbonLevel: '~420-440 ppm CO2',
            textColor: '#F39C12'
        },
        {
            period: 'Future',
            color: '#2C3E50',
            description: 'Potential turning point for humanity',
            movement: 'Global Sustainability Era',
            keyEvents: [
                'Potential carbon neutrality',
                'Advanced green technologies',
                'Ecosystem restoration'
            ],
            carbonLevel: 'Depends on current actions',
            textColor: '#FFFFFF'
        }
    ]

    return (
        <div className="dark-timeline-container">
            <div className="timeline-header">
                <h2>Climate Change Timeline</h2>
            </div>
            <div className="timeline-grid">
                {timelineData.map((item, index) => (
                    <div
                        key={index}
                        className="timeline-item"
                        style={{ backgroundColor: item.color }}
                    >
                        <div
                            className="timeline-period"
                            style={{ color: item.textColor }}
                        >
                            {item.period}
                        </div>
                        <div
                            className="timeline-description"
                            style={{ color: item.textColor }}
                        >
                            {item.description}
                        </div>
                        <div className="timeline-details">
                            <p><strong>Movement:</strong> {item.movement}</p>
                            <p><strong>CO2 Level:</strong> {item.carbonLevel}</p>
                            <ul>
                                {item.keyEvents.map((event, i) => (
                                    <li key={i}>{event}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline