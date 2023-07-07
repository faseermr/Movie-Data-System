import React, { useState, useEffect } from "react";
type PropType = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};
const CustomPagination: React.FC<PropType> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    let pageCount = [1];
    for (let i = 1; i <= totalPages; i++) {
      if (!pageCount.includes(i)) {
        pageCount.push(i);
      }
    }
    setPages([...pageCount]);
  }, [totalPages]);

  return (
    <div>
      {" "}
      <ul className="pagination" style={{ cursor: "pointer" }}>
        <li className={currentPage + 1 == pages[0] ? "page-item disabled" : ""}>
          <a
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {pages.map((number: any, idx: any) => {
          return (
            <li
              key={idx}
              className={
                currentPage + 1 == number ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => setCurrentPage(number - 1)}
              >
                {number}
              </a>
            </li>
          );
        })}

        <li
          className={
            currentPage + 1 == pages[pages.length - 1]
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;
