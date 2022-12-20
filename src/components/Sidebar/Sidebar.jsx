import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar inactive-sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#Mentorship-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-braces"></i> <span>MentorShip</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="Mentorship-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/Mentorship/add-Mentorship"}>
                <i className="bi bi-circle"></i>
                <span>Add MentorShip</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Mentorship/all-Mentorship"}>
                <i className="bi bi-circle"></i>
                <span>All MentorShip </span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Mentorship/all-Applications"}>
                <i className="bi bi-circle"></i>
                <span>All Application </span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#TeamQ-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-person"></i>
            <span>Team & Query</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="TeamQ-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/TeamQ/add-TeamQ"}>
                <i className="bi bi-circle"></i>
                <span>Add Members</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/TeamQ/all-TeamQ"}>
                <i className="bi bi-circle"></i>
                <span>All Members </span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/TeamQ/all-Query"}>
                <i className="bi bi-circle"></i>
                <span>Inbox </span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#Internship-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-braces-asterisk"></i>
            <span>Intern</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="Internship-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/Internship/add-Internship"}>
                <i className="bi bi-circle"></i>
                <span>Add internship</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Internship/all-Internships"}>
                <i className="bi bi-circle"></i>
                <span>All Openings</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Internship/all-Internship-Application"}>
                <i className="bi bi-circle"></i>
                <span>All Applications</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#Brands-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-box-seam-fill"></i>
            <span>Brands</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="Brands-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/Brands/add-Partners"}>
                <i className="bi bi-circle"></i>
                <span>Add Partners</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Brands/all-Partners"}>
                <i className="bi bi-circle"></i>
                <span>All Partners</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Brands/add-Recognizers"}>
                <i className="bi bi-circle"></i>
                <span>Add Recognizers</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Brands/all-Recognizers"}>
                <i className="bi bi-circle"></i>
                <span>All Recognizers</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#BlogandEventss-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-file-post"></i>
            <span>Blogs & Events</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="BlogandEventss-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to={"/dashboard/Blog&Event/add-Blog"}>
                <i className="bi bi-circle"></i>
                <span>Add Blog</span>
              </Link>
            </li>

            <li>
              <Link to={"/dashboard/Blog&Event/all-Blogs"}>
                <i className="bi bi-circle"></i>
                <span>All Blogs</span>
              </Link>
            </li>

            <li>
              <Link to={"/dashboard/Blog&Event/add-Events"}>
                <i className="bi bi-circle"></i>
                <span>Add Events</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/Blog&Event/all-events"}>
                <i className="bi bi-circle"></i>
                <span>All Events</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link collapsed" to={"/dashboard/profile"}>
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
