import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTodo } from "../context/todo";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
import { Modal as ReactModal } from "../components";

export const Modal = ({ setOpen, open, listId }) => {
  const [list, setList] = useState(null);
  let { shareList, getToDoList } = useTodo();

  useEffect(() => {
    updateList();
  }, []);

  const updateList = () => {
    getToDoList(listId)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startShare = () => {
    shareList(list?._id, { share: "start" })
      .then((res) => {
        updateList();
      })
      .catch((err) => console.log(err));
  };

  const stopShare = () => {
    shareList(list?._id, { share: "stop" })
      .then((res) => {
        updateList();
      })
      .catch((err) => console.log(err));
  };

  const renewShare = () => {
    shareList(list?._id, { share: "renew" })
      .then((res) => {
        updateList();
      })
      .catch((err) => console.log(err));
  };

  const ShareButtons = () => {
    if (list?.share) {
      return (
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            onClick={stopShare}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Stop Sharing
          </button>
          <button
            onClick={renewShare}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Renew Link
          </button>
        </div>
      );
    } else {
      return (
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            onClick={startShare}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Create link
          </button>
        </div>
      );
    }
  };

  return (
    <ReactModal open={open} setOpen={setOpen}>
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
            Share
          </Dialog.Title>
          <div className="mt-2 w-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Member
            </label>
            <div className="mt-1 w-full">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {list?.users.map((user) => (
                  <li key={user.user._id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`${process.env.REACT_APP_BASEURL}/v1/file/public/${user.user.image}`}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.user.email}
                        </p>
                      </div>
                      <div>
                        <div className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                          {user.role}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 w-full" hidden={!list?.share}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Anyone wth this link can join this list
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={`https://todo.sumser.dev/share?invite=${list?.share}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareButtons />
    </ReactModal>
  );
};
