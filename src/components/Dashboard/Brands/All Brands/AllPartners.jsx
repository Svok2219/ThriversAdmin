import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllPartners = () => {
  const [Partners, setPartners] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singlePartners, setSinglePartners] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPartners();
  }, [update]);

  // Function to get all Partnerss

  const getPartners = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/PartnersRouter/getAllPartners`
      )
      .then((res) => {
        setPartners(res.data.content);
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
    let tempIntern = [...Partners];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSinglePartners(d);
    console.log("singlePartners", singlePartners);
  }
  function editPartners(id) {
    navigate(`/dashboard/Brands/update-Partners/${id}`);
  }
  async function deletePartners(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/PartnersRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("Partners deleted successfully");
      } else {
        alert("Partners deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deletePartners(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All Partnerss"} />
      <section className="section dashboard">
        <div className="row">
          {Partners?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    {/* <th scope="col">Link</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Partners?.map((singlePartners, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{singlePartners?.Name} </td>
                      {singlePartners?.Title && (
                        <td className="overflowY-auto">
                          {singlePartners?.Title}{" "}
                        </td>
                      )}
                      {/* <td>{singlePartners?.Link} </td> */}
                      {!singlePartners?.Title && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singlePartners?._id)}
                      >
                        Details
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => editPartners(singlePartners?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => handleConfirmDelete(singlePartners?._id)}
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {Partners?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Partnerss found
            </div>
          )}
          {singlePartners.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div
                  style={{ overflow: "auto" }}
                  className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                >
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singlePartners?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h3>{singlePartners[0]?.title} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Name</th>
                          <td>{singlePartners[0]?.Name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Title</th>
                          <td>{singlePartners[0]?.Title}</td>
                        </tr>
                        <tr>
                          <th scope="row">Link</th>
                          <td>{singlePartners[0]?.Link}</td>
                        </tr>
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

export default AllPartners;
