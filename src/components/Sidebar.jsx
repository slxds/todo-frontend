import {
  PlusIcon,
  FolderAddIcon,
  ExclamationIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { Disclosure, Dialog } from "@headlessui/react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ViewListIcon,
  EmojiSadIcon,
} from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../components";
import { toast } from "react-toastify";
import { useTodo } from "../context/todo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Component = ({
  navigation,
  onCreateNewList,
  setSubmitErrorModalOpen,
}) => {
  let { listId } = useParams();

  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto overflow-x-hidden">
          <div className="flex items-center  flex-shrink-0 px-4 h-8 text-white text-2xl font-bold">
            ToDo
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) =>
                !item.children ? (
                  <div key={item._id}>
                    <Link
                      to={`/${item._id}`}
                      className={classNames(
                        listId === item._id
                          ? "bg-indigo-800 text-white"
                          : "text-indigo-100 hover:bg-indigo-600",
                        "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <ViewListIcon
                        className="mr-5 flex-shrink-0 h-6 w-6 text-indigo-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
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
                            className="mr-5 flex-shrink-0 h-6 w-6 text-indigo-300"
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
                              className="group w-full flex items-center pl-4 pr-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600"
                            >
                              <ViewListIcon
                                className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                                aria-hidden="true"
                              />
                              {subItem.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}

              <span className="relative z-0 inline-flex shadow-sm rounded-md w-full">
                <button
                  onClick={onCreateNewList}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 w-full rounded-l-md border border-gray-300 text-sm font-medium text-indigo-100 hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <PlusIcon
                    className="-ml-1 mr-2 h-5 w-5 text-indigo-300"
                    aria-hidden="true"
                  />
                  New List
                </button>
                <button
                  onClick={() => toast.error("Folders are not yet available")}
                  type="button"
                  className="-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-indigo-100 hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <FolderAddIcon
                    className="h-5 w-5 text-indigo-300"
                    aria-hidden="true"
                  />
                </button>
              </span>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-indigo-800 p-4 items-center">
            <div className="flex-1">
              <button
                onClick={() => setSubmitErrorModalOpen(true)}
                type="button"
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <EmojiSadIcon className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>

            <div className="inline-flex p-1  text-center text-white">
              Version: 0.1
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
