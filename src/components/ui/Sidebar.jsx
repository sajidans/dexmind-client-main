import { useEffect, useState } from "react";
import "../../styles/Sidebar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SidebarContent } from "../../constants/content/SidebarContent";

import { Link, useLocation } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Accordion } from "react-bootstrap";
import { FaCaretRight } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sideMenuList, setSideMenuList] = useState([]);
  const [activeLink, setActiveLink] = useState(
    SidebarContent?.userAdmin?.[0]?.id
  );
  const [expandedSection, setExpandedSection] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "Admin") {
      setSideMenuList(SidebarContent?.admin);
    } else if (role === "User") {
      setSideMenuList(SidebarContent?.user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = SidebarContent?.userAdmin?.find(
      (item) => item.link === currentPath
    )?.id;
    if (activeLink) {
      setActiveLink(activeLink);
    }
  }, [location.pathname]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`Sidebar  ${isSidebarOpen ? "show sm:bg-transparent md:bg-black/95 bg-black/95" : "hide"}`}
      id="navbar"
    >
      <nav className="nav">
        <div>
          <Link
  to={AuthenticatedRoutes.USER_DASHBOARD}
  className="nav-logo"
  onClick={() => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  }}
>
  <div className="flex items-center mt-10">
    <img src={logo} alt="T_image" className="w-[6rem] sm:w-[8rem] mx-auto" />
  </div>
</Link>


          <div className="nav-toggle" id="nav-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>

          <ul className="nav-list">
            {sideMenuList?.map((item) => (
              <li key={item?.id} className="nav-item">
                {item?.options ? (
                  <>
                    <Accordion
                      activeKey={expandedSection === item?.id ? item?.id : null}
                    >
                      <Accordion.Item eventKey={item?.id}>
                        <Accordion.Header
                          className="nav-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedSection((prev) =>
                              prev === item?.id ? null : item?.id
                            );
                          }}
                        >
                          {item?.icon}
                          <span className={`${!isSidebarOpen ? "hidden" : ""}`}>
                            {item?.name}
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul className="nested-options">
                            {item?.options.map((option) => (
                              <li key={option?.id} className="nav-item">
                                <Link
                                  to={option?.link}
                                  className={`nav-link ${
                                    activeLink === option?.id ? "active" : ""
                                  }`}
                                  onClick={() => handleLinkClick(option?.id)}
                                >
                                  <FaCaretRight />
                                  <span
                                    className={`${
                                      !isSidebarOpen ? "hidden" : ""
                                    }`}
                                  >
                                    {option?.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </>
                ) : (
                  <Link
                    to={item?.link}
                    className={`nav-link ${
                      activeLink === item?.id ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(item?.id)}
                  >
                    {item?.icon}
                    <span
                      className={`nav-text ${!isSidebarOpen ? "hidden" : ""}`}
                    >
                      {item?.name.charAt(0)?.toUpperCase() +
                        item?.name.slice(1)}
                    </span>
                  </Link>
                )}
              </li>
            ))}

            <li className="nav-item">
              <Link
                className="nav-link logout"
                onClick={() => {
                  logoutHandler();
                }}
              >
                {<RiLogoutCircleRLine />}
                <span className={`nav-text ${!isSidebarOpen ? "hidden" : ""}`}>
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
