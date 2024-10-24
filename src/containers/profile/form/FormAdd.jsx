import React, { useEffect, useState } from 'react';
import { useFormikContext, ErrorMessage, Field, Form } from 'formik';
import { AiFillPlusCircle, AiFillSave } from "react-icons/ai";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { countries } from '../../../data/options';
import axios from 'axios';
import swal from 'sweetalert';


const FormAdd = ({ initValues , loading }) => {
  const { errors, touched, dirty, isValid, setValues, values, setFieldValue } = useFormikContext();
  const labelStyle = "md:text-lg text-md px-2 font-light";
  const apiUrl = process.env.REACT_APP_API_URL
  const [agents, setAgents] = useState([]);
  const [editableForAgents, setEditableForAgents] = useState(false)

  const editableAgentsFunc = () => {
    setEditableForAgents(!editableForAgents)

    if(editableForAgents){
        if(values.agentId.length > 0){
            axios.post(`${apiUrl}/agent/addAgent`, {
                name: values.agentId
              }, {
                headers: {
                  loginToken: localStorage.getItem("loginToken")
                }
              }).then(result => {
                swal({
                    icon: "success",
                    title: "Agent has been added",
                    buttons: false,
                    timer: 2000,
                })
                setAgents([...agents, result.data])
              }).catch(err => {
          
                if(err.response){
                  console.log(err)
                  swal({
                      title: "Error",
                      icon: "error",
                      text: err.response.data.error
                  })
                }else{
                    console.log(err)
                }

              })
            
        }
    }
}

  useEffect(() => {
    setValues(initValues);
  }, [initValues, setValues]);

  useEffect(() => {
    axios.get(`${apiUrl}/agent`, {
        headers: {
            loginToken: localStorage.getItem("loginToken")
        }
    }).then(res => {
        console.log(res.data)
        setAgents(res.data)
    }).catch(err => {
        console.log(err)
    })
  }, [])

  return (
   <Form className='w-full px-10 flex flex-col items-center justify-center h-full'>
    <h1 className='text-[16pt] font-bold flex flex-row items-center p-2'> <AiFillPlusCircle fontSize={34} className='pr-2' />Profile Form</h1>
    <div className='w-full h-full md:h-full px-10 flex  gap-x-8 mt-3 gap-y-4 flex-wrap overflow-auto scroll-m-0'>
        <div className='w-full flex flex-wrap gap-y-2'>
            <div className='w-full p-3 bg-slate-400 md:mr-[120px] rounded-md'>
                <h1 className='text-xl'>Personal Details</h1>
            
            </div>
            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="idNo" className={labelStyle}>Identification No * :</label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='idNo' />
            </div>
            <Field
                type="text"
                name="idNo"
                className={touched.idNo && errors.idNo ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black"}
            />
            </div>
            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="firstName" className={labelStyle}>First Name * :</label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='firstName' />
            </div>
            <Field
                type="text"
                name="firstName"
                className={touched.firstName && errors.firstName ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black"}
            />
            </div>
            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
                <label htmlFor="lastName"
                    className={labelStyle}
                >
                Last Name * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='lastName'/>
                </div>
                <Field
                    type="text"
                    name="lastName"
                    className={ touched.lastName && errors.lastName ?
                    "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                    "w-full p-3  px-5 text-black border-2 border-black"
                    }
                />
            </div>

            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
                <label htmlFor="email"
                    className={labelStyle}
                >
                Email Address * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='email'/>
                </div>
                <Field
                    type="text"
                    name="email"
                    className={ touched.email && errors.email ?
                    "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                    "w-full p-3  px-5 text-black border-2 border-black"
                    }
                />
            </div>

            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
                <label htmlFor="mobile"
                    className={labelStyle}
                >
                Mobile * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='mobile'/>
                </div>
                <Field
                    type="tel"
                    name="mobile"
                    className={ touched.mobile && errors.mobile ?
                    "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                    "w-full p-3  px-5 text-black border-2 border-black"
                    }
                />
            </div>

            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
                <label htmlFor="DOB"
                    className={labelStyle}
                >
                Date of Birth * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='DOB'/>
                </div>
                <DatePicker
                name="DOB"
                dateFormat="dd/MM/yyyy" // Set the date format
                selected={values.DOB} 
                onChange={date => setFieldValue("DOB", date)} 
                className={ touched.DOB && errors.DOB ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black" }
                />
            </div>

            {/* Repeat similar structure for other fields */}
             <div className='gap-1 flex flex-col items-start p-2 w-[275px]'>
                <label htmlFor="nationality" className={labelStyle}>
                    Nationality * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='nationality' />
                </div>
               <Select
                    name="nationality"
                    onChange={option => setFieldValue("nationality", option.label)} // Use option.value to get the selected value
                    options={countries}
                    classNamePrefix="select"
                    className={touched.nationality && errors.nationality ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3 px-5 border-black"}
                />
            </div>

            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
                <label htmlFor="status"
                    className={labelStyle}
                >
                Status * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='status'/>
                </div>
                <Field
                    name="status"
                    as="select"
                    className={ touched.status && errors.status ?
                    "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                    "w-full p-3  px-5 text-black border-2 border-black"
                    }
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </Field>
            </div>
            
            {
                typeof(agentId) === "undefined" &&
                <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
                    <label htmlFor="agentId"
                        className={labelStyle}
                    >
                    Select Agent * :
                    </label>
                    <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                        <ErrorMessage name='agentId'/>
                    </div>

                    {editableForAgents ? (
                        <Field
                          name="agentId"
                          placeHolder="Enter agent name"
                          className={touched.agentId && errors.agentId ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black"}
                        />
                      ) : 
                    <Field
                        name="agentId"
                        as="select"
                        className={ touched.agentId && errors.agentId ?
                        "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                        "w-full p-3  px-5 text-black border-2 border-black"
                        }
                    >
                        <option value="">Select ...</option>

                        
                        {
                            !agents.error &&
                            agents?.map(item => <option value={item.id}>{item.name}</option>)
                        }
                        
                    </Field>}
                    <button onClick={() => editableAgentsFunc()} type='button' className='shadow-md bg-green-700 py-1 px-3 rounded-md text-white animate-pulse'>
                        {editableForAgents ? ' Save' : ' Add Agent'}
                    </button>
                    </div>
                
            }
           
        </div>

        {/* Additional fields */}
        <div className='w-full flex flex-wrap gap-y-2 mt-4'>
            <div className='w-full p-3 bg-slate-400 md:mr-[120px] rounded-md'>
                <h1 className='text-xl'>Emergency & Health Info</h1>
            </div>
            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="emName"
                className={labelStyle}
            >
            Emergency Contact Name:
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='emName'/>
            </div>
            <Field
                type="text"
                name="emName"
                className={ touched.emName && errors.emName ?
                "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                "w-full p-3  px-5 text-black border-2 border-black"
                }
            />
        </div>

        <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="emMobile"
                className={labelStyle}
            >
            Emergency Contact:
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='emMobile'/>
            </div>
            <Field
                type="tel"
                name="emMobile"
                className={ touched.emMobile && errors.emMobile ?
                "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                "w-full p-3  px-5 text-black border-2 border-black"
                }
            />
        </div>

        <div className='gap-1 flex flex-col items-start p-2 w-[275px]'>
            <label htmlFor="bloodGroup" className={labelStyle}>
                Blood Group:
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='bloodGroup'/>
            </div>
            <Field
                name="bloodGroup"
                as="select" // Render as select element
                className={
                touched.bloodGroup && errors.bloodGroup
                    ? "w-full p-3 px-5 text-red-800 border-2 border-red-500"
                    : "w-full p-3 px-5 text-black border-2 border-black"
                }
            >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </Field>
            </div>

        </div>

        <div className='w-full flex flex-wrap gap-y-2 mt-4'>
            <div className='w-full p-3 bg-slate-400 md:mr-[120px] rounded-md'>
                <h1 className='text-xl'>Passport Details</h1>
            </div>
            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="paNo"
                className={labelStyle}
            >
                Passport Number * :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='paNo'/>
            </div>
            <Field
                name="paNo"
                id="paNo"
                type="text"
                className={ touched.paNo && errors.paNo ?
                "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                "w-full p-3  px-5 text-black border-2 border-black"
                }
                autoComplete="off"
            />
        </div>

        <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="paIssueDate"
                className={labelStyle}
            >
                Passport Issue Date :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='paIssueDate'/>
            </div>
            <DatePicker
                name="paIssueDate"
                selected={values.paIssueDate}
                onChange={date => setFieldValue("paIssueDate", date)}
                className={ touched.paIssueDate && errors.paIssueDate ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black" }
                dateFormat="dd/MM/yyyy"
            />
        </div>

        <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="paExpDate"
                className={labelStyle}
            >
                Passport Expiry Date * :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='paExpDate'/>
            </div>
            <DatePicker
                name="paExpDate"
                selected={values.paExpDate}
                onChange={date => setFieldValue("paExpDate", date)}
                className={ touched.paExpDate && errors.paExpDate ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black" }
                dateFormat="dd/MM/yyyy"
            />
        </div>
        </div>

        <div className='w-full flex flex-wrap gap-y-2 mt-4'>
            <div className='w-full p-3 bg-slate-400 md:mr-[120px] rounded-md'>
                <h1 className='text-xl'>Visa Details</h1>
            </div>
             <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="viRefNo"
                className={labelStyle}
            >
                Visa Identification * :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='viId'/>
            </div>
            <Field
                name="viId"
                id="viId"
                type="text"
                className={ touched.viId && errors.viId ?
                "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                "w-full p-3  px-5 text-black border-2 border-black"
                }
                autoComplete="off"
            />
        </div>
        <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
        <label htmlFor="viRefNo"
            className={labelStyle}
        >
            Visa Reference Number :
        </label>
        <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
            <ErrorMessage name='viRefNo'/>
        </div>
        <Field
            name="viRefNo"
            id="viRefNo"
            type="text"
            className={ touched.viRefNo && errors.viRefNo ?
            "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
            "w-full p-3  px-5 text-black border-2 border-black"
            }
            autoComplete="off"
        />
    </div>
        <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
                <label htmlFor="viStatus"
                    className={labelStyle}
                >
                Status * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='viStatus'/>
                </div>
                <Field
                    name="viStatus"
                    as="select"
                    className={ touched.viStatus && errors.viStatus ?
                    "w-full p-3 px-5 text-red-800 border-2 border-red-500" :
                    "w-full p-3  px-5 text-black border-2 border-black"
                    }
                >
                    <option value="">Select ... </option>
                    <option value="Submitted">Submitted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                </Field>
            </div>
         <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="viIssueDate"
                className={labelStyle}
            >
                Visa Issue Date :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='viIssueDate'/>
            </div>
            <DatePicker
                name="viIssueDate"
                selected={values.viIssueDate}
                onChange={date => setFieldValue("viIssueDate", date)}
                className={ touched.viIssueDate && errors.viIssueDate ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black" }
                dateFormat="dd/MM/yyyy"
            />
        </div>
            <div className='gap-1 flex flex-col items-start p-2 w-[275px]' >
            <label htmlFor="viExpDate"
                className={labelStyle}
            >
                Visa Expiry Date * :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='viExpDate'/>
            </div>
            <DatePicker
                name="viExpDate"
                selected={values.viExpDate}
                onChange={date => setFieldValue("viExpDate", date)}
                className={ touched.viExpDate && errors.viExpDate ? "w-full p-3 px-5 text-red-800 border-2 border-red-500" : "w-full p-3  px-5 text-black border-2 border-black" }
                dateFormat="dd/MM/yyyy"
            />
        </div>

        </div>

        {/* Continue adding similar structures for other fields... */}

    </div>

    <div className='gap-1 flex flex-row items-start py-5 w-full px-2 justify-end' >
        <button 
        type='submit' 
        className={
            !(dirty && isValid) ?
            'flex flex-row md:text-lg items-center animate-pulse justify-center shadow-lg md:mr-48 border-2 gap-5 rounded-3xl p-3 text-black bg-white font-semibold ':
            'flex flex-row md:text-lg items-center animate-pulse justify-center shadow-lg font-semibold  md:mr-48 border-2 gap-5 rounded-3xl p-3 bg-green-500 font-poppins'
        }
        >
        { loading ? "Submitting" : "Submit" }
        <AiFillSave fontSize={17}/>
        </button>
    </div>
    </Form>

  );
};

export default FormAdd;
