import React from 'react';
import nv from 'nvd3';
import 'nvd3/build/nv.d3.css';
import d3 from 'd3';
import axios from 'axios';
import { Box, Typography, Grow } from '@mui/material';

export interface ChartProps {
    id: string;
    datasetConfig: DatasetRequestConfig;
    url: string;
    chartType: string;
}

interface DatasetRequestConfig {
    location: string;
    year?: number;
    party?: 'offender' | 'victim';
    offense: string;
    demographic: string;
}

export const ChartComponent: React.FC<ChartProps> = (props: ChartProps) => {
    const { id, url, chartType } = props;

    const { location, year, party, offense, demographic } = props.datasetConfig;
    const datasetConfig: DatasetRequestConfig = React.useMemo(() => {
        return { location, year, party, offense, demographic };
    }, [location, year, party, offense, demographic]);

    const [showNoDataError, setShowNoDataError] = React.useState<boolean>(false);
    const [graphIsCreated, setGraphIsCreated] = React.useState<boolean>(false);

    React.useEffect(() => {
        setGraphIsCreated(false);

        async function fetchData() {
            const response = await axios({
                method: 'post',
                url: url,
                data: datasetConfig,
            });

            if (Object.keys(response.data.body).length === 0) {
                setShowNoDataError(true);
            } else {
                setShowNoDataError(false);
                CreateChart(response.data.body, id, chartType);
            }
        }

        d3.selectAll('#' + id + ' svg > *').remove();
        fetchData()
            .then(() => setGraphIsCreated(true))
            .catch(console.error);
    }, [chartType, id, url, datasetConfig]);

    return (
        <span id={id}>
            {showNoDataError ? (
                <Box display="flex" justifyContent="center" flexDirection="column" height="100%">
                    <Box display="flex" justifyContent="center">
                        <Typography variant="h5">No Data Available</Typography>
                    </Box>
                </Box>
            ) : (
                <></>
            )}
            <Grow in={graphIsCreated} timeout={300}>
                <svg></svg>
            </Grow>
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
                throw new Error(
                    'Multi-bar chart was passed in as the chart type, but there is no use case for these at this time.',
                );
            case 'LinePlusBarChart':
                chart = CreateLinePlusBarChart(data, id);
                break;
            default:
                throw new Error('Unexpected chart type');
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
        .showLabels(true)
        .labelThreshold(0.05)
        .labelType('percent')
        .donut(true)
        .donutRatio(0.35);
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
        .staggerLabels(true)
        .showValues(true);

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

    chart.y2Axis.tickFormat(function (d) {
        return d3.format('f')(d) + '%';
    });
    chart.bars.forceY([0]).padData(false);

    data[0].bar = true;

    d3.select('#' + id + ' svg')
        .datum(data)
        .transition()
        .duration(500)
        .call(chart);

    return chart;
}
