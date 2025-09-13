import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "../../hooks/useLanguage";

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const { toggleLanguage, language } = useLanguage();

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <FaGlobe className="text-gray-600 text-lg" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
          <button
            className="block w-full px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              toggleLanguage("English");
              setOpen(false);
            }}
          >
            English {language === "English" && "✔"}
          </button>
          <button
            className="block w-full px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              toggleLanguage("Bangla");
              setOpen(false);
            }}
          >
            বাংলা {language === "Bangla" && "✔"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
