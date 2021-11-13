import { XIcon, SpeakerphoneIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router";

export const Component = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
      <div className="max-w-xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-red-400 shadow-lg ">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <p className="ml-3 font-medium text-white truncate">
                Please set your Name in your profile
              </p>
            </div>
            <div className=" mt-0">
              <button
                onClick={() => navigate("/profile")}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
