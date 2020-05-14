import React from 'react';
import { css } from 'glamor';

const styles = {
  header: {
    height: 50,
    backgroundColor: '#00796B',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 5,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    margin: 0,
    color: 'white',
    fontWeight: 600,
    fontSize: 22
  },
  iconContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },
  icon: {
    color: 'white',
    marginRight: 20,
    fontSize: 36
  }
};

const Header = ({ onShowCreateRestaurant }) => (
  <div {...css(styles.header)}>
    <p {...css(styles.title)}>BigEats</p>
    <div {...css(styles.iconContainer)}>
      <p {...css(styles.icon)} onClick={onShowCreateRestaurant}>
        +
      </p>
    </div>
  </div>
);

export default Header;
