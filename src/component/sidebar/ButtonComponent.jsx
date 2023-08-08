import React from 'react'

const ButtonComponent = (props) => {
const handleClick = () => {
    props.onClickAction()
}
   
  return (
        <button type="button" className="btn btn-dark btn-sm" onClick={handleClick}>
            {props.name}
        </button>  )
}

export default ButtonComponent