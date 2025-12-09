import { Toaster } from "react-hot-toast";
import UploadForm from "./components/UploadForm";
import DocumentList from "./components/DocumentList";
import { FiFileText } from "react-icons/fi";
import MedicalUploadImg from "./assets/medical-upload.png"; 


function App() {
  const refreshList = () => window.location.reload();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center px-4">
      <Toaster />

      {/* HEADER */}
      <header className="py-6 text-center">
        <h1 className="text-4xl font-extrabold text-teal-800 flex items-center justify-center gap-2">
          <FiFileText className="text-teal-700" />
          Patient Document Portal
        </h1>

        <p className="text-gray-600 mt-2 max-w-2xl">
          Upload, manage and securely access all your important medical reports in one place.
        </p>
        
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center mt-4 animate-fadeUp">
        <img
          src={MedicalUploadImg}
          alt="Medical Upload"
          className="w-72 md:w-80 drop-shadow-xl"
        />

        <div className="text-center my-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Store Your Medical Documents Securely
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Quick upload • Easy download • Privacy protected 🔐
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg border border-gray-100">
          <UploadForm onUploadSuccess={refreshList} />
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="w-full max-w-6xl mt-12 pb-16 animate-fadeUp">
        <h3 className="text-xl font-bold text-teal-700 mb-4">
          Your Documents 📂
        </h3>
        <DocumentList />
      </section>
    </div>
  );
}

export default App;
