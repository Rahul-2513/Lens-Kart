import React, { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({token}) => {
  const [img1, setImage1] = useState(false);
  const [img2, setImage2] = useState(false);
  const [img3, setImage3] = useState(false);
  const [img4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Aviator");
  const [bestSeller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

 const onSubmitHandler = async (e) => {
   e.preventDefault();
   try {
     const formData = new FormData();
     formData.append("name", name);
     formData.append("description", description);
     formData.append("price", price);
     formData.append("category", category);
     formData.append("subCategory", subCategory);
     
     formData.append("bestSeller", bestSeller); 
     formData.append("sizes", JSON.stringify(sizes));

     
     img1 && formData.append("img1", img1);
     img2 && formData.append("img2", img2);
     img3 && formData.append("img3", img3);
     img4 && formData.append("img4", img4);

     const response = await axios.post(
       `${backendUrl}/api/product/add`,
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
           token,
         },
       }
     );

    if (response.data.success) {
      toast.success(response.data.message)
      setName('')
      setDescription('')
      setImage1(false)
       setImage2(false);
        setImage3(false);
         setImage4(false);
         setPrice('')
    }
    else{
      toast.error(response.data.message)
    }
   } catch (error) {
     console.error("Error uploading product:", error);
     toast.error(error.message)
   }
 };


  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3 p-4 sm:p-6 md:p-8"
    >
      <div className="text-lg font-semibold text-gray-700 mb-2">
        Upload Image
      </div>
      <div className="flex flex-wrap gap-3">
        <div>
          <label
            htmlFor="img1"
            className="w-28 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition mt-3"
          >
            <div>
              {!img1 ? (
                <ArrowDownToLine size={24} className="text-gray-600 mb-2" />
              ) : (
                <img src={URL.createObjectURL(img1)} alt="" />
              )}
            </div>
            {!img1 && (
              <span className="text-gray-600 text-sm">Choose a file</span>
            )}
          </label>
          <input
            onChange={(e) => setImage1(e.target.files[0])}
            type="file"
            id="img1"
            hidden
          />
        </div>

        <div>
          <label
            htmlFor="img2"
            className="w-28 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition mt-3"
          >
            <div>
              {!img2 ? (
                <ArrowDownToLine size={24} className="text-gray-600 mb-2" />
              ) : (
                <img src={URL.createObjectURL(img2)} alt="" />
              )}
            </div>
            {!img2 && (
              <span className="text-gray-600 text-sm">Choose a file</span>
            )}
          </label>
          <input
            onChange={(e) => setImage2(e.target.files[0])}
            type="file"
            id="img2"
            hidden
          />
        </div>

        <div>
          <label
            htmlFor="img3"
            className="w-28 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition mt-3"
          >
            <div>
              {!img3 ? (
                <ArrowDownToLine size={24} className="text-gray-600 mb-2" />
              ) : (
                <img src={URL.createObjectURL(img3)} alt="" />
              )}
            </div>
            {!img3 && (
              <span className="text-gray-600 text-sm">Choose a file</span>
            )}
          </label>
          <input
            onChange={(e) => setImage3(e.target.files[0])}
            type="file"
            id="img3"
            hidden
          />
        </div>

        <div>
          <label
            htmlFor="img4"
            className="w-28 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition mt-3"
          >
            <div>
              {!img4 ? (
                <ArrowDownToLine size={24} className="text-gray-600 mb-2" />
              ) : (
                <img src={URL.createObjectURL(img4)} alt="" />
              )}
            </div>
            {!img4 && (
              <span className="text-gray-600 text-sm">Choose a file</span>
            )}
          </label>
          <input
            onChange={(e) => setImage4(e.target.files[0])}
            type="file"
            id="img4"
            hidden
          />
        </div>
      </div>
      <div className="w-full">
        <p className="text-gray-700 text-lg font-semibold mt-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 mt-2 border border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="text-gray-700 text-lg font-semibold mt-2">
          Product description
        </p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 mt-2 border border-gray-300 rounded"
          placeholder="Give product details"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="text-gray-700 text-lg font-semibold mt-2 mb-2">
            Product category
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1 w-full border border-gray-300 rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div>
          <p className="text-gray-700 text-lg font-semibold mt-2 mb-2">
            Sub category
          </p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="px-3 py-1 w-full border border-gray-300 rounded"
          >
            <option value="Aviator">Aviator</option>
            <option value="Wayfarer">Wayfarer</option>
            <option value="Round">Round</option>
            <option value="Sport">Full-Rim</option>
            <option value="Sport">Square</option>
            <option value="Sport">Half-Rim</option>
            <option value="Sport">Cat-eye</option>
            <option value="Sport"> Wraparound </option>
            <option value="Sport">Oversized</option>
            <option value="Sport">Geometric</option>
            
          </select>
        </div>

        <div>
          <p className="text-gray-700 text-lg font-semibold mt-2 mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            className="px-3 py-1 w-full border border-gray-300 rounded"
          />
        </div>
      </div>

      <div>
        <p className="text-gray-700 text-lg font-semibold mt-2 mb-2">
          Product Sizes
        </p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("S") ? "bg-sky-200" : "bg-slate-200"
              }`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("M") ? "bg-sky-200" : "bg-slate-200"
              }`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Free Size")
                  ? prev.filter((item) => item !== "Free Size")
                  : [...prev, "Free Size"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Free Size") ? "bg-sky-200" : "bg-slate-200"
              }`}
            >
              Free Size
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 font-semibold flex mb-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestSeller"
          className="cursor-pointer"
        />
        <label htmlFor="bestSeller" className="ml-3 cursor-pointer">
          Add to Bestseller
        </label>
      </div>
      <button className="bg-black text-white py-2 px-6 w-28 mt-4 cursor-pointer rounded-md">
        Add
      </button>
    </form>
  );
};

export default Add;
