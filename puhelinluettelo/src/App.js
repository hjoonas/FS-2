import React from 'react';
import Numbers from './components/Numbers'
import Form from './components/Form'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null,
      notif: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }
  addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const personNames = this.state.persons.map(sisalto => sisalto.name)
    if (personNames.indexOf(person.name) === -1) {
      personService
        .create(person)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            notif: 'henkilö lisätty onnistuneesti'
          })
          setTimeout(() => {
            this.setState({ notif: null })
          }, 5000)
        })
    } else {
      this.setState({
        error: `henkilö on jo lisätty`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  personHandleChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  numberHandleChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  filterHandleChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  remove = (id) => {
    return () => {
      if (window.confirm('Haluatko poistaa?')) {
        const newPersons = this.state.persons.map(sisalto => sisalto.name)
        newPersons.splice(id-1, 1)
        personService
          .remove(id)
          .then(response => {
            this.setState({
              persons: response.data,
              notif: 'henkilö poistettu onnistuneesti'
            })
            setTimeout(() => {
              this.setState({notif: null})
            }), 5000
          })
          .catch(error => {
            this.setState({
              error: 'henkilö on jo poistettu'
            })
            setTimeout(() => {
              this.setState({error: null})
            }), 5000
          })
      }
    }
  }

  render() {
    const numerotFilter = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error} className="error"/>
        <Notification message={this.state.notif} className="notif"/>
        <div>
          rajaa näytettaviä <input value={this.state.filter}
            onChange={this.filterHandleChange} />
        </div>
        <h2>Lisää uusi</h2>
        <div>
          <Form state={this.state}
          addPerson={this.addPerson}
          personChange={this.personHandleChange}
          numberChange={this.numberHandleChange}/>
        </div>
        <h2>Numerot</h2>
        <div>
          <Numbers persons={numerotFilter} remove={this.remove}/>
        </div>
      </div>
    )
  }
}
const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default App