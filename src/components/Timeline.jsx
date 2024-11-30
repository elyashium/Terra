import React from 'react'
import '../app.css'

const Timeline = () => {
    const timelineData = [
        {
            period: 'Before 1800s',
            color: '#2C3E50',
            description: 'Minimal emissions, natural CO2 balance',
            textColor: '#4ce3ff'
        },
        {
            period: '18th-19th Century',
            color: '#34495E',
            description: 'Fossil fuels surge, climate impact surfaces',
            textColor: '#FFD700'
        },
        {
            period: '20th Century',
            color: '#2980B9',
            description: 'Industrialization spikes emissions',
            textColor: '#05e177'
        },
        {
            period: 'Mid-20th Century',
            color: '#8E44AD',
            description: 'Awareness grows, consequences emerge',
            textColor: '#FF6B6B'
        },
        {
            period: 'Late 20th Century',
            color: '#16A085',
            description: 'Scientific proof of human-caused warming',
            textColor: '#3498DB'
        },
        {
            period: '21st Century',
            color: '#D35400',
            description: 'Accelerating climate change impacts',
            textColor: '#E74C3C'
        },
        {
            period: '2020s',
            color: '#C0392B',
            description: 'Critical decade for climate action',
            textColor: '#F39C12'
        },
        {
            period: 'Future',
            color: '#2C3E50',
            description: 'Our choice: Safeguard tomorrow',
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline