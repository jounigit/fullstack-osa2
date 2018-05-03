import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' },
        { name: 'Esko Ukkonen' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
   event.preventDefault()
   const names = this.state.persons.map(person => person.name)

   if (names.includes(this.state.newName)) {
     this.setState({ newName: '' })
      console.log('Nimi on jo käytössä!')
      alert("Nimi on jo käytössä!")
   } else {
     const personObject = {
       name: this.state.newName
     }
     const persons = this.state.persons.concat(personObject)

     this.setState({
       persons,
       newName: ''
     })
   }
 }

  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
          nimi:
          <input value={this.state.newName} onChange={this.handlePersonChange} />
          </div>
          <button type="submit">tallenna</button>
        </form>

        <h2>Numerot</h2>

        <div>
          {this.state.persons.map((person, i) => <p key={i}>{person.name}</p>)}
        </div>

      </div>
    )
  }
}

export default App
