import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { formatDate } from "../../../../utils/Utils";
const EditMentorship = () => {
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

  const [Mentorship, setMentorship] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://thrivers-assignment-server.onrender.com/MentorshipRouter/${id}`
        );
        setMentorship(response?.data);

        reset();
      } catch (err) {}
    })();
  }, []);

  // console.log(id, Mentorship);
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
        `https://thrivers-assignment-server.onrender.com/MentorshipRouter/${Mentorship?._id}`,
        {
          MentorshipProgramTitle: data.MentorshipProgramTitle,
          MentorshipProgramImage: data.MentorshipProgramImage,
          MentorshipProgramPriceDetail: data.MentorshipProgramPriceDetail,
        }
      );
      if (response?.status == 200) {
        setSuccessMessage("Mentorship Updated successfully");
        setSuccess(true);
        setError(false);
      }
    } catch (err) {
      if (err.response?.status == 302) {
        setErrorMessage("Mentorship with this email already exists");
      } else if (err.response?.status == 500) {
        setErrorMessage("Form submission failed, try again later!");
        console.log(err);
      }
      setSuccess(false);
      setError(true);
    }
  };

  console.log(Mentorship);
  return (
    <main id="main" className="main">
      <PageTitle name={"Edit Mentorship"} />
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
                    Edit Mentorship
                  </h5>
                  <p className="text-center small">
                    Update the details of the Mentorship
                  </p>
                </div>

                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  {/* <h4>Basic Details</h4> */}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Mentorship Title"
                        defaultValue={Mentorship?.title}
                        {...register("MentorshipProgramTitle", {
                          required: "Mentorship Title is required",
                          // minLength: {
                          //   value: 6,
                          //   message:
                          //     "Mentorship Title must have at least 3 characters",
                          // },
                        })}
                      />
                      <label htmlfor="title">Mentorship Program Title</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingImaae"
                        placeholder="Image"
                        defaultValue={Mentorship?.Image}
                        {...register("MentorshipProgramImage", {
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
                        id="OpeningDetails"
                        placeholder="Mentorship Opening Detail"
                        defaultValue={Mentorship?.PriceDetail}
                        {...register("MentorshipProgramPriceDetail", {
                          required:
                            "Mentorship Detail should contain vacancies and positions",
                        })}
                      />
                      <label htmlfor="title">Mentorship Details</label>
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

export default EditMentorship;
