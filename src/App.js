import './App.scss';
import { useState, useEffect } from 'react';
import { Navigation } from './Navigation/Navigation';
import { Main } from './Main/Main';
import { getData } from "./api";
import { useSelector } from 'react-redux';

export const App = () => {
  const [data, setData] = useState([]);
  const [appliedInput, setAppliedInput] = useState('');
  const appliedRegions = useSelector(state => state.store.appliedOptionsRegion);
  const appliedStatuses = useSelector(state => state.store.appliedOptionsStatus);
  const appliedRatings = useSelector(state => state.store.appliedOptionsRating);

  const setQuery = (input) => {
    setAppliedInput(input);
  }

  useEffect(() => {
    getData()
      .then(res => {
        if (res !== undefined) {
          let filtered = [];

          if (appliedInput !== '') {
            const filteredName = [...res].filter(obj => obj.name.toLowerCase().includes(appliedInput.toLowerCase()));
            const filteredNumber = [...res].filter(obj => obj.number.toLowerCase().includes(appliedInput.toLowerCase()));
            const filteredLead = [...res].filter(obj => obj.lead.toLowerCase().includes(appliedInput.toLowerCase()));
            const all = [...filteredLead, ...filteredName, ...filteredNumber];
            const newSet = new Set(all);
            filtered = newSet;
          } else {
            filtered = [...res];
          }
          let selected = [...filtered];
          if (appliedRegions.length > 0) {
            selected = filtered.filter(el => appliedRegions.includes(el.region))
          }

          if (appliedRatings.length > 0) {
            selected = selected.filter(el => appliedRatings.includes(el.rating))
          }

          if (appliedStatuses.length > 0) {
            selected = selected.filter(el => {
              if(appliedStatuses.some(status => status === el.status)) {
                return el;
              }
            })
          }

          setData(selected);
        }
      })
  }, [appliedInput, appliedRegions, appliedStatuses, appliedRatings])

  return (
    <div className="App">
      <Navigation setQuery={setQuery} />
      <Main data={data} />
    </div>
  );
}

export default App;
