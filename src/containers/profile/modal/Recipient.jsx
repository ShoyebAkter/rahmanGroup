import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function Recipient({ deviceInit, setDeviceInit, isRecipientOpen, setIsRecipientOpen, isRecipientEdit }) {
  const overlayClass = isRecipientOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isRecipientOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md text-[14pt]";
  const [loading, setLoading] = useState(false)
  const [recipient, setRecipient] = useState({})
  const [sections, setSections] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    id: '',
    recipientName: '',
    identificationTitle: '',
    identificationId: '',
    recipientMobile: '',
    sectionId: '',
  })

  const editDistribution = () => {
    axios.put(`http://localhost:3001/compAccDist/edit`, formData, {
      headers: {
        loginToken: localStorage.getItem('loginToken')
      }
    })
    .then(result => {
        setLoading(false)
        console.log(result)
        if(result.data.response){
            if(result.data.response){
                swal({
                    icon:"success",
                    title:"Update",
                    text:"Distribution Updated Successfully!",
                    buttons:false,
                    timer: "2000"
                })

            }
        }else{
            
            swal({
                icon:"error",
                title:"Oops!",
                text: JSON.stringify(result.data),
            })
        }
     
      
    }).catch(err => {
      setLoading(false)
      swal({
        icon:"error",
        title:"Oops!",
        text: JSON.stringify(err.response.data),
      })
    })
  }

  useEffect(() => {

    axios.get(`http://localhost:3001/sections`, {
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        if(res.data.error){
            setErrorMessage(res.data.error)
        }else{
            setSections(res.data)
        }

        setLoading(false)
    })
    .catch(err => {

        swal({
            title: "Error",
            icon: "error",
            text: JSON.stringify(err.message)
        })
        setLoading(false)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3001/compAccDist/get/${deviceInit.id}`, {
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
    })
    .then(res => {
        //alert(JSON.stringify(res.data))
        if(res.data){
            setRecipient(res.data)
            setFormData(prev => {
              return {
                ...prev, 
                id: res.data.id,
                recipientName: res.data.recipientName,
                identificationTitle: res.data.identificationTitle,
                identificationId: res.data.identificationId,
                recipientMobile: res.data.recipientMobile,
                sectionId: res.data.Section && res.data.Section.id,
              }
            })
            setLoading(false)
        }
    })
    .catch(err => {
        setLoading(false)
        swal({
            title: "Error",
            icon: "error",
            text: JSON.stringify(err.message)
        })
        setLoading(false)
    })
  }, [])

  const ok = () => {
   setIsRecipientOpen(false)
  }

  return (
    <div className='text-black'>
        
      <div className={overlayClass} onClick={() => setIsRecipientOpen(false)}></div>

      <div className={modalClass}>
       
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <div className="p-4">
            <button className="float-right text-gray-500" onClick={() => setIsRecipientOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className='text-lg font-semibold p-2'>{ isRecipientEdit ? 'Edit Recipient' :'Recipient Information'}</h2>
            <hr />

            {
                !loading &&
                <div className='p-2 flex flex-col'>
                    <label htmlFor="">Recipient Full Name</label>
                    <input disabled={!isRecipientEdit} type="text"  value={formData.recipientName}
                      onChange={e => setFormData({...formData, recipientName:e.target.value})} className={formClass}
                    />

                    <label htmlFor="" className='mt-4'>Identification Title</label>
                    <input disabled={!isRecipientEdit} type="text"  value={formData.identificationTitle}
                      onChange={e => setFormData({...formData, identificationTitle:e.target.value})} className={formClass}
                    />

                    <label htmlFor="" className='mt-4'>Identification Number</label>
                    <input disabled={!isRecipientEdit} type="text"  value={formData.identificationId}
                      onChange={e => setFormData({...formData, identificationId:e.target.value})} className={formClass}
                    />

                    <label htmlFor="" className='mt-4'>Recipient Mobile #</label>
                    <input disabled={!isRecipientEdit} type="text"  value={formData.recipientMobile}
                      onChange={e => setFormData({...formData, recipientMobile:e.target.value})} className={formClass}
                    />

                    <label htmlFor="" className='mt-4'>Section</label>
                    <select 
                      disabled={!isRecipientEdit}
                      value={formData.sectionId}
                      onChange={e => setFormData({...formData, sectionId:e.target.value})}
                      className={formClass}
                    >
                      <option value=''>List of Sections</option>
                      {
                        (!errorMessage && sections.length !== 0) && (
                          sections.map((value) => (
                            <option value={value.id}>{value.sectionName}</option>
                          ))
                        )
                      }
                      
                    </select>

                    {
                      !isRecipientEdit && <>
                        <label htmlFor="" className='mt-4'>Distributed By</label>
                        <input disabled={!isRecipientEdit} type="text" value={recipient.User && recipient.User.firstName + ' ' + recipient.User.lastName} className={formClass} 
                        />
                      </>
                    }
                   

                    {
                      isRecipientEdit ? 
                      <button 
                          className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                          onClick={editDistribution}
                      >Edit</button>

                      :

                      <button 
                          className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                          onClick={() => ok()}
                      >OK</button>
                    }
                    

                    </div>
            }
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Recipient;