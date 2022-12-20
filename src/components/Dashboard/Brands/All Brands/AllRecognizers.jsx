import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllRecognizers = () => {
  const [Recognizers, setRecognizers] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleRecognizers, setSingleRecognizers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getRecognizers();
  }, [update]);

  // Function to get all Recognizerss

  const getRecognizers = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/RecognizedRouter/getAllRecognizers`
      )
      .then((res) => {
        setRecognizers(res.data.content);
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
    let tempIntern = [...Recognizers];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleRecognizers(d);
    console.log("singleRecognizers", singleRecognizers);
  }
  function editRecognizers(id) {
    navigate(`/dashboard/Brands/update-Recognizers/${id}`);
  }
  async function deleteRecognizers(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/RecognizedRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("Recognizers deleted successfully");
      } else {
        alert("Recognizers deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteRecognizers(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All Recognizerss"} />
      <section className="section dashboard">
        <div className="row">
          {Recognizers?.length > 0 && (
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
                  {Recognizers?.map((singleRecognizers, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{singleRecognizers?.Name} </td>
                      {singleRecognizers?.Title && (
                        <td className="overflowY-auto">
                          {singleRecognizers?.Title}{" "}
                        </td>
                      )}
                      {/* <td>{singleRecognizers?.Link} </td> */}
                      {!singleRecognizers?.Title && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleRecognizers?._id)}
                      >
                        Details
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => editRecognizers(singleRecognizers?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() =>
                          handleConfirmDelete(singleRecognizers?._id)
                        }
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {Recognizers?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Recognizerss found
            </div>
          )}
          {singleRecognizers.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div
                  style={{ overflow: "auto" }}
                  className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                >
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleRecognizers?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h3>{singleRecognizers[0]?.title} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Name</th>
                          <td>{singleRecognizers[0]?.Name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Title</th>
                          <td>{singleRecognizers[0]?.Title}</td>
                        </tr>
                        <tr>
                          <th scope="row">Link</th>
                          <td>{singleRecognizers[0]?.Link}</td>
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

export default AllRecognizers;
