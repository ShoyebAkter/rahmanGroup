import React, { useEffect, useState } from 'react'
import { AiFillPauseCircle, AiOutlineUpload } from 'react-icons/ai'
import Modal from './Modal';
import swal from 'sweetalert';
import FileUpload from './FileUpload';
import axios from 'axios';

const UploadDocument = ({data, setIsModalOpen}) => {
  const [attachments, setAttachments] = useState([]);
  const [refresh, setRefresh] = useState(Date.now())
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modal, setModal] = useState(false);
  const dimensions = 'md:min-w-[30%] min-h-[40%]'

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setLoading(true)
    axios.get(`${apiUrl}/employee/getAttachments/${data.id}`, {
        headers: {
          loginToken: localStorage.getItem('loginToken'),
        },
      }).then(res => {
        setLoading(false)
        
        setAttachments(res.data)
      }).catch(err => {
        setLoading(false)
        console.log(err)
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
  }, [refresh])

  const deleteAttachment = fileId => {
    swal({
        title: "Are you sure?",
        text: ("You want to delete this record?"),
        icon:'warning', //The right way
        dangerMode: "red" ,
        closeModal: false,
        buttons: ["No", "Yes"] //The right way to do it in Swal1
    })
    .then((isConfirm) => {

        if(isConfirm){
            setLoading(true)
            axios.delete(`${apiUrl}/employee/deleteFile/${fileId}`, {
                headers: {
                loginToken: localStorage.getItem('loginToken'),
                },
            }).then(res => {
                setLoading(false)
                
                swal({
                    title: "Success",
                    icon: "success",
                    text: "Attachment has been deleted"
                })
    
                // Filter out the deleted attachment
                setAttachments(prevAttachments =>
                    prevAttachments.filter(attachment => attachment.fileId !== fileId)
                );
            }).catch(err => {
                setLoading(false)
                if(err.response){
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
      
    });   
  }

  return (
    <div className='flex flex-col'>
        
      <h2 className="font-semibold mb-4 flex items-center gap-2 md:text-lg text-sm">
        <AiOutlineUpload size={24} />Attachments for {data.firstName + " " + data.lastName}
      </h2>
    
      <hr />

      <button className='flex p-3 bg-slate-400 ' onClick={
        () => handleModal()
      }>
        Click here to attach a file
      </button>
      <br />

      {modal &&
        <div className="flex justify-center items-center h-screen">
            <Modal isOpen={modal} onClose={handleModal} dimensions={dimensions}>
                <FileUpload empData={data}  setModal={modal} setRefresh={setRefresh} />
            </Modal>
        </div>
        }

        {
            loading ? <div>Loading attachments... Please wait</div> :
            <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                    attachments.map((item, key) => (
                    <tr id={key}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.fileName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.fileTitle}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex flex-wrap gap-2 items-center justify-center">
                            <a href={`${item.fileUrl}`} className='p-2 bg-green-500'>
                                Download
                            </a>

                            <button className='p-2 bg-red-400' onClick={() => deleteAttachment(item.fileId)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))
                }
                  
             
              </tbody>
            </table>
          </div>
        }
      
    </div>
  )
}

export default UploadDocument
