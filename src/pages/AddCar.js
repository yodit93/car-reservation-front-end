import React from 'react';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import Form from '../Components/AddItem/Form';
import '../Styles/AddCar.css';

const AddCar = () => (
  <div className="add-car-page">
    <NavigationPanel />
    <div className="add-car-container">
      {' '}
      <Form />
      {' '}
    </div>
  </div>
);

export default AddCar;
