import React from "react";

const ActivitySeasons = ({ seasons }) => {
  return (
    <div>
      {seasons &&
        seasons.map((season) => {
          return (
            <div>
              <div>{season.name}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ActivitySeasons;
