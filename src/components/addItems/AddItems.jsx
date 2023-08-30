import React, { useState } from "react";
import "./style.scss";
import {
  MdFastfood,
  MdOutlineDriveFolderUpload,
  MdDelete,
  MdOutlineFastfood,
  MdCurrencyRupee,
  MdTrendingUp,
  MdNaturePeople,
} from "react-icons/md";
import { categories } from "../../utils/constants";
import Loader from "../loader/Loader";
import { storage } from "../../lib/firebaseConfig";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  deleteObject,
} from "firebase/storage";
import { saveItem } from "../../utils/firebaseFunctions";

const AddItems = () => {
  const [perc, setPerc] = useState(null);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");
  const [fields, setFields] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const color = isError ? "#ff4000" : " #009900";

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(progress);
      },
      (error) => {
        setFields(true);
        setMsg("Error while uploading");
        setIsError(true);
        setTimeout(() => {
          setFields(false);
          setIsError(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setFields(true);
          setIsLoading(false);
          setMsg("Image uploaded successfully");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Image deleted successfully");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setFields(true);
        setMsg("Error while deleting");
        setTimeout(() => {
          setIsError(false);
          setFields(false);
          setMsg("");
        }, 4000);
      });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (
        !title ||
        !category ||
        !brand ||
        !price ||
        !rate ||
        !count ||
        !imageAsset
      ) {
        setFields(true);
        setMsg("Required field cannot be empty");
        setIsError(true);
        setTimeout(() => {
          setFields(false);
          setIsError(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          category: category,
          image: imageAsset,
          brand: brand,
          price: price,
          rate: rate,
          count: count,
        };

        saveItem(data);
        clearData();
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      setFields(true);
      setMsg("Error while uploading");
      setIsError(true);
      setTimeout(() => {
        setFields(false);
        setIsError(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setBrand("");
    setImageAsset(null);
    setCategory("Select category");
    setPrice("");
    setCount("");
    setRate("");
  };

  return (
    <div className="addItem">
      {fields && (
        <p
          style={{
            background: `${color}`,
            borderRadius: "4px",
            color: "#f2f2f2",
          }}
        >
          {msg}
        </p>
      )}

      <div className="addItem-title">
        <MdFastfood style={{ fontSize: "24px" }} />
        <input
          type="text"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="addItem-category">
        <select onChange={(e) => setCategory(e.target.value)} required>
          <option value={category}> Select category</option>
          {categories &&
            categories.map((c) => (
              <option key={c.id} value={c.urlParamName}>
                {c.title}
              </option>
            ))}
        </select>
      </div>

      <div className="addItem-image">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {!imageAsset ? (
              <>
                <label htmlFor="file">
                  <div className="upload">
                    <MdOutlineDriveFolderUpload style={{ fontSize: "24px" }} />
                    <p>Click here to upload image</p>
                  </div>
                  <input
                    type="file"
                    id="file"
                    required
                    className="upload-input"
                    accept="image/*"
                    onChange={uploadImage}
                    style={{ display: "none" }}
                  />
                </label>
              </>
            ) : (
              <>
                <div className="uploaded">
                  <img src={imageAsset} alt="uploaded image" />
                  <button onClick={deleteImage}>
                    <MdDelete style={{ fontSize: "24px" }} />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="addItem-brand">
        <MdOutlineFastfood style={{ fontSize: "24px" }} />
        <input
          type="text"
          required
          placeholder="Enter brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <div className="addItem-price">
        <MdCurrencyRupee style={{ fontSize: "24px" }} />
        <input
          type="text"
          required
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="addItem-rate">
        <MdTrendingUp style={{ fontSize: "24px" }} />
        <input
          type="text"
          required
          placeholder="Enter rating"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>

      <div className="addItem-count">
        <MdNaturePeople style={{ fontSize: "24px" }} />
        <input
          type="text"
          required
          placeholder="Enter votes"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <div className="addItem-save">
        <button disabled={perc !== null && perc < 100} onClick={saveDetails}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddItems;
