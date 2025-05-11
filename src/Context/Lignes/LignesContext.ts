import React from "react";
import { TLigneType } from "../../Hooks/Fetch/SNCF/useFetchLignesType";
import { TLigneRegion } from "../../Hooks/Fetch/SNCF/useFetchLignesRegion";
import { TLigneSpeed } from "../../Hooks/Fetch/SNCF/useFetchLignesSpeed";
import { TLigne } from "./Ligne.type";

export const LignesContext = React.createContext({
  lignesTypes: [] as TLigneType[],
  lignesRegions: [] as TLigneRegion[],
  lignesSpeed: [] as TLigneSpeed[],
  lignes: [] as TLigne[],
});
