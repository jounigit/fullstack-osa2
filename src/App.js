import React from 'react';

const Henkilo = ({ henkilo }) => <p>{henkilo.nimi} {henkilo.numero}</p>

const HakuLomake = ({ filtteri, inputTxt}) => {
  return (
    <div>
    rajaa näytettäviä:  <input value={filtteri} onChange={inputTxt} />
    </div>
  )
}

const LisaysLomake = ({henkilo, nimi, numero, inputP, inputN}) => {
  return (
    <form onSubmit={henkilo}>
      <div>
      nimi:
      <input value={nimi} onChange={inputP} />
      </div>
      <div>
      numero:
      <input value={numero} onChange={inputN} />
      </div>
      <button type="submit">tallenna</button>
    </form>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      henkilot: [
        { nimi: 'Arto Hellas', numero: '040-123456' },
        { nimi: 'Martti Tienari', numero: '040-123456' },
        { nimi: 'Arto Järvinen', numero: '040-123456' },
        { nimi: 'Lea Kutvonen', numero: '040-123456' }
      ],
      rajattuHaku: [],
      uusiNimi: '',
      uusiNumero: '',
      filter: ''
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

  rajaaHaku = (event) => {
    const haku = event.target.value
    const re = new RegExp(haku, 'g')
    const pienet = (str) => str.toLowerCase()
    this.setState({ filter: haku })
    let rajattuHaku = this.state.henkilot.filter(henkilo => pienet(henkilo.nimi).match(re) )
    console.log(rajattuHaku)
    this.setState({ rajattuHaku })
    console.log("State: ", this.state.rajattuHaku)
  }

  naytaHenkilot = (haku, kaikki) => (haku.length > 0) ? haku : kaikki

  render() {
    const naytaHaku = this.state.rajattuHaku.map((henkilo, i) => <Henkilo key={i} henkilo={henkilo} />)
    const naytaKaikki = this.state.henkilot.map((henkilo, i) => <Henkilo key={i} henkilo={henkilo} />)
    return (
      <div>
        <HakuLomake filtteri={this.state.filter} inputTxt={this.rajaaHaku} />

        <h2>Puhelinluettelo</h2>
        <LisaysLomake henkilo={this.addPerson} nimi={this.state.uusiNimi} numero={this.state.uusiNumero} inputP={this.handlePersonChange} inputN={this.numeroIput} />

        <h2>Numerot</h2>
        <div>
          {this.naytaHenkilot(naytaHaku, naytaKaikki)}
        </div>
      </div>
    )
  }
}

export default App
