import React from 'react';
import nv from 'nvd3';
import d3 from 'd3';
import axios from 'axios';
import { ChartProps } from './Chart';

export const DonutChart: React.FC<ChartProps> = (props: ChartProps) => {
    const { id, datasetConfig } = props;

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
                        .pieChart()
                        .x(function (d) {
                            return d.label;
                        })
                        .y(function (d) {
                            return d.value;
                        })
                        .showLabels(true) //Display pie labels
                        .labelThreshold(0.05) //Configure the minimum slice size for labels to show up
                        .labelType('percent') //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                        .donut(true) //Turn on Donut mode. Makes pie chart look tasty!
                        .donutRatio(0.35); //Configure how big you want the donut hole size to be.
                    d3.select('#' + id + ' svg')
                        .datum(fetchedData.data.body.values)
                        .transition()
                        .duration(350)
                        .call(chart);

                    return chart;
                });
            }
        }

        fetchData().catch(console.error);
    });

    return (
        <span id={id}>
            <svg style={{ width: '700px' }}></svg>
        </span>
    );
};
