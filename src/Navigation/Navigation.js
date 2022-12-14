import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_OPTIONS } from "../app/storeReducer";
import { PopUpFilter } from "./PopUpFilter";
import { PopUpAddColumn } from "./PopUpAddColumn";

export const Navigation = ({setQuery}) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.store.selectedOptions);
  const [popUpColIsOpen, setPopupColIsOpen] = useState(false);
  const [popUpFilterIsOpen, setPopupFilterIsOpen] = useState(false);
  const btnRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
  }, [selectedOptions])

  const togglePopUpCol = (value) => {
    setPopupColIsOpen(value);
  }

  const togglePopUpFilter = (value) => {
    setPopupFilterIsOpen(value);
  }

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
          setPopupFilterIsOpen(false);
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
          <div className="form__buttonsWrapper">
          <button 
            className="form__btn form__btn--filter"
            ref={buttonRef}
            onClick={(event) => {
              event.preventDefault();
              setPopupFilterIsOpen(!popUpFilterIsOpen)
            }}
          >
          </button>
          <button 
            className="form__btn form__btn--column"
            ref={btnRef}
            onClick={(event) => {
              event.preventDefault();
              setPopupColIsOpen(!popUpColIsOpen);
            }}
          >
          </button>
          </div>
            <PopUpFilter buttonRef={buttonRef} togglePopUpFilter={togglePopUpFilter} popUpFilterIsOpen={popUpFilterIsOpen}/>
        </form>
            <PopUpAddColumn btnRef={btnRef} togglePopUpCol={togglePopUpCol} popUpColIsOpen={popUpColIsOpen}/>
      </div>
      </div>
    </header>
  )
}