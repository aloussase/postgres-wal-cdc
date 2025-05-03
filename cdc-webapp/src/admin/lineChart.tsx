import { Message } from "../types/message";
import { Bar } from "react-chartjs-2";

interface Props {
  messages: Message[];
}

export const LineChart = ({ messages }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Database operations",
      },
    },
  };

  const labels = new Array(...new Set(messages.map((m) => m.kind)));

  const data = {
    labels,
    datasets: [
      {
        label: "Number of operations",
        data: labels.map(
          (label) => messages.filter((m) => m.kind === label).length,
        ),
        backgroundColor: ["green", "red", "purple", "blue"],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
