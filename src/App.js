import React from 'react';
import axios from 'axios'

const Country = ({ country }) => <p>{country.name}</p>

const CountrySpecs = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <h4>capital: {country.capital}</h4>
      <h4>population: {country.population}</h4>
      <img src={country.flag} height="300" width="400" alt="kuva" />
    </div>
  )
}

const SearchForm = ({ filtter, inputTxt}) => {
  return (
    <div>
    find countries:  <input value={filtter} onChange={inputTxt} />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      searchCountries: [],
      filter:''
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
   }

  searchInput = (event) => {
    this.setState({ filter: event.target.value })
    const re = new RegExp(event.target.value.toLowerCase(), 'g')
    const toLower = (str) => str.toLowerCase()
    let searchCountries = this.state.countries.filter(x => toLower(x.name).match(re) )
    console.log(searchCountries)
      this.setState({ searchCountries })
   }

  render() {
    console.log(this.state.searchCountries)
    const showCountries = () => {
      if (1 < this.state.searchCountries.length && this.state.searchCountries.length < 10) {
          return this.state.searchCountries.map((c, i) => <Country key={i} country={c} />)
      } else if (this.state.searchCountries.length > 10) {
        return 'too many matches, specify another filter'
      } else if (1 === this.state.searchCountries.length) {
        return <CountrySpecs country={this.state.searchCountries[0]} />
      }
    }
    
    return (
      <div>
        <SearchForm filtter={this.state.filter} inputTxt={this.searchInput} />

        <div>
          {showCountries()}
        </div>
      </div>
    )
  }
}

export default App
