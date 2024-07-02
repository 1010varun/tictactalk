import "./Cell.css"


//@ts-ignore
export const Cell = ({id, text, handelClick, canPlay}) => {
    return (
        <div id={id} onClick={handelClick} className={`cell ${canPlay ? 'playable' : 'non-playable'}`}>
            {text}
        </div>
    )
};