import React from "react";
import "./style.scss";
import { categories } from "../../utils/constants";
import Loader from "../loader/Loader";
import SearchItem from "./searchItem/SearchItem";

const SearchList = ({ setIsOpen, text, setSearchTerm }) => {
  const handleSearchList = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="searchList" onClick={handleSearchList}>
      {text ? (
        categories
          .filter((item) =>
            item.title.toLowerCase().includes(text.toLowerCase())
          )
          .map((item) => (
            <div key={item.id}>
              {" "}
              <SearchItem data={item} />
            </div>
          ))
      ) : (
        <>
          <div
            style={{
              height: "200px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Loader />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchList;
