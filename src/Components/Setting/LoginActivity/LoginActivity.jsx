import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import LoginActivityTable from "./LoginActivityTable";

const LoginActivity = () => {
  const [browserInfo, setBrowserInfo] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [locationInfo, setLocationInfo] = useState('');
  const [timeInfo, setTimeInfo] = useState('');

  useEffect(() => {
    // Get browser information
    const browserInfo = `${window.navigator.appName}, ${window.navigator.appVersion}`;
    setBrowserInfo(browserInfo);

    // Get device information (you can add more conditions for different devices)
    const userAgent = window.navigator.userAgent;
    const deviceInfo = userAgent.includes('Macintosh') ? 'Macbook Pro 2020' : 'Unknown Device';
    setDeviceInfo(deviceInfo);

    // Get location information using the Geolocation API (requires user permission)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocationInfo(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    } else {
      setLocationInfo('Location not available');
    }

    // Get current time and format it
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedTime = now.toLocaleDateString('en-US', options);
    setTimeInfo(formattedTime);
  }, []);

  return (
    <div>
   <div>
      <p>Browser: {browserInfo}</p>
      <p>Device: {deviceInfo}</p>
      <p>Location: {locationInfo}</p>
      <p>Time: {timeInfo}</p>
    </div>
      <Row>
        <Col lg={{span:24}}>
          <LoginActivityTable/>
        </Col>
      </Row>
    </div>
  );
};

export default LoginActivity;
