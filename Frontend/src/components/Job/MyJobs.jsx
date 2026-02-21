import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // 🔥 Proper route protection
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    if (user && user.role !== "Employer") {
      navigateTo("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/job/getmyjobs`,
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error("Failed to load jobs");
        setMyJobs([]);
      }
    };

    fetchJobs();
  }, [isAuthorized, user]);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    try {
      const updatedJob = myJobs.find((job) => job._id === jobId);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setMyJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>

        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">

                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <span>Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(element._id, "country", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <span>City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <span>Category:</span>
                      <select
                        disabled={editingMode !== element._id}
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(element._id, "category", e.target.value)
                        }
                      >
                        <option value="MERN Stack Development">MERN STACK</option>
                        <option value="Frontend Web Development">Frontend</option>
                        <option value="Mobile App Development">Mobile App</option>
                        <option value="Artificial Intelligence">AI</option>
                      </select>
                    </div>

                  </div>
                </div>

                <div className="button_wrapper">
                  {editingMode === element._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateJob(element._id)}
                        className="check_btn"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={handleDisableEdit}
                        className="cross_btn"
                      >
                        <RxCross2 />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(element._id)}
                      className="edit_btn"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete_btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;