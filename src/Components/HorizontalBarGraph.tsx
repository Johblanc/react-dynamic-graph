import { useMemo, useState } from "react";

interface IHorizontalBarGraphProps<TData = Object> {
  title: string;
  id: string;
  data: TData[];
  width: number;
  height: number;
  barColor: string | ((key: string, value: number, max: number) => string);
  groupBy: keyof TData;
  legendWidth?: number;
}

export function HorizontalBarGraph<TData = Object>({
  title,
  id,
  data,
  width,
  height,
  barColor,
  groupBy,
  legendWidth = width / 2,
}: IHorizontalBarGraphProps<TData>) {
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
  const barHeight = useMemo(
    () => height / Object.keys(values).length,
    [values, height]
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
            x2={legendWidth}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="95%" style={{ stopColor: "#000", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#000", stopOpacity: 0 }} />
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
                  fill={
                    typeof barColor === "string"
                      ? barColor
                      : barColor(key, value, maxValue)
                  }
                />
                <text
                  x={legendWidth + barWidth + (value < maxValue / 2 ? 5 : -5)}
                  y={index * barHeight + barHeight / 2}
                  textAnchor={value < maxValue / 2 ? "start" : "end"}
                  alignmentBaseline="middle"
                  fill={
                    value < maxValue / 2
                      ? typeof barColor === "string"
                        ? barColor
                        : barColor(key, value, maxValue)
                      : "white"
                  }
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
    </div>
  );
}
