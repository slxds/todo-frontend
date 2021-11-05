import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { useTodo } from "../context/todo";
import { useAuth } from "../context/auth";

import {
  MobileSidebar,
  Modal,
  Notification,
  Sidebar,
  TopBar,
} from "../components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: false },
  {
    name: "Team",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: InboxIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

export const Layout = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [lists, setLists] = useState([]);

  const navigate = useNavigate();
  const { createNewToDoList, myToDoLists } = useTodo();

  const onCreateNewList = async () => {
    let newId = await createNewToDoList();
    if (!newId) return;
    navigate(`/${newId}`);
  };

  const userNavigation = [
    { name: "Your Profile", onClick: () => navigate("/profile") },
    { name: "Sign out", onclick: () => logout() },
  ];

  return (
    <>
      <div className="flex flex-row h-full">
        <MobileSidebar
          setSidebarOpen={setSidebarOpen}
          onCreateNewList={onCreateNewList}
          sidebarOpen={sidebarOpen}
          navigation={myToDoLists}
        />

        <Sidebar navigation={myToDoLists} onCreateNewList={onCreateNewList} />
        <div className="flex flex-col flex-1">
          <TopBar
            userNavigation={userNavigation}
            setSidebarOpen={setSidebarOpen}
          />
          <main>
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8">
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  pauseOnFocusLoss={false}
                />
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
