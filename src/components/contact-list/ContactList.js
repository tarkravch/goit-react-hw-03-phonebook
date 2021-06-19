import React from "react";
import styles from "../contact-list/ContactList.module.css";
import PropTypes from "prop-types";

const ContactList = ({ items, onDeleteContact }) => (
  <div>
    <ul className={styles.list}>
      {items.map((itemName) => (
        <li key={itemName.id} className={styles.list__item}>
          {itemName.name}: {itemName.number}
          <button
            onClick={() => onDeleteContact(itemName.id)}
            className={styles.list__btn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  items: PropTypes.object.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
