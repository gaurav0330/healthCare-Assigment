import { useState } from "react";
import { API } from "../api";
import { toast } from "react-hot-toast";

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a PDF");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/documents/upload", formData);
      toast.success("File uploaded successfully");
      onUploadSuccess();
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Upload failed");
    }
  };

  return (
    <form onSubmit={uploadFile} className="space-y-3">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-700
          file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm
          file:bg-teal-700 file:text-white
          hover:file:bg-teal-800 cursor-pointer"
      />

      <button
        type="submit"
        className="w-full bg-teal-700 text-white py-2 rounded-md font-semibold hover:bg-teal-800 transition"
      >
        Upload PDF
      </button>
    </form>
  );
}
