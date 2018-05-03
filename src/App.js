import React from 'react';
import personService from './services/persons'

const Person = ({ person, toggleDelete }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={toggleDelete}>poista</button></td>
    </tr>
  )
}

const SearchForm = ({ filtter, inputTxt}) => {
  return (
    <div>
    rajaa näytettäviä:  <input value={filtter} onChange={inputTxt} />
    </div>
  )
}

const AddForm = ({add, name, number, inputP, inputN}) => {
 return (
   <form onSubmit={add}>
     <div>
     nimi:
     <input value={name} onChange={inputP} />
     </div>
     <div>
     numero:
     <input value={number} onChange={inputN} />
     </div>
     <button type="submit">tallenna</button>
   </form>
 )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      searchPersons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null,
      showAll: true
    }
    console.log('constructor')
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
   }

   personExist = (name, number) => {
     const person = this.state.persons.find(p => p.name === name)
     if (person) {
       const q = window.confirm(person.name + " on jo olemassa, korvataanko vanha numero uudella?")
      if (q) {
        this.updateNumber(person.id, number)
        return true
      } else {
        this.setState({
          newName: '',
          newNumber: '',
          filter: '',
          showAll: true
        })
        return true
      }
     }
   }

   updateNumber = (id, number) => {
    const person = this.state.persons.find(p => p.id === id)
    const changedPerson = { ...person, number: number }

    personService
      .update(id, changedPerson)
      .then(changedPerson => {
        const persons = this.state.persons.filter(p => p.id !== id)
          this.setState({
            persons: persons.concat(changedPerson),
            message: `vaihdettiin henkilön '${person.name}' numero `,
            newName: '',
            newNumber: '',
            filter: '',
            showAll: true
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
      })
   }

  addPerson = (event) => {
    event.preventDefault()
    if ( !this.personExist(this.state.newName, this.state.newNumber) ) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      }

      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            message: `lisättiin '${this.state.newName}'  `,
            newName: '',
            newNumber: '',
            filter: '',
            showAll: true
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })
    }
  }

  deletePerson = (id) => {
    return () => {
      const person = this.state.persons.find(p => p.id === id)

      if (window.confirm("poistetaanko "+person.name)) {
        personService
        .move(id)
        .then(response => {
          const persons = this.state.persons.filter(p => p.id !== id)
          this.setState({
                persons,
                message: `poistettiin '${person.name}'  `,
              })
              setTimeout(() => {
                this.setState({message: null})
              }, 5000)
          })
      }

    }
  }

  personInput = (event) =>  this.setState({
    newName: event.target.value,
    filter: '',
    showAll: true
  })

  numberIput = (event) => this.setState({
    newNumber: event.target.value,
    filter: '',
    showAll: true
  })

  searchInput = (event) => {
    this.setState({ filter: event.target.value })
    const re = new RegExp(event.target.value.toLowerCase(), 'g')
    const toLower = (str) => str.toLowerCase()
    let searchPersons = this.state.persons.filter(x => toLower(x.name).match(re) )
    console.log(searchPersons)
    this.setState({ searchPersons, showAll: false })
   }

  render() {
    const showPersons =
    this.state.showAll ?
    this.state.persons :
    this.state.searchPersons

    return (
      <div>

        <h1>Puhelinluettelo</h1>

        <Notification message={this.state.message}/>

        <SearchForm filtter={this.state.filter} inputTxt={this.searchInput} />

        <h2>Lisää uusi</h2>
        <AddForm
        add={this.addPerson}
        name={this.state.newName}
        number={this.state.newNumber}
        inputP={this.personInput}
        inputN={this.numberIput} />

        <h2>Numerot</h2>
        <div>
          <table>
            <tbody>
              {showPersons.map(person =>
                <Person
                key={person.id}
                person={person}
                toggleDelete={this.deletePerson(person.id)}
              />)}
              </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App
