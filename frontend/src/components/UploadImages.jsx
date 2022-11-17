import { useState } from "react";
import jwtFetch from "../store/jwt";

const UploadImages = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFilesUrls, setImageFilesUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imageFiles);

    const formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      // console.log(imageFiles[i]);
      formData.append("images", imageFiles[i]);
    }

    await jwtFetch("/api/events/postImages", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleFiles = (e) => {
    // console.log(e.currentTarget.files);
    const files = Object.values(e.currentTarget.files);
    // setImageFlies(e.target.files);
    // console.log(Object.values(files));

    if (files) {
      files.map((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setImageFiles((prevState) => [...prevState, file]);
          setImageFilesUrls((prevState) => [...prevState, fileReader.result]);
        };
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input onChange={handleFiles} type="file" multiple />
      <button>submit</button>
    </form>
  );
};

export default UploadImages;
