import { useMemo, useState } from "react";

interface IVerticalBarGraphProps<TData = Object> {
  title: string;
  id: string;
  data: TData[];
  width: number;
  height: number;
  barColor: string | ((key: string, value: number, max: number) => string);
  groupBy: keyof TData;
  legendHeight?: number;
  filteredKey?: keyof TData;
  filteredData?: TData[];
  onClick?: (key: string, ctrl?: boolean) => void;
  incluedKeys?: string[];
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
  filteredKey,
  filteredData = [],
  onClick,
  incluedKeys,
}: IVerticalBarGraphProps<TData>) {
  const [sortMode, setSortMode] = useState<"A-Z" | "Z-A" | "0-9" | "9-0">(
    "9-0"
  );
  const values = useMemo(
    () =>
      data.reduce(
        (acc, item) => {
          const key = String(item[groupBy]);
          const isIncluded =
            filteredKey === undefined ||
            filteredData.length === 0 ||
            filteredData.some((d) => d[filteredKey] === item[filteredKey]);
          if ({ [key]: undefined, ...acc }[key] === undefined) {
            return {
              ...acc,
              [key]: { all: 1, filtered: isIncluded ? 1 : 0 },
            };
          }
          return {
            ...acc,
            [key]: {
              all: acc[key].all + 1,
              filtered: acc[key].filtered + (isIncluded ? 1 : 0),
            },
          };
        },
        {} as {
          [key: string]: {
            all: number;
            filtered: number;
          };
        }
      ),
    [data, groupBy, filteredKey, filteredData]
  );
  const maxValue = useMemo(
    () => Math.max(...Object.values(values).map((v) => v.all)),
    [values]
  );
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
        width={Math.max(0, width)}
        height={Math.max(0, height)}
        version="1.1"
        viewBox={`0 0 ${Math.max(0, width)} ${Math.max(0, height)}`}
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
                return (
                  valueA.filtered - valueB.filtered || valueA.all - valueB.all
                );
              default:
                return (
                  valueB.filtered - valueA.filtered || valueB.all - valueA.all
                );
            }
          })
          .map(([key, value], index) => {
            const barHeight = (value.all / maxValue) * (height - legendHeight);
            return (
              <g key={index}>
                <text
                  onClick={onClick ? (e) => onClick(key, e.ctrlKey) : undefined}
                  x={0}
                  y={0}
                  textAnchor="start"
                  alignmentBaseline="middle"
                  width={width}
                  style={{
                    fill: `url(#${id}-gradient)`,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  transform={`rotate(-90) translate(${-height}, ${
                    index * barWidth + barWidth / 2
                  })`}
                  fillOpacity={
                    !incluedKeys ||
                    incluedKeys.length === 0 ||
                    incluedKeys.includes(key)
                      ? 1
                      : 0.5
                  }
                >
                  {key}
                </text>
                <rect
                  onClick={onClick ? (e) => onClick(key, e.ctrlKey) : undefined}
                  x={index * barWidth}
                  y={height - legendHeight - barHeight}
                  height={barHeight}
                  width={barWidth - 2}
                  fill={
                    typeof barColor === "string"
                      ? barColor
                      : barColor(key, value.all, maxValue)
                  }
                  fillOpacity={0.3}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
                <rect
                  onClick={onClick ? (e) => onClick(key, e.ctrlKey) : undefined}
                  x={index * barWidth}
                  y={
                    height -
                    legendHeight -
                    barHeight * (value.filtered / value.all)
                  }
                  height={barHeight * (value.filtered / value.all)}
                  width={barWidth - 2}
                  fill={
                    typeof barColor === "string"
                      ? barColor
                      : barColor(key, value.filtered, maxValue)
                  }
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
                <text
                  onClick={onClick ? (e) => onClick(key, e.ctrlKey) : undefined}
                  x={index * barWidth + barWidth / 2}
                  y={
                    height -
                    legendHeight -
                    barHeight * (value.filtered / value.all) +
                    (value.all < maxValue / 2 ? -10 : 12)
                  }
                  textAnchor={"middle"}
                  alignmentBaseline="middle"
                  width={width}
                  style={{
                    fill: "var(--var-color-app-text)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {value.filtered}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
