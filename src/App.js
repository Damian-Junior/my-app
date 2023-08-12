import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Avatar from "antd/es/avatar";
import "./App.css";
const App = () => {
  const videoConstraints = {
    facingMode: "user",
  };
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const capturePhoto = useCallback(async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    setShowCamera(false);
  }, [webcamRef]);
  console.log(url);


  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h1>Webcam Head Capture</h1>
      {url && (
        <Avatar
          src={url}
          alt={"photo"}
          size={100}
          style={{ marginLeft: 200, marginBottom: 20 }}
        />
      )}
      <Form>
        <Input
          placeholder={"Enter your BVN"}
          style={{ width: "70%", marginBottom: 20 }}
        />
      </Form>
      {showCamera && (
        <div className="circular-camera">
          <Webcam
            ref={webcamRef}
            className={"webcam-video "}
            mirrored={true}
            screenshotFormat={"image/png"}
            videoConstraints={videoConstraints}
          />
        </div>
      )}
      <button
        onClick={() => (!showCamera ? setShowCamera(true) : capturePhoto())}
        style={{
          padding: 10,
          borderRadius: 10,
          marginLeft: 200,
          marginTop: 20,
        }}
      >
        {showCamera ? "Capture" : "Take photo"}
      </button>
    </div>
  );
};

export default App;
