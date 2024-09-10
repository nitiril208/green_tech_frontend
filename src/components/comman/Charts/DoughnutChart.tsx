import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
	labels: string[];
	datasets: {
		label?: string;
		data: number[];
		backgroundColor: string[];
		borderColor?: string[];
		borderWidth?: number;
	}[];
}

const DoughnutChart: React.FC<{ data: ChartData }> = ({ data }) => {
	return <Doughnut data={data} />;
};

export default DoughnutChart;
