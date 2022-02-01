import React from 'react';
import nv from 'nvd3';
import d3 from 'd3';

export interface DonutChartProps {
    id: string;
}

export const DonutChart: React.FC<DonutChartProps> = (props: DonutChartProps) => {
    const { id } = props;

    React.useEffect(() => {
        function exampleData() {
            return [
                {
                    label: 'One',
                    value: 29.765957771107,
                },
                {
                    label: 'Two',
                    value: 0,
                },
                {
                    label: 'Three',
                    value: 32.807804682612,
                },
                {
                    label: 'Four',
                    value: 196.45946739256,
                },
                {
                    label: 'Five',
                    value: 0.19434030906893,
                },
                {
                    label: 'Six',
                    value: 98.079782601442,
                },
                {
                    label: 'Seven',
                    value: 13.925743130903,
                },
                {
                    label: 'Eight',
                    value: 5.1387322875705,
                },
            ];
        }

        let width = 300;
        let height = 300;

        nv.addGraph(function () {
            let chart = nv.models
                .pieChart()
                .x(function (d) {
                    return d.label;
                })
                .y(function (d) {
                    return d.value;
                })
                .width(width)
                .height(height)
                .showLabels(true) //Display pie labels
                .labelThreshold(0.05) //Configure the minimum slice size for labels to show up
                .labelType('percent') //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                .donut(true) //Turn on Donut mode. Makes pie chart look tasty!
                .donutRatio(0.35); //Configure how big you want the donut hole size to be.
            d3.select('#' + id + ' svg')
                .datum(exampleData())
                .transition()
                .duration(350)
                .call(chart);

            return chart;
        });
    });

    return (
        <span id={id}>
            <svg style={{ height: '300px' }}></svg>
        </span>
    );
};
