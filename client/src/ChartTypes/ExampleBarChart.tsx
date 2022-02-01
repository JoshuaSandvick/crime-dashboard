import React from 'react';
import nv, * as nvd3 from 'nvd3';
import * as d3 from 'd3';

const ExampleBarChart: React.FC = () => {
    React.useEffect(() => {
        var data = [
            {
                key: 'ExampleData',
                values: [
                    {
                        label: '# times Jeet farted',
                        value: 1,
                    },
                    {
                        label: '# times Keet farted',
                        value: 1500,
                    },
                ],
            },
        ];

        nv.addGraph(function () {
            var chart = nv.models
                .discreteBarChart()
                .x(function (d) {
                    return d.label;
                })
                .y(function (d) {
                    return d.value;
                });

            chart.staggerLabels(true);

            d3.select('#chart svg').datum(data).call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    }, []);

    return (
        <div id="chart">
            <svg></svg>
        </div>
    );
};

export default ExampleBarChart;
