import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_COLUMNS, APPLY_COLUMNS, CLEAR_CHANGES_COLUMNS } from "../app/storeReducer";

export const PopUpAddColumn = ({btnRef, togglePopUpCol, popUpColIsOpen}) => {
  const selectedArr = useSelector(state => state.store.selectedColumns);
  const arrTxt = [
    'Audit number',
    'Audit name',
    'Audit region',
    'Document status',
    'Audit risk rating',
    'Audit lead'
  ];
  const colRef = useRef();
  const dispatch = useDispatch();

  const handleOutsideClick = (e) => {
    if (!e.path.includes(colRef.current) && !e.path.includes(btnRef.current)) {
      togglePopUpCol(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className={classNames("popupAddColumn", {
      "popupAddColumn--open": popUpColIsOpen === true
    })} ref={(elem) => {
      colRef.current = elem;
    }}>
      <form
        onSubmit={(event) => {
        event.preventDefault();
        togglePopUpCol(false);
        dispatch({type: APPLY_COLUMNS});
        }}>
      <div className="popupAddColumn__buttons">
        <p className="popupAddColumn__buttons_txt">
          Add/Remove Columns
        </p>
        <button className="popupAddColumn__buttons_btn" onClick={(event) => {
          event.preventDefault()
          dispatch({type: CLEAR_CHANGES_COLUMNS })
        }}>
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