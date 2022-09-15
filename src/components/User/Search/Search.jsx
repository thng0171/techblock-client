import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { request } from "../../../api/axios";
import { ArticleCard } from "../Home/ArticleCard";
function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  let key = searchParams.get("key");
  let cat = searchParams.get("cat");
  const [searchResults, setSearchResults] = useState([]);
  const [inputKey, setInputKey] = useState("");
  console.log(cat);
  if (key) {
    useEffect(() => {
      setInputKey(key);
      request
        .get(`article/search?keyword=${key}`)
        .then((res) => {
          console.log(res);
          setSearchResults(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  }
  if (cat) {
    useEffect(() => {
      request
        .get(`article?category=${cat}`)
        .then((res) => {
          console.log(res);
          setSearchResults(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [cat]);
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    window.location.href = `/search?key=${inputKey}`;
  };
  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="">
        {/* search form */}
        <form className="relative w-full" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết... (Nhập ít nhất 3 ký tự)"
            className="w-full rounded-md border-2 border-gray-200 p-2 px-4 text-lg focus:outline-none"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            required
            pattern=".{3,}"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <FaSearch size={20} />
          </button>
        </form>
        <div className="mt-2 flex space-x-1">
          <span
            className="
          font-bold text-gray-800
          "
          >
            {searchResults.length}
          </span>
          <span className="text-slate-500"> Kết quả phù hợp</span>
        </div>
      </div>
      <div className="mt-5  divide-y">
        {searchResults.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Search;
