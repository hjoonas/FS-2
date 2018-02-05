import React from 'react'

const Numbers = (props) => {
    const numerot = props.persons.map(sisalto =>
      <Number key={sisalto.id} name={sisalto.name}
       number={sisalto.number} remove={props.remove(sisalto.id)}/>)
    return (
      <table>
        <tbody>
          {numerot}
        </tbody>    
      </table>
    )
}
const Number = (props) => {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.number}</td>
        <td><button onClick={props.remove}>poista</button></td>
      </tr>
    )
}
export default Numbers