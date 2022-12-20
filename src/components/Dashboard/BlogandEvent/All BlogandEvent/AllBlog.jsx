import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllBlog = () => {
  const [Blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleBlog, setSingleBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBlog();
  }, [update]);

  // Function to get all Blogs

  const getBlog = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/ThrivesDailyRouter/getAllBlog`
      )
      .then((res) => {
        setBlog(res.data.content);
        console.log(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  function getDateStr(date) {
    let tdate = new Date(date);
    return (
      tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear()
    );
  }

  // function to convert image to base64

  function showDetails(id) {
    let tempIntern = [...Blog];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleBlog(d);
    console.log("singleBlog", singleBlog);
  }
  function editBlog(id) {
    navigate(`/dashboard/Blog&Event/update-Blog/${id}`);
  }
  async function deleteBlog(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/ThrivesDailyRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("Blog deleted successfully");
      } else {
        alert("Blog deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteBlog(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All Blogs"} />
      <section className="section dashboard">
        <div className="row">
          {Blog?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">Company Name</th> */}
                    <th scope="col">Title</th>
                    <th scope="col">Writer</th>
                    {/* <th scope="col">Link</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Blog?.map((singleBlog, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{singleBlog?.Writer} </td>
                      {singleBlog?.Title && (
                        <td className="overflowY-auto">{singleBlog?.Title} </td>
                      )}
                      {/* <td>{singleBlog?.Link} </td> */}
                      {!singleBlog?.Title && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleBlog?._id)}
                      >
                        Details
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => editBlog(singleBlog?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => handleConfirmDelete(singleBlog?._id)}
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {Blog?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Blogs found
            </div>
          )}
          {singleBlog.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div
                  style={{ overflow: "auto" }}
                  className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                >
                  {/* <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleBlog?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  /> */}
                  <h3>{singleBlog[0]?.title} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Date</th>
                          <td>{singleBlog[0]?.Date}</td>
                        </tr>
                        <tr>
                          <th scope="row">Writer</th>
                          <td>{singleBlog[0]?.Writer}</td>
                        </tr>
                        <tr>
                          <th scope="row">Blog Body</th>
                          <td>
                            <>{singleBlog[0]?.Blog}</>{" "}
                          </td>
                        </tr>
                        {/* <tr>
                          <th scope="row">Link</th>
                          <td>{singleBlog[0]?.Link}</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </section>
    </main>
  );
};

export default AllBlog;
