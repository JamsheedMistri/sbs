type TotalScoresProps = {
  chungScores: { accuracy: number; presentation: number }
  hongScores: { accuracy: number; presentation: number }
  onReset: () => void
}

export default function TotalScores({ chungScores, hongScores, onReset }: TotalScoresProps) {
  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Total Scores</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-2">Chung (Blue)</h3>
            <p>Accuracy: {chungScores.accuracy.toFixed(1)}</p>
            <p>Presentation: {chungScores.presentation.toFixed(1)}</p>
            <p className="font-bold mt-2">Total: {(chungScores.accuracy + chungScores.presentation).toFixed(1)}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">Hong (Red)</h3>
            <p>Accuracy: {hongScores.accuracy.toFixed(1)}</p>
            <p>Presentation: {hongScores.presentation.toFixed(1)}</p>
            <p className="font-bold mt-2">Total: {(hongScores.accuracy + hongScores.presentation).toFixed(1)}</p>
          </div>
        </div>
        <button className="mt-8 bg-gray-800 text-white px-6 py-2 rounded" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

