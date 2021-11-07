import { useTodo } from "../context/todo";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { OutlinedHeroIcon } from "../components";
import { useNavigate } from "react-router";
export const Page = () => {
  const { myToDoLists } = useTodo();

  const navigate = useNavigate();

  console.log(myToDoLists);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {myToDoLists.map((todoList) => (
          <li key={todoList._id}>
            <div
              onClick={() => navigate(`/${todoList._id}`)}
              className="block hover:bg-gray-50 w-full cursor-pointer"
            >
              <div className="px-2 py-2 flex items-center sm:px-6">
                <OutlinedHeroIcon
                  icon="ViewListIcon"
                  className=" h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />

                <div className="min-w-0  pl-5 flex-1 flex sm:items-center sm:justify-between">
                  <div className="flex text-sm">
                    <p className="font-medium text-indigo-600 ">
                      {todoList.name}
                    </p>
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
                {/*
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
