import React, { useState } from 'react';
import { css } from 'glamor';
import { v4 as uuidv4 } from 'uuid';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ededed',
    zIndex: 1,
    width: '100vw',
    height: '100vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100vw',
    height: '100vh'
  },
  input: {
    width: '90%',
    height: 35,
    margin: 5,
    outline: 'none',
    border: 'none',
    fontSize: 16,
    borderBottom: '3px solid #00796B'
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#00796B',
    marginTop: 10,
    cursor: 'pointer'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
};

const CreateRestaurant = ({ createRestaurant, onCloseModal }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [photo, setPhoto] = useState('');

  const createRestaurantHandler = async restaurant => {
    try {
      createRestaurant(restaurant);
    } catch (err) {
      console.log('error creating restaurant: ', err);
    }
  };

  const resetForm = () => {
    setName('');
    setCity('');
    setPhoto('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name === '' || city === '' || photo === '') return;
    try {
      const id = uuidv4();
      createRestaurantHandler({ id, name, city, photo });
      resetForm();
      onCloseModal();
    } catch (err) {
      console.log('error submitting form: ', err);
    }
  };

  return (
    <div {...css(styles.overlay)}>
      <div {...css(styles.form)}>
        <input
          placeholder="Restaurant name"
          {...css(styles.input)}
          name="name"
          onChange={value => setName(value.target.value)}
        />
        <input
          placeholder="City"
          {...css(styles.input)}
          name="city"
          onChange={value => setCity(value.target.value)}
        />
        <input
          placeholder="Photo"
          {...css(styles.input)}
          name="photo"
          onChange={value => setPhoto(value.target.value)}
        />
        <div onClick={handleSubmit} {...css(styles.button)}>
          <p {...css(styles.buttonText)}>Submit</p>
        </div>
        <div
          {...css([styles.button, { backgroundColor: '#555' }])}
          onClick={onCloseModal}
        >
          <p {...css(styles.buttonText)}>Cancel</p>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
