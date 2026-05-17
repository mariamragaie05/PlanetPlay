"use client";

import PostcardStudio from "@/app/components/PostcardStudio";

export default function EgyptStudio() {
  return (
    <PostcardStudio
      countryName="Egypt"
      // ── LANDMARKS ──
      landmarkImages={[
        "/postcard/egypt/landmarks/landmark_1.png",
        "/postcard/egypt/landmarks/landmark_2.png",
        "/postcard/egypt/landmarks/landmark_3.png",
        "/postcard/egypt/landmarks/landmark_4.png",
        "/postcard/egypt/landmarks/landmark_5.png",
        "/postcard/egypt/landmarks/landmark_6.png",
      ]}
      landmarkIcon="/postcard/egypt/landmarks/landmark_2.png"
      // ── FESTIVALS ──
      festivalImages={[
        "/postcard/egypt/festivals/festival_1.png",
        "/postcard/egypt/festivals/festival_2.png",
        "/postcard/egypt/festivals/festival_3.png",
        "/postcard/egypt/festivals/festival_4.png",
        "/postcard/egypt/festivals/festival_5.png",
        "/postcard/egypt/festivals/festival_6.png",
      ]}
      festivalIcon="/postcard/egypt/festivals/festival_3.png"
      // ── FOOD ──
      foodImages={[
        "/postcard/egypt/food/food_1.png",
        "/postcard/egypt/food/food_2.png",
        "/postcard/egypt/food/food_3.png",
        "/postcard/egypt/food/food_4.png",
        "/postcard/egypt/food/food_5.png",
        "/postcard/egypt/food/food_6.png",
      ]}
      foodIcon="/postcard/egypt/food/food_1.png"
      // ── STAMPS ──
      stampImages={[
        "/postcard/egypt/stamps/stamp_1.png",
        "/postcard/egypt/stamps/stamp_2.png",
        "/postcard/egypt/stamps/stamp_3.png",
        "/countries/egypt/stamp.png",
        "/postcard/stamp_5.png",
        "/postcard/stamp_6.png",
      ]}
      stampIcon="/postcard/egypt/stamps/stamp_1.png"
    />
  );
}
