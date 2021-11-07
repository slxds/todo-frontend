import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { OutlinedHeroIcon } from "../components";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Component = ({ menuItems, children }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {children}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" z-40 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          {menuItems.map((groups) => {
            return (
              <div className="py-1">
                {groups.items.map((item) => {
                  return (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={item.onClick}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "group flex items-center px-4 py-2 text-sm w-full"
                          )}
                        >
                          <OutlinedHeroIcon
                            icon={item.icon}
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />

                          {item.text}
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
