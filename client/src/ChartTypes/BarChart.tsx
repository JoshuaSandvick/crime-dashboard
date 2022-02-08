import React from 'react';
import nv from 'nvd3';
import d3 from 'd3';
import axios from 'axios';

export interface BarChartProps {
    id: string;
}

export const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
    const { id } = props;

    React.useEffect(() => {
        async function fetchData() {
            const fetchedData = await axios({
                method: 'post',
                url: '/api/v1/get-demographics',
                data: {
                    state: 'WI',
                    year: 2019,
                    party: 'offender',
                    offense: 'robbery',
                    demographic: 'sex',
                },
            });

            if ('key' in fetchedData.data.body) {
                nv.addGraph(function () {
                    let chart = nv.models
                        .discreteBarChart()
                        .x(function (d) {
                            return d.label;
                        }) //Specify the data accessors.
                        .y(function (d) {
                            return d.value;
                        })
                        .staggerLabels(true) //Too many bars and not enough room? Try staggering labels.
                        .showValues(true); //...instead, show the bar value right on top of each bar.

                    chart.tooltip.enabled(false);

                    d3.select('#' + id + ' svg')
                        .datum([fetchedData.data.body])
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
