import React from 'react';
import nv from 'nvd3';
import d3 from 'd3';

export interface BarChartProps {
    id: string;
}

export const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
    const { id } = props;

    React.useEffect(() => {
        //Each bar represents a single discrete quantity.
        function exampleData() {
            return [
                {
                    key: 'Cumulative Return',
                    values: [
                        {
                            label: 'A Label',
                            value: -29.765957771107,
                        },
                        {
                            label: 'B Label',
                            value: 0,
                        },
                        {
                            label: 'C Label',
                            value: 32.807804682612,
                        },
                        {
                            label: 'D Label',
                            value: 196.45946739256,
                        },
                        {
                            label: 'E Label',
                            value: 0.19434030906893,
                        },
                        {
                            label: 'F Label',
                            value: -98.079782601442,
                        },
                        {
                            label: 'G Label',
                            value: -13.925743130903,
                        },
                        {
                            label: 'H Label',
                            value: -5.1387322875705,
                        },
                    ],
                },
            ];
        }

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
                .datum(exampleData())
                .call(chart);

            //nv.utils.windowResize(chart.update);

            return chart;
        });
    });

    return (
        <span id={id}>
            <svg style={{ height: '300px' }}></svg>
        </span>
    );
};
