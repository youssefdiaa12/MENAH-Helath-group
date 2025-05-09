import { Link } from "react-router-dom";
import logo from "../../assets/bosta.png";
import arabicBosta from "../../assets/arabicBosta.png";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    setIsArabic(currentLanguage === "ar");
    if (currentLanguage === "ar") {
      console.log("Arabic selected");
      document.body.dir = "rtl";
    } else {
      console.log("English selected");
      document.body.dir = "ltr";
    }
  }, [i18n.language]);
  return (
    <>
      <nav className={`relative shadow-lg ${fontClass}`}>
        <section className="">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 font-primary text-[16px] flex justify-between text-[#676e6d] items-center py-[10px]">
            <div>
              {isArabic ? (
                <Link to="/">
                  <img src={arabicBosta} alt="Arabic Bosta Logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img src={logo} alt="Bosta Logo" />
                </Link>
              )}
            </div>

            <ul className="flex justify-center">
              <li className="p-[14px] font-bold hover:text-[#E30613] transition-all duration-300">
                <Link to="/">{t("Home")}</Link>
              </li>
            </ul>
            <div className="relative inline-block text-left space-x-3">
              <button
                onClick={toggleDropdown}
                className="inline-block mx-10 text-lg font-semibold focus:outline-none hover:text-[#E30613] transition-all duration-300"
              >
                {t("language")}
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("english")}
                    </button>
                    <button
                      onClick={() => changeLanguage("ar")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("arabic")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
