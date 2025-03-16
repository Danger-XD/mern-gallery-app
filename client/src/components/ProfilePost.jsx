import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import userStore from "../stores/user.store";
import { getAuthCookies } from "../utilities/cookies";
import { handleError, handleSuccess } from "../utilities/toasts";
import imageStore from "../stores/image.store";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { FaEdit } from "react-icons/fa";
import Spinner from "./Spinner";

const ProfilePost = () => {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [itemId, setItemId] = useState();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [deleting, setDeleting] = useState(false);
  const { userInfoRequest } = userStore();
  const { profilePostCreateRequest, deletePostRequest, updatePostRequest } =
    imageStore();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      handleError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("postImage", file);
    formData.append("caption", caption);
    formData.append("visible", visibility);
    await profilePostCreateRequest(formData);
    setFile(null);
    setCaption("");
    document.getElementById("my_modal_4").close();
  };
  const handleDeleteSubmit = async (e, postId) => {
    e.preventDefault();
    setDeleting(true);
    let response = await deletePostRequest(postId);
    handleSuccess(response);
    setDeleting(false);
    document.getElementById("my_modal_2").close();
  };
  const handleUpdateSubmit = async (e, postId) => {
    e.preventDefault();
    await updatePostRequest(caption, visibility, postId);
    setCaption("");
    document.getElementById("my_modal_1").close();
  };
  // useEffect(() => {
  //   (async () => {
  //     await userInfoRequest(getAuthCookies());
  //     setData(userStore.getState().userImages);
  //   })();
  // }, [userInfoRequest, data]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await userInfoRequest(getAuthCookies());
      setData(userStore.getState().userImages);
      setLoader(false);
    };

    fetchData();
  }, [userInfoRequest]);
  return (
    <>
      <div className="flex justify-center items-center pt-8">
        <button
          className="btn w-52"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          Add New Photo
        </button>
      </div>
      {loader ? (
        <Spinner />
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No post found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-12 lg:px-56">
          {data.map((item, idx) => (
            <div key={idx} className="flex justify-center relative">
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-[270px] h-[337.5px] object-cover cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
              />
              <div className="absolute top-5 right-2 sm:right-4">
                <button
                  className="btn w-16 mr-5"
                  onClick={() => {
                    document.getElementById("my_modal_1").showModal();
                    setItemId(item["_id"]);
                    setCaption(item.caption); // Set the existing caption
                    setVisibility(item.visible); // Set the existing visibility
                  }}
                  data-tooltip-id="my-tooltip-2"
                >
                  <FaEdit style={{ fontSize: "2rem" }} />
                </button>
                <button
                  className="btn w-16"
                  onClick={() => {
                    document.getElementById("my_modal_2").showModal();
                    setItemId(item["_id"]);
                  }}
                  data-tooltip-id="my-tooltip-1"
                >
                  <MdOutlineDeleteForever style={{ fontSize: "2rem" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Post!</h3>
          <form onSubmit={(e) => handleUpdateSubmit(e, itemId)}>
            <div className="mt-3">
              <input
                type="text"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full rounded outline-none border-gray-400 pl-5 py-2"
                placeholder="Write your caption..."
              />
            </div>
            <div className="flex mt-3">
              <span className="text-gray-800 pr-7">Visible:</span>

              <label className="cursor-pointer label">
                <span className="label-text">Private</span>
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={handleVisibilityChange}
                  className="radio"
                />
              </label>
              <label className="cursor-pointer label ml-5">
                <span className="label-text">Public</span>
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={handleVisibilityChange}
                  className="radio"
                />
              </label>
            </div>
            <button type="submit" className="btn bg-gray-400 mr-7">
              Update
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Post!</h3>
          <p className="py-4">Are you sure you want to delete this post?</p>

          <button
            className="cursor-pointer bg-gray-500 p-2 rounded"
            onClick={(e) => handleDeleteSubmit(e, itemId)}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-2xl h-5xl">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="file"
                name="postImage"
                onChange={handleFileChange}
                className="file:flex file:cursor-pointer file:bg-gray-300 file:w-full file:h-40 file:text-black text-gray-500 w-full h-52 rounded cursor-pointer"
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full rounded outline-none border-gray-400 pl-5 py-2"
                placeholder="Write your caption..."
              />
            </div>
            <div className="flex mt-3">
              <span className="text-gray-800 pr-7">Visible:</span>

              <label className="cursor-pointer label">
                <span className="label-text">Private</span>
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={handleVisibilityChange}
                  className="radio"
                />
              </label>
              <label className="cursor-pointer label ml-5">
                <span className="label-text">Public</span>
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={handleVisibilityChange}
                  className="radio"
                />
              </label>
            </div>
            <button type="submit" className="btn bg-gray-400 mr-7">
              Upload
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button
                className="btn"
                onClick={() => document.getElementById("my_modal_4").close()}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* static codes */}
      <Tooltip id="my-tooltip-1" place="bottom" content="Delete" />
      <Tooltip id="my-tooltip-2" place="bottom" content="Edit" />
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={data.map((item) => ({
          src: item.imageUrl,
          title: item.caption,
          description: item.caption,
        }))}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "center" }}
      />
    </>
  );
};

export default ProfilePost;
