import { useContext, useMemo, useState } from "react";
import "./App.css";
import { HorizontalBarGraph } from "./Components/HorizontalBarGraph";
import { CircularGraph } from "./Components/CircularGraph";
import { LignesContext } from "./Context/Lignes/LignesContext";
import { SizeContext } from "./Context/Size/SizeContext";
import { VerticalBarGraph } from "./Components/VerticalBarGraph";

export function Page001() {
  const { lignes } = useContext(LignesContext);
  const { width } = useContext(SizeContext);
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);
  const [filteredSpeeds, setFilteredSpeeds] = useState<string[]>([]);
  const filteredData = useMemo(() => {
    return lignes.filter((l) => {
      const typesMatch =
        filteredTypes.length === 0 ||
        l.types_lignes.some((t) => filteredTypes.includes(t));
      const regionsMatch =
        filteredRegions.length === 0 ||
        l.regions.some((r) => filteredRegions.includes(r));
      const speedsMatch =
        filteredSpeeds.length === 0 ||
        l.speeds.some((s) => filteredSpeeds.includes(String(s)));
      return typesMatch && regionsMatch && speedsMatch;
    });
  }, [lignes, filteredTypes, filteredRegions, filteredSpeeds]);

  return (
    <>
      <h2>Filtre</h2>
      <p>
        Régions :{" "}
        {filteredRegions.map((item, i) => (
          <button
            key={i}
            style={{
              backgroundColor: "var(--var-color-app-text)",
              color: "var(--var-color-app-bg)",
              padding: "5px",
              borderRadius: "5px",
              marginRight: "5px",
            }}
            onClick={() => {
              setFilteredRegions((prev) => prev.filter((v) => v !== item));
            }}
          >
            {item}
            <span
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {" "}
              X
            </span>
          </button>
        ))}
      </p>
      <p>
        Type de ligne :{" "}
        {filteredTypes.map((item, i) => (
          <button
            key={i}
            style={{
              backgroundColor: "var(--var-color-app-text)",
              color: "var(--var-color-app-bg)",
              padding: "5px",
              borderRadius: "5px",
              marginRight: "5px",
            }}
            onClick={() => {
              setFilteredTypes((prev) => prev.filter((v) => v !== item));
            }}
          >
            {item}
            <span
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {" "}
              X
            </span>
          </button>
        ))}
      </p>
      <p>
        Vitesse de ligne :{" "}
        {filteredSpeeds.map((item, i) => (
          <button
            key={i}
            style={{
              backgroundColor: "var(--var-color-app-text)",
              color: "var(--var-color-app-bg)",
              padding: "5px",
              borderRadius: "5px",
              marginRight: "5px",
            }}
            onClick={() => {
              setFilteredSpeeds((prev) => prev.filter((v) => v !== item));
            }}
          >
            {item}
            <span
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {" "}
              X
            </span>
          </button>
        ))}
      </p>
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <CircularGraph
          title={"Ligne par type"}
          id={"lignes-type"}
          data={lignes.flatMap((l) =>
            l.types_lignes.map((t) => ({ id: l.code_ligne, type_ligne: t }))
          )}
          width={Math.min(400, width - 50)}
          height={550}
          groupBy={"type_ligne"}
          size={0.65}
          colors={(k) =>
            k.startsWith("Ligne")
              ? `hsl(0, 80%, 35%)`
              : k.startsWith("Voie-mère")
              ? `hsl(90, 80%, 35%)`
              : k.startsWith("Voie de")
              ? `hsl(180, 80%, 35%)`
              : `hsl(270, 80%, 35%)`
          }
          filteredData={filteredData.flatMap((l) =>
            l.types_lignes
              .filter(
                (t) => filteredTypes.length === 0 || filteredTypes.includes(t)
              )
              .map((t) => ({ id: l.code_ligne, type_ligne: t }))
          )}
          filteredKey={"id"}
          onClick={(k, add) => {
            setFilteredTypes((prev) =>
              add
                ? prev.includes(k)
                  ? prev.filter((v) => v !== k)
                  : [...prev, k]
                : prev.includes(k) && prev.length === 1
                ? []
                : [k]
            );
          }}
          incluedKeys={filteredTypes}
        />
        <HorizontalBarGraph
          title={"Ligne par Région"}
          id={"lignes-region"}
          data={lignes.flatMap((l) =>
            l.regions.map((r) => ({ id: l.code_ligne, region: r }))
          )}
          width={Math.min(500, width - 50)}
          height={600}
          legendWidth={200}
          barColor={(_, v, m) => `hsl(${(v / m) * 120}, 80%, 35%)`}
          groupBy={"region"}
          filteredData={filteredData.flatMap((l) =>
            l.regions
              .filter(
                (r) =>
                  filteredRegions.length === 0 || filteredRegions.includes(r)
              )
              .map((r) => ({ id: l.code_ligne, region: r }))
          )}
          filteredKey={"id"}
          onClick={(k, add) => {
            setFilteredRegions((prev) =>
              add
                ? prev.includes(k)
                  ? prev.filter((v) => v !== k)
                  : [...prev, k]
                : prev.includes(k) && prev.length === 1
                ? []
                : [k]
            );
          }}
          incluedKeys={filteredRegions}
        />
      </div>
      <VerticalBarGraph
        title={"Ligne par Vitesse"}
        id={"lignes-speed"}
        groupBy={"speed"}
        data={lignes.flatMap((l) =>
          l.speeds.map((r) => ({ id: l.code_ligne, speed: r }))
        )}
        width={width - 50}
        height={300}
        legendHeight={30}
        barColor={(_, v, m) => `hsl(${(v / m) * 120}, 80%, 35%)`}
        filteredData={filteredData.flatMap((l) =>
          l.speeds
            .filter(
              (r) =>
                filteredSpeeds.length === 0 ||
                filteredSpeeds.includes(String(r))
            )
            .map((r) => ({ id: l.code_ligne, speed: r }))
        )}
        filteredKey={"id"}
        onClick={(k, add) => {
          setFilteredSpeeds((prev) =>
            add
              ? prev.includes(k)
                ? prev.filter((v) => v !== k)
                : [...prev, k]
              : prev.includes(k) && prev.length === 1
              ? []
              : [k]
          );
        }}
        incluedKeys={filteredSpeeds}
      />
      <div
        style={{
          marginTop: "20px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "var(--var-color-app-bg)",
            }}
          >
            <tr>
              <th>Code Ligne</th>
              <th>Nom Ligne</th>
              <th>Types Ligne</th>
              <th>Vitesses</th>
              <th>Régions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((ligne, i) => (
              <tr
                key={i}
                style={{ backgroundColor: i % 2 === 0 ? "#0002" : undefined }}
              >
                <td>{ligne.code_ligne}</td>
                <td>{ligne.lib_ligne}</td>
                <td>
                  {ligne.types_lignes
                    .reduce(
                      (acc, item) =>
                        acc.includes(item) ? acc : [...acc, item],
                      [] as string[]
                    )
                    .sort((a, b) => a.localeCompare(b))
                    .join(", ")}
                </td>
                <td>
                  {ligne.speeds
                    .reduce(
                      (acc, item) =>
                        acc.includes(item) ? acc : [...acc, item],
                      [] as (number | null)[]
                    )
                    .sort((a, b) => {
                      if (a === null && b === null) return 0;
                      if (a === null) return 1;
                      if (b === null) return -1;
                      return a - b;
                    })
                    .map((s) => (s === null ? "N/A" : s))
                    .join(", ")}
                </td>
                <td>
                  {ligne.regions
                    .reduce(
                      (acc, item) =>
                        acc.includes(item) ? acc : [...acc, item],
                      [] as string[]
                    )
                    .sort((a, b) => a.localeCompare(b))
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
