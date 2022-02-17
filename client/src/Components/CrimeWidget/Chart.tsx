import React from 'react';
import nv from 'nvd3';
import 'nvd3/build/nv.d3.css';
import d3 from 'd3';
import axios from 'axios';

export interface ChartProps {
    id: string;
    datasetConfig: DatasetRequestConfig;
    url: string;
    chartType: string;
}

interface DatasetRequestConfig {
    state: string;
    year?: number;
    party?: 'offender' | 'victim';
    offense: string;
    demographic: string;
}

export const ChartComponent: React.FC<ChartProps> = (props: ChartProps) => {
    const { id, datasetConfig, url, chartType } = props;

    React.useEffect(() => {
        async function fetchData() {
            const fetchedData = await axios({
                method: 'post',
                url: url,
                data: datasetConfig,
            });

            d3.selectAll('#' + id + ' svg > *').remove();
            CreateChart(fetchedData.data.body, id, chartType);
        }

        fetchData().catch(console.error);
    });

    return (
        <span id={id}>
            <svg style={{}}></svg>
        </span>
    );
};

function CreateChart(data: any, id: string, chartType: string): void {
    nv.addGraph(function () {
        let chart: nv.Chart;
        switch (chartType) {
            case 'DonutChart':
                chart = CreateDonutChart(data, id);
                break;
            case 'BarChart':
                chart = CreateBarChart(data, id);
                break;
            case 'MultiBarChart':
                chart = CreateMultiBarChart(data, id);
                break;
            case 'LinePlusBarChart':
                chart = CreateLinePlusBarChart(data, id);
                break;
            default:
                chart = CreateDonutChart(data, id); // Need to make actual undefined case
                break;
        }

        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function CreateDonutChart(data: any, id: string): nv.Chart {
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
        .datum(data.values)
        .transition()
        .duration(350)
        .call(chart);

    return chart;
}

function CreateBarChart(data: any, id: string): nv.Chart {
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
        .datum([data])
        .call(chart);

    return chart;
}

function CreateMultiBarChart(data: any, id: string): nv.Chart {
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
        .datum(data.values)
        .call(chart);

    return chart;
}

function CreateLinePlusBarChart(data: any, id: string): nv.Chart {
    let chart = nv.models
        .linePlusBarChart()
        .margin({ top: 50, right: 80, bottom: 30, left: 80 })
        .legendRightAxisHint(' [Using Right Axis]')
        .color(d3.scale.category10().range())
        .focusEnable(false);

    /* chart.xAxis
        .tickFormat(function (d) {
            return d3.time.format('%x')(new Date(d));
        })
        .showMaxMin(false); */

    chart.y2Axis.tickFormat(function (d) {
        return d3.format('f')(d) + '%';
    });
    chart.bars.forceY([0]).padData(false);

    /* chart.x2Axis
        .tickFormat(function (d) {
            return d3.time.format('%x')(new Date(d));
        })
        .showMaxMin(false); */

    data[0].bar = true;

    d3.select('#' + id + ' svg')
        .datum(data)
        .transition()
        .duration(500)
        .call(chart);

    //nv.utils.windowResize(chart.update);

    chart.dispatch.on('stateChange', function (e) {
        nv.log('New State:', JSON.stringify(e));
    });

    return chart;
}
