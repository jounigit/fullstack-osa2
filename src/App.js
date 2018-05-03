import React from 'react';
import axios from 'axios'

const Country = ({ country, action }) => {
  return (
    <div onClick={action}>
      {country.name}
    </div>
  )
}

const CountrySpecs = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <h4>capital: {country.capital}</h4>
      <h4>population: {country.population}</h4>
      <img src={country.flag} height="300" width="400" alt="" />
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
      showCountry: [],
      filter:''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
   }

  searchInput = (event) => {
    this.setState({ filter: event.target.value })
    console.log(event.target.value);
    if (event.target.value.length > 0) {
      const re = new RegExp(event.target.value.toLowerCase(), 'g')
      const toLower = (str) => str.toLowerCase()
      let searchCountries = this.state.countries.filter(x => toLower(x.name).match(re) )
      console.log(searchCountries)
        this.setState({
          searchCountries,
          showCountry: ''
        })
    } else {
      this.setState({
        searchCountries: '',
        showCountry: ''
      })
    }
   }

  render() {
    console.log(this.state.searchCountries)

    const showCountry = () => {
      if (this.state.showCountry.name) {
        console.log('NÄYTÄÄ')
        return <CountrySpecs country={this.state.showCountry} />
      }
    }

    const setCountry = (country) => () => {
      this.setState({ showCountry: country })
    }

    const showCountries = () => {
      if (1 < this.state.searchCountries.length && this.state.searchCountries.length < 10) {
        return this.state.searchCountries.map((c, i) => <Country key={i} country={c} action={setCountry(c)} />)
      } else if (this.state.searchCountries.length > 10) {
        return 'too many matches, specify another filter'
      } else if (1 === this.state.searchCountries.length) {
        return <CountrySpecs country={this.state.searchCountries[0]} />
      } else {
        return ''
      }
    }

    return (
      <div>
        <SearchForm filtter={this.state.filter} inputTxt={this.searchInput} />

        {showCountry()}
        <div>
          {showCountries()}
        </div>
      </div>
    )
  }
}

export default App
