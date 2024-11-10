import React, { useContext, useEffect, useState } from "react";
import { Card, StatisticCard } from "../components";
import axios from "axios";
import { LoginContext } from "../reactcontext/ReactContext";
import swal from "sweetalert";
import GroupedPayments from "../components/GroupedPayments";
import ChartDiagram from "../components/ChartDiagram";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { FaPassport } from "react-icons/fa";
import { IoDocumentLockSharp } from "react-icons/io5";
import { FaRegIdCard } from "react-icons/fa";
import NationalityChart from "../components/NationalityChart";

const Dashboard = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [loading, setLoading] = useState(true);
  const { loginInfo } = useContext(LoginContext);
  const [agents, setAgents] = useState([]);
  const [expiredPassports, setExpiredPassports] = useState(0);
  const [passportsDue, setPassportsDue] = useState(0);
  const [expiredVisas, setExpiredVisas] = useState(0);
  const [visasDue, setVisasDue] = useState(0);
  const navigate = useNavigate();
  const [activeXInactive, setActiveXInactive] = useState({
    active: 0,
    inActive: 0,
  });

  useEffect(() => {
    if (!loginInfo.login) {
      navigate("/");
    }
  }, [loginInfo]);
// console.log(apiUrl)
  useEffect(() => {
    axios
      .get(`${apiUrl}/employee/getActiveAndInactive`, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        setLoading(false);

        setActiveXInactive({
          active: res.data.activeEmp,
          inActive: res.data.inActiveEmp,
        });
      })
      .catch((err) => {
        setLoading(false);
        swal({
          icon: "error",
          timerProgressBar: true,
          button: false,
          title: "Error !",
          text: JSON.stringify(err.response.data.error),
          timer: 3000,
        });
      });

    axios
      .get(`${apiUrl}/agent`, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        setLoading(false);

        setAgents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        setLoading(false);
        swal({
          icon: "error",
          timerProgressBar: true,
          button: false,
          title: "Error !",
          text: JSON.stringify(err.response.data.error),
          timer: 3000,
        });
      });

    axios
      .get(`${apiUrl}/employee/passportExpired`, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        setExpiredPassports(res.data?.passports?.length);
        setLoading(false);
      })
      .catch((err) => {
        swal({
          title: "Error",
          icon: "error",
          text: JSON.stringify(err.message),
        });
        setLoading(false);
      });

    axios
      .get(`${apiUrl}/employee/passportExpire`, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        console.log();
        setPassportsDue(res.data?.passports?.length);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Error",
          icon: "error",
          text: JSON.stringify(err.message),
        });
        setLoading(false);
      });

    axios
      .get(`${apiUrl}/employee/visaExpired`, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        setExpiredVisas(res.data?.visas?.length);
        setLoading(false);
      })
      .catch((err) => {
        swal({
          title: "Error",
          icon: "error",
          text: JSON.stringify(err.message),
        });
        setLoading(false);
      });

    axios
      .get(`${apiUrl}/employee/visaExpire`, {
        headers: {
          loginToken: localStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        console.log();
        setVisasDue(res.data?.visas?.length);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Error",
          icon: "error",
          text: JSON.stringify(err.message),
        });
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-gray-50 h-full rounded-lg  gap-3 p-5 flex items-start flex-col shadow-md">
      <h1 className="text-[18pt] font-light ml-10">
        Welcome to Rahman Group Dashboard
      </h1>

      <div className="flex flex-col justify-evenly w-full gap-3">
        <div className="flex justify-around">
          <Card title={"Active profiles"} link={"profile"}>
            <StatisticCard
              name={<FaUserCheck fontSize={36} />}
              value={!loading && activeXInactive.active.length}
              
            />
          </Card>
          <Card title={"Expired Passports"} link={"passport_exp"}>
            <StatisticCard
              name={<FaPassport fontSize={36} />}
              value={!loading && expiredPassports}
            />
          </Card>
          <Card title={"Expired Visas"} link={"visa_exp"}>
            <StatisticCard
              name={<IoDocumentLockSharp fontSize={36} />}
              value={!loading && expiredVisas}
            />
          </Card>
        </div>
        <div className="flex justify-around">
          <Card title={"Inactive profiles"} link={"profile"}>
            <StatisticCard
              name={<FaUserAltSlash fontSize={36} />}
              value={!loading && activeXInactive.inActive.length}
            />
          </Card>
          <Card title={"Passports Due"} link={"passport_exp"}>
            <StatisticCard
              name={<FaPassport fontSize={36} />}
              value={!loading && passportsDue}
            />
          </Card>
          <Card title={"Visas Due"} link={"visa_exp"}>
            <StatisticCard
              name={<FaRegIdCard fontSize={36} />}
              value={!loading && visasDue}
            />
          </Card>
        </div>

        <div className="flex justify-around items-center gap-5 mt-8 mx-20">
          <ChartDiagram agents={agents} />

          <GroupedPayments />
        </div>
        <div>
          <NationalityChart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
