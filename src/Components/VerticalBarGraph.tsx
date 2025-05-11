import { useMemo, useState } from "react";

interface IVerticalBarGraphProps<TData = Object> {
  title: string;
  id: string;
  data: TData[];
  width: number;
  height: number;
  barColor: string;
  groupBy: keyof TData;
  legendHeight?: number;
}

export function VerticalBarGraph<TData = Object>({
  title,
  id,
  data,
  width,
  height,
  barColor,
  groupBy,
  legendHeight = height / 2,
}: IVerticalBarGraphProps<TData>) {
  const [sortMode, setSortMode] = useState<"A-Z" | "Z-A" | "0-9" | "9-0">(
    "9-0"
  );
  const values = useMemo(
    () =>
      data.reduce(
        (acc, item) => {
          const key = String(item[groupBy]);
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
        },
        {} as {
          [key: string]: number;
        }
      ),
    [data, groupBy]
  );
  const maxValue = useMemo(() => Math.max(...Object.values(values)), [values]);
  const barWidth = useMemo(
    () => width / Object.keys(values).length,
    [values, width]
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3>{title}</h3>
        <button
          style={{
            backgroundColor: "var(--var-color-app-text)",
            color: "var(--var-color-app-bg)",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={() => {
            const newSortMode = (() => {
              switch (sortMode) {
                case "A-Z":
                  return "Z-A";
                case "Z-A":
                  return "0-9";
                case "0-9":
                  return "9-0";
                case "9-0":
                  return "A-Z";
              }
            })();
            setSortMode(newSortMode);
          }}
        >
          Trie : {sortMode}
        </button>
      </div>
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
            x2={legendHeight}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="95%"
              style={{ stopColor: "var(--var-color-app-text)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "var(--var-color-app-text)", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        {Object.entries(values)
          .sort((a, b) => {
            const [keyA, valueA] = a;
            const [keyB, valueB] = b;

            switch (sortMode) {
              case "A-Z":
                if (isNaN(Number(keyA)) || isNaN(Number(keyB))) {
                  return keyA.localeCompare(keyB);
                }
                return Number(keyA) - Number(keyB);
              case "Z-A":
                if (isNaN(Number(keyA)) || isNaN(Number(keyB))) {
                  return keyB.localeCompare(keyA);
                }
                return Number(keyB) - Number(keyA);
              case "0-9":
                return valueA - valueB;
              default:
                return valueB - valueA;
            }
          })
          .map(([key, value], index) => {
            const barHeight = (value / maxValue) * (height - legendHeight);
            return (
              <g key={index}>
                <text
                  x={0}
                  y={0}
                  textAnchor="start"
                  alignmentBaseline="middle"
                  width={width}
                  style={{
                    fill: `url(#${id}-gradient)`,
                  }}
                  transform={`rotate(-90) translate(${-height}, ${
                    index * barWidth + barWidth / 2
                  })`}
                >
                  {key}
                </text>
                <rect
                  x={index * barWidth}
                  y={height - legendHeight - barHeight}
                  height={barHeight}
                  width={barWidth - 2}
                  fill={barColor}
                />
                <text
                  x={index * barWidth + barWidth / 2}
                  y={
                    height -
                    legendHeight -
                    barHeight +
                    (value < maxValue / 2 ? -10 : 12)
                  }
                  textAnchor={"middle"}
                  alignmentBaseline="middle"
                  width={width}
                  style={{
                    fill: "var(--var-color-app-text)",
                  }}
                >
                  {value}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
