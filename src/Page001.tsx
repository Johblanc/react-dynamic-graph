import { useContext } from "react";
import "./App.css";
import { HorizontalBarGraph } from "./Components/HorizontalBarGraph";
import { VerticalBarGraph } from "./Components/VerticalBarGraph";
import { CircularGraph } from "./Components/CircularGraph";
import { LignesContext } from "./Context/Lignes/LignesContext";
import { SizeContext } from "./Context/Size/SizeContext";

export function Page001() {
  const { lignesTypes, lignesRegions, lignesSpeed } = useContext(LignesContext);
  const { width } = useContext(SizeContext);
  return (
    <>
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
          data={lignesTypes}
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
        />
        <HorizontalBarGraph
          title={"Ligne par type"}
          id={"lignes-region"}
          data={lignesRegions}
          width={Math.min(500, width - 50)}
          height={600}
          legendWidth={200}
          barColor={(_, v, m) => `hsl(${(v / m) * 120}, 80%, 35%)`}
          groupBy={"region"}
        />
      </div>
      <VerticalBarGraph
        title={"Ligne par Vitesse"}
        id={"lignes-speed"}
        data={lignesSpeed}
        width={width - 50}
        height={300}
        barColor={(_, v, m) => `hsl(${(v / m) * 120}, 80%, 35%)`}
        groupBy={"v_max"}
        legendHeight={30}
      />
      <div
        style={{
          marginTop: "20px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <table>
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
              <th>Type Ligne</th>
            </tr>
          </thead>
          <tbody>
            {lignesTypes.map((ligne) => (
              <tr key={ligne.code_ligne}>
                <td>{ligne.code_ligne}</td>
                <td>{ligne.lib_ligne}</td>
                <td>{ligne.type_ligne}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
