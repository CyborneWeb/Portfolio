import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Use PNG icons from assets folder
const LANGUAGES = [
  {
    code: "en",
    name: "English",
    icon: (
      <img
        src="/united-states.png"
        alt="English"
        className="w-6 h-6 rounded-full object-cover border border-gray-300"
      />
    ),
  },
  {
    code: "sl",
    name: "Slovenščina",
    icon: (
      <img
        src="/slovenia.png"
        alt="Slovenian"
        className="w-6 h-6 rounded-full object-cover border border-gray-300"
      />
    ),
  },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const current =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 px-2 py-1 rounded"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.icon}
        <FaChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            role="listbox"
          >
            {LANGUAGES.map((lang) => (
              <li
                key={lang.code}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  i18n.language === lang.code
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : ""
                }`}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}
                role="option"
                aria-selected={i18n.language === lang.code}
              >
                {lang.icon}
                <span>{lang.name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
