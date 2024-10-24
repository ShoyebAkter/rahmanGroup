import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function AgentForm({ deviceInit, setDeviceInit, isDistributionOpen, setIsDistributionOpen }) {
  const overlayClass = isDistributionOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isDistributionOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div className='text-black'>
        
      <div className={overlayClass} onClick={() => setIsDistributionOpen(false)}></div>

      <div className={modalClass}>
       
      </div>
    </div>
  );
}
export default AgentForm