"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const COUNTRY_STAMP_CONFIGS: Record<
  string,
  {
    src: string;
    top: string;
    left: string;
    width: number;
    height: number;
  }
> = {
  China: {
    src: "/countries/china/stamp.png",
    top: "75%",
    left: "10%",
    width: 100,
    height: 100,
  },
  Egypt: {
    src: "/countries/egypt/stamp.png",
    top: "55%",
    left: "20%",
    width: 100,
    height: 100,
  },
};

export default function ViewedPassportPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [showGif, setShowGif] = useState(true);
  const [avatar, setAvatar] = useState("avatar3");
  const [earnedStampCountries, setEarnedStampCountries] = useState<string[]>(
    [],
  );
  const [lastCountryVisited, setLastCountryVisited] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("firstName");
    if (name) setFirstName(name);
    const age = localStorage.getItem("age");
    if (age) setAge(age);
    // GIF timeout logic
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) setAvatar(savedAvatar);
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 3500);

    const loadEarnedStamps = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Decode token to get userId
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        // Fetch all countries
        const countriesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/countries`,
        );
        if (!countriesRes.ok) throw new Error("Failed to fetch countries");
        const countries = await countriesRes.json();

        let lastVisited = "";
        const earnedCountries: string[] = [];

        // Check progress for each country
        for (const country of countries) {
          const progressRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/progress/user/${userId}/country/${country._id}`,
          );
          if (progressRes.ok) {
            const progress = await progressRes.json();
            if (progress.hasStamp) {
              lastVisited = country.name;
              if (COUNTRY_STAMP_CONFIGS[country.name]) {
                earnedCountries.push(country.name);
              }
            }
          }
        }

        setLastCountryVisited(lastVisited);
        setEarnedStampCountries(Array.from(new Set(earnedCountries)));
      } catch (error) {
        console.error("Error checking stamps:", error);
      }
    };

    loadEarnedStamps();

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .passport-page {
          background-color: var(--pink-primary);
          max-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Yellow tape strips — top and bottom */
        .tape-top {
          position: absolute;
          top: 80px;
          left: 0;
          width: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .tape-bottom {
          position: absolute;
          bottom: 40px;
          left: 0;
          width: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .tape-top img,
        .tape-bottom img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Passport container */
        .passport-wrap {
          position: relative;
          width: 530px;
          height: 712px;
          z-index: 3;
          transition: transform 0.2s;
          margin-top: 80px;
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .passport-wrap {
            width: 80vw;
            height: auto;
          }
        }
      `}</style>

      <div className="passport-page">
        <Navbar />

        {/* Top tape strip */}
        <div className="tape-top">
          <Image
            src="/passport/tape-top.png"
            alt=""
            width={1440}
            height={80}
            style={{
              width: "100%",
              height: "auto",
              transform: "translateY(-15px) rotateZ(-1deg)",
            }}
          />
        </div>

        {/* Passport — clickable */}
        <div className="passport-wrap" aria-label="Viewed passport">
          {showGif ? (
            <img
              src="/passport/passport-opening.gif"
              alt="Opening Passport"
              width={439}
              height={712}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src="/passport/passport-open.jpeg"
              alt="Opened Passport"
              width={439}
              height={712}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          )}
          {/* Text overlay — only show when passport is open */}
          {!showGif && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
              }}
            >
              {/* Avatar image — in the grey rectangle on the left */}
              <img
                src={`/avatars/${avatar}.jpeg`}
                alt="Explorer avatar"
                style={{
                  width: 135,
                  height: 180,
                  position: "absolute",
                  top: "7%",
                  left: "9%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />
              {/* Explorer Name — bottom left of passport */}
              <p
                style={{
                  position: "absolute",
                  bottom: "53%",
                  left: "9%",
                  fontFamily: "Gafiton, sans-serif",
                  fontWeight: 400,
                  fontSize: 32,
                  lineHeight: "100%",
                  letterSpacing: "0.03em",
                  textAlign: "center",
                  textTransform: "capitalize",
                  color: "#231F20",
                  margin: 0,
                }}
              >
                {firstName}
              </p>

              {/* Right side fields */}
              {/* Explorer Age */}
              <p
                className="body"
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "39%",
                  color: "#000000",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                {age}
              </p>

              {/* Passport No — static for now, swap with real value if you have it */}
              <p
                className="body"
                style={{
                  position: "absolute",
                  top: "18%",
                  left: "39%",
                  color: "#000000",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                TRVL-K-1024
              </p>

              {/* Country of origin */}
              <p
                className="body"
                style={{
                  position: "absolute",
                  top: "26%",
                  left: "39%",
                  color: "#000000",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                {localStorage.getItem("country") || "Egypt"}
              </p>

              {/* Current Stop */}
              <p
                className="body"
                style={{
                  position: "absolute",
                  top: "34.8%",
                  left: "39%",
                  color: "#000000",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                {lastCountryVisited}
              </p>

              {/* Current Level */}
              <p
                className="body"
                style={{
                  position: "absolute",
                  top: "43%",
                  left: "39%",
                  color: "#000000",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                {localStorage.getItem("level") || "Level 1 Explorer"}
              </p>
            </div>
          )}
          {/* Earned country stamps — only show when passport is open */}
          {!showGif &&
            earnedStampCountries.map((countryName) => {
              const stamp = COUNTRY_STAMP_CONFIGS[countryName];
              if (!stamp) return null;
              return (
                <img
                  key={countryName}
                  src={stamp.src}
                  alt={`${countryName} Stamp`}
                  style={{
                    position: "absolute",
                    width: stamp.width,
                    height: stamp.height,
                    top: stamp.top,
                    left: stamp.left,
                    zIndex: 4,
                    pointerEvents: "none",
                  }}
                />
              );
            })}
        </div>

        {/* Bottom tape strip */}
        <div className="tape-bottom">
          <Image
            src="/passport/tape-bottom.png"
            alt=""
            width={1440}
            height={80}
            style={{
              width: "100%",
              height: "auto",
              transform: "translateY(60px) rotateZ(3deg)",
            }}
          />
        </div>
      </div>
    </>
  );
}
