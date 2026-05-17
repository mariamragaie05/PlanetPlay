"use client";

import PostcardStudio from "@/app/components/PostcardStudio";

export default function ChinaStudio() {
  return (
    <PostcardStudio
      countryName="China"
      // ── LANDMARKS ──
      landmarkImages={[
        "/postcard/china/icons/icon_landmarks.png",
        "/postcard/china/landmarks/landmarks_2.png",
        "/countries/china/landmarks/templeofheaven/congrats_landmark.png",
        "/postcard/china/landmarks/landmarks_4.png",
        "/postcard/china/landmarks/landmarks_5.png",
        "/postcard/china/landmarks/landmarks_6.png",
      ]}
      landmarkIcon="/postcard/china/icons/icon_landmarks.png"
      // ── FESTIVALS ──
      festivalImages={[
        "/countries/china/festivals/cny/block_2.png",
        "/postcard/china/festivals/festival_2.png",
        "/countries/china/festivals/cny/congrats_firework_right.png",
        "/countries/china/landmarks/templeofheaven/congrats_lantern.png",
        "/postcard/china/festivals/festival_5.png",
        "/countries/china/festivals/cny/block_1.png",
      ]}
      festivalIcon="/postcard/china/icons/icon_festivals.png"
      // ── FOOD ──
      foodImages={[
        "/postcard/china/food/food_1.png",
        "/countries/china/food/friedrice/ing_soysauce.png",
        "/countries/china/festivals/cny/block_6.png",
        "/postcard/china/food/food_4.png",
        "/postcard/china/food/food_5.png",
        "/countries/china/food/friedrice/ing_shrimp.png",
      ]}
      foodIcon="/postcard/china/icons/icon_food.png"
      // ── STAMPS ──
      stampImages={[
        "/postcard/china/stamps/stamp_1.png",
        "/postcard/china/stamps/stamp_2.png",
        "/postcard/china/stamps/stamp_3.png",
        "/countries/china/stamp.png",
        "/postcard/stamp_5.png",
        "/postcard/stamp_6.png",
      ]}
      stampIcon="/postcard/china/icons/icon_stamp.png"
    />
  );
}
