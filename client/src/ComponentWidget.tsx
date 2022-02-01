import React, { ReactElement } from 'react';
import { DonutChart } from './ChartTypes/DonutChart';
import { BarChart } from './ChartTypes/BarChart';
import * as CSS from 'csstype';

type ChartType = 'DonutChart' | 'BarChart' | 'none';

export interface ComponentWidgetProps {
    id: string;
}

const ComponentWidget: React.FC<ComponentWidgetProps> = (props) => {
    const { id } = props;
    const [chartType, setChartType] = React.useState<ChartType>('none');

    function onChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setChartType(event.target.value as ChartType);
    }

    const selectStyle: CSS.Properties = {
        width: '100px',
        height: '20px',
        color: 'green',
        top: '50%',
        left: '50%',
        position: 'relative',
    };

    function getSelectJSX(): ReactElement {
        return (
            <select
                name={'chartSelect' + id}
                id={'chartSelect' + id}
                style={selectStyle}
                onChange={onChange}
            >
                <option value="none">Select...</option>
                <option value="DonutChart">Donut Chart</option>
                <option value="BarChart">Bar Chart</option>
            </select>
        );
    }

    function getChartJSX(): ReactElement {
        switch (chartType) {
            case 'DonutChart':
                return <DonutChart key={'chart' + id} id={'chart' + id} />;
            case 'BarChart':
                return <BarChart key={'chart' + id} id={'chart' + id} />;
            default:
                return <></>;
        }
    }

    return <div>{chartType === 'none' ? getSelectJSX() : getChartJSX()}</div>;
};

export default ComponentWidget;
