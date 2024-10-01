import React from 'react'
import ListView from './ListView'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ListView/>
      <ToastContainer/>
</div>
  )
}

export default App