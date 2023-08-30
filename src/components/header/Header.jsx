import React, { useState } from "react";
import "./style.scss";
import YL from "../../assets/YL.png";
import { BsSearch } from "react-icons/bs";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { login, logout } from "../../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import SearchList from "../searchList/SearchList";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    const {
      user: { providerData },
    } = await signInWithPopup(auth, authProvider);
    dispatch(login(providerData[0]));
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAddItemToServer = () => {
    navigate("/addItem");
  };

  const handleLogout = () => {
    setShowMenu(false);
    dispatch(logout(null));
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleSearchList = () => {
    if (searchTerm) return;
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    navigate(`/searchFeed/${searchTerm}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="header max-width">
      <nav className="nav">
        <Link to="/">
          <img src={YL} alt="nav-logo" className="nav-logo" />
        </Link>
        <form className="nav-form" onSubmit={handleSubmit}>
          <button type="submit">
            <BsSearch style={{ fontSize: "24px", color: "#838383" }} />
          </button>
          <input
            type="text"
            placeholder="Search your favourite dish"
            value={searchTerm}
            onFocus={() => setIsOpen(true)}
            onBlur={handleSearchList}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        {isOpen && (
          <div className="nav-searchList">
            <SearchList
              setIsOpen={setIsOpen}
              text={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        )}
        <div className="nav-right">
          <span className="nav-cart">{items.length}</span>
          <span onClick={handleCart}>
            <RiShoppingCart2Fill
              style={{ fontSize: "24px", color: "#ff7e8b" }}
              className="cursor"
            />
          </span>
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="profile image"
                className="cursor"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onClick={handleShowMenu}
              />
            </>
          ) : (
            <>
              <span
                style={{ fontSize: "24px" }}
                className="cursor"
                onClick={handleLogin}
              >
                Log in
              </span>
            </>
          )}
          {showMenu && (
            <div className="nav-right--logout">
              <span onClick={handleAddItemToServer}>New item</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
