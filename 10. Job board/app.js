import { useState, useEffect, useRef } from "react";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const LIMIT = 6;

export default function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const resIdList = await fetch(`${BASE_URL}/jobstories.json`);
      const idList = await resIdList.json();

      const resPromises = idList.map(async (id) => {
        const res = await fetch(`${BASE_URL}/item/${id}.json`);
        const json = await res.json();
        return json;
      });

      const info = (await Promise.allSettled(resPromises))
        .filter((ele) => ele.status === "fulfilled")
        .map((ele) => ele.value);
      setData(info);

      console.log(info);
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      {data.slice(0, offset + LIMIT).map((ele) => (
        <div className="job-item" key={ele.id}>
          <a
            className="job-title"
            href={ele.url}
            target="_blank" // open in a new blank page - moves from current
            rel="noopener noreferrer" // Always add rel="noopener noreferrer" when using _blank.
          >
            {ele.title}
          </a>

          <div className="job-meta">
            <span>by {ele.by}</span>
            <span>•</span>
            <span>{new Date(ele.time * 1000).toLocaleDateString()}</span>
          </div>
        </div>
      ))}

      {offset < data.length && (
        <button
          className="load-more"
          onClick={() => setOffset((prev) => prev + LIMIT)}
        >
          Load More
        </button>
      )}
    </div>
  );
}
