import React from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout, deleteAllMessages } = UserAuth();

  //brisanje svih poruka na button
  const handleDelete = async () => {
    try {
      await deleteAllMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar fixed z-10 bg-neutral text-neutral-content">
      <div className="containerWrap flex justify-between ">
        <a className="btn btn-ghost normal-case text-2xl">All-In ↗ Chat</a>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1 text-base">
            Menu 🍔
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button
                onClick={handleDelete}
                className="btn btn-outline btn-sm mb-2"
              >
                DeleteALL-msg
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
