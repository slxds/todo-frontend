import { SlideOver } from "../components";
import {
  LinkIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
export const TodoListItemDetails = ({ open, setOpen, item }) => {
  const team = [
    {
      name: "Tom Cook",
      email: "tomcook@example.com",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];
  return (
    <SlideOver
      open={open}
      setOpen={setOpen}
      onFormSubmit={() => {}}
      title=""
      subtext=""
    >
      <div className="px-4 divide-y divide-gray-200 sm:px-6">
        <div className="space-y-6  pb-5">
          <div>
            <div className="mt-1">
              <input
                type="text"
                value={item?.text}
                name="project-name"
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
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                defaultValue={""}
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
