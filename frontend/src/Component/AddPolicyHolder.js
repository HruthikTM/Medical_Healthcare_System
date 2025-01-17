import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddPolicyHolder() {
  const [policyholdername, setHolderName] = useState("");
  const [policyholderage, setHolderAge] = useState("");
  const [policyholdergender, setHolderGender] = useState("");
  const [policyholderphno, setHolderPhno] = useState("");
  const [policyholderaddress, setHolderAddress] = useState("");

  const [polno, setPolNo] = useState();
  const [getHolder, setHolder] = useState([]);

  useEffect(() => {
    getAllHolder();
  }, []);

  const navigate = useNavigate();

  function handlesubmit(e) {
    if (!policyholdername) {
      toast.error(" Policy holder Name Not Found");
      return;
    }
    if (!policyholderage) {
      toast.error("Policy holder Not Found");
      return;
    }
    if (!policyholdergender) {
      toast.error("Policy holder gender Not Found");
      return;
    }
    if (!policyholderaddress) {
      toast.error("Policy holder Address Not Found");
      return;
    }
    if (!policyholderphno) {
      toast.error("Policy holder Phone Number Not Found");
      return;
    }

    e.preventDefault();
    const obj = {
      policyholdername,
      policyholderage,
      policyholdergender,
      policyholderaddress,
      policyholderphno,
    };
    axios.post(`http://localhost:8080/AddHolder/${polno}`, obj).then((res) => {
      sessionStorage.setItem("PolicyHolderID", res.data);
      navigate("/insurance/addpolicymember");
      ClearAll();
    });
  }

  function ClearAll() {
    setHolderName("");
    setHolderAge("");
    setHolderGender("");
    setHolderPhno("");
    setHolderAddress("");
  }

  function getAllHolder() {
    axios.get("http://localhost:8080/GetPolicy").then((res) => {
      setHolder(res.data);
    });
  }

  return (
    <div>
      <div className="container">
        <h2>Add PolicyHolder Details</h2>
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <label>PolicyHolder Name</label>
              <input
                type="text"
                className="form-control"
                value={policyholdername}
                onChange={(e) => setHolderName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>PolicyHolder Age</label>
              <input
                type="text"
                className="form-control"
                value={policyholderage}
                onChange={(e) => setHolderAge(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <lable>Select Policy</lable>
              <select
                className="form-select mb-3"
                value={polno}
                onChange={(e) => setPolNo(e.target.value)}
              >
                <option value={0}>--Select--</option>
                {getHolder.map((item) => {
                  return <option value={item.polno}>{item.polname}</option>;
                })}
              </select>
            </div>
            <div className="mb-3">
              <label>PolicyHolder Gender</label>
              <input
                type="text"
                className="form-control"
                value={policyholdergender}
                onChange={(e) => setHolderGender(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>PolicyHolder Phone</label>
              <input
                type="text"
                className="form-control"
                value={policyholderphno}
                onChange={(e) => setHolderPhno(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>PolicyHolder Address</label>
              <input
                type="text"
                className="form-control"
                value={policyholderaddress}
                onChange={(e) => setHolderAddress(e.target.value)}
              />
            </div>

            <div className="text-end">
              <input
                type="button"
                className="btn btn-primary"
                onClick={handlesubmit}
                value="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
