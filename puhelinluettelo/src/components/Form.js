import React from 'react'

const Form = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <div>
          nimi: <input value={props.newName}
          onChange={props.personChange} />
        </div>
        <div>
          numero: <input value={props.newNumber}
          onChange={props.numberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
}
export default Form