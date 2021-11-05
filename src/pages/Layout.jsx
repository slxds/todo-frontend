import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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

import { MobileSidebar, Sidebar, TopBar } from "../components";

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
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export const Layout = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [lists, setLists] = useState([]);

  const { createNewToDoList, myToDoLists } = useTodo();

  const onCreateNewList = () => {
    createNewToDoList();
  };

  return (
    <>
      <div className="flex flex-row h-full">
        <MobileSidebar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          navigation={navigation}
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
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
