import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { SELECT_OPTIONS_REGION, SELECT_OPTIONS_RATING, SELECT_OPTIONS_STATUS } from "../app/storeReducer";
import { useDispatch, useSelector } from "react-redux";

export const PopUpFilter = ({buttonRef, togglePopUpFilter, popUpFilterIsOpen}) => {
  const regions = ['North America', 'Europe'];
  const riskRatings = ['Major', 'Not major'];
  const docStatuses = ['approved', 'disapproved'];
  const [openedLists, setOpenedLists] = useState([]);
  const dispatch = useDispatch();
  const selectedRegions = useSelector(state => state.store.selectedOptionsRegion);
  const selectedRatings = useSelector(state => state.store.selectedOptionsRating);
  const selectedStatuses = useSelector(state => state.store.selectedOptionsStatus);
  const filterRef = useRef();

  useEffect(() => {

  }, [selectedRegions])

  const openList = (name) => {
    setOpenedLists(prev => {
      if (prev.includes(name)) {
        return prev.filter(el => el !== name);
      } else {
      return  [...prev, name]
      }
    })
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e) => {
    if (!e.path.includes(filterRef.current) && !e.path.includes(buttonRef.current)) {
      togglePopUpFilter(false);
    }
  }

  return (
    <div className={classNames("popupFilter", 
    {
      "popupFilter--open": popUpFilterIsOpen === true
    })} ref={(elem) => {
      filterRef.current = elem;
    }}>
      <div className="popupFilter__buttons">
        <p className="popupFilter__buttons_txt">
          Filter
        </p>
        <button className="popupFilter__buttons_btn" onClick={(event) => {
          event.preventDefault();
          setOpenedLists([])
        }}>
          Close all
        </button>
      </div>
      <div className="popupFilter__formBlock">
        <div className="popupFilter__form">
          <div className="popupFilter__form_select select">
            <p 
              className="select__title" 
              onClick={() => {
              openList('Audit region');
              }}
            >
              Audit region
            </p>
            <ul 
              className={classNames("select__list", 
              {
              'select__list--opened': openedLists.includes('Audit region')
              })}
            >
              {regions.map(region => (
                <li className="select__list_item" key={region}>
                  <input 
                    type="checkbox"
                    value={region}
                    checked={selectedRegions.includes(region) ? true : false}
                    id={region}
                    onChange={(event) => {
                      dispatch({type: SELECT_OPTIONS_REGION, payload: event.target.value});
                    }}
                  />
                  <label 
                    htmlFor={region}
                    className="select__list_label"
                  >
                    {region}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="popupFilter__form_select select">
            <p 
              className="select__title" 
              onClick={() => {
              openList('Risk rating');
              }}
            >
              Risk rating
            </p>
            <ul 
              className={classNames("select__list", {
              'select__list--opened': openedLists.includes('Risk rating')
              })}
            >
              {riskRatings.map(rating => (
                <li className="select__list_item" key={rating}>
                  <input 
                    type="checkbox" 
                    value={rating} 
                    checked={selectedRatings.includes(rating) ? true : false}
                    id={rating} 
                    onChange={(event) => {
                      dispatch({type: SELECT_OPTIONS_RATING, payload: event.target.value})
                    }}
                  />
                  <label htmlFor={rating} className="select__list_label">{rating}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="popupFilter__form_select select">
            <p 
              className="select__title" 
              onClick={() => {
              openList('Document status');
              }}
            >
              Document status
            </p>
            <ul 
              className={classNames("select__list", 
              {
              'select__list--opened': openedLists.includes('Document status')
              })}
            >
              {docStatuses.map(status => (
                <li className="select__list_item" key={status}>
                <input 
                  type="checkbox" 
                  value={status}
                  checked={selectedStatuses.some(el => el === status) ? true : false}
                  id={status} 
                  onChange={(event) => {
                    dispatch({type: SELECT_OPTIONS_STATUS, payload: event.target.value})
                  }}
                  />
                <label htmlFor={status} className="select__list_label">{status}</label>
              </li>
              ))}
            </ul>
          </div>
          <button 
            className="popupFilter__form_button" 
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
};