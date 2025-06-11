import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ChevronDown } from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleFrameType = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      default:
        applyFilter();
        return;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch,products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <ChevronDown
            className={`text-gray-700 cursor-pointer sm:hidden ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
              />
              Men
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
              />
              Women
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Unisex"
                onChange={toggleCategory}
              />
              Unisex
            </label>
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">FRAME TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Aviator"
                onChange={toggleFrameType}
              />
              Aviator
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Wayfarer"
                onChange={toggleFrameType}
              />
              Wayfarer
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Round"
                onChange={toggleFrameType}
              />
              Round
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Sport"
                onChange={toggleFrameType}
              />
              Sport
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Full-Rim"
                onChange={toggleFrameType}
              />
              Full-Rim
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Square"
                onChange={toggleFrameType}
              />
              Square
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Half-Rim"
                onChange={toggleFrameType}
              />
              Half-Rim
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Cat-Eye"
                onChange={toggleFrameType}
              />
              Cat-Eye
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Wraparound"
                onChange={toggleFrameType}
              />
              Wraparound
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Oversized"
                onChange={toggleFrameType}
              />
              Oversized
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Geometric"
                onChange={toggleFrameType}
              />
              Geometric
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL " text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No sunglasses found for the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
