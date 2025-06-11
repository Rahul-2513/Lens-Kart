import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Star } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
import { assets } from "../assets/assets";
assets

const StarRating = ({ count }) => (
  <div className="flex items-center gap-1">
    {[...Array(count)].map((_, index) => (
      <Star key={index} className="w-4 fill-yellow-500 text-yellow-500" />
    ))}
    <p className="pl-2 text-gray-600">(145 Reviews)</p>
  </div>
);

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Memoized product data
  const productData = useMemo(
    () => products.find((item) => item._id === productId) || null,
    [productId, products]
  );

  // Fetch product data
  const fetchProductData = useCallback(() => {
    if (productData) {
      setImage(productData.image?.[0] || ""); // Ensure no error if image is missing
    }
  }, [productData]);

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [fetchProductData]);

  if (!productData) {
    return (
      <div className="text-center py-10 text-gray-500">Product not found.</div>
    );
  }

  const {
    name,
    price,
    description,
    image: images = [],
    sizes = [],
    category,
    subCategory,
  } = productData;

  return (
    <div className="border-t-1 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product preview ${index}`}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer transition-transform hover:scale-105"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={image}
              className="w-full rounded-lg shadow-md"
              alt="Selected Product"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-3xl mt-2">{name}</h1>
          <StarRating count={5} />

          <p className="mt-5 text-3xl font-semibold text-blue-600">
            {currency}
            {price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{description}</p>

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="flex flex-col gap-4 my-8 ">
              <p className="font-medium">Select Size:</p>
              <div className="flex gap-2">
                {sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 cursor-pointer transition-colors duration-300 rounded-lg text-sm font-medium ${
                      item === size
                        ? "bg-blue-200 text-black border-blue-300"
                        : "bg-gray-200 text-black"
                    }`}
                    aria-label={`Select size ${item}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm rounded-lg mt-4 cursor-pointer active:bg-gray-700 hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>

          {/* Additional Information */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-600 mt-5 flex flex-col gap-2">
            <p>
              ✅ <strong>100% Original</strong> product.
            </p>
            <p>
              🚚 <strong>Cash on Delivery</strong> available.
            </p>
           
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex border-b">
          <p className="border px-5 py-3 text-sm font-semibold text-gray-700 cursor-pointer">
            Description
          </p>
          <p className="border px-5 py-3 text-sm font-semibold text-gray-700 cursor-pointer">
            Reviews (145)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700">
          <h3 className="text-lg font-semibold">Product Details</h3>
          <p>
            Experience the ultimate blend of{" "}
            <strong>style, comfort, and durability</strong> with our premium
            sunglasses. Designed for modern lifestyles, these shades provide
            superior <strong>UV protection</strong> while enhancing your look.
          </p>
          <ul className="list-disc ml-5">
            <li>🔥 Scratch-resistant & lightweight frame</li>
            <li>🌞 100% UV protection for eye safety</li>
            <li>🎁 Comes with a stylish carrying case</li>
            
          </ul>

          <h3 className="text-lg font-semibold mt-4">Why You'll Love It?</h3>
          <p>
            Whether you're at the beach, driving, or just out for a stroll,
            these sunglasses add{" "}
            <strong>effortless charm and premium quality</strong> to your
            outfit.
          </p>
        </div>

        {/* Review Section */}
        <div className="mt-10 border px-6 py-6 text-sm text-gray-700">
          <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
          <div className="flex gap-4 items-center">
            <img
              src={assets.user}
              alt="User"
              className="rounded-full w-13 h-13"
            />
            <div>
              <p className="font-semibold">John Doe</p>
              <StarRating count={5} />
              <p className="text-gray-500 mt-1">
                "Absolutely love these sunglasses! They fit perfectly and look
                super stylish."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={category} subCategory={subCategory} />
    </div>
  );
};

export default Product;
