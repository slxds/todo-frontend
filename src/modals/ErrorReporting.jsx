import { useState } from "react";
import { toast } from "react-toastify";
import { useTodo } from "../context/todo";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
import { Modal as ReactModal } from "../components";

export const Modal = ({ setOpen, open }) => {
  const [message, setMessage] = useState("");

  let { reportError } = useTodo();

  const onReportError = (e) => {
    e.preventDefault();
    reportError({ text: message })
      .then((res) => {
        setOpen(false);
        setMessage("");
        toast.success("Thank you for your feedback");
      })
      .catch((err) => toast.error("Sorry that did not work"));
  };

  return (
    <ReactModal open={open} setOpen={setOpen}>
      <form onSubmit={onReportError}>
        <div className="sm:flex sm:items-start ">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
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
              Report error
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
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md "
                  placeholder="Tell us something"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
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
    </ReactModal>
  );
};
