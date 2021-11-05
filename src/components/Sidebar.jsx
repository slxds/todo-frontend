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

export const Component = ({ navigation, onCreateNewList }) => {
  let { listId } = useParams();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { reportError } = useTodo();

  const onReportError = (e) => {
    e.preventDefault();
    reportError({ text: message })
      .then((res) => {
        setOpen(false);

        toast.success("Thank you for your feedback");
      })
      .catch((err) => toast.error("Sorry that did not work"));
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <form onSubmit={onReportError}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <QuestionMarkCircleIcon
                className="h-6 w-6 text-blue-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Fehler melden
              </Dialog.Title>
              <div className="mt-2 w-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Beschreibe den Fehler kurz
                </label>
                <div className="mt-1 w-full">
                  <textarea
                    id="about"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Tell us something"
                    defaultValue={""}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <div className="hidden md:flex md:w-64 md:flex-col md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto overflow-x-hidden">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
              alt="Workflow"
            />
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
                onClick={() => setOpen(true)}
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
