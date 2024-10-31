import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AiFillCaretDown,
  AiFillHome,
  AiFillSetting,
  AiFillCloseCircle,
} from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import {
  BiSolidReport,
  BiHelpCircle,
  BiUser,
  BiDollar,
  BiLogoVisa,
  BiBook,
  BiBuildingHouse,
} from "react-icons/bi";
import { LoginContext, SideNavContext } from "../../reactcontext/ReactContext";
import Logout from "../Logout";
import { LogoAndName } from "../";

const SideNavbar = () => {
  const [activeNav, setActiveNav] = useState(false);
  const { loginInfo } = useContext(LoginContext);
  const { setToggleMenu } = useContext(SideNavContext);
  const [toggleAdminTasks, setToggleAdminTasks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleAdminItems = () => setToggleAdminTasks((prev) => !prev);

  const devices = [
    { key: "profile", name: "Employee", icon: <BiUser fontSize={18} /> },
    {
      key: "visa_exp",
      name: "Visa Expire",
      icon: <BiLogoVisa fontSize={18} />,
    },
    { key: "30 Days", name: "30 Days", icon: <BiLogoVisa fontSize={18} /> },
    { key: "60 Days", name: "60 Days", icon: <BiLogoVisa fontSize={18} /> },
    { key: "90 Days", name: "90 Days", icon: <BiLogoVisa fontSize={18} /> },
    {
      key: "passport_exp",
      name: "Passport Expire",
      icon: <BiBook fontSize={18} />,
    },
    { key: "agents", name: "Agents", icon: <BiBuildingHouse fontSize={18} /> },
    { key: "payments", name: "Payments", icon: <BiDollar fontSize={18} /> },

    {
      key: "users",
      name: "Manage Users",
      icon: <MdManageAccounts fontSize={18} />,
    },
  ];
  const handleNavClick = (key, name) => {
    if (key === "visa_exp") {
      setActiveNav(true);
    } else {
      setActiveNav(false);
    }
  };
  const linkActiveStyles =
    "opacity-90 text-[12pt] flex flex-row item-center gap-x-2 p-2";
  const linkNotActiveStyles =
    "opacity-60 text-[11pt] flex flex-row items-center gap-x-2";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      onClick={() => {
        if (isMobile) {
          setToggleMenu(false);
        }
      }}
      className="min-w-[275px] h-full flex-col overflow-hidden bg-white md:flex p-2 pl-5 gap-y-2 md:relative absolute md:top-0 top-24 z-30"
    >
      <div className="md:flex hidden">
        <LogoAndName />
      </div>

      <div className="mt-5 flex flex-col gap-y-3">
        <NavLink
          key={"dashboard"}
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive ? linkActiveStyles : linkNotActiveStyles
          }
        >
          <AiFillHome fontSize={18} />
          <span>Dashboard </span>
        </NavLink>
      </div>

      <div className="mt-10 flex flex-col gap-y-3 overflow-y-auto">
        {devices.map((value, index) => {
          if (
            value.key === "30 Days" ||
            value.key === "60 Days" ||
            value.key === "90 Days"
          ) {
            return activeNav ? (
              <NavLink
                key={index}
                to={value.key}
                onClick={() => handleNavClick(value.key, value.name)}
                className={({ isActive }) =>
                  isActive ? linkActiveStyles : linkNotActiveStyles
                }
                style={{ marginLeft: "12px" }}
              >
                {value.icon}
                <span>{value.name}</span>
              </NavLink>
            ) : null;
          } else {
            return (
              <NavLink
                key={index}
                to={value.key}
                onClick={() => handleNavClick(value.key, value.name)}
                className={({ isActive }) =>
                  isActive ? linkActiveStyles : linkNotActiveStyles
                }
              >
                {value.icon}
                <span>{value.name}</span>
              </NavLink>
            );
          }
        })}
      </div>

      <div className="mt-7 flex flex-col gap-y-3">
        <NavLink
          key={"reports"}
          to={"/reports"}
          className={({ isActive }) =>
            isActive ? linkActiveStyles : linkNotActiveStyles
          }
        >
          <BiSolidReport fontSize={18} />
          <span>Reports </span>
        </NavLink>

        <NavLink
          key={"help"}
          to={"/help"}
          className={({ isActive }) =>
            isActive ? linkActiveStyles : linkNotActiveStyles
          }
        >
          <BiHelpCircle fontSize={18} />
          <span>Help </span>
        </NavLink>

        <Logout />
      </div>
    </div>
  );
};

export default SideNavbar;
