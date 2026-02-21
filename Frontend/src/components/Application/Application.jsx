import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Protect route properly
  useEffect(() => {
    if (!isAuthorized) navigateTo("/login");
    if (user && user.role === "Employer") navigateTo("/");
  }, [isAuthorized, user]);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);

      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>

        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />

          <div>
            <label style={{ display: "block", fontSize: "18px" }}>
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;