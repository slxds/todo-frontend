import {
  DotsHorizontalIcon,
  UserAddIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { TypedEmitter } from "@magic-sdk/provider";
import { useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTodo } from "../context/todo";
import { DropDownMenu, Modal } from "../components";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Dries Vincent",
        email: "driesvincent@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        email: "lindsaywalton@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        email: "courtneyhenry@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        email: "tomcook@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Whitney Francis",
        email: "whitneyfrancis@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Leonard Krasner",
        email: "leonardkrasner@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Floyd Miles",
        email: "floydmiles@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
    applicants: [
      {
        name: "Emily Selman",
        email: "emilyselman@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Kristin Watson",
        email: "kristinwatson@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Emma Dorsey",
        email: "emmadorsey@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

export const Page = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState(null);
  const [listName, setListName] = useState("");
  const [open, setOpen] = useState(false);
  const { listId } = useParams();

  const navigate = useNavigate();

  const {
    addToDoItem,
    getToDoList,
    checkToDoItem,
    changeToDoListName,
    refreshToDoList,
    deletetoDoList,
  } = useTodo();

  useEffect(() => {
    getCurrentToDoList();
  }, [listId]);

  const getCurrentToDoList = () => {
    getToDoList(listId)
      .then((res) => {
        console.log(res);
        setList(res.data);
        setListName(res.data.name || "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (text.length == 0) return;
    addToDoItem(listId, { text: text })
      .then((res) => {
        console.log(res.data);
        getCurrentToDoList();
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkTodoItem = (itemId, done) => {
    console.log("clicked");
    checkToDoItem(listId, itemId, done)
      .then((res) => {
        console.log(res.data);
        getCurrentToDoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeNameSubmit = (e) => {
    e.preventDefault();
    if (listName.length == 0) return;
    changeToDoListName(listId, { name: listName })
      .then((res) => {
        console.log(res.data);
        refreshToDoList();
      })
      .catch((err) => console.log(err));
  };

  const onDeleteToDoList = () => {
    deletetoDoList(listId)
      .then((res) => {
        setOpen(false);
        refreshToDoList();
        toast.success("List deleted");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menuItems = [
    {
      items: [
        {
          text: "Archive",
          onClick: () => {
            toast.warning("This function is not available");
          },
          icon: "ArchiveIcon",
        },
      ],
    },
    {
      items: [
        {
          text: "Share",
          onClick: () => {
            toast.warning("This function is not available");
          },
          icon: "UserAddIcon",
        },
        {
          text: "Add to favorites",
          onClick: () => {
            toast.warning("This function is not available");
          },
          icon: "HeartIcon",
        },
      ],
    },
    {
      items: [
        {
          text: "Delete",
          onClick: () => setOpen(true),
          icon: "TrashIcon",
        },
      ],
    },
  ];

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Delete ToDo List
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this list? All of your data will
                be permanently removed from our servers forever. This action
                cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onDeleteToDoList}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <form onSubmit={onChangeNameSubmit} className="py-5">
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              onBlur={onChangeNameSubmit}
              className="block border-0 border-b border-transparent bg-transparent hover:border-indigo-600 focus:border-indigo-600 focus:ring-0 "
              placeholder=""
              required
            />
          </form>

          <DropDownMenu menuItems={menuItems}>
            <div>
              <Menu.Button className="inline-flex justify-center w-full  rounded-full  px-2 py-2 bg-transparent text-sm hover:bg-gray-100 focus:outline-none ">
                <DotsHorizontalIcon className="h-5 w-5 " aria-hidden="true" />
              </Menu.Button>
            </div>
          </DropDownMenu>
        </div>
        <button
          onClick={() => toast.error("Sharing is currently not available")}
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <UserAddIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Share
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          <li>
            <form onSubmit={onFormSubmit}>
              <div className="px-2 py-2 flex items-center sm:px-6">
                <button
                  type="button"
                  className="inline-flex  items-center border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="min-w-0  pl-5 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="w-full">
                    <input
                      type="text"
                      text-white
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="block w-full border-0 border-b border-transparent bg-transparent hover:border-indigo-600 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                      placeholder="Create new Task"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </li>
          {list?.todos
            .filter((x) => x.done === false)
            .map((todo) => (
              <li key={todo._id}>
                <div className="block hover:bg-gray-50 w-full cursor-pointer">
                  <div className="px-2 py-2 flex items-center sm:px-6">
                    <button
                      onClick={() => checkTodoItem(todo._id, true)}
                      type="button"
                      className="inline-flex  items-center border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <CheckCircleIcon
                        className="transition duration-200 h-6 w-6  text-indigo-600 hover:text-white"
                        aria-hidden="true"
                      />
                    </button>
                    <div className="min-w-0  pl-5 flex flex-1 sm:flex sm:items-center sm:justify-between ">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">
                            {todo.text}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex overflow-hidden -space-x-1">
                          {/*position.applicants.map((applicant) => (
                        <img
                          key={applicant.email}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={applicant.imageUrl}
                          alt={applicant.name}
                        />
                      ))*/}
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="p-5">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="pr-3 bg-white text-lg font-medium text-gray-900">
              Erledigt
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {list?.todos
            .filter((x) => x.done === true)
            .map((todo) => (
              <li key={todo._id}>
                <div className="block hover:bg-gray-50 w-full cursor-pointer">
                  <div className="px-2 py-2 flex items-center sm:px-6">
                    <button
                      onClick={() => checkTodoItem(todo._id, false)}
                      type="button"
                      className="inline-flex  items-center border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <CheckCircleIcon
                        className=" h-6 w-6   "
                        aria-hidden="true"
                      />
                    </button>
                    <div className="min-w-0  pl-5 flex flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate line-through">
                            {todo.text}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex overflow-hidden -space-x-1">
                          {/*position.applicants.map((applicant) => (
                        <img
                          key={applicant.email}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={applicant.imageUrl}
                          alt={applicant.name}
                        />
                      ))*/}
                        </div>
                      </div>
                    </div>

                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
