import React, { useEffect, useState } from "react";
import {
  ChartBarIcon,
  HomeIcon,
  CashIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Nav items
const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  {
    name: "Grand Exchange Search",
    href: "/search",
    icon: SearchIcon,
    current: false,
  },
  {
    name: "Hi-Scores Search",
    href: "/hi_scores",
    icon: ChartBarIcon,
    current: false,
  },
];

export default function Sidebar() {
  let navigate = useNavigate();
  let [currentSelection, setCurrentSelection] = useState(0);
  let [mountLoading, setMountLoading] = useState(true);

  useEffect(() => {
    // On first load input session stored navigation if it exists
    if (mountLoading) {
      let current_nav_item = sessionStorage.getItem("OSRS_NAV");

      if (current_nav_item !== null) {
        setCurrentSelection(parseFloat(current_nav_item));
      }
      setMountLoading(false);
    }
  }, [mountLoading]);

  return (
    <div className="md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-slate-800">
        {/* HEADER */}
        <div
          className="flex items-center h-16 flex-shrink-0 px-4 bg-slate-900 text-slate-200 font-medium select-none"
          style={{ WebkitAppRegion: "drag" }}
        >
          <CashIcon className="h-8 w-auto pr-1" />
          OSRS App
        </div>
        {/* HEADER */}
        {/* MAIN NAV */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item, index) => (
              <p
                key={item.name}
                href={item.href}
                className={classNames(
                  currentSelection === index
                    ? "bg-slate-900 text-slate-200"
                    : "text-slate-300 hover:bg-slate-700 hover:text-slate-200",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSelection(index);
                  sessionStorage.setItem("OSRS_NAV", index);
                  navigate(item.href, { replace: true });
                }}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-slate-300"
                      : "text-slate-400 group-hover:text-slate-300",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </p>
            ))}
          </nav>
        </div>
        {/* MAIN NAV */}
      </div>
    </div>
  );
}
