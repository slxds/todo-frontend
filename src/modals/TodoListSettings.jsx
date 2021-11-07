import { SlideOver } from "../components";
import {
  LinkIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
export const TodoListSettings = ({ open, setOpen, item }) => {
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
      title={`Edit List: ${item?.name}`}
      subtext="This is just demo data"
    >
      <div className="px-4 divide-y divide-gray-200 sm:px-6">
        <div className="space-y-6  pb-5">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Shared with</h3>
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
          <fieldset>
            <legend className="text-sm font-medium text-gray-900">
              Privacy
            </legend>
            <div className="mt-2 space-y-5">
              <div className="relative flex items-start">
                <div className="absolute flex items-center h-5">
                  <input
                    id="privacy-public"
                    name="privacy"
                    aria-describedby="privacy-public-description"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    defaultChecked
                  />
                </div>
                <div className="pl-7 text-sm">
                  <label
                    htmlFor="privacy-public"
                    className="font-medium text-gray-900"
                  >
                    Public access
                  </label>
                  <p id="privacy-public-description" className="text-gray-500">
                    Everyone with the link can access this list.
                  </p>
                </div>
              </div>
              <div>
                <div className="relative flex items-start">
                  <div className="absolute flex items-center h-5">
                    <input
                      id="privacy-private-to-project"
                      name="privacy"
                      aria-describedby="privacy-private-to-project-description"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                  </div>
                  <div className="pl-7 text-sm">
                    <label
                      htmlFor="privacy-private-to-project"
                      className="font-medium text-gray-900"
                    >
                      Invited users only
                    </label>
                    <p
                      id="privacy-private-to-project-description"
                      className="text-gray-500"
                    >
                      Only users you inivite can see this list.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex items-start">
                  <div className="absolute flex items-center h-5">
                    <input
                      id="privacy-private"
                      name="privacy"
                      aria-describedby="privacy-private-to-project-description"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                  </div>
                  <div className="pl-7 text-sm">
                    <label
                      htmlFor="privacy-private"
                      className="font-medium text-gray-900"
                    >
                      Private to you
                    </label>
                    <p
                      id="privacy-private-description"
                      className="text-gray-500"
                    >
                      You are the only one able to access this list.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="pt-4 pb-6">
          <div className="flex text-sm">
            <a
              href="#"
              className="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900"
            >
              <LinkIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                aria-hidden="true"
              />
              <span className="ml-2">Copy link</span>
            </a>
          </div>
          <div className="mt-4 flex text-sm">
            <a
              href="#"
              className="group inline-flex items-center text-gray-500 hover:text-gray-900"
            >
              <QuestionMarkCircleIcon
                className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="ml-2">Learn more about sharing</span>
            </a>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};
