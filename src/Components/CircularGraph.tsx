import { useMemo, useState } from "react";

interface ICircularGraphProps<TData = Object> {
  title: string;
  id: string;
  data: TData[];
  width: number;
  height: number;
  colors?: string[];
  groupBy: keyof TData;
  size?: number;
}

export function CircularGraph<TData = Object>({
  title,
  id,
  data,
  width,
  height,
  colors = ["red", "yellow", "blue", "cyan", "green", "magenta"],
  groupBy,
  size = 0.8,
}: ICircularGraphProps<TData>) {
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
  const coord = useMemo(() => {
    const base = Math.min(width, height) / 2;
    return {
      x: base,
      y: base,
      r: base,
    };
  }, [width, height]);

  const totalValue = useMemo(
    () => Object.values(values).reduce((acc, val) => acc + val, 0),
    [values]
  );

  const angleByPoint = useMemo(() => (2 * Math.PI) / totalValue, [totalValue]);

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
            x2={0}
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
          .map(([key, value], index, arr) => {
            const startAngle = arr
              .filter((_, i) => i < index)
              .reduce((acc, [_, val]) => acc + val * angleByPoint, 0);
            const endAngle = value * angleByPoint;

            return (
              <g key={index}>
                <path
                  d={[
                    `M${(1 + Math.sin(startAngle)) * coord.x} ${
                      (1 - Math.cos(startAngle)) * coord.y
                    } `,
                    `A${coord.x} ${coord.y} 0 0 1 ${
                      (1 + Math.sin(startAngle + Math.min(endAngle, Math.PI))) *
                      coord.x
                    } ${
                      (1 - Math.cos(startAngle + Math.min(endAngle, Math.PI))) *
                      coord.y
                    } `,
                    endAngle > Math.PI
                      ? `A${coord.x} ${coord.y} 0 0 1 ${
                          (1 + Math.sin(startAngle + endAngle)) * coord.x
                        } ${(1 - Math.cos(startAngle + endAngle)) * coord.y} `
                      : "",
                    `L${
                      (1 + Math.sin(startAngle + endAngle) * size) * coord.x
                    } ${
                      (1 - Math.cos(startAngle + endAngle) * size) * coord.y
                    } `,
                    endAngle > Math.PI
                      ? `A${coord.x * size} ${coord.y * size} 0 0 0 ${
                          (1 + Math.sin(startAngle + Math.PI) * size) * coord.x
                        } ${
                          (1 - Math.cos(startAngle + Math.PI) * size) * coord.y
                        } `
                      : "",
                    `A${coord.x * size} ${coord.y * size} 0 0 0 ${
                      (1 + Math.sin(startAngle) * size) * coord.x
                    } ${(1 - Math.cos(startAngle) * size) * coord.y} z`,
                  ].join("")}
                  opacity={1}
                  fill={
                    colors.length > 0 ? colors[index % colors.length] : "red"
                  }
                  strokeWidth={2}
                />
                <rect
                  x={10 + (width < height ? 0 : height)}
                  y={index * 30 + 20 + (width < height ? width : 0)}
                  width={10}
                  height={10}
                  fill={
                    colors.length > 0 ? colors[index % colors.length] : "red"
                  }
                />
                <text
                  x={30 + (width < height ? 0 : height)}
                  y={index * 30 + 25 + (width < height ? width : 0)}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fill="#000"
                >
                  {value}
                </text>
                <text
                  x={80 + (width < height ? 0 : height)}
                  y={index * 30 + 25 + (width < height ? width : 0)}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fill="#000"
                >
                  {Math.round((value / totalValue) * 100)} %
                </text>
                <text
                  x={130 + (width < height ? 0 : height)}
                  y={index * 30 + 25 + (width < height ? width : 0)}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fill="#000"
                >
                  {key}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
