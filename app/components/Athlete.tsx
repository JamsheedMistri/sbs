"use client"

import { useState, useEffect } from "react"
import type React from "react" // Added import for React

type AthleteProps = {
  name: string
  color: "blue" | "red"
  scores: {
    accuracy: number
    presentation: number
    majorDeductions: number
    minorDeductions: number
  }
  setScores: React.Dispatch<
    React.SetStateAction<{
      accuracy: number
      presentation: number
      majorDeductions: number
      minorDeductions: number
    }>
  >
  mode: "accuracy" | "presentation" | "total"
  position: "left" | "right"
}

export default function Athlete({ name, color, scores, setScores, mode, position }: AthleteProps) {
  const [presentationScores, setPresentationScores] = useState([2.0, 2.0, 2.0])

  useEffect(() => {
    if (scores.presentation === 6.0) {
      setPresentationScores([2.0, 2.0, 2.0])
    }
  }, [scores.presentation])

  const handleAccuracyDeduction = (amount: number) => {
    setScores((prev) => {
      const newAccuracy = Math.max(0, prev.accuracy + amount)
      if (amount === -0.3) {
        return { ...prev, accuracy: newAccuracy, majorDeductions: prev.majorDeductions + 1 }
      } else if (amount === -0.1) {
        return { ...prev, accuracy: newAccuracy, minorDeductions: prev.minorDeductions + 1 }
      } else if (amount === 0.3 && prev.majorDeductions > 0) {
        return { ...prev, accuracy: newAccuracy, majorDeductions: prev.majorDeductions - 1 }
      } else if (amount === 0.1 && prev.minorDeductions > 0) {
        return { ...prev, accuracy: newAccuracy, minorDeductions: prev.minorDeductions - 1 }
      }
      return prev
    })
  }

  const handlePresentationChange = (index: number, value: number) => {
    const newPresentationScores = [...presentationScores]
    newPresentationScores[index] = value
    setPresentationScores(newPresentationScores)
    setScores((prev) => ({
      ...prev,
      presentation: newPresentationScores.reduce((a, b) => a + b, 0),
    }))
  }

  const alignmentClass = position === "right" ? "text-right" : "text-left"

  return (
    <div className={`flex-1 ${color === "blue" ? "bg-blue-600" : "bg-red-600"} p-4 flex flex-col justify-between`}>
      <div className={`${alignmentClass} mb-4`}>
        <h2 className="text-2xl font-bold">{name}</h2>
        {mode === "accuracy" && <div className="text-4xl font-bold">Accuracy: {scores.accuracy.toFixed(1)}</div>}
        {mode === "presentation" && (
          <div className="text-4xl font-bold">Presentation: {scores.presentation.toFixed(1)}</div>
        )}
      </div>
      {mode === "accuracy" && (
        <div className="flex justify-between items-end h-full">
          {position === "left" ? (
            <div className="flex gap-2">
              <div className="flex flex-col justify-end gap-4">
                <button
                  className="bg-red-700 p-4 text-3xl rounded w-28 h-28"
                  onClick={() => handleAccuracyDeduction(-0.3)}
                >
                  -0.3
                </button>
                <button
                  className="bg-red-500 p-4 text-3xl rounded w-28 h-28"
                  onClick={() => handleAccuracyDeduction(-0.1)}
                >
                  -0.1
                </button>
              </div>
              <div className="flex flex-col justify-end gap-4">
                <button
                  className={`bg-green-700 p-4 text-3xl rounded w-28 h-28 ${scores.majorDeductions === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleAccuracyDeduction(0.3)}
                  disabled={scores.majorDeductions === 0}
                >
                  +0.3
                </button>
                <button
                  className={`bg-green-500 p-4 text-3xl rounded w-28 h-28 ${scores.minorDeductions === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleAccuracyDeduction(0.1)}
                  disabled={scores.minorDeductions === 0}
                >
                  +0.1
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 ml-auto">
              <div className="flex flex-col justify-end gap-4">
                <button
                  className={`bg-green-700 p-4 text-3xl rounded w-28 h-28 ${scores.majorDeductions === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleAccuracyDeduction(0.3)}
                  disabled={scores.majorDeductions === 0}
                >
                  +0.3
                </button>
                <button
                  className={`bg-green-500 p-4 text-3xl rounded w-28 h-28 ${scores.minorDeductions === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleAccuracyDeduction(0.1)}
                  disabled={scores.minorDeductions === 0}
                >
                  +0.1
                </button>
              </div>
              <div className="flex flex-col justify-end gap-4">
                <button
                  className="bg-red-700 p-4 text-3xl rounded w-28 h-28"
                  onClick={() => handleAccuracyDeduction(-0.3)}
                >
                  -0.3
                </button>
                <button
                  className="bg-red-500 p-4 text-3xl rounded w-28 h-28"
                  onClick={() => handleAccuracyDeduction(-0.1)}
                >
                  -0.1
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {mode === "presentation" && (
        <div className="flex flex-col justify-end h-full">
          {presentationScores.map((score, index) => (
            <div key={index} className="mb-4">
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={score}
                onChange={(e) => handlePresentationChange(index, Number.parseFloat(e.target.value))}
                className="w-full h-8 appearance-none bg-gray-300 rounded-full outline-none opacity-70 transition-opacity duration-200 hover:opacity-100"
                style={{
                  WebkitAppearance: "none",
                  background: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${((score - 0.5) / 1.5) * 100}%, #d3d3d3 ${((score - 0.5) / 1.5) * 100}%, #d3d3d3 100%)`,
                }}
              />
              <div className={alignmentClass}>{score.toFixed(1)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

