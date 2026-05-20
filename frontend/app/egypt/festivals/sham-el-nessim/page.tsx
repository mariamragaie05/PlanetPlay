"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────

const BG_IMAGE = "/countries/egypt/festivals/sham-el-nessim/scene_0.jpg";

const INFO_CARD_IMAGE = "/infocards/info_card_festival.png";

const FESTIVAL_DESCRIPTION =
  "Sham El-Nessim is an ancient spring festival celebrated by all Egyptians regardless of religion, dating back over 4,500 years to the time of the Pharaohs.";

const BLOCKS_WITH_ZONES = [
  {
    id: "block1",
    image: "/countries/egypt/festivals/sham-el-nessim/block_1.png",
    zones: [
      {
        zoneId: "block1_0",
        top: "14%",
        left: "40%",
        width: "20%",
        height: "33.5%",
        placedTop: "14%",
        placedLeft: "33%",
        placedWidth: "35%",
        placedHeight: "33.5%",
      },
    ],
  },
  {
    id: "block2",
    image: "/countries/egypt/festivals/sham-el-nessim/block_2.png",
    zones: [
      {
        zoneId: "block2_0",
        top: "60%",
        left: "32%",
        width: "15%",
        height: "32.5%",
        placedTop: "60%",
        placedLeft: "22%",
        placedWidth: "35%",
        placedHeight: "32.5%",
      },
    ],
  },
  {
    id: "block3",
    image: "/countries/egypt/festivals/sham-el-nessim/block_3.png",
    zones: [
      {
        zoneId: "block3_0",
        top: "59%",
        left: "47%",
        width: "10%",
        height: "32%",
        placedTop: "59%",
        placedLeft: "36%",
        placedWidth: "32%",
        placedHeight: "32%",
      },
    ],
  },
  {
    id: "block4",
    image: "/countries/egypt/festivals/sham-el-nessim/block_4.png",
    zones: [
      {
        zoneId: "block4_0",
        top: "57%",
        left: "56%",
        width: "15%",
        height: "37%",
        placedTop: "57%",
        placedLeft: "42%",
        placedWidth: "42%",
        placedHeight: "37%",
      },
    ],
  },
  {
    id: "block5",
    image: "/countries/egypt/festivals/sham-el-nessim/block_5.png",
    zones: [
      {
        zoneId: "block5_0",
        top: "67%",
        left: "65%",
        width: "13%",
        height: "25%",
        placedTop: "62%",
        placedLeft: "58%",
        placedWidth: "34%",
        placedHeight: "32%",
      },
    ],
  },
  {
    id: "block6",
    image: "/countries/egypt/festivals/sham-el-nessim/block_6.png",
    zones: [
      {
        zoneId: "block6_0",
        top: "7%",
        left: "15%",
        width: "4%",
        height: "24%",
        placedTop: "7%",
        placedLeft: "4.5%",
        placedWidth: "25%",
        placedHeight: "24%",
      },
      {
        zoneId: "block6_1",
        top: "8%",
        left: "30%",
        width: "4%",
        height: "24%",
        placedTop: "8%",
        placedLeft: "19.4%",
        placedWidth: "25%",
        placedHeight: "24%",
      },
      {
        zoneId: "block6_2",
        top: "8%",
        left: "68.5%",
        width: "4%",
        height: "24%",
        placedTop: "8%",
        placedLeft: "58%",
        placedWidth: "25%",
        placedHeight: "24%",
      },
      {
        zoneId: "block6_3",
        top: "7%",
        left: "82%",
        width: "4%",
        height: "24%",
        placedTop: "7%",
        placedLeft: "71.5%",
        placedWidth: "25%",
        placedHeight: "24%",
      },
    ],
  },
  {
    id: "block7",
    image: "/countries/egypt/festivals/sham-el-nessim/block_7.png",
    zones: [
      {
        zoneId: "block7_0",
        top: "15%",
        left: "9.2%",
        width: "4%",
        height: "18%",
        placedTop: "15%",
        placedLeft: "9.2%",
        placedWidth: "4%",
        placedHeight: "20%",
      },
      {
        zoneId: "block7_1",
        top: "15%",
        left: "74.8%",
        width: "4%",
        height: "18%",
        placedTop: "15%",
        placedLeft: "74.8%",
        placedWidth: "4%",
        placedHeight: "20%",
      },
    ],
  },
];

