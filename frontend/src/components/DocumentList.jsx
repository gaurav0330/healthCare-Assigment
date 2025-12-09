import { useEffect, useState } from "react";
import { API } from "../api";
import { toast } from "react-hot-toast";
import { FiDownload, FiTrash } from "react-icons/fi";

export default function DocumentList() {
  const [docs, setDocs] = useState([]);

  const fetchDocs = async () => {
    try {
      const res = await API.get("/documents");
      setDocs(res.data);
    } catch {
      toast.error("Failed to load documents");
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const downloadFile = (id) => {
    window.open(`http://localhost:5000/documents/${id}`, "_blank");
  };

  const deleteFile = async (id) => {
    try {
      await API.delete(`/documents/${id}`);
      toast.success("File removed");
      fetchDocs();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {docs.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          No documents yet. Upload to get started! 📄
        </p>
      ) : (
        docs.map((doc) => (
          <div 
            key={doc.id} 
            className="bg-white p-5 rounded-xl shadow-md border hover:shadow-xl transition-all animate-fadeUp"
          >
            <p className="font-semibold text-teal-700 truncate">
              📄 {doc.originalName}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {(doc.filesize / 1024).toFixed(2)} KB
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => downloadFile(doc.id)}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Download"
              >
                <FiDownload size={22} />
              </button>

              <button
                onClick={() => deleteFile(doc.id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Delete"
              >
                <FiTrash size={22} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
