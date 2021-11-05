import { PlusIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Component = ({ navigation }) => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
            alt="Workflow"
          />
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            <div className="  group flex items-center text-sm font-medium rounded-md">
              <a className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <PlusIcon
                  className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                  aria-hidden="true"
                />
              </a>

              <input
                type="text"
                id="email"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  rounded-md  sm:text-sm border-gray-300"
                placeholder="John Doe"
              />
            </div>

            <div className=" group flex items-center text-sm font-medium rounded-md">
              <a className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <PlusIcon
                  className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                  aria-hidden="true"
                />
                TEST
              </a>
            </div>

            {navigation.map((item) =>
              !item.children ? (
                <div key={item.name}>
                  <a
                    href="#"
                    className={classNames(
                      item.current
                        ? "bg-indigo-800 text-white"
                        : "text-indigo-100 hover:bg-indigo-600",
                      "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </div>
              ) : (
                <Disclosure as="div" key={item.name} className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          item.current
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-600",
                          "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        )}
                      >
                        <item.icon
                          className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                          aria-hidden="true"
                        />
                        <span className="flex-1">{item.name}</span>

                        {open ? (
                          <ChevronUpIcon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" />
                        ) : (
                          <ChevronDownIcon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" />
                        )}
                      </Disclosure.Button>
                      <Disclosure.Panel className="space-y-1">
                        {item.children.map((subItem) => (
                          <Disclosure.Button
                            key={subItem.name}
                            as="a"
                            href={subItem.href}
                            className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600"
                          >
                            {subItem.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )
            )}

            {/*navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-600",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                  aria-hidden="true"
                />
                {item.name}
              </a>
                ))*/}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
          <div>v0.1</div>
        </div>
      </div>
    </div>
  );
};
