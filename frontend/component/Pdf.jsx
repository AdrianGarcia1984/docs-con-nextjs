import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const url = 'https://cors-anywhere.herokuapp.com/'

export const Pdf = ({ documento }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (


    <>


      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js" >
        <div
          style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '300px',
          }}
        >
          {documento ? <Viewer fileUrl={documento} plugins={[defaultLayoutPluginInstance]} 
          httpHeaders={[
            {
              key: "Access-Control-Allow-Headers",
              value: "Access-Control-Allow-Origin"
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "*"
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,PUT,POST,DELETE,HEAD,OPTIONS"
            },
          ]} 
          /> : <h1>NO TENGO UN PDF PARA MOSTRAR</h1>}
        </div>

      </Worker>



    </>
  )
}
