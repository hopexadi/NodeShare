import { useState, useEffect, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const fileInputRef = useRef();

  const url =
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        if (response?.path) {
          setResult(response.path);
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className="app">
        <header className="logo-bar">
          <div className="logo-glow">
            🟢 <span>NodeShare</span>
          </div>
        </header>

        <div className="card">
          <div className="left">
            <img src={url} alt="Upload" className="image" />
          </div>
          <div className="right">
            <h1>Share Files Instantly</h1>
            <p>
              Upload your file and generate a secure, shareable download link.
            </p>

            <button className="upload-btn" onClick={onUploadClick}>
              📁 Choose File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            {result && (
              <div className="result-box">
                <p className="label">Your Shareable Link:</p>
                <input className="result-input" value={result} readOnly />
                <div className="result-actions">
                  <button className="copy-btn" onClick={copyToClipboard}>
                    Copy
                  </button>
                  <a href={result} target="_blank" rel="noreferrer">
                    🔗 Download
                  </a>
                </div>

                {/* QR Code Section */}
                <div className="qr-section">
                  <p className="label">Generated QR Code:</p>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      result
                    )}`}
                    alt="QR Code"
                    className="qr-image"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">© Aditya Kumar Behera 2025</footer>
    </>
  );
}

export default App;
