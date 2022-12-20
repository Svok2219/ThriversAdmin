import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { formatDate } from "../../../../utils/Utils";
const EditEvents = () => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  const [Events, setEvents] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://thrivers-assignment-server.onrender.com/EventsRouter/${id}`
        );
        setEvents(response?.data);
        // console.log(response);
        reset();
      } catch (err) {}
    })();
  }, []);

  // console.log(id, Events);
  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };

  const formElEvents = useRef();

  const onSubmit = async (data) => {
    console.log(data);
    const images = [
      Events?.Images.map(
        (x, index) => formElEvents?.current.elements[index + 1].value
      ),
    ];
    console.log(images);
    try {
      const response = await axios.patch(
        `https://thrivers-assignment-server.onrender.com/EventsRouter/${Events?._id}`,
        {
          EventsTitle: data.EventsTitle,
          EventsImages: images,
        }
      );
      if (response?.status == 200) {
        setSuccessMessage("Events Updated successfully");
        setSuccess(true);
        setError(false);
      }
    } catch (err) {
      if (err.response?.status == 302) {
        setErrorMessage("Events with this email already exists");
      } else if (err.response?.status == 500) {
        setErrorMessage("Form submission failed, try again later!");
        console.log(err);
      }
      setSuccess(false);
      setError(true);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"Edit Events"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                {success && (
                  <div className="pt-4 pb-2">
                    <div
                      className="alert alert-primary alert-dismissible fade show"
                      role="alert"
                    >
                      {successMessage}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={toggleSuccess}
                      ></button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="pt-4 pb-2">
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      {errorMessage}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={toggleError}
                      ></button>
                    </div>
                  </div>
                )}
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Edit Events
                  </h5>
                  <p className="text-center small">
                    Update the details of the Events
                  </p>
                </div>

                <form
                  ref={formElEvents}
                  className="row g-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* <h4>Basic Details</h4> */}
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Events Opening Detail"
                        defaultValue={Events?.title}
                        {...register("EventsTitle", {})}
                      />
                      <label htmlfor="title">Events Title/Headline </label>
                    </div>
                  </div>

                  {Events?.Images.map((x) => (
                    <div className="col-md-12 position-relative">
                      <label
                        for="validationTooltip02"
                        className="form-label"
                      ></label>
                      <input
                        type="text"
                        name="Title"
                        className="form-control"
                        id="validationTooltip02"
                        placeholder=""
                        defaultValue={x}
                      />
                      <div className="valid-tooltip">Looks good!</div>
                    </div>
                  ))}

                  <div className="text-center d-flex gap-3 justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={async () => {
                        trigger();
                      }}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditEvents;
