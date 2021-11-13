import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTodo } from "../context/todo";

export const Page = () => {
  const [newMe, setMe] = useState({ name: "", email: "", image: "" });
  const [newImagePreview, setNewImagePreview] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const { me, updateProfile, updateMe } = useTodo();

  useEffect(() => {
    setMe(me);
  }, [me]);

  useEffect(() => {
    console.log(me);
  }, [me]);

  const onUpdateProfile = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", newMe.image);
    formData.append("name", newMe.name);
    formData.append("email", newMe.email);

    updateProfile(formData)
      .then((res) => {
        updateMe();
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
                value={newMe?.name}
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
                value={newMe?.email}
                onChange={(e) =>
                  setMe((m) => ({ ...m, email: e.target.value }))
                }
                autoComplete="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-blue-gray-900"
              >
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <img
                  className="inline-block h-12 w-12 rounded-full"
                  src={
                    newImagePreview ||
                    `${process.env.REACT_APP_BASEURL}/v1/file/public/${me.image}`
                  }
                  alt=""
                />
                <div className="ml-4 flex">
                  <div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                    <label
                      htmlFor="user-photo"
                      className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                    >
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                    <input
                      onChange={(e) => {
                        setNewImagePreview(
                          URL.createObjectURL(e.target.files[0])
                        );
                        setMe((m) => ({ ...m, image: e.target.files[0] }));
                      }}
                      id="user-photo"
                      name="file"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
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
