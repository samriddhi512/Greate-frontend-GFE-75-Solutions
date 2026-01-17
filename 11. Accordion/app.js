import { useState } from "react";
export default function Accordion({ data }) {
  const [expandedList, setExpandedList] = useState(
    new Array(data.length).fill(true),
  );

  function toggleAccordion(idx) {
    console.log("came here");
    setExpandedList((prev) => {
      const temp = [...prev];
      temp[idx] = !prev[idx];
      return temp;
    });
  }

  return (
    <div className="container">
      {data.map((ele, idx) => {
        return (
          <div key={idx} className="accordion">
            <div
              onClick={() => toggleAccordion(idx)}
              className="acc-header"
              aria-controls={`panel-${idx}`}
              aria-expanded={expandedList[idx]}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleAccordion(idx);
                }
              }}
            >
              {ele.label} <span aria-hidden={true} className="accordion-icon" />
            </div>
            {expandedList[idx] && (
              <div className="acc-content" id={`panel-${idx}`}>
                {ele.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
