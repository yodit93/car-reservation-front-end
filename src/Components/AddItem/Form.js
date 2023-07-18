import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { createCar } from '../../Redux/carsSlice';

const Form = () => {
  const [isdisabled, setIsDisabled] = useState(true);
  const [formdata, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    model: '',
    user_id: 1,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handelFormInputs = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  useEffect(() => {
    const {
      name, image, description, model, price,
    } = formdata;
    if (name && image && description && model && price) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formdata]);

  const formSubmission = (e) => {
    e.preventDefault();
    dispatch(createCar(formdata));
    setFormData({
      name: '',
      image: '',
      description: '',
      price: '',
      model: '',
      user_id: 1,
    });
    navigate('/');
  };

  const {
    name, image, description, model, price,
  } = formdata;
  return (
    <form onSubmit={formSubmission}>
      <Input
        name="name"
        value={name}
        placeholder="Username"
        type="text"
        handleInput={handelFormInputs}
      />
      <Input
        name="image"
        value={image}
        placeholder="Image Link"
        type="text"
        handleInput={handelFormInputs}
      />
      <Input
        name="model"
        value={model}
        placeholder="Car Model"
        type="text"
        handleInput={handelFormInputs}
      />
      <Input
        name="price"
        value={price}
        placeholder="Price"
        type="number"
        handleInput={handelFormInputs}
        step="0.01"
      />
      <textarea
        name="description"
        value={description}
        required
        onChange={handelFormInputs}
        placeholder="Description"
      />
      <div className="submit-btn">
        <button type="submit" disabled={isdisabled}>CREATE</button>
      </div>
    </form>
  );
};

export default Form;
