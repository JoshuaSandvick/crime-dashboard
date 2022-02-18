export interface DemographicDataPoint {
  label: string;
  value: number;
}

export interface StreamDataPoint {
  x: number;
  y: number;
}

interface VisualizationData {
  key: string | number;
  values?: DemographicDataPoint[] | StreamDataPoint[];
}

export default VisualizationData;
