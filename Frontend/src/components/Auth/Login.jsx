import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

   const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
      { email, password, role },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //  STORE TOKEN
    localStorage.setItem("token", data.token);

    //  SET GLOBAL AUTH HEADER
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${data.token}`;

    toast.success(data.message);
    setEmail("");
    setPassword("");
    setRole("");
    setUser(data.user);
    setIsAuthorized(true);

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src="/logo jobzone.png" alt="logo" />
          <h3>Login to your account</h3>
        </div>

        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="anish123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>

          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder="Anish@1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>

          <button type="submit">Login</button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>

      <div className="banner">
        <img src="/user-login-4268415-3551762 (1).png" alt="login" />
      </div>
    </section>
  );
};

export default Login;