import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const { resultImage, image, setImage, setResultImage } = useContext(AppContext);

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        {/* Image Container */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          {/* Original Image */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img
              className="rounded-md border w-full h-[400px] object-contain"
              src={image ? URL.createObjectURL(image) : ""}
              alt="Original"
            />
          </div>

          {/* Background Removed Image */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 mb-2">
              Background Removed
            </p>

            <div className="rounded-md border border-gray-300 h-[400px] relative bg-layer overflow-hidden">
              {resultImage && (
                <img
                  className="w-full h-full object-contain"
                  src={resultImage}
                  alt="Result"
                />
              )}

              {!resultImage && image && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        {resultImage && (
          <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
            <input
              type="file"
              id="newImageInput"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImage(e.target.files[0]);
                  setResultImage("");
                }
              }}
            />

            <button
              onClick={() => document.getElementById("newImageInput").click()}
              className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700"
            >
              Try another image
            </button>

            <a
              href={resultImage}
              download
              className="px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
