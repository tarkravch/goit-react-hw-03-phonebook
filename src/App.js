import React, { Component } from "react";
import ContactForm from "./components/contact-form/ContactForm";
import ContactList from "./components/contact-list/ContactList";
import Filter from "./components/filter/Filter";
import initialContacts from "./components/contactArr.json";
import Container from "./components/Container/Container";
import shortid from "shortid";

class App extends Component {
  static defaultProps = {};

  static propTypes = {
    //
  };

  state = {
    contacts: initialContacts,
    filter: "",
  };

  componentDidMount(prevProp, prevState) {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  // після кожного оновлення
  componentDidUpdate(prevProp, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  deleteContact = (itemNameId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== itemNameId
      ),
    }));
  };

  contactCheck = ({ name, number }) => {
    const checkedContact = this.state.contacts.find((contact) => {
      if (contact.name === name) {
        throw alert(`${name} is already in the contacts`);
      }
    });
    return this.addContact({ name, number });
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  filterByName = (event) => {
    this.setState({ filter: event.currentTarget.value });
    console.log(this.state.filter);
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    console.log(normalizedFilter);

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.contactCheck} />
          <h2>Contacts</h2>
          <p>Find contacts by name</p>
          <Filter value={this.state.filter} onChange={this.filterByName} />
          <ContactList
            items={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Container>
      </>
    );
  }
}

export default App;
