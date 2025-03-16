import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import imageStore from "../stores/image.store.js";
import Spinner from "./Spinner.jsx";

const ImageGallery = () => {
  const [open, setOpen] = useState(false); // Controls whether the lightbox is open or closed
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { homeImageRequest } = imageStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await homeImageRequest();
      const homeImage = imageStore.getState().homeImages;
      setData(homeImage);
      setLoader(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="font-extrabold text-5xl mt-5 text-center sm:text-5xl">
        Explore a world of stunning images
      </div>
      {loader ? (
        <Spinner />
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No post found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-12 lg:px-56">
          {data.map((item, idx) => (
            <div key={idx} className="flex justify-center">
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-[270px] h-[337.5px] object-cover cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      )}

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

export default ImageGallery;