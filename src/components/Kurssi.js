import React from 'react'

const Otsikko = ({ kurssi }) => <h2>{kurssi.nimi}</h2>

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

const Yhteensa = ({ kurssi }) => {
  const t = kurssi.osat.map(osa => osa.tehtavia)
  const supistaja = (laskuri, lisaArvo) => laskuri + lisaArvo
  const summa = t.reduce(supistaja)
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

export default Kurssi
