import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllEvents = () => {
  const [Events, setEvents] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleEvents, setSingleEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getEvents();
  }, [update]);

  // Function to get all Eventss

  const getEvents = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/EventsRouter/getAllEvents`
      )
      .then((res) => {
        setEvents(res.data.content);
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
    let tempIntern = [...Events];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleEvents(d);
    console.log("singleEvents", singleEvents);
  }
  function editEvents(id) {
    navigate(`/dashboard/Blog&Event/update-Events/${id}`);
  }
  async function deleteEvents(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/EventsRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("Events deleted successfully");
      } else {
        alert("Events deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteEvents(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All Eventss"} />
      <section className="section dashboard">
        <div className="row">
          {Events?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">Company Name</th> */}
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    {/* <th scope="col">Link</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Events?.map((singleEvents, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{singleEvents?.title} </td>
                      {singleEvents?.title && (
                        <td className="overflowY-auto">
                          {singleEvents?.Date}{" "}
                        </td>
                      )}
                      {/* <td>{singleEvents?.Link} </td> */}
                      {!singleEvents?.title && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleEvents?._id)}
                      >
                        Details
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => editEvents(singleEvents?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => handleConfirmDelete(singleEvents?._id)}
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {Events?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Eventss found
            </div>
          )}
          {singleEvents.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div
                  style={{ overflow: "auto" }}
                  className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                >
                  {/* <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleEvents?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  /> */}
                  <h3>{singleEvents[0]?.title} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Date</th>
                          <td>{singleEvents[0]?.Date}</td>
                        </tr>
                        {singleEvents[0].Images.map((x) => (
                          <tr>
                            <th scope="row">Events Image[]</th>
                            <td>
                              <a href={x}>{x}</a>
                            </td>
                          </tr>
                        ))}

                        {/* <tr>
                          <th scope="row">Link</th>
                          <td>{singleEvents[0]?.Link}</td>
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

export default AllEvents;
