import React from 'react';
import nv from 'nvd3';
import d3 from 'd3';
import axios from 'axios';

export interface MultiBarChartProps {
    id: string;
}

export const MultiBarChart: React.FC<MultiBarChartProps> = (props: MultiBarChartProps) => {
    const { id } = props;

    React.useEffect(() => {
        async function fetchData() {
            const fetchedData = await axios({
                method: 'post',
                url: '/api/v1/get-counts',
                data: {
                    state: 'OH',
                    offense: 'robbery',
                },
            });

            if (fetchedData.data.body.values.length > 0) {
                nv.addGraph(function () {
                    let chart = nv.models
                        .multiBarChart()
                        .duration(350)
                        .reduceXTicks(false) //If 'false', every single x-axis tick label will be rendered.
                        .rotateLabels(0) //Angle to rotate x-axis labels.
                        .showControls(false) //Allow user to switch between 'Grouped' and 'Stacked' mode.
                        .groupSpacing(0.1); //Distance between each group of bars.

                    chart.tooltip.enabled(false);
                    //chart.xAxis.tickFormat(d3.format(',f'));
                    //chart.yAxis.tickFormat(d3.format(',.1f'));

                    d3.select('#' + id + ' svg')
                        .datum(fetchedData.data.body.values)
                        .call(chart);

                    return chart;
                });
            }
        }

        fetchData().catch(console.error);
    });

    return (
        <span id={id}>
            <svg style={{ width: '400px' }}></svg>
        </span>
    );
};
