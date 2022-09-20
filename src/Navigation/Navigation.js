import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_OPTIONS, OPEN_POPUP, OPEN_POPUP_COLUMNS } from "../app/storeReducer";
import { PopUpFilter } from "./PopUpFilter";
import { PopUpAddColumn } from "./PopUpAddColumn";

export const Navigation = ({setQuery}) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.store.selectedOptions);
  const popUpIsOpen = useSelector(state => state.store.popUpIsOpen);
  const popUpColIsOpen = useSelector(state => state.store.popUpColIsOpen);

  useEffect(() => {
  }, [selectedOptions])

  return (
    <header className="navigation">
      <div className="container">
      <div className="navigation__blockTitle">
      <h1 className="navigation__header">My Dashboard - All Audits</h1>
      <button className="navigation__button">
        + Create new audit
      </button>
      </div>
      <div className="navigation__blockForm">
        <form className="navigation__form form" onSubmit={(event) => {
          event.preventDefault();
          dispatch({type: GET_OPTIONS})
          dispatch({type: OPEN_POPUP})
        }}>
          <input 
            className="form__input"
            onChange={(event) => {
              setInput(event.target.value)
            }}
            placeholder="Search by audit name, audit id or audit lead"
          />
          <button 
            onClick={(event) => {
              event.preventDefault();
              setQuery(input)
            }}
            className="form__btn form__btn--search"
          >
            Search
          </button>
          <button 
            className="form__btn"
            onClick={(event) => {
              event.preventDefault();
              dispatch({type: OPEN_POPUP});
            }}
          >
            Filter By
          </button>
          <button 
            className="form__btn"
            onClick={(event) => {
              event.preventDefault();
              dispatch({type: OPEN_POPUP_COLUMNS});
            }}
          >
            Add/Remove Columns
          </button>
          {popUpIsOpen && (
            <PopUpFilter />
          )}
        </form>
        {popUpColIsOpen && (
            <PopUpAddColumn />
          )}
      </div>
      </div>
    </header>
  )
}