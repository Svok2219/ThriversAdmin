import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { formatDate } from "../../../../utils/Utils";
const EditPartners = () => {
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

  const [Partners, setPartners] = useState();
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
          `https://thrivers-assignment-server.onrender.com/PartnersRouter/${id}`
        );
        setPartners(response?.data);
        // console.log(response);
        reset();
      } catch (err) {}
    })();
  }, []);

  // console.log(id, Partners);
  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.patch(
        `https://thrivers-assignment-server.onrender.com/PartnersRouter/${Partners?._id}`,
        {
          PartnersTitle: data.PartnersTitle,
          PartnersImage: data.PartnersImage,
          PartnersName: data.PartnersName,
          PartnersLink: data.PartnersLink,
        }
      );
      if (response?.status == 200) {
        setSuccessMessage("Partners Updated successfully");
        setSuccess(true);
        setError(false);
      }
    } catch (err) {
      if (err.response?.status == 302) {
        setErrorMessage("Partners with this email already exists");
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
      <PageTitle name={"Edit Partners"} />
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
                    Edit Partners
                  </h5>
                  <p className="text-center small">
                    Update the details of the Partners
                  </p>
                </div>

                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  <h4>Basic Details</h4>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Partners Opening Detail"
                        defaultValue={Partners?.Name}
                        {...register("PartnersName", {
                          required:
                            "Partners Detail should contain vacancies and positions",
                        })}
                      />
                      <label htmlfor="title">Company Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Partners Title"
                        defaultValue={Partners?.Title}
                        {...register("PartnersTitle", {
                          required: "Partners Title is required",
                          // minLength: {
                          //   value: 6,
                          //   message:
                          //     "Partners Title must have at least 3 characters",
                          // },
                        })}
                      />
                      <label htmlfor="title">Partners Title</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingImaae"
                        placeholder="Image"
                        defaultValue={Partners?.Image}
                        {...register("PartnersImage", {
                          required: "Image is required",
                        })}
                      />
                      <label htmlfor="floatingImaae">Image</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        rows={5}
                        type="text"
                        className="form-control"
                        id="Link"
                        placeholder="Partners Opening Detail"
                        defaultValue={Partners?.Link}
                        {...register("PartnersLink", {
                          required:
                            "Partners Detail should contain vacancies and positions",
                        })}
                      />
                      <label htmlfor="title">Partners Details</label>
                    </div>
                  </div>

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

export default EditPartners;
