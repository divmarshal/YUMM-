import React, { useEffect, useState } from "react";
import "./style.scss";
import { LuSettings2 } from "react-icons/lu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../modal/Modal";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [isPath, setIsPath] = useState(true);
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const { dishId: id } = useParams();
  useEffect(() => {
    if (path === "/cart" || path === `/dish/${id}`) {
      setIsPath(false);
    } else {
      setIsPath(true);
    }
  }, [path]);

  const handleFilter = (e) => {
    setFilterText(e.target.textContent);
    navigate("/filterItems");
  };

  const handleModal = (e) => {
    setModalText(e.target.textContent);
    setIsOpen(true);
  };

  return (
    <>
      {isPath && (
        <>
          <div className="filter max-width">
            <div
              className="filter-item cursor"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                backgroundColor: `${
                  modalText === "Filter" && isOpen ? "#e03546" : "#fff"
                }`,
                color: `${
                  modalText === "Filter" && isOpen ? "#fff" : "#838383"
                }`,
              }}
              onClick={handleModal}
            >
              <LuSettings2 />
              <span>Filter</span>
            </div>
            <div
              className="filter-item cursor"
              onClick={handleFilter}
              style={{
                backgroundColor: `${
                  filterText === "Rating: 4.0+" && path === "/filterItems"
                    ? "#e03546"
                    : "#fff"
                }`,
                color: `${
                  filterText === "Rating: 4.0+" && path === "/filterItems"
                    ? "#fff"
                    : "#838383"
                }`,
              }}
            >
              Rating: 4.0+
            </div>
            {isOpen && <Modal onClose={setIsOpen} isOpen={isOpen} />}
          </div>
        </>
      )}
    </>
  );
};

export default Filter;

{
  /* <div className="filter max-width">
<div
  className="filter-item cursor"
  style={{ display: "flex", alignItems: "center", gap: "5px" }}
>
  <LuSettings2 />
  <span>Filter</span>
</div>
<div className="filter-item cursor">Rating: 4.0+</div>
</div> */
}
