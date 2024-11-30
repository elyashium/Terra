import React from 'react'

export default function Timeline() {
    return (
        <div class="timeline-container">
            <div class="timeline-wrapper">
                <div class="timeline-top-row">
                    <p class="timeline-text-block" style="color: #4ce3ff; border-color: #4ce3ff;">
                        Minimal emissions, natural CO2 balance
                    </p>
                    <p class="timeline-text-block" style="color: #dbb000; border-color: #dbb000;">
                        Fossil fuels surge, climate impact surfaces
                    </p>
                    <p class="timeline-text-block" style="color: #008080; border-color: #008080;">
                        Proof of human-caused warming. Efforts to curb emissions begin
                    </p>
                    <p class="timeline-text-block" style="color: #d2691e; border-color: #d2691e;">
                        Shift to renewables sources, health implications
                    </p>
                </div>

                <div class="timeline-periods">
                    <div class="period-block" style="background-color: #4ce3ff;">Before 1800s</div>
                    <div class="period-block" style="background-color: #05e177;">18th-19th</div>
                    <div class="period-block" style="background-color: #dbb000;">20th Century</div>
                    <div class="period-block" style="background-color: #ff6900;">Mid-20th Century</div>
                    <div class="period-block" style="background-color: #008080;">Late 20th Century</div>
                    <div class="period-block" style="background-color: #cd7f32;">21st Century</div>
                    <div class="period-block" style="background-color: #ff4500;">2020s</div>
                    <div class="period-block" style="background-color: #8b0000;">Future</div>
                </div>

                <div class="timeline-bottom-row">
                    <p class="timeline-text-block" style="color: #05e177; border-color: #05e177;">
                        Industrialization spikes emissions. CO2 levels begin to rise
                    </p>
                    <p class="timeline-text-block" style="color: #cd7f32; border-color: #ff6900;">
                        Awareness grows, hints of consequence
                    </p>
                    <p class="timeline-text-block" style="color: #cd7f32; border-color: #cd7f32;">
                        CO2 climbs, Sea levels and biodiversity at risk
                    </p>
                    <p class="timeline-text-block" style="color: #d2691e; border-color: #8b0000;">
                        Our choice: Act now to safeguard tomorrow
                    </p>
                </div>
            </div>
        </div>
    )
}
