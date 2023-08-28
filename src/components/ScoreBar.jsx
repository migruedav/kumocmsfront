import React from "react";
import { CategoryBar } from "@tremor/react";

function ScoreBar({ label, score }) {
  const markerValue = (score - 50) * 2;

  return (
    <div>
      {label === "General" ? (
        <div className="flex justify-center w-full my-6">
          <div className="h-16 w-16 rounded-full bg-white text-black text-center font-bold text-2xl flex justify-center items-center">
            {score}
          </div>
        </div>
      ) : (
        <div className="text-white text-center my-4">
          {label} {score}/100
        </div>
      )}

      <CategoryBar
        values={[40, 9.5, 1, 9.5, 40]}
        colors={["red", "gray", "white", "gray", "white"]}
        markerValue={markerValue}
        className= {label === "General" ? "mt-3 mb-16" : "mt-3"}
        showLabels={false}
      />
    </div>
  );
}

export default ScoreBar;
