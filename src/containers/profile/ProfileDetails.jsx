import React, { useState } from "react";
import Panel from "../../components/Panel";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillPlusCircle,
  AiOutlineDollar,
  AiOutlineUpload,
} from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import axios from "axios";
import swal from "sweetalert";
import EditInfo1 from "./modal/EditInfo1";
import EditInfo3 from "./modal/EditInfo3";
import Distribute from "./modal/AgentForm";
import Recipient from "./modal/Recipient";
import Modal from "../../components/Modal";
import UploadDocument from "../../components/UploadDocument";
import EditInfo2 from "./modal/EditInfo2";
import EditInfo4 from "./modal/EditInfo4";
import Passport from "./modal/Passport";
import AddPassport from "./modal/AddPassport";
import AddVisa from "./modal/AddVisa";
import Visa from "./modal/Visa";

const ProfileDetails = ({ profile, setSelectedProfile, setActiveTab }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [profileInit, setProfileInit] = useState(profile);
  const [isOpen, setIsOpen] = useState(false);
  const [isInfo2Open, setIsInfo2Open] = useState(false);
  const [isInfo3Open, setIsInfo3Open] = useState(false);
  const [isInfo4Open, setIsInfo4Open] = useState(false);
  const [isInfo5Open, setIsInfo5Open] = useState(false);
  const [isInfo6Open, setIsInfo6Open] = useState(false);
  const [isInfo7Open, setIsInfo7Open] = useState(false);
  const [isInfo8Open, setIsInfo8Open] = useState(false);
  const [isDistributionOpen, setIsDistributionOpen] = useState(false);
  const [isRecipientOpen, setIsRecipientOpen] = useState(false);
  const [isRecipientEdit, setIsRecipientEdit] = useState(false);
  const [passportIndex, setPassportIndex] = useState(0);
  const [visaIndex, setVisaIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dimensions = "w-3/4 min-h-[80%] ";
  console.log(profile)
  // Function to toggle modal
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePassportEdit = (index) => {
    setIsInfo5Open(true);
    setPassportIndex(index);
  };

  const handleVisaEdit = (index) => {
    setIsInfo8Open(true);
    setVisaIndex(index);
  };

  const deletePassport = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning", //The right way
      dangerMode: "red",
      closeModal: false,
      buttons: ["No", "Yes"], //The right way to do it in Swal1
    }).then((isConfirm) => {
      if (isConfirm) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/employee/deletePassport/${id}`, {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          })
          .then((res) => {
            setLoading(false);

            swal({
              title: "Success",
              icon: "success",
              text: "Passport has been deleted",
            });

            // Filter out the deleted attachment
            setProfileInit({
              ...profileInit,
              Passports: [
                ...profileInit.Passports.filter(
                  (passport) => passport.id !== id
                ),
              ],
            });
          })
          .catch((err) => {
            setLoading(false);
            if (err.response) {
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

  const deleteVisa = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning", //The right way
      dangerMode: "red",
      closeModal: false,
      buttons: ["No", "Yes"], //The right way to do it in Swal1
    }).then((isConfirm) => {
      if (isConfirm) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/employee/deleteVisa/${id}`, {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          })
          .then((res) => {
            setLoading(false);

            swal({
              title: "Success",
              icon: "success",
              text: "Visa has been deleted",
            });

            // Filter out the deleted attachment
            setProfileInit({
              ...profileInit,
              Visas: [...profileInit.Visas.filter((visa) => visa.id !== id)],
            });
          })
          .catch((err) => {
            setLoading(false);
            if (err.response) {
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

  const recipientOpen = (tag) => {
    setIsRecipientOpen(!isRecipientOpen);
    if (tag === "edit") {
      setIsRecipientEdit(true);
    } else {
      setIsRecipientEdit(false);
    }
  };

  const deleteProfile = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this record?",
      icon: "warning", //The right way
      dangerMode: "red",
      closeModal: false,
      buttons: ["No", "Yes"], //The right way to do it in Swal1
    }).then((isConfirm) => {
      if (isConfirm) {
        axios
          .delete(`${apiUrl}/employee/delete/${id}`, {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          })
          .then((res) => {
            if (res.data.message) {
              swal({
                title: "Removing",
                icon: "success",
                timer: 3000,
                buttons: false,
                text: "Profile has been deleted",
              });

              setActiveTab(1);
              setSelectedProfile({});
            }
          })
          .catch((err) => {
            swal({
              title: "Error",
              icon: "error",
              text: err.message,
            });
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col flex-1">
      {Object.keys(profile).length > 0 && (
        <div className="w-full flex flex-wrap items-center justify-end px-3 py-2 gap-x-3 gap-y-2">
          {/*<button 
          className='flex mt-2 text-sm items-center py-[6px] gap-1 border-2
           text-white border-gray-500 px-2 rounded-lg shadow-lg bg-gray-500'
          onClick={() => setActiveTab(3)}
        >
          <AiOutlineDollar />
          Payments
        </button>*/}
          <button
            className="flex text-sm mt-2 items-center py-[6px] gap-1 border-2 text-white border-green-600 px-2 rounded-lg shadow-lg bg-green-500"
            onClick={() => setIsModalOpen(true)}
          >
            <AiOutlineUpload />
            Manage Attachments
          </button>
          <button
            className="flex text-sm items-center mt-2 py-[6px] gap-1 border-2 text-white border-red-600 px-2 rounded-lg shadow-lg bg-red-500"
            onClick={() => deleteProfile(profileInit.id)}
          >
            <AiFillDelete />
            Delete this Profile
          </button>
        </div>
      )}

      {Object.keys(profile).length > 0 ? (
        <div className="">
          {isModalOpen && (
            <div className="flex justify-center items-center h-screen">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleToggleModal}
              >
                Open Modal
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={handleToggleModal}
                dimensions={dimensions}
              >
                <UploadDocument
                  data={profileInit}
                  setIsModalOpen={setIsModalOpen}
                />
              </Modal>
            </div>
          )}

          <div className="flex flex-wrap md:flex-row flex-col justify-evenly items-center gap-2">
            <div className="bg-white overflow-hidden mb-7 shadow rounded-lg border box w-full ">
              <div className="px-4 py-5 bg-gray-300  sm:px-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 text-center w-full font-medium text-gray-900">
                    Personal Details
                  </h3>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 bg-white shadow-lg rounded-lg text-sm flex items-center justify-center cursor-pointer gap-1"
                    
                  >
                    Update
                  </button>
                </div>
                <p className="mt-1 pr-6 text-sm text-center w-full  text-black">
                  Basic personal details are shown below.
                </p>
              </div>
              <div className="border-t w-full border-gray-200 px-4 py-5 sm:p-0">
                <dl className="flex w-full ">
                  {/* Mapping profile details */}
                  {[
                    { label: "Ref No:", value: profileInit.id },
                    { label: "Identification #.:", value: profileInit.idNo },
                    {
                      label: "Full Name:",
                      value: `${profileInit.firstName} ${profileInit.lastName}`,
                    },
                    { label: "Date of Birth:", value: profileInit.DOB },
                    { label: "Nationality:", value: profileInit.nationality },
                    { label: "Blood Group:", value: profileInit.Health?.bloodGroup },
                    { label: "Email Address:", value: profileInit.email },
                    { label: "Mobile No.:", value: profileInit.mobile },
                    { label: "Agent Name:", value: profileInit.Agent.name },
                    { label: "Status:", value: profileInit.status },
                  ].map((item, idx) => (
                    <div key={idx} className=" py-3 sm:py-5 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 ">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm break-words text-gray-900 sm:mt-0 ">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex justify-around gap-10 w-full">
              <div className="overflow-auto flex flex-col w-full">
                <div className="p-2 w-full text-center flex bg-gray-300">
                  <h1 className="text-lg font-bold self-center flex-1">
                    Emergency Contact
                  </h1>
                  <button
                    className="p-2 bg-white shadow-lg rounded-lg text-sm flex items-center justify-center cursor-pointer gap-1"
                    onClick={() => setIsInfo3Open(true)}
                  >
                    Update
                  </button>
                </div>

                <table className="table-auto min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      {[
                      { label: "Full Name:", key: "fullName" },
                      { label: "Mobile No.:", key: "mobile" },
                    ].map((item, idx) => (
                      <th  key={idx} className="px-6 py-4 whitespace-nowrap">
                          {item.label}
                        </th>
                    ))}
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {[
                      { label: "Full Name:", key: "fullName" },
                      { label: "Mobile No.:", key: "mobile" },
                    ].map((item, idx) => (
                      <td key={idx}>
                      {profileInit.EmergencyContacts.map(
                          (contact, contactIdx) => (
                            <td
                              key={contactIdx}
                              className="px-6 flex justify-center py-4 whitespace-nowrap"
                            >
                              {contact[item.key]}
                            </td>
                          )
                        )}
                      </td>
                    ))}
                      
                  </tbody>
                </table>
              </div>
              <div className="overflow-auto flex flex-col w-full">
                <div className="p-2 w-full text-center flex bg-gray-300">
                  <h1 className="text-lg font-bold self-center flex-1">
                    Passports
                  </h1>
                  <button
                    className="p-2 bg-white shadow-lg rounded-lg text-sm flex items-center justify-center cursor-pointer gap-1"
                    onClick={() => setIsInfo6Open(true)}
                  >
                    <AiFillPlusCircle size={20} />
                    New Passport
                  </button>
                </div>

                <table className="table-auto min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passport No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {profileInit.Passports.map((passport, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {passport.passportNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {passport.issueDate ? passport.issueDate : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {passport.expiryDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex gap-1 items-center flex-wrap justify-center">
                          <button
                            className="p-2 bg-blue-400 shadow-xl rounded-lg text-xs flex items-center justify-center cursor-pointer gap-1"
                            onClick={() => handlePassportEdit(index)}
                          >
                            <AiFillEdit size={18} />
                            Update
                          </button>
                          {/*<button 
                          onClick={() => deletePassport(passport.id)}
                          className='p-2 bg-red-500 shadow-xl rounded-lg text-xs flex items-center justify-center cursor-pointer gap-1'>
                          <AiFillEdit size={18} />
                          Delete
                  </button>*/}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="overflow-auto flex flex-col w-full mt-8">
              <div className="p-2 w-full text-center flex bg-gray-300">
                <h1 className="text-lg font-bold self-center flex-1">Visas</h1>
                <button
                  className="p-2 bg-white shadow-lg rounded-lg text-sm flex items-center justify-center cursor-pointer gap-1"
                  onClick={() => setIsInfo7Open(true)}
                >
                  <AiFillPlusCircle size={20} />
                  New Visa
                </button>
              </div>

              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Identification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ref No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profileInit.Visas.map((visa, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {visa.viId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {visa.referenceNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {visa.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {visa.issueDate ? visa.issueDate : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {visa.expiryDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-1 items-center flex-wrap justify-center">
                        <button
                          onClick={() => handleVisaEdit(index)}
                          className="p-2 bg-blue-400 shadow-xl rounded-lg text-xs flex items-center justify-center cursor-pointer gap-1"
                        >
                          <AiFillEdit size={18} />
                          Update
                        </button>
                        {/*<button 
                          onClick={() => deleteVisa(visa.id)}
                          className='p-2 bg-red-500 shadow-xl rounded-lg text-xs flex items-center justify-center cursor-pointer gap-1'>
                          <AiFillEdit size={18} />
                          Delete
                  </button>*/}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-6">
          <p className="italic text-[14pt]">Nothing to display!</p>
          <button
            onClick={() => setActiveTab(1)}
            className="py-4 font-light text-white px-5 border-2 rounded-xl bg-black-gradient font-poppins"
          >
            Select Profile Here
          </button>
        </div>
      )}

      {isOpen && (
        <EditInfo1
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          isOpen={isOpen}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsOpen={setIsOpen}
        />
      )}

      {isInfo2Open && (
        <EditInfo2
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          s
          isInfo2Open={isInfo2Open}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsInfo2Open={setIsInfo2Open}
        />
      )}

      {isInfo3Open && (
        <EditInfo3
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          isInfo3Open={isInfo3Open}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsInfo3Open={setIsInfo3Open}
        />
      )}

      {isInfo4Open && (
        <EditInfo4
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          isInfo4Open={isInfo4Open}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsInfo4Open={setIsInfo4Open}
        />
      )}

      {isInfo5Open && (
        <Passport
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          isInfo5Open={isInfo5Open}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsInfo5Open={setIsInfo5Open}
          index={passportIndex}
        />
      )}

      {isInfo6Open && (
        <AddPassport
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          isInfo6Open={isInfo6Open}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsInfo6Open={setIsInfo6Open}
          index={passportIndex}
        />
      )}

      {isInfo7Open && (
        <AddVisa
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          isInfo7Open={isInfo7Open}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsInfo7Open={setIsInfo7Open}
          index={passportIndex}
        />
      )}

      {isInfo8Open && (
        <Visa
          profileInit={profileInit}
          setProfileInit={setProfileInit}
          isInfo8Open={isInfo8Open}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsInfo8Open={setIsInfo8Open}
          index={visaIndex}
        />
      )}

      {isDistributionOpen && (
        <Distribute
          ProfileInit={profileInit}
          setProfileInit={setProfileInit}
          isDistributionOpen={isDistributionOpen}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsDistributionOpen={setIsDistributionOpen}
        />
      )}

      {isRecipientOpen && (
        <Recipient
          ProfileInit={profileInit}
          setProfileInit={setProfileInit}
          isRecipientOpen={isRecipientOpen}
          selectedProfile={profile}
          setSelectedProfile={setSelectedProfile}
          setIsRecipientOpen={setIsRecipientOpen}
          isRecipientEdit={isRecipientEdit}
        />
      )}
    </div>
  );
};

export default ProfileDetails;
