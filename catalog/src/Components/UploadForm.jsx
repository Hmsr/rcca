import React,  { useState } from "react";

export default function UploadForm(props) {
    <form>
    <div className="mb-4">
    <label htmlFor="file" className="block font-bold mb-2">
      Choose a file:
    </label>
    <input type="file" id="file" name="file" />
  </div>
  <button
    type="button"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
  >
    Upload
  </button>
    </form>
}