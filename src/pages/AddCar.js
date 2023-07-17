import React from 'react';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import Form from '../Components/AddItem/Form';
import '../Styles/AddCar.css';

const AddCar = () => (
  <div className="add-car-page">
    <NavigationPanel />
    <div id="add-car-container">
      <h1>Add Car</h1>
      <div className="add-car-overlay" />
      <Form />
      {' '}
    </div>
  </div>
);

export default AddCar;
