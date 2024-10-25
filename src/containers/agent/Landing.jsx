import React, { useState } from "react";
import { Link } from "react-router-dom";
import Panel from "../../components/Panel";
import AgentTableInit from "./table/AgentTableInit";
import axios from "axios";
import swal from "sweetalert";
import { AiOutlinePlus } from "react-icons/ai";
import AgentFormModal from "./form/AgentFormModal";

const Landing = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dLoading, setDLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const clearData = () => {
    setFormData({ ...formData, id: "", name: "", mobile: "", email: "" });
  };

  const handleNew = () => {
    clearData();
    openModal();
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning", //The right way
      dangerMode: "red",
      closeModal: false,
      buttons: ["No", "Yes"], //The right way to do it in Swal1
    }).then((isConfirm) => {
      setDLoading(false);
      if (isConfirm) {
        axios
          .delete(`${apiUrl}/agent/deleteAgent/${id}`, {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          })
          .then((res) => {
            if (res.data.message) {
              clearData();
              swal({
                title: "Removing",
                icon: "success",
                timer: 3000,
                buttons: false,
                text: res.data.message,
              });

              setAgents((prev) => {
                return prev.filter((value) => value.id !== id);
              });
            } else if (res.data.error) {
              swal({
                title: "Error",
                icon: "error",
                text: res.data.error,
              });
            }
          })
          .catch((err) => {
            setDLoading(false);
            if (err.response) {
              console.log(err);
              swal({
                title: "Error",
                icon: "error",
                text: err.response.data.error,
              });
            } else {
              console.log(err);
            }
          });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (typeof formData.id == "string") {
      axios
        .post(
          `${apiUrl}/agent/addAgent`,
          {
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
          },
          {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          }
        )
        .then((result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 200) {
            console.log(result);
            swal({
              title: "Success",
              icon: "success",
              text: result.data.name + " has been added",
              buttons: false,
              timer: 1000,
            });

            setAgents([
              ...agents,
              {
                id: result.data.id,
                name: result.data.name,
                mobile: result.data.mobile,
                email: result.data.email,
                createdAt: result.data.createdAt,
                updatedAt: result.data.updatedAt,
                Employees: [],
              },
            ]);

            setFormData({
              ...formData,
              id: "",
              name: "",
              mobile: "",
              email: "",
            });
            closeModal();
            //resetForm()

            //setActiveTab(1)
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err);
            swal({
              title: "Error",
              icon: "error",
              text: err.response.data.error,
            });
          } else {
            console.log(err);
          }

          setLoading(false);
        });
    } else {
      axios
        .put(`${apiUrl}/agent/editAgent`, formData, {
          headers: {
            loginToken: localStorage.getItem("loginToken"),
          },
        })
        .then((result) => {
          setLoading(false);
          console.log(result);
          if (result.data.response) {
            if (result.data.response) {
              const updatedData = [...agents];
              const indexToUpdate = updatedData.findIndex(
                (item) => item.id === formData.id
              );

              if (indexToUpdate !== -1) {
                updatedData[indexToUpdate] = formData;
                setAgents(updatedData); // Update the state with the modified array
                setFormData({ id: "", name: "", mobile: "", email: "" });
              }

              swal({
                icon: "success",
                title: "Update",
                text: "Agent Info Updated Successfully!",
                buttons: false,
                timer: "2000",
              });

              closeModal();
            }
          } else {
            swal({
              icon: "error",
              title: "Oops!",
              text: result.data.error,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            console.log(err);
            swal({
              title: "Error",
              icon: "error",
              text: err.response.data.error,
            });
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="w-full flex h-full flex-col items-center justify-between relative gap-3">
      <div className="flex justify-between w-full">
        <div>
        <Link to={"/dashboard"} className="text-yellow-700">
          Dashboard
        </Link>
        {" > "}
        Agents
        </div>
        <button
            className="mr-3 p-2 bg-green-500 flex items-center justify-center 
            rounded-xl px-4 gap-1 font-bold hover:bg-green-950 hover:text-white"
            onClick={() => handleNew()}
          >
            <AiOutlinePlus size={18} />
            Add agent
          </button>
      </div>

      {/* Render active tab content */}
      <div className="w-full items-start justify-start h-full flex gap-y-10 flex-wrap">
        <AgentFormModal
          isOpen={modalIsOpen}
          setModal={setModalIsOpen}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          clearData={clearData}
        />
        <div className="w-full flex justify-end p-2">
          
        </div>

        <div className="flex items-center justify-center w-full h-full overflow-auto">
          <div className="w-full mx-10 h-full">
            <AgentTableInit
              openModal={openModal}
              agents={agents}
              setAgents={setAgents}
              formData={formData}
              setFormData={setFormData}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
