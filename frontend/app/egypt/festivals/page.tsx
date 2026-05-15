"use client";
import FestivalPage from "../../components/FestivalPage";

export default function EgyptFestivalsPage() {
  return (
    <FestivalPage
      countryName="Egypt"
      festivalImages={[
        "/countries/egypt/festivals/sham-el-nessim.jpeg",
        "/countries/egypt/festivals/sun-festival.jpeg",
        "/countries/egypt/festivals/eid-al-fitr.jpeg",
      ]}
    />
  );
}
