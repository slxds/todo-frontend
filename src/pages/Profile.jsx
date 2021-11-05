import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTodo } from "../context/todo";

export const Page = () => {
  const [me, setMe] = useState({ name: "", email: "" });

  const { getMe, updateProfile } = useTodo();

  useEffect(() => {
    getMe()
      .then((res) => {
        setMe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(me)
      .then((res) => {
        setMe(res.data);
        toast.success("Profile updated");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Profile could not be updated");
      });
  };

  return (
    <form onSubmit={onUpdateProfile}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={me?.name}
                onChange={(e) => setMe((m) => ({ ...m, name: e.target.value }))}
                autoComplete="given-name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                name="email-address"
                id="email-address"
                value={me?.email}
                onChange={(e) =>
                  setMe((m) => ({ ...m, email: e.target.value }))
                }
                autoComplete="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
