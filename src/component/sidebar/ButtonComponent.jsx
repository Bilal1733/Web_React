import './btncomponent.css'
const ButtonComponent = ({onClickAction,name,className}) => {
const handleClick = () => {
    onClickAction()
}
   
  return (
        <button type="button" className={className} onClick={handleClick} >
            {name}
        </button>  )
}

export default ButtonComponent