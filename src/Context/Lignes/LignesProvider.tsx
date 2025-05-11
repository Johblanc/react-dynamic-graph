import { JSX, useEffect, useMemo } from "react";
import { useFetchLigneType } from "../../Hooks/Fetch/SNCF/useFetchLignesType";
import { LignesContext } from "./LignesContext";
import { useFetchLigneRegion } from "../../Hooks/Fetch/SNCF/useFetchLignesRegion";
import { useFetchLigneSpeed } from "../../Hooks/Fetch/SNCF/useFetchLignesSpeed";
import { TLigne } from "./Ligne.type";

interface ILigneProviderProps {
  children?: JSX.Element | JSX.Element[] | string | string[];
}
export function LigneProvider({ children }: ILigneProviderProps) {
  const [runLigneType01, stateLigneType01] = useFetchLigneType();
  const [runLigneType02, stateLigneType02] = useFetchLigneType();
  const [runLigneType03, stateLigneType03] = useFetchLigneType();
  const [runLigneType04, stateLigneType04] = useFetchLigneType();
  const [runLigneType05, stateLigneType05] = useFetchLigneType();
  const [runLigneType06, stateLigneType06] = useFetchLigneType();
  const [runLigneType07, stateLigneType07] = useFetchLigneType();
  const [runLigneType08, stateLigneType08] = useFetchLigneType();
  const [runLigneType09, stateLigneType09] = useFetchLigneType();
  const [runLigneType10, stateLigneType10] = useFetchLigneType();
  const [runLigneType11, stateLigneType11] = useFetchLigneType();

  const [runLigneRegion01, stateLigneRegion01] = useFetchLigneRegion();
  const [runLigneRegion02, stateLigneRegion02] = useFetchLigneRegion();
  const [runLigneRegion03, stateLigneRegion03] = useFetchLigneRegion();
  const [runLigneRegion04, stateLigneRegion04] = useFetchLigneRegion();
  const [runLigneRegion05, stateLigneRegion05] = useFetchLigneRegion();
  const [runLigneRegion06, stateLigneRegion06] = useFetchLigneRegion();
  const [runLigneRegion07, stateLigneRegion07] = useFetchLigneRegion();
  const [runLigneRegion08, stateLigneRegion08] = useFetchLigneRegion();
  const [runLigneRegion09, stateLigneRegion09] = useFetchLigneRegion();
  const [runLigneRegion10, stateLigneRegion10] = useFetchLigneRegion();
  const [runLigneRegion11, stateLigneRegion11] = useFetchLigneRegion();
  const [runLigneRegion12, stateLigneRegion12] = useFetchLigneRegion();
  const [runLigneRegion13, stateLigneRegion13] = useFetchLigneRegion();

  const [runLigneSpeed01, stateLigneSpeed01] = useFetchLigneSpeed();
  const [runLigneSpeed02, stateLigneSpeed02] = useFetchLigneSpeed();
  const [runLigneSpeed03, stateLigneSpeed03] = useFetchLigneSpeed();
  const [runLigneSpeed04, stateLigneSpeed04] = useFetchLigneSpeed();
  const [runLigneSpeed05, stateLigneSpeed05] = useFetchLigneSpeed();
  const [runLigneSpeed06, stateLigneSpeed06] = useFetchLigneSpeed();
  const [runLigneSpeed07, stateLigneSpeed07] = useFetchLigneSpeed();
  const [runLigneSpeed08, stateLigneSpeed08] = useFetchLigneSpeed();
  const [runLigneSpeed09, stateLigneSpeed09] = useFetchLigneSpeed();
  const [runLigneSpeed10, stateLigneSpeed10] = useFetchLigneSpeed();
  const [runLigneSpeed11, stateLigneSpeed11] = useFetchLigneSpeed();
  const [runLigneSpeed12, stateLigneSpeed12] = useFetchLigneSpeed();
  const [runLigneSpeed13, stateLigneSpeed13] = useFetchLigneSpeed();
  const [runLigneSpeed14, stateLigneSpeed14] = useFetchLigneSpeed();
  const [runLigneSpeed15, stateLigneSpeed15] = useFetchLigneSpeed();
  const [runLigneSpeed16, stateLigneSpeed16] = useFetchLigneSpeed();
  const [runLigneSpeed17, stateLigneSpeed17] = useFetchLigneSpeed();
  const [runLigneSpeed18, stateLigneSpeed18] = useFetchLigneSpeed();
  const [runLigneSpeed19, stateLigneSpeed19] = useFetchLigneSpeed();
  const [runLigneSpeed20, stateLigneSpeed20] = useFetchLigneSpeed();
  const [runLigneSpeed21, stateLigneSpeed21] = useFetchLigneSpeed();
  const [runLigneSpeed22, stateLigneSpeed22] = useFetchLigneSpeed();
  const [runLigneSpeed23, stateLigneSpeed23] = useFetchLigneSpeed();
  const [runLigneSpeed24, stateLigneSpeed24] = useFetchLigneSpeed();
  const [runLigneSpeed25, stateLigneSpeed25] = useFetchLigneSpeed();

  const lignesTypes = useMemo(
    () => [
      ...(stateLigneType01.results || []),
      ...(stateLigneType02.results || []),
      ...(stateLigneType03.results || []),
      ...(stateLigneType04.results || []),
      ...(stateLigneType05.results || []),
      ...(stateLigneType06.results || []),
      ...(stateLigneType07.results || []),
      ...(stateLigneType08.results || []),
      ...(stateLigneType09.results || []),
      ...(stateLigneType10.results || []),
      ...(stateLigneType11.results || []),
    ],
    [
      stateLigneType01,
      stateLigneType02,
      stateLigneType03,
      stateLigneType04,
      stateLigneType05,
      stateLigneType06,
      stateLigneType07,
      stateLigneType08,
      stateLigneType09,
      stateLigneType10,
      stateLigneType11,
    ]
  );
  const lignesRegions = useMemo(
    () => [
      ...(stateLigneRegion01.results || []),
      ...(stateLigneRegion02.results || []),
      ...(stateLigneRegion03.results || []),
      ...(stateLigneRegion04.results || []),
      ...(stateLigneRegion05.results || []),
      ...(stateLigneRegion06.results || []),
      ...(stateLigneRegion07.results || []),
      ...(stateLigneRegion08.results || []),
      ...(stateLigneRegion09.results || []),
      ...(stateLigneRegion10.results || []),
      ...(stateLigneRegion11.results || []),
      ...(stateLigneRegion12.results || []),
      ...(stateLigneRegion13.results || []),
    ],
    [
      stateLigneRegion01,
      stateLigneRegion02,
      stateLigneRegion03,
      stateLigneRegion04,
      stateLigneRegion05,
      stateLigneRegion06,
      stateLigneRegion07,
      stateLigneRegion08,
      stateLigneRegion09,
      stateLigneRegion10,
      stateLigneRegion11,
      stateLigneRegion12,
      stateLigneRegion13,
    ]
  );

  const lignesSpeed = useMemo(
    () => [
      ...(stateLigneSpeed01.results || []),
      ...(stateLigneSpeed02.results || []),
      ...(stateLigneSpeed03.results || []),
      ...(stateLigneSpeed04.results || []),
      ...(stateLigneSpeed05.results || []),
      ...(stateLigneSpeed06.results || []),
      ...(stateLigneSpeed07.results || []),
      ...(stateLigneSpeed08.results || []),
      ...(stateLigneSpeed09.results || []),
      ...(stateLigneSpeed10.results || []),
      ...(stateLigneSpeed11.results || []),
      ...(stateLigneSpeed12.results || []),
      ...(stateLigneSpeed13.results || []),
      ...(stateLigneSpeed14.results || []),
      ...(stateLigneSpeed15.results || []),
      ...(stateLigneSpeed16.results || []),
      ...(stateLigneSpeed17.results || []),
      ...(stateLigneSpeed18.results || []),
      ...(stateLigneSpeed19.results || []),
      ...(stateLigneSpeed20.results || []),
      ...(stateLigneSpeed21.results || []),
      ...(stateLigneSpeed22.results || []),
      ...(stateLigneSpeed23.results || []),
      ...(stateLigneSpeed24.results || []),
      ...(stateLigneSpeed25.results || []),
    ],
    [
      stateLigneSpeed01,
      stateLigneSpeed02,
      stateLigneSpeed03,
      stateLigneSpeed04,
      stateLigneSpeed05,
      stateLigneSpeed06,
      stateLigneSpeed07,
      stateLigneSpeed08,
      stateLigneSpeed09,
      stateLigneSpeed10,
      stateLigneSpeed11,
      stateLigneSpeed12,
      stateLigneSpeed13,
      stateLigneSpeed14,
      stateLigneSpeed15,
      stateLigneSpeed16,
      stateLigneSpeed17,
      stateLigneSpeed18,
      stateLigneSpeed19,
      stateLigneSpeed20,
      stateLigneSpeed21,
      stateLigneSpeed22,
      stateLigneSpeed23,
      stateLigneSpeed24,
      stateLigneSpeed25,
    ]
  );

  const lignes: TLigne[] = useMemo(() => {
    const result = lignesTypes.reduce((acc, l) => {
      if (acc.some((a) => a.code_ligne === l.code_ligne)) {
        const index = acc.findIndex((a) => a.code_ligne === l.code_ligne);
        acc[index].types_lignes.push(l.type_ligne);
      }
      return [
        ...acc,
        {
          code_ligne: l.code_ligne,
          lib_ligne: l.lib_ligne,
          types_lignes: [l.type_ligne],
          regions: [],
          speeds: [],
        },
      ];
    }, [] as TLigne[]);

    lignesRegions.forEach((l) => {
      const index = result.findIndex((a) => a.code_ligne === l.code_ligne);
      if (index !== -1) {
        result[index].regions.push(l.region);
      }
    });

    lignesSpeed.forEach((l) => {
      const index = result.findIndex((a) => a.code_ligne === l.code_ligne);
      if (index !== -1) {
        result[index].speeds.push(l.v_max);
      }
    });

    return result;
  }, [lignesTypes, lignesRegions, lignesSpeed]);

  useEffect(() => {
    runLigneType01(1);
    runLigneType02(2);
    runLigneType03(3);
    runLigneType04(4);
    runLigneType05(5);
    runLigneType06(6);
    runLigneType07(7);
    runLigneType08(8);
    runLigneType09(9);
    runLigneType10(10);
    runLigneType11(11);

    runLigneRegion01(1);
    runLigneRegion02(2);
    runLigneRegion03(3);
    runLigneRegion04(4);
    runLigneRegion05(5);
    runLigneRegion06(6);
    runLigneRegion07(7);
    runLigneRegion08(8);
    runLigneRegion09(9);
    runLigneRegion10(10);
    runLigneRegion11(11);
    runLigneRegion12(12);
    runLigneRegion13(13);

    runLigneSpeed01(1);
    runLigneSpeed02(2);
    runLigneSpeed03(3);
    runLigneSpeed04(4);
    runLigneSpeed05(5);
    runLigneSpeed06(6);
    runLigneSpeed07(7);
    runLigneSpeed08(8);
    runLigneSpeed09(9);
    runLigneSpeed10(10);
    runLigneSpeed11(11);
    runLigneSpeed12(12);
    runLigneSpeed13(13);
    runLigneSpeed14(14);
    runLigneSpeed15(15);
    runLigneSpeed16(16);
    runLigneSpeed17(17);
    runLigneSpeed18(18);
    runLigneSpeed19(19);
    runLigneSpeed20(20);
    runLigneSpeed21(21);
    runLigneSpeed22(22);
    runLigneSpeed23(23);
    runLigneSpeed24(24);
    runLigneSpeed25(25);
  }, [
    runLigneType01,
    runLigneType02,
    runLigneType03,
    runLigneType04,
    runLigneType05,
    runLigneType06,
    runLigneType07,
    runLigneType08,
    runLigneType09,
    runLigneType10,
    runLigneType11,
    runLigneRegion01,
    runLigneRegion02,
    runLigneRegion03,
    runLigneRegion04,
    runLigneRegion05,
    runLigneRegion06,
    runLigneRegion07,
    runLigneRegion08,
    runLigneRegion09,
    runLigneRegion10,
    runLigneRegion11,
    runLigneRegion12,
    runLigneRegion13,
    runLigneSpeed01,
    runLigneSpeed02,
    runLigneSpeed03,
    runLigneSpeed04,
    runLigneSpeed05,
    runLigneSpeed06,
    runLigneSpeed07,
    runLigneSpeed08,
    runLigneSpeed09,
    runLigneSpeed10,
    runLigneSpeed11,
    runLigneSpeed12,
    runLigneSpeed13,
    runLigneSpeed14,
    runLigneSpeed15,
    runLigneSpeed16,
    runLigneSpeed17,
    runLigneSpeed18,
    runLigneSpeed19,
    runLigneSpeed20,
    runLigneSpeed21,
    runLigneSpeed22,
    runLigneSpeed23,
    runLigneSpeed24,
    runLigneSpeed25,
  ]);

  return (
    <LignesContext.Provider
      value={{ lignesTypes, lignesRegions, lignesSpeed, lignes }}
    >
      {children}
    </LignesContext.Provider>
  );
}
