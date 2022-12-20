import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "./../../firebase-config";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("admin-token");
    navigate("/");
  };
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (sidebar) {
      document.getElementById("sidebar").classList.remove("inactive-sidebar");
      document.getElementById("sidebar").classList.add("active-sidebar");
    } else {
      document.getElementById("sidebar").classList.remove("active-sidebar");
      document.getElementById("sidebar").classList.add("inactive-sidebar");
    }
  }, [sidebar]);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="sidebar-toggle">
            <GiHamburgerMenu className="toggler" onClick={toggleSidebar} />
          </div>
        </div>
        <Link to={"/dashboard"} className="logo d-flex align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkvC5IglxkR9lv6_FHLtr8N3nMtvcJUSQ8l3y8H4ASD7WI0Y2fWlnDHajLrzxbve3zrIg&usqp=CAU"
            alt=""
          />
          <span className="d-none d-lg-block">Admin Wagmi</span>
        </Link>
        {/* <i className="bi bi-list toggle-sidebar-btn"></i> */}
      </div>

      {/* <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          {/* <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li> */}

          {/* <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>

             <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul> 
          </li> */}

          {/* <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-chat-left-text"></i>
              <span className="badge bg-success badge-number">3</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="message-item">
                <a href="#">
                  <img src={messageOne} alt="" className="rounded-circle" />
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore
                      officia est ut...
                    </p>
                    <p>4 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="message-item">
                <a href="#">
                  <img src={messageTwo} alt="" className="rounded-circle" />
                  <div>
                    <h4>Anna Nelson</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore
                      officia est ut...
                    </p>
                    <p>6 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="message-item">
                <a href="#">
                  <img src={messageThree} alt="" className="rounded-circle" />
                  <div>
                    <h4>David Muldon</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore
                      officia est ut...
                    </p>
                    <p>8 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="dropdown-footer">
                <a href="#">Show all messages</a>
              </li>
            </ul>
          </li> */}

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="data:image/png;base64,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"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {value.email}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Admin</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              {/* <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to={"/dashboard/profile"}
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li> */}
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
