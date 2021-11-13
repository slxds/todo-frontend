import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  XIcon,
  FolderAddIcon,
  PlusIcon,
  EmojiSadIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { ViewListIcon } from "@heroicons/react/solid";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "../components";
import { useTodo } from "../context/todo";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Component = ({
  sidebarOpen,
  setSidebarOpen,
  navigation,
  onCreateNewList,
  setSubmitErrorModalOpen,
}) => {
  let { listId } = useParams();

  const navigate = useNavigate();

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4 h-8 text-white text-2xl font-bold">
                ToDo
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <div key={item._id}>
                      <button
                        onClick={() => {
                          navigate(`/${item._id}`);
                          setSidebarOpen(false);
                        }}
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
                      </button>
                    </div>
                  ))}
                  <span className="relative z-0 inline-flex shadow-sm rounded-md w-full">
                    <button
                      onClick={() => {
                        onCreateNewList();
                        setSidebarOpen(false);
                      }}
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
                      onClick={() =>
                        toast.error("Folders are not yet available")
                      }
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
                    onClick={() => {
                      setSidebarOpen(false);
                      setSubmitErrorModalOpen(true);
                    }}
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
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
