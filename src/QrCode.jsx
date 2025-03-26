import React, { useState } from 'react'

function QrCode() {
    const[img,setImg]=useState("")
    const [loading,setLoading]=useState(false)
    const [qrData,setQrdata]=useState("")
    const[qrSize,setQrsize]=useState("")
    async function generateQR(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }catch(error){
         console.error('Error Generating QR code ',error)
        }finally{
            setLoading(false)
        }
    }
    function downloadQR(){
        fetch(img)
        .then((res)=>res.blob())
        .then((blob)=>{
            const link=document.createElement("a")
            link.href=URL.createObjectURL(blob)
            link.download="qrcode.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
        )
        .catch((err)=>{
            console.log("Error in Qr download:",err)
        })
    }
  return (
    <div className='app-container' >
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src ={img} alt="qr"  className='qr-code-image'/>}
    <div>
        <label htmlFor="dataInput" className='input-label' >
            Data for QR Code:
        </label>
        <input value={qrData} type="text" id='dataInput' placeholder='Enter data for QR Code' onChange={(e)=>setQrdata(e.target.value)}/>
        <label htmlFor="sizeInput" className='input-label'>
            Image size(eg:150)
        </label>
        <input value={qrSize} type="text" id='sizeInput' placeholder='Enter image size' onChange={(e)=>setQrsize(e.target.value)} />
        <button className='generate-button' onClick={generateQR} disabled={loading}>Generate QR Code</button>
        <button className='download-button' onClick={downloadQR}>Download QR code</button>
    </div>
    <p className='footer'>Designed by <a href="https://github.com/gitmprasanth">Prasanth M</a></p>
    </div>
  )
}

export default QrCode