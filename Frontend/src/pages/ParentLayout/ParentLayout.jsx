import { Link, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { useState } from "react";

const ParentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4880FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you can perform logout logic
        console.log("User logged out"); // for now just a console log
        // Example: navigate to login page or clear tokens
        window.location.href = "/"; // redirect to home or login page
      }
    });
  };

  return (
    <>
      <main className="overflow-x-hidden ">
        <nav className="fixed top-0 z-50 w-full border-b bg-white border-gray-200 ">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between ">
              <div className="flex items-center text-center justify-center">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 "
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <Link to={"/"} className="">
                  <span className="self-center text-5xl font-extrabold text-center text-[#4880FF]">
                    Halebi
                  </span>
                </Link>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 "
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0  w-64 h-screen pt-20 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 sm:translate-x-0 `}
          aria-label="Sidebar"
        >
          <div className="h-full ps-3 pe-1 pb-4 overflow-y-scroll bg-white scrollbar-hide">
            <div className="space-y-4 font-medium">
              {/* Baby Data Section */}
              <div>
                <h3 className="text-[14px] font-bold text-[#a1a1a1] uppercase tracking-wider px-2 py-1">
                  BABY
                </h3>
                <ul className="space-y-1 mt-2">
                  <li>
                    <Link
                      to={"baby-info"}
                      className={`flex items-center p-2 rounded-lg ${
                        location.pathname === "/parent/baby-info"
                      }"
                          ? "bg-[#4880FF] text-white"
                          : "text-gray-900 hover:bg-[#4880FF] hover:text-white"
                      }`}
                    >
                      <span className="ms-3">Baby Information</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"ebm-table"}
                      className={`flex items-center p-2 rounded-lg ${
                        location.pathname === "/parent/ebm-table"
                      }"
                          ? "bg-[#4880FF] text-white"
                          : "text-gray-900 hover:bg-[#4880FF] hover:text-white"
                      }`}
                    >
                      <span className="ms-3">EBM Table</span>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Baby Data Section */}
              <div>
                <h3 className="text-[14px] font-bold text-[#a1a1a1] uppercase tracking-wider px-2 py-1">
                  PERSONAL
                </h3>
                <ul className="space-y-1 mt-2">
                  <li>
                    <Link
                      to={"baby-profile"}
                      className={`flex items-center p-2 rounded-lg ${
                        location.pathname === "/parent/baby-profile"
                      }"
                          ? "bg-[#4880FF] text-white"
                          : "text-gray-900 hover:bg-[#4880FF] hover:text-white"
                      }`}
                    >
                      <span className="ms-3">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"baby-messaging"}
                      className={`flex items-center p-2 rounded-lg ${
                        location.pathname === "/parent/baby-messaging"
                      }"
                          ? "bg-[#4880FF] text-white"
                          : "text-gray-900 hover:bg-[#4880FF] hover:text-white"
                      }`}
                    >
                      <span className="ms-3">Messaging</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-[#4880FF] hover:text-white"
                    >
                      <span className="ms-3">Log Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        <div className="p-4 sm:ml-64  h-screen">
          <div className="p-4 mt-14">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default ParentLayout;
