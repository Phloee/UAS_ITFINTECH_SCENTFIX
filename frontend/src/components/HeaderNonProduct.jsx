import { useState, useRef } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "./HeaderNonProduct.css";

export function HeaderNonProduct({ showSubHeader, subHeaderItems = [] }) {
  // State untuk menu dan dropdown
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Fungsi untuk cek apakah link aktif
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Fungsi untuk cek apakah dropdown aktif
  const isDropdownActive = (paths) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  // Fungsi untuk update tinggi menu
  const updateMenuHeight = (submenuActive) => {
    if (!mobileMenuRef.current) return;
    const totalHeight = mobileMenuRef.current.scrollHeight;
    mobileMenuRef.current.style.maxHeight = submenuActive
      ? totalHeight + 137 + "px"
      : totalHeight + "px";
  };

  // Toggle hamburger
  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);

    if (mobileMenuRef.current) {
      if (newState) {
        updateMenuHeight();
      } else {
        mobileMenuRef.current.style.maxHeight = "0px";
      }
    }
  };

  // Toggle dropdown submenu
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    const submenuActive = openDropdown !== index;
    updateMenuHeight(submenuActive);
  };

  return (
    <header>
      {/* === DESKTOP HEADER === */}
      <div className="main-header">
        <div className="logo-section">
          <Link to={"/"}>
            <img src="/header/logo.svg" alt="Atomy" className="logo" />
          </Link>
        </div>

        <nav className="navbar">
          <Link to="/" className={`nav-link ${isActive('/about-us') ? 'active' : ''}`}>About Atomy</Link>
          <a href="https://global.atomy.com/menu.es?mid=b10401000000" className="nav-link" target="_blank" rel="noopener noreferrer">Success System</a>
          <Link to="/compensation/dealership" className={`nav-link ${isDropdownActive(['/compensation']) ? 'active' : ''}`}>Compensation Plan</Link>
          <Link to="/code-of-conduct/membership-agreement" className={`nav-link ${isDropdownActive(['/code-of-conduct']) ? 'active' : ''}`}>Kode Etik Atomy</Link>
          <a href="https://id.atomy.com/atomy/hub" className="nav-link" target="_blank" rel="noopener noreferrer">Atomy Hub</a>
        </nav>

        <div className="language-selector">
          <span className="language-text">Indonesia</span>
        </div>
      </div>

      <div className="header-divider" id="header-divider-1"></div>

      {/* === SUB HEADER (DYNAMIC) === */}
      {showSubHeader && (
        <div className="sub-header">
          <div className="container">
            <div className="main-nav">
              {subHeaderItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="header-divider"></div>
        </div>
      )}

      {/* === MOBILE MENU === */}
      <div className="mobile-group">
        <div className="mobile-nav-wrapper">
          <div className="mobile-logo-group">
            <div className="mobile-logo-pic">
              <img src="/header/logo.svg" alt="Atomy" />
            </div>
            <div className="mobile-logo-name">
              <p>Kumalawati.co</p>
            </div>
          </div>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        <div className="header-divider"></div>

        <nav
          ref={mobileMenuRef}
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          style={{
            maxHeight: menuOpen ? "auto" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <ul>
            <li><a href="/" className={`menu-link ${isActive('/') ? 'active' : ''}`}>About Atomy</a></li>
            <li><a href="/success-system" className={`menu-link ${isActive('/success-system') ? 'active' : ''}`}>Success System</a></li>

            {/* Compensation Plan Dropdown */}
            <li className="has-dropdown">
              <a
                href="#!"
                className={`menu-link dropdown-toggle ${isDropdownActive(['/compensation']) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(0);
                }}
              >
                Compensation Plan
              </a>
              <ul className={`submenu ${openDropdown === 0 ? "active" : ""}`}>
                <li><a href="/compensation/dealership" className={`menu-link ${isActive('/compensation/dealership') ? 'active' : ''}`}>Dealership</a></li>
                <li><a href="/compensation/bonus" className={`menu-link ${isActive('/compensation/bonus') ? 'active' : ''}`}>Bonus General / Mastership</a></li>
                <li><a href="/compensation/promotion-criteria" className={`menu-link ${isActive('/compensation/promotion-criteria') ? 'active' : ''}`}>Syarat Promosi</a></li>
              </ul>
            </li>

            {/* Kode Etik Dropdown */}
            <li className="has-dropdown">
              <a
                href="#!"
                className={`menu-link dropdown-toggle ${isDropdownActive(['/code-of-conduct']) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(1);
                }}
              >
                Kode Etik Atomy
              </a>
              <ul className={`submenu ${openDropdown === 1 ? "active" : ""}`}>
                <li><a href="/code-of-conduct/membership-agreement" className={`menu-link ${isActive('/code-of-conduct/membership-agreement') ? 'active' : ''}`}>Perjanjian Keanggotaan</a></li>
                <li><a href="/code-of-conduct/security-privacy" className={`menu-link ${isActive('/code-of-conduct/security-privacy') ? 'active' : ''}`}>Keamanan & Kebijakan Privasi</a></li>
                <li><a href="/code-of-conduct/terms-conditions" className={`menu-link ${isActive('/code-of-conduct/terms-conditions') ? 'active' : ''}`}>Syarat & Ketentuan</a></li>
              </ul>
            </li>

            <li><a href="https://id.atomy.com/atomy/hub" className="menu-link" target="_blank" rel="noopener noreferrer">Atomy Hub</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}