import React, { useState } from 'react'
import { storage } from '../firebase/firebase';
import Axios from 'axios'

const uploadSlip = () => {

    

    return (
        <div>
            <input type="file" onChange={e => setimage(e.target.files[0])}></input>
        </div>
    )
}

export default uploadSlip
