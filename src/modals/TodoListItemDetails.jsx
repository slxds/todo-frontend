import { SlideOver } from "../components";
import {
  LinkIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import { useEffect, useState, useRef } from "react";
import { useTodo } from "../context/todo";

const team = [
  {
    name: "Tom Cook",
    email: "tomcook@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export const TodoListItemDetails = ({ open, setOpen, item, listId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const textAreaRef = useRef(null);

  const { editToDoItem } = useTodo();

  useEffect(() => {
    if (!item) return;

    setName(item.text);
    setDescription(item.description);
  }, [item]);

  useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "30px";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = 2 + scrollHeight + "px";
  }, [name]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    editToDoItem(listId, item._id, { text: name, description: description })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SlideOver
      open={open}
      setOpen={setOpen}
      onFormSubmit={onFormSubmit}
      title=""
      subtext=""
    >
      <div className="px-4 divide-y divide-gray-200 sm:px-6">
        <div className="space-y-6  pb-5">
          <div>
            <div className="mt-1">
              <textarea
                ref={textAreaRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="project-name"
                rows={1}
                id="project-name"
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                value={description}
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Assigned to</h3>
            <div className="mt-2">
              <div className="flex space-x-2">
                {team.map((person) => (
                  <a
                    key={person.email}
                    href={person.href}
                    className="rounded-full hover:opacity-75"
                  >
                    <img
                      className="inline-block h-8 w-8 rounded-full"
                      src={person.imageUrl}
                      alt={person.name}
                    />
                  </a>
                ))}
                <button
                  type="button"
                  className="flex-shrink-0 bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Add team member</span>
                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};
