import "./Cell.css"

//@ts-ignore
export const Cell = ({id, text, handelClick}) => {
    return (
        <div id={id} onClick={handelClick} className="cell">
            {text}
        </div>
    )
};