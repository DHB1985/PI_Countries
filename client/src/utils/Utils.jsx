const sortedCountries = (sort, countries) => {
  let sorted;
  if (sort === "Orden") {
    sorted = countries;
  } else {
    if (sort === "ascendName") {
      sorted = countries.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (b.name > a.name) {
          return -1;
        }
        return 0;
      });
    } else if (sort === "descendName") {
      sorted = countries.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        } else if (b.name > a.name) {
          return 1;
        }
        return 0;
      });
    } else if (sort === "ascendPob") {
      sorted = countries.sort((a, b) => {
        if (a.population > b.population) {
          return 1;
        } else if (b.population > a.population) {
          return -1;
        }
        return 0;
      });
    } else if (sort === "descendPob") {
      sorted = countries.sort((a, b) => {
        if (a.population > b.population) {
          return -1;
        } else if (b.population > a.population) {
          return 1;
        }
        return 0;
      });
    }
  }

  return sorted;
};

const filterByActivity = (activity, countries) => {
  let stateFilteredAct = [];
  if (activity === "All") {
    stateFilteredAct = countries;
  } else {
    let id = parseInt(activity);
    for (let element of countries) {
      if (element.activities.length !== 0) {
        for (let elem of element.activities) {
          if (elem.id === id) {
            stateFilteredAct = [...stateFilteredAct, element];
          }
        }
      }
    }
  }
  return stateFilteredAct;
};

const filterByContinent = (continents, countries) => {
  let stateFiltered = [];
  for (let element of continents) {
    stateFiltered = [
      ...stateFiltered,
      ...countries.filter((value) => value.continent === element),
    ];
  }
  return stateFiltered;
};

export { sortedCountries, filterByActivity, filterByContinent };