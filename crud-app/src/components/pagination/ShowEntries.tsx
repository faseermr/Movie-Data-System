import { useState } from "react";

type PropType = {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  // pages: number[];
};

const ShowEntries: React.FC<PropType> = ({ pageSize, setPageSize }) => {
  const [num, setNum] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div className="d-flex p-1 show-entrie-div mx-2">
      <p>Show</p>
      <select
        className="mx-1 show-entrie-select"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setPageSize(parseInt(e.target.value, 10))
        }
      >
        {num.map((n: number, idx) => {
          return (
            <option key={idx} value={n} selected={pageSize == n}>
              {n}
            </option>
          );
        })}
      </select>
      <p>Entries</p>
    </div>
  );
};

export default ShowEntries;
