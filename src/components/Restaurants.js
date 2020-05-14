import React from 'react';
import { css } from 'glamor';

const styles = {
  h1: {
    padding: 20,
    fontSize: 24
  },
  image: {
    width: '100%'
  },
  title: {
    fontSize: 22,
    margin: '5px 0px 0px 10px'
  },
  subtitle: {
    margin: '5px 0px 5px 10px'
  },
  viewReviews: {
    color: '#00796B',
    margin: 0,
    padding: '4px 10px 5px',
    fontWeight: 600
  },
  createReview: {
    color: '#00796B',
    margin: 0,
    padding: '4px 10px 20px',
    fontWeight: 600
  },
  container: {
    width: '100%',
    margin: '0 auto',
    marginTop: 55
  }
};

const Restaurants = ({ restaurants, viewReviews, onShowCreateReview }) => {
  return (
    <div {...css(styles.container)}>
      {restaurants.length === Number(0) && (
        <h1 {...css(styles.h1)}>Create your first restaurant by clicking +</h1>
      )}
      {restaurants.map((r, i) => (
        <div key={i}>
          <img alt={i} src={r.photo} {...css(styles.image)} />
          <p {...css(styles.title)}>{r.name}</p>
          <p {...css(styles.subtitle)}>{r.city}</p>
          <p onClick={() => viewReviews(r)} {...css(styles.viewReviews)}>
            View Reviews
          </p>
          <p
            onClick={() => onShowCreateReview(r)}
            {...css(styles.createReview)}
          >
            Create Review
          </p>
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
