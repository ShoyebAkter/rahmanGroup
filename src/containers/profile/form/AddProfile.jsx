import React, { useEffect, useState } from "react"
import { Formik } from "formik"
import * as Yup from 'yup'
import axios from 'axios'
import FormAdd from "./FormAdd"
import swal from "sweetalert"
import Modal from "../../../components/Modal"
import UploadDocument from "../../../components/UploadDocument"


const AddProfile = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({})
  const dimensions = 'w-3/4 min-h-[80%] '

  // Function to toggle modal
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //set initial values for our form
  const [initValues, setInitValues] = useState({
    firstName: '',
    lastName: '',
    email:'',
    mobile: '',
    DOB: '',
    nationality: '',
    idNo: '',
    agentId: '',
    status: 'Active',
    paNo: '',
    paIssueDate: '',
    paExpDate: '',
    viExpDate: '',
    viIssueDate: '',
    viRefNo: '',
    viId: '',
    viStatus: 'Submitted',
  });
  
  //const {loanId, setLoanId} = useContext(LoanContext) //handles loan ID
  const [loading, setLoading] = useState(false) //handles loading page


 // Validate fields using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Please fill this field"),
  email: Yup.string()
    .email("Invalid email address"),
  idNo: Yup.string()
    .required("Please fill this field"),
  lastName: Yup.string()
    .required("Please fill this field"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, 'Mobile number must contain only digits'),
  DOB: Yup.string()
    .required("Please fill this field"),
  nationality: Yup.string()
    .required("Please fill this field"),
  status: Yup.string()
    .required("Please fill this field"),
  emMobile: Yup.string()
    .required("Please fill this field")
    .matches(/^[0-9]+$/, 'Emergency contact number must contain only digits')
    .min(9, "Emergency contact number must be at least 9 characters"),
  bloodGroup: Yup.string()
    .required("Please fill this field"),
  paNo: Yup.string()
    .required("Please fill this field"),
  paExpDate: Yup.string()
    .required("Please fill this field"),
  viExpDate: Yup.string()
    .required("Please fill this field"),
  viStatus: Yup.string()
    .required("Please fill this field"),
  viId: Yup.string()
    .required("Please fill this field"),
  agentId: Yup.string()
    .required("Please fill this field")
});

  //handle data submission when submit button has been clicked
  const onSubmit = (data) => {
    //send data to backend together with loan ID
   // data.loanId = loanId
    console.log(data)
    setLoading(true)

    axios.post(`${apiUrl}/employee/add`, data, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      setLoading(false)
      // console.log(result)
      if(result.status === 200){
      //  setIsModalOpen(true)
       setData(result.data.employeeInfo)
       
      }
    }).catch(err => {
      console.log(err)
       
    })
  }

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-auto">
      <Formik
        initialValues={initValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {/* form should be wrappped in formik for easy access to formik context variables */}
        <FormAdd initValues={initValues} loading={loading} />
      </Formik>

      {
        //loading && <Loading />
      }

      {
        isModalOpen &&
        <div className="flex justify-center items-center h-screen">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggleModal}>
            Open Modal
          </button>
          <Modal isOpen={isModalOpen} onClose={handleToggleModal} dimensions={dimensions}>
            <UploadDocument data={data}  setIsModalOpen={setIsModalOpen}/>
          </Modal>
        </div>
      }
    </div>
  )
}

export default AddProfile
