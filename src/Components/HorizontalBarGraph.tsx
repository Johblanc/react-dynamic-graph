import { useMemo } from "react";

interface IHorizontalBarGraphProps<TData = Object> {
  id: string;
  data: TData[];
  width: number;
  height: number;
  barColor: string;
  groupBy: keyof TData;
  legendWidth?: number;
}

export function HorizontalBarGraph<TData = Object>({
  id,
  data,
  width,
  height,
  barColor,
  groupBy,
  legendWidth = width / 2,
}: IHorizontalBarGraphProps<TData>) {
  const values = useMemo(
    () =>
      data.reduce(
        (acc, item) => {
          const key = item[groupBy];
          if (typeof key === "string") {
            if ({ [key]: undefined, ...acc }[key] === undefined) {
              return {
                ...acc,
                [key]: 1,
              };
            }
            return {
              ...acc,
              [key]: acc[key] + 1,
            };
          }
          return acc;
        },
        {} as {
          [key: string]: number;
        }
      ),
    [data, groupBy]
  );
  const maxValue = useMemo(() => Math.max(...Object.values(values)), [values]);
  const barHeight = useMemo(
    () => height / Object.keys(values).length,
    [values, height]
  );

  return (
    <svg
      id={id}
      width={width}
      height={height}
      version="1.1"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1={0}
          y1={0}
          x2={legendWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="95%" style={{ stopColor: "#000", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#000", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      {Object.entries(values).map(([key, value], index) => {
        const barWidth = (value / maxValue) * (width - legendWidth);
        return (
          <g key={index}>
            <text
              x={0}
              y={index * barHeight + barHeight / 2}
              textAnchor="start"
              alignmentBaseline="middle"
              fill={`url(#${id}-gradient)`}
              width={width}
              style={{
                overflow: "hidden",
              }}
            >
              {key}
            </text>
            <rect
              x={legendWidth}
              y={index * barHeight}
              height={barHeight - 2}
              width={barWidth}
              fill={barColor}
            />
            <text
              x={legendWidth + barWidth + (value < maxValue / 2 ? 5 : -5)}
              y={index * barHeight + barHeight / 2}
              textAnchor={value < maxValue / 2 ? "start" : "end"}
              alignmentBaseline="middle"
              fill={value < maxValue / 2 ? barColor : "white"}
              width={width}
              style={{
                overflow: "hidden",
              }}
            >
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
