import {Component} from 'react';
import { InputForm } from './InputForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
    ],
    filter: ''
  }
  submitHandle = (evt) => {
    const phoneName = this.state.contacts.find(el => (el.name.toLowerCase() === evt.name.toLowerCase()));
    if (phoneName) return Notiflix.Notify.failure(phoneName.name + " is already in contacts");
    
    evt.id = nanoid();
    this.setState(prev => ({ contacts: [evt, ...prev.contacts] }))
  }
  filterChange = (evt) => {
    evt.preventDefault();
    this.setState({ filter: evt.currentTarget.value });
  }
  onDelete = (id) => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(
      contact => contact.id !== id)
    }))
  }
  render() {
    const { filter, contacts } = this.state;
    const filterToLowCase = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => (contact.name.toLowerCase().includes(filterToLowCase)));

    return (
      <>
        
          <h1>Phonebook</h1>
          <InputForm submitHandle={this.submitHandle}/>
        
        
          <h2>Contact List</h2>
          <Filter filter={filter} filterChange={this.filterChange}/>
          {contacts.length ?
            <ContactList contacts={filteredContacts} onDelete={this.onDelete} /> :
            <p>No any contacts</p>}
        
      </>
    );
  };
}