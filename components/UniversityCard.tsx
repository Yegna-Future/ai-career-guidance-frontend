import React from "react";
import { University } from "../types";
import MaxWidthWrapper from "./MaxWidthWrapper";

export const UniversityCard: React.FC<{ uni: University }> = ({ uni }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 cursor-pointer">
      {/* Image / Placeholder */}
      <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
        {/* Optionally, you can add uni.logo or an icon here */}
        <span className="text-gray-400 text-sm">University Image</span>
      </div>

      {/* University Info */}
      <h4 className="font-semibold text-lg">{uni.name}</h4>
      <p className="text-sm text-gray-600 mt-1">{uni.region}</p>

      {/* Footer */}
      <div className="flex justify-between mt-3 items-center">
        <a
          className="text-blue-600 text-sm hover:underline"
          href={`/universities/${uni.id}`}
        >
          View
        </a>
        <div
          className={`text-xs font-medium px-2 py-1 rounded ${uni.isPublic ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {uni.isPublic ? "Public" : "Private"}
        </div>
      </div>
    </div>
  );
};
