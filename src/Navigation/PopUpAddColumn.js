import { useDispatch, useSelector } from "react-redux";
import { SELECT_COLUMNS, OPEN_POPUP_COLUMNS } from "../app/storeReducer";

export const PopUpAddColumn = () => {
  const selectedArr = useSelector(state => state.store.selectedColumns);
  const arrTxt = [
    'Audit number',
    'Audit name',
    'Audit region',
    'Document status',
    'Audit risk rating',
  ];
  const dispatch = useDispatch();

  return (
    <div className="popupAddColumn">
      <form onSubmit={(event) => {
          event.preventDefault();
          dispatch({type: OPEN_POPUP_COLUMNS})
        }}>
      <div className="popupAddColumn__buttons">
        <p className="popupAddColumn__buttons_txt">
          Add/Remove Columns
        </p>
        <button className="popupAddColumn__buttons_btn">
          Clear all
        </button>
      </div>
      <div className="popupAddColumn__formBlock">
      <ul className="select__list select__list--opened">
        {arrTxt.map(text => (
          <li className="select__list_item" key={text}>
            <input 
              type="checkbox"
              checked={selectedArr.includes(text) ? true : false}
              onChange={(event) => {
                dispatch({type: SELECT_COLUMNS, payload: event.target.value})
              }}
              value={text}
              id={text}
            />
            <label 
              htmlFor={text}
              className="select__list_label"
            >
              {text}
            </label>
          </li>
        ))}
      </ul>
        <div className="popupAddColumn__form">
          <button 
            className="popupAddColumn__form_button" 
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
      </form>
    </div>
  )
}