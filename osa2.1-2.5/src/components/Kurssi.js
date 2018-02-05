import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.otsikko}</h1>
const Sisalto = (props) => {
const osat = props.sisalto.osat.map(sisalto =>
<Osa key={sisalto.id} osa={sisalto.nimi} tehtavia={sisalto.tehtavia} />)
return(
        <div>
            {osat}
        </div>
    )
}
const Yhteensa = (props) => {
    const osat = props.yhteensa.osat
    const yhteensa = 
    osat.reduce((sum, curVal) => sum + curVal.tehtavia, 0)
    return(
        <p>yhteensä {yhteensa} tehtävää</p>
    )
}
const Kurssi = (props) => {
    const nimi = props.kurssi.nimi
    return (
        <div>
            <Otsikko otsikko={nimi} />
            <Sisalto sisalto={props.kurssi} />
            <Yhteensa yhteensa={props.kurssi} />
        </div>
    )
}

export default Kurssi