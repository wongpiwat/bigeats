import React, { useState } from 'react';
import { css } from 'glamor';

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
  },
  star: {
    backgroundColor: '#ddd',
    margin: 0,
    marginBottom: 5,
    width: '90%',
    padding: '10px'
  },
  stars: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10
  }
};

const stars = [1, 2, 3, 4, 5];

const CreateReview = ({ onCreateReview, onCloseModal, restaurant }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const resetForm = () => {
    setText('');
    setRating(0);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (text === '' || rating === 0) return;
    try {
      const input = { reviewRestaurantId: restaurant.id, text, rating };
      onCreateReview(input);
      resetForm();
      onCloseModal();
    } catch (err) {
      console.log('error submitting form: ', err);
    }
  };

  return (
    <div {...css(styles.overlay)}>
      <div {...css(styles.form)}>
        <div {...css(styles.stars)}>
          {stars.map((starValue, starIndex) => (
            <p
              key={starIndex}
              onClick={() => setRating(starValue)}
              {...css([
                styles.star,
                rating === starValue && { backgroundColor: 'gold' }
              ])}
            >
              {starValue} star
            </p>
          ))}
        </div>
        <input
          placeholder="Review"
          {...css(styles.input)}
          name="review"
          onChange={value => setText(value.target.value)}
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

export default CreateReview;
