import React from 'react'

const Otsikko = ({ kurssi }) => <h2>{kurssi.nimi}</h2>

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

const Yhteensa = ({ kurssi }) => {
  const osat = kurssi.osat
  const t = osat.map(osa => osa.tehtavia)
  const reducer = (varasto, lisaArvo) => varasto + lisaArvo
  const summa = t.reduce(reducer)
  console.log(t);
  console.log('SUMMA: ', summa)
    return (
      <div>
        <p>yhteensä {summa} tehtävää</p>
      </div>
    )
}

const Sisalto = ({ kurssi }) => {
  const osat = kurssi.osat
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}


const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

const App = () => {
  const kurssi = {
  nimi: 'Half Stack -sovelluskehitys',
  osat: [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10,
      id: 1
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7,
      id: 2
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14,
      id: 3
    }
  ]
}

return (
  <div>
    <Kurssi kurssi={kurssi} />
  </div>
)
}

export default App
