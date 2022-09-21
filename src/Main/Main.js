import { useEffect, useState } from "react"
import classNames from "classnames";
import { useSelector } from "react-redux";

export const Main = ({data}) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const columns = useSelector(state => state.store.appliedColumns);
  const animationDuration = 1000;

  let lastItem = selectedPage * 10;
  if (lastItem > data.length) {
    lastItem = data.length;
  }

  const [sortedData, setSortedData] = useState(data);
  const firstItem = lastItem - 10;
  const amountOfPages = Math.ceil(data.length / 10);
  const pages = [];
  const [translate, setTranslate] = useState(0);
  const [sortByWhat, setSortByWhat] = useState('');
  const [sortDirectly, setSortDirectly] = useState(true);

  useEffect(() => {
    setSortedData(data)
  }, [data]);

  const sortBy = (title, howTosort) => {
    if (title) {
      let sorted = [];
      if (howTosort === true) {
        setSortedData(prev => {
          sorted = [...prev].sort((a, b) => a[`${title}`].localeCompare(b[`${title}`]));
          return sorted;
        })
      } else {
        setSortedData(prev => {
          sorted = [...prev].sort((a, b) => b[`${title}`].localeCompare(a[`${title}`]));
          return sorted;
        })
        return sorted;
      }
    }
  }

  const currentContent = sortedData.slice(firstItem, lastItem);


  useEffect(() => {
    sortBy(sortByWhat, sortDirectly);
  }, [sortByWhat, sortDirectly])

  for (let i = 1; i <= amountOfPages; i++) {
    pages.push(i);
  }

  return (
    <main className="main">
      <div className="container">
      {sortedData.length === 0 ? (
        <div>
          No data
        </div>
      ) : (
        <>
        <table className="main__table table">
        <thead>
        <tr className="table__header">
        {columns.includes('Audit number') && (
          <th 
            className="table__header_row"
            onClick={() => {
              setSortDirectly(!sortDirectly);
              setSortByWhat('number');
            }}
          >
            <span className="table__header_txt">
              Audit number
            </span>
          </th>
        )}
        {columns.includes('Audit name') && (
        <th 
          className="table__header_row"
          onClick={() => {
            setSortDirectly(!sortDirectly);
            setSortByWhat('name');
          }}
        >
        <span className="table__header_txt">
          Audit name
          </span>
        </th>)}
        {columns.includes('Audit region') && (
        <th 
          className="table__header_row"
          onClick={() => {
            setSortByWhat('region');
            setSortDirectly(!sortDirectly);
          }}
        >
          <span className="table__header_txt">
            Audit region
          </span>
        </th>
        )}
        {columns.includes('Document status') && (
        <th 
          className="table__header_row"
          onClick={() => {
            setSortByWhat('status');
            setSortDirectly(!sortDirectly);
          }}
          >
          <span className="table__header_txt">
            Document status
          </span>
        </th>
        )}
        {columns.includes('Audit risk rating') && (
        <th 
          className="table__header_row"
          onClick={() => {
            setSortByWhat('rating');
            setSortDirectly(!sortDirectly);
          }}
        >
          <span className="table__header_txt">
            Audit risk rating
          </span>
        </th>
        )}
        {columns.includes('Audit lead') && (
        <th 
          className="table__header_row"
          onClick={() => {
            setSortByWhat('lead');
            setSortDirectly(!sortDirectly);
          }}
        >
          <span className="table__header_txt">
            Audit lead
          </span>
        </th>
        )}
        </tr>
        </thead>
        <tbody>
        {currentContent.map(obj => (
          <tr
            className="table__body"
            key={obj.number + Math.random()}
          >
            {columns.includes('Audit number') && ( <td className="table__body_row">{obj.number}</td>)}
            {columns.includes('Audit name') && (<td className="table__body_row">{obj.name}</td>)}
            {columns.includes('Audit region') && (<td className="table__body_row">{obj.region}</td>)}
            {columns.includes('Document status') && (<td className="table__body_row">{obj.status}</td>)}
            {columns.includes('Audit risk rating') && (<td className="table__body_row">{obj.rating}</td>)}
            {columns.includes('Audit lead') && (<td className="table__body_row">{obj.lead}</td>)}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="main__blockPagination pagination">
        <p className="pagination__txt">
          Showing from {firstItem + 1} to {lastItem} of {data.length}
        </p>
        <div className="pagination__buttons">
        <div 
          className="pagination__container" 
          >
        <ul 
          className="pagination__buttons_list list"
          style={
            {
              transform: `translateX(${translate}px)`,
              transition: `${animationDuration}ms`,
            }
          }
        >
            {pages.map((page) => (
              <li className="list__item" key={page}>
                <button
                  type="button"
                  className={
                    classNames('list__link', {
                      'list__link list__link--active': selectedPage === page
                    })
                  }
                  onClick={() => {
                    setSelectedPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            ))}
        </ul>
        </div>
        <button 
              className="list__link list__link--arrow"
              onClick={() => {
                if (selectedPage === pages.length) {
                  return;
                }
                setSelectedPage(prev => prev + 1);
                if (selectedPage >= 5) {
                  setTranslate(prev => prev - 25);
                }
              }}
            >
              &rarr;
        </button>
        <button 
              className="list__link list__link--larrow"
              onClick={() => {
                if (selectedPage === 1) {
                  return;
                }
                setSelectedPage(prev => prev - 1);
                if (selectedPage > 5) {
                  setTranslate(prev => prev + 25);
                }
              }}
            >
              &larr;
        </button>
        </div>
      </div>
        </>
      )}
      </div>
    </main>
  )
}