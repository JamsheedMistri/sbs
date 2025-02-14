"use client"

import { useState } from "react"
import Athlete from "./components/Athlete"
import TotalScores from "./components/TotalScores"

type AthleteScores = {
  accuracy: number
  presentation: number
  majorDeductions: number
  minorDeductions: number
}

export default function TaekwondoScoringApp() {
  const [mode, setMode] = useState<"accuracy" | "presentation" | "total">("accuracy")
  const [chungScores, setChungScores] = useState<AthleteScores>({
    accuracy: 4.0,
    presentation: 6.0,
    majorDeductions: 0,
    minorDeductions: 0,
  })
  const [hongScores, setHongScores] = useState<AthleteScores>({
    accuracy: 4.0,
    presentation: 6.0,
    majorDeductions: 0,
    minorDeductions: 0,
  })
  const [isSwapped, setIsSwapped] = useState(false)

  const handleAccuracySubmit = () => {
    setMode("presentation")
  }

  const handlePresentationSubmit = () => {
    setMode("total")
  }

  const handleReset = () => {
    setChungScores({ accuracy: 4.0, presentation: 6.0, majorDeductions: 0, minorDeductions: 0 })
    setHongScores({ accuracy: 4.0, presentation: 6.0, majorDeductions: 0, minorDeductions: 0 })
    setMode("accuracy")
    setIsSwapped(false)
  }

  const handleSwap = () => {
    setIsSwapped(!isSwapped)
  }

  const renderAthlete = (
    name: string,
    color: "blue" | "red",
    scores: AthleteScores,
    setScores: React.Dispatch<React.SetStateAction<AthleteScores>>,
    position: "left" | "right",
  ) => <Athlete name={name} color={color} scores={scores} setScores={setScores} mode={mode} position={position} />

  return (
    <div className="flex h-screen w-screen text-white relative overflow-hidden">
      {isSwapped ? (
        <>
          {renderAthlete("Hong", "red", hongScores, setHongScores, "left")}
          {renderAthlete("Chung", "blue", chungScores, setChungScores, "right")}
        </>
      ) : (
        <>
          {renderAthlete("Chung", "blue", chungScores, setChungScores, "left")}
          {renderAthlete("Hong", "red", hongScores, setHongScores, "right")}
        </>
      )}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2">
        {mode !== "total" && (
          <button
            className="bg-white text-black px-4 py-2 rounded w-40"
            onClick={mode === "accuracy" ? handleAccuracySubmit : handlePresentationSubmit}
          >
            Submit {mode === "accuracy" ? "Accuracy" : "Presentation"}
          </button>
        )}
        <button className="bg-white text-black px-4 py-2 rounded w-40" onClick={handleSwap}>
          Swap Athletes
        </button>
      </div>
      {mode === "total" && <TotalScores chungScores={chungScores} hongScores={hongScores} onReset={handleReset} />}
    </div>
  )
}

