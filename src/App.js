import React from 'react';
import personService from './services/persons'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      searchPersons: [],
      newName: '',
      newNumber: '',
      filter: '',
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

   personExist = (name) => {
     const names = this.state.persons.map(person => person.name)
     if (names.includes(name)) {
       this.setState({
         newName: '',
         newNumber: ''
        })
        console.log('Nimi on jo käytössä!')
        alert("Nimi on jo käytössä!")
        return true
     }
   }

  addPerson = (event) => {
    event.preventDefault()
    if ( !this.personExist(this.state.newName) ) {
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
            newName: '',
            newNumber: '',
            filter: '',
            showAll: true
          })
        })
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
    console.log('showPersons: ', showPersons )

    return (
      <div>
        <SearchForm filtter={this.state.filter} inputTxt={this.searchInput} />

        <h2>Puhelinluettelo</h2>
        <AddForm
        add={this.addPerson}
        name={this.state.newName}
        number={this.state.newNumber}
        inputP={this.personInput}
        inputN={this.numberIput} />

        <h2>Numerot</h2>
        <div>
          {showPersons.map(p => <Person key={p.id} person={p} />)}
        </div>
      </div>
    )
  }
}

export default App
