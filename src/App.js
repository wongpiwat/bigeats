import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import Header from './components/Header';
import Restaurants from './components/Restaurants';
import CreateRestaurant from './components/CreateRestaurant';
import CreateReview from './components/CreateReview';
import Reviews from './components/Reviews';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [showCreateRestaurant, setShowCreateRestaurant] = useState(false);
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchRestaurantsAPI = async () => {
      try {
        const rdata = await API.graphql(
          graphqlOperation(queries.listRestaurants)
        );
        const {
          data: {
            listRestaurants: { items }
          }
        } = rdata;
        console.log('items: ', items);
        setRestaurants(items);
      } catch (err) {
        console.log('error: ', err);
      }
    };
    fetchRestaurantsAPI();
  }, []);

  const viewReviews = restaurant => {
    setShowReviews(true);
    setSelectedRestaurant(restaurant);
  };

  const createRestaurant = async restaurant => {
    setRestaurants([...restaurants, restaurant]);
    try {
      await API.graphql(
        graphqlOperation(mutations.createRestaurant, { input: restaurant })
      );
    } catch (err) {
      console.log('error creating restaurant: ', err);
    }
  };

  const createReview = async input => {
    await API.graphql(graphqlOperation(mutations.createReview, { input }));
  };

  const fetchReviews = id => {
    return API.graphql(graphqlOperation(queries.getRestaurant, { id }));
  };

  const closeModal = () => {
    setShowCreateRestaurant(false);
    setShowCreateReview(false);
    setShowReviews(false);
    setSelectedRestaurant({});
  };

  const onShowCreateRestaurant = () => {
    setShowCreateRestaurant(true);
  };

  const onShowCreateReview = restaurant => {
    setSelectedRestaurant(restaurant);
    setShowCreateReview(true);
  };

  return (
    <div>
      <Header onShowCreateRestaurant={onShowCreateRestaurant} />
      <Restaurants
        restaurants={restaurants}
        showCreateReview={showCreateReview}
        viewReviews={viewReviews}
        onShowCreateReview={onShowCreateReview}
      />
      {showCreateRestaurant && (
        <CreateRestaurant
          createRestaurant={createRestaurant}
          onCloseModal={closeModal}
        />
      )}
      {showCreateReview && (
        <CreateReview
          restaurant={selectedRestaurant}
          onCloseModal={closeModal}
          onCreateReview={createReview}
        />
      )}
      {showReviews && (
        <Reviews
          restaurantId={selectedRestaurant.id}
          onFetchReviews={fetchReviews}
          onCloseModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