const TOTAL_ZONES = BLOCKS_WITH_ZONES.reduce(
  (sum, b) => sum + b.zones.length,
  0,
);

const BLOCKS = BLOCKS_WITH_ZONES.map(({ id, image }) => ({ id, image }));

const VISIBLE_COUNT = 4;

// ─────────────────────────────────────────────

export default function ShamElNessimPage() {
  const [filledZones, setFilledZones] = useState<Set<string>>(new Set());
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [funFactBlockId, setFunFactBlockId] = useState<string | null>(null); // block id of last completed block
  const [shaking, setShaking] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [done, setDone] = useState(false);

  const [allCategoriesCompleted, setAllCategoriesCompleted] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [funFacts, setFunFacts] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchFunFacts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/country/Egypt/type/festival`,
        );
        const data = await res.json();
        const shamElNessim = data.find(
          (item: { name: string; funFacts?: string[] }) =>
            item.name?.toLowerCase().includes("sham el-nessim"),
        );
        if (shamElNessim?.funFacts?.length) {
          const map: Record<string, string> = {};
          BLOCKS.forEach((block, index) => {
            if (shamElNessim.funFacts[index]) {
              map[block.id] = shamElNessim.funFacts[index];
            }
          });
          setFunFacts(map);
        }
      } catch {
        setFunFacts({});
      }
    };
    fetchFunFacts();
  }, []);

  const isBlockFullyPlaced = (blockId: string) => {
    const block = BLOCKS_WITH_ZONES.find((b) => b.id === blockId)!;
    return block.zones.every((z) => filledZones.has(z.zoneId));
  };

  // ── Progress update ───────────────────────
  useEffect(() => {
    if (!done) return;
    const updateProgress = async () => {
      setProgressLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        );
        const decoded = JSON.parse(jsonPayload);
        const userId = decoded?.id;
        if (!userId) return;

        const countryRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/countries/egypt`,
        );
        const countryData = await countryRes.json();
        const countryId = countryData._id;

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, countryId }),
        });

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/progress/user/${userId}/country/${countryId}/category`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: "festival" }),
          },
        );

        const progressRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/progress/user/${userId}/country/${countryId}`,
        );
        const progressData = await progressRes.json();
        const allCompleted = ["food", "festival", "landmark"].every((cat) =>
          progressData.completedCategories?.includes(cat),
        );
        setAllCategoriesCompleted(allCompleted);
      } catch {
        // silent
      } finally {
        setProgressLoading(false);
      }
    };
    updateProgress();
  }, [done]);

  // ── Drag handlers ─────────────────────────
  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    e.dataTransfer.setData("blockId", blockId);
    setDraggingId(blockId);
  };

  const handleDragEnd = () => setDraggingId(null);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, zoneId: string, blockId: string) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("blockId");
    if (droppedId !== blockId) {
      setShaking(droppedId);
      setTimeout(() => setShaking(null), 500);
      return;
    }
    if (filledZones.has(zoneId)) return;

    const newFilled = new Set(filledZones);
    newFilled.add(zoneId);
    setFilledZones(newFilled);

    // Show fun fact when ALL zones of this block are now filled
    const block = BLOCKS_WITH_ZONES.find((b) => b.id === blockId)!;
    const allZonesFilled = block.zones.every((z) => newFilled.has(z.zoneId));
    if (allZonesFilled) setFunFactBlockId(blockId);

    if (newFilled.size === TOTAL_ZONES) {
      setTimeout(() => {
        setFunFactBlockId(null);
        setDone(true);
      }, 2500);
    }
  };

  // ── Carousel ──────────────────────────────
  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex + VISIBLE_COUNT < BLOCKS.length;
  const visibleBlocks = BLOCKS.slice(
    carouselIndex,
    carouselIndex + VISIBLE_COUNT,
  );

  // ─────────────────────────────────────────
  // CONGRATULATIONS SCREEN
  // ─────────────────────────────────────────
  if (done) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "var(--midnight-blue)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar />
        {/* Corner GIFs */}
        <img
          src="/gifs/firework.gif"
          alt=""
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 400,
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.8,
          }}
        />

        <img
          src="/gifs/firework.gif"
          alt=""
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 400,
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.8,
          }}
        />

        <img
          src="/gifs/firework.gif"
          alt=""
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            width: 400,
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.8,
          }}
        />

        <img
          src="/gifs/firework.gif"
          alt=""
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            width: 400,
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.8,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            zIndex: 5,
            padding: "52px 0 0",
          }}
        >
          <span
            style={{
              fontFamily: "Gafiton",
              fontWeight: 400,
              fontSize: 40,
              lineHeight: "100%",
              letterSpacing: "0.02em",
              textAlign: "center",
              textTransform: "uppercase",
              color: "#FFD84D",
            }}
          >
            CONGRATULATIONS
          </span>

          <span
            style={{
              fontFamily: "Gafiton",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: "100%",
              letterSpacing: "0.02em",
              textAlign: "center",
              textTransform: "uppercase",
              color: allCategoriesCompleted
                ? "var(--yellow-primary"
                : "#ffffff",
              padding: "0 0 40px",
            }}
          >
            {progressLoading ? (
              "..."
            ) : allCategoriesCompleted ? (
              <>
                READY TO TAKE
                <br />A QUIZ ABOUT EGYPT?
              </>
            ) : (
              <>
                ARE YOU READY FOR YOUR
                <br />
                NEXT ADVENTURE?
              </>
            )}
          </span>

          {/* Dragon faces + fireworks */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            <img
              src="/countries/egypt/festivals/sham-el-nessim/block_1.png"
              alt=""
              draggable={false}
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                pointerEvents: "none",
                zIndex: 4,
              }}
            />
          </div>

          <button
            onClick={() => {
              window.location.href = allCategoriesCompleted
                ? "/quiz/egypt"
                : "/egypt";
            }}
            className="continue-btn"
            style={{
              background: "#ffffff",
              color: "#1B1F3B",
              border: "3px solid #1B1F3B",
              marginTop: 8,
              padding: "12px 52px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              fontSize: 20,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
            }}
          >
            {allCategoriesCompleted ? "READY!" : "CONTINUE"}
          </button>
        </div>

        <style>{`
          .continue-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px #FFD84D;
          }
        `}</style>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // GAME SCREEN
  // ─────────────────────────────────────────
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "var(--midnight-blue)",
      }}
    >
      <Navbar />

      {/* ── Header row ── */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "85px 12px 0",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div
          className="header3_v3"
          style={{
            color: "var(--yellow-primary)",
            transform: "translateY(10px)",
          }}
        >
          Sham El-Nessim
        </div>

        <p
          className="body_v2"
          style={{
            color: "var(--yellow-primary)",
            maxWidth: 557,
          }}
        >
          {FESTIVAL_DESCRIPTION}
        </p>

        <button
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            fontSize: 22,
            color: "#FFD84D",
            fontWeight: "bold",
            fontFamily: "Helvetica, sans-serif",
          }}
          aria-label="Info"
        >
          ⓘ
        </button>
      </div>

      {/* Info popup */}
      {showInfo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            pointerEvents: "none",
          }}
        >
          <img
            src={INFO_CARD_IMAGE}
            alt="Info"
            style={{ maxWidth: 420, width: "90%", borderRadius: 12 }}
          />
        </div>
      )}

      {/* Fun fact card */}
      {funFactBlockId !== null && funFacts[funFactBlockId] && (
        <div
          onClick={() => setFunFactBlockId(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 336,
              minHeight: 282,
              background: "#ffffff",
              borderLeft: "6px solid #FFD84D",
              borderBottom: "6px solid #FFD84D",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "10px 12px 8px",
              }}
            >
              <button
                onClick={() => setFunFactBlockId(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#1B1F3B",
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ height: 1, background: "#000", marginBottom: 16 }} />
            <div
              style={{
                padding: "0 20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "Gafiton",
                  fontWeight: 400,
                  fontSize: 32,
                  lineHeight: "100%",
                  letterSpacing: 0,
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#FFD84D",
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {`FUN FACT\nABOUT THE\nFESTIVAL`}
              </p>
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 14,
                  lineHeight: "1.5",
                  color: "#000000",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {funFacts[funFactBlockId]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Scene image + drop zones ── */}
      <div
        style={{
          width: "100%",
          height: 500,
          position: "relative",
          overflow: "hidden",
          marginTop: 8,
          transform: "translateY(30px)",
        }}
      >
        {/* Current scene — advances with every correct drop */}
        <img
          src={BG_IMAGE}
          alt="Festival scene"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* Placed block overlays */}
        {BLOCKS_WITH_ZONES.map((block) =>
          block.zones.map((zone) =>
            filledZones.has(zone.zoneId) ? (
              <img
                key={zone.zoneId}
                src={block.image}
                alt={block.id}
                draggable={false}
                style={{
                  position: "absolute",
                  top: zone.placedTop,
                  left: zone.placedLeft,
                  width: zone.placedWidth,
                  height: zone.placedHeight,
                  //   objectFit: "fill",
                  pointerEvents: "none",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            ) : null,
          ),
        )}

        {/* Active drop zones — all unfilled zones are droppable at any time */}
        {BLOCKS_WITH_ZONES.map((block) =>
          block.zones.map((zone) =>
            !filledZones.has(zone.zoneId) ? (
              <div
                key={zone.zoneId}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, zone.zoneId, block.id)}
                style={{
                  position: "absolute",
                  top: zone.top,
                  left: zone.left,
                  width: zone.width,
                  height: zone.height,
                  zIndex: 5,
                  // background: "rgba(255,0,0,0.2)", // uncomment to debug
                }}
              />
            ) : null,
          ),
        )}
      </div>

      {/* ── Carousel ── */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: "32px 52px 18px",
        }}
      >
        <button
          onClick={() =>
            canPrev && setCarouselIndex(carouselIndex - VISIBLE_COUNT)
          }
          style={{
            background: "none",
            border: "none",
            cursor: canPrev ? "pointer" : "default",
            color: canPrev ? "var(--yellow-primary)" : "rgba(255,255,255,0.2)",
            fontSize: 44,
            lineHeight: 1,
            padding: "0 4px",
            flexShrink: 0,
          }}
        >
          ‹
        </button>

        <div
          style={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {visibleBlocks.map((block) => {
            const fullyPlaced = isBlockFullyPlaced(block.id);
            return (
              <div
                key={block.id}
                draggable={!fullyPlaced}
                onDragStart={(e) =>
                  !fullyPlaced && handleDragStart(e, block.id)
                }
                onDragEnd={handleDragEnd}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 42,
                  cursor: fullyPlaced ? "default" : "grab",
                  opacity: draggingId === block.id ? 0.4 : 1,
                  transition: "opacity 0.2s, filter 0.3s",
                  userSelect: "none",
                  animation: shaking === block.id ? "shake 0.5s ease" : "none",
                }}
              >
                <img
                  src={block.image}
                  alt={block.id}
                  draggable={false}
                  style={{
                    maxWidth: block.id === "block7" ? 150 : 250,
                    minWidth: 55,
                    height: 130,
                    objectFit: "contain",
                    filter: fullyPlaced ? "brightness(0)" : "none",
                    transform:
                      block.id == "block7" ? "scale(0.9)" : "scale(1.5)",
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() =>
            canNext && setCarouselIndex(carouselIndex + VISIBLE_COUNT)
          }
          style={{
            background: "none",
            border: "none",
            cursor: canNext ? "pointer" : "default",
            color: canNext ? "var(--yellow-primary)" : "rgba(255,255,255,0.2)",
            fontSize: 44,
            lineHeight: 1,
            padding: "0 4px",
            flexShrink: 0,
          }}
        >
          ›
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-8px); }
          40%  { transform: translateX(8px); }
          60%  { transform: translateX(-6px); }
          80%  { transform: translateX(6px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
