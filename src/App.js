import React from 'react';

const Henkilo = ({ henkilo }) => <p>{henkilo.nimi} {henkilo.numero}</p>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      henkilot: [
        {
          nimi: 'Arto Hellas',
         numero: '123499'
       }
      ],
      uusiNimi: '',
      uusiNumero: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const nimet = this.state.henkilot.map(henkilo => henkilo.nimi)
    if (nimet.includes(this.state.uusiNimi)) {
      this.setState({
        uusiNimi: '',
        uusiNumero: ''
       })
       console.log('Nimi on jo käytössä!')
       alert("Nimi on jo käytössä!")
    } else {
      const personObject = {
        nimi: this.state.uusiNimi,
        numero: this.state.uusiNumero
      }

      const henkilot = this.state.henkilot.concat(personObject)

      this.setState({
        henkilot,
        uusiNimi: '',
        uusiNumero: ''
      })
    }

  }

  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ uusiNimi: event.target.value })
  }

  numeroIput = (event) => {
    console.log(event.target.value)
    this.setState({ uusiNumero: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
          nimi:
          <input value={this.state.uusiNimi} onChange={this.handlePersonChange} />
          </div>
          <div>
          numero:
          <input value={this.state.uusiNumero} onChange={this.numeroIput} />
          </div>
          <button type="submit">tallenna</button>
        </form>

        <h2>Numerot</h2>

        <div>
        {this.state.henkilot.map((henkilo, i) => <Henkilo key={i} henkilo={henkilo} />)}
        </div>

      </div>
    )
  }
}

export default App
