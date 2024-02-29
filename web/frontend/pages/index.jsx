import React, { useState, useEffect } from 'react';
import { Page, Modal, TextContainer, TextField, Button, Stack, Image } from '@shopify/polaris';
import "./index.css"

const IndexPage = () => {
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch data from the API and setPopupData when component mounts
    // Replace 'fetchPopupData' with your actual API call function
    fetchPopupData();

    // Delay showing the popup by 3 seconds
    const timeoutId = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  // Function to fetch popup data from the API
  const fetchPopupData = async () => {
    try {
      const response = await fetch(
        'https://zing-api-prod.herokuapp.com/tenant/beautiful-disaster-clothing.myshopify.com?impressionId=3de0420e-e465-4563-9f20-e2304e8cf0a0'
      );
      const data = await response.json();
      setPopupData(data);
    } catch (error) {
      console.error('Error fetching popup data:', error);
    }
  };

  // Function to handle changes in the email input field
  const handleEmailChange = (value) => {
    setEmail(value);
  };

  return (
    <Page>
      {/* Main content of your page */}
      {/* Check if popupData exists before rendering */}
      {popupData && (
        <Modal
          open={showPopup}
          onClose={() => setShowPopup(false)}
          title={popupData.template.mainHeader.text}
        >
          <Modal.Section>
            <TextContainer>
              <p>{popupData.template.mainSubHeader.text}</p>
              <p>{popupData.template.optIn.text}</p>
              {/* Input field for email address */}
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              {/* Submit button */}
              <Button primary>{popupData.template.optInButton.text}</Button>
              {/* No Thanks link */}
              <Stack spacing="tight" distribution="center">
                <Image
                  alt="Bag 1"
                  src="bag1.jpg" 
                  width={100}
                />
                <Image
                  alt="Bag 2"
                  src="bag2.jpg" 
                  width={100}
                />
                <Image
                  alt="Bag 3"
                  src="bag3.jpg" 
                  width={100}
                />
              </Stack>
              <p>
                {popupData.template.optOutLink.text}
                {popupData.template.optOutExtra.text}
              </p>
              {/* Bag images */}
            </TextContainer>
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
};

export default IndexPage;
