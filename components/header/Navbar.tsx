import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import "./navbar.css";

interface NavbarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleMenu }) => {
  const pathname = usePathname();
  return (
    <>
      {/* Sidebar Menu Start */}
      <div className={`siteMenu overscroll-contain ${isOpen ? "is-open" : ""}`}>
        <div className="siteMenu__container bg-coal">
          <div className="siteMenu__main px-1">
            {/* Close Button */}
            <div className="text-right mix-blend-difference fixed top-0 right-0 cursor-pointer z-50">
              <h3
                className="text-white text-4xl font-bold p-8"
                onClick={toggleMenu}
              >
                Close
              </h3>
            </div>
            {/* Close Button */}
            <nav className="siteMenu__nav" onClick={toggleMenu}>
              {[
                { name: "Home", path: "/" },
                { name: "Work", path: "/work" },
                { name: "Info", path: "/info" },
                { name: "Journal", path: "/journal" },
                { name: "Play", path: "/play" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`menu-item ${
                    pathname === item.path ? "active" : ""
                  }`}
                  style={{
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  <span className="siteMenu__nav-arrow">
                    <Image
                      className="rotate-45"
                      src="/arrow-external-white.svg"
                      alt="liq"
                      priority
                      width={80}
                      height={50}
                    />
                  </span>
                  <span className="siteMenu__nav-label">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="siteMenu__reel mediaBackground customCursor__trigger venobox vbox-item">
            <div className="mediafill">
              <div className="mediafill__iframe">
                <div className="mediaFill__iframe-inner">
                  <video autoPlay muted loop className="video">
                    <source src="/secret-smoke.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar Menu end */}
    </>
  );
};
