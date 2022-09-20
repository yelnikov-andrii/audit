import { useState } from "react"
import classNames from "classnames";

export const Main = ({data}) => {
  const [selectedPage, setSelectedPage] = useState(1);

  let lastItem = selectedPage * 10;
  if (lastItem > data.length) {
    lastItem = data.length;
  }
  const firstItem = lastItem - 9;
  const currentContent = data.slice(firstItem, lastItem);
  const amountOfPages = Math.ceil(data.length / 10);
  const pages = [];

  for (let i = 1; i <= amountOfPages; i++) {
    pages.push(i);
  }

  return (
    <main className="main">
      <div className="container">
      <table className="main__table table">
        <thead>
        <tr className="table__header">
          <th className="table__header_row">Audit number</th>
          <th className="table__header_row">Audit name</th>
          <th className="table__header_row">Audit region</th>
          <th className="table__header_row">Document status</th>
          <th className="table__header_row">Audit risk rating</th>
          <th className="table__header_row">Audit lead</th>
        </tr>
        </thead>
        <tbody>
        {currentContent.map(obj => (
          <tr
            className="table__body"
            key={obj.number + Math.random()}
          >
            <td className="table__body_row">{obj.number}</td>
            <td className="table__body_row">{obj.name}</td>
            <td className="table__body_row">{obj.region}</td>
            <td className="table__body_row">{obj.status}</td>
            <td className="table__body_row">{obj.rating}</td>
            <td className="table__body_row">{obj.lead}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="main__blockPagination pagination">
        <p className="pagination__txt">
          Showing from {firstItem} to {lastItem} of {data.length}
        </p>
        <div className="pagination__buttons">
        <ul className="pagination__buttons_list list">
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
      </div>
      </div>
    </main>
  )
}