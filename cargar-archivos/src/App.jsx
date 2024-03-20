import React, { useState } from 'react';
//import './components/styles.css';
import "./App.css";

function UploadImage({ onUploadedImage }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop();
    if (!['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase())) {
      setError('¡Extension invalida!, asegurese de que el archivo tenga alguna de las siguientes extenciones: jpg, jpeg, png o gif');
      return;
    }

    setError(null);
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
      onUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Cargar Imagen</h2>
      <input type="file" accept="image/*" onChange={handleUploadImage} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {image && <img src={image} alt="Imagen Cargada" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px', }} />}
    </div>
  );
}

function UploadFile({ onUploadedFile }) {
  const [error, setError] = useState(null);

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop();
    if (extension.toLowerCase() !== 'txt') {
      setError('Extensión incorrecta, asegurese que su archivo tenga extensión .txt');
      return;
    }

    setError(null);
    const reader = new FileReader();

    reader.onload = () => {
      onUploadedFile(reader.result);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h2>Cargar Archivo</h2>
      <input type="file" accept=".txt" onChange={handleUploadFile} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

function UploadFiles({ onUploadedFiles }) {
  const [files, setFiles] = useState([]);

  const handleUploadFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(newFiles);
    onUploadedFiles(newFiles);
  };

  return (
    <div>
      <h2>Cargar Archivos</h2>
      <input type="file" multiple onChange={handleUploadFiles} />
      {files.length > 0 && (
        <div>
          <h3>Archivos Cargados</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name} ({file.type})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [image, setImage] = useState(null);
  const [contentFile, setContentFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUploadedImage = (urlImage) => {
    setImage(urlImage);
  };

  const handleUploadedFile = (content) => {
    setContentFile(content);
  };

  const handleUploadedFiles = (newFiles) => {
    setUploadedFiles(newFiles);
  };

  return (
    <div className="container">
      <h1 style={{ background: 'black' }}>Subir Archivos</h1>
      <UploadImage onUploadedImage={handleUploadedImage} />
      <UploadFile onUploadedFile={handleUploadedFile} />
      <UploadFiles onUploadedFiles={handleUploadedFiles} />
      {image && (
        <div className="image-container">
          <h2>Imagen Cargada</h2>
          <img src={image} alt="uploadedImage" className="image" style={{ width: '30%', height: '30px', top: '5px' }} />
        </div>
      )}
      {contentFile && (
        <div>
          <h2>Contenido del Archivo</h2>
          <pre>{contentFile}</pre>
        </div>
      )}
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Archivos Cargados</h2>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name} ({file.type})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;