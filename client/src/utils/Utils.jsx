const sortedCountries = (payload, countries) => {
  let sorted;
  if (payload === "Orden" || payload === "") {
    sorted = countries;
  } else {
    if (payload === "ascendName") {
      sorted = countries.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (b.name > a.name) {
          return -1;
        }
        return 0;
      });
    } else if (payload === "descendName") {
      sorted = countries.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        } else if (b.name > a.name) {
          return 1;
        }
        return 0;
      });
    } else if (payload === "ascendPob") {
      sorted = countries.sort((a, b) => {
        if (a.population > b.population) {
          return 1;
        } else if (b.population > a.population) {
          return -1;
        }
        return 0;
      });
    } else if (payload === "descendPob") {
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

const filterByActivity = (payload, countries, allCountries, continent) => {
  let stateFilteredAct = [];
  if (payload === "All" || payload === "") {
    if (continent && countries.length !== 0) {
      stateFilteredAct = countries;
    } else {
      stateFilteredAct = allCountries;
    }
  } else {
    let id = parseInt(payload);
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

const filterByContinent = (payload, countries, allCountries) => {
  let stateFiltered = [];
  if (payload.length !== 0) {
    for (let element of payload) {
      stateFiltered = [
        ...stateFiltered,
        ...countries.filter((value) => value.continent === element),
      ];
    }
  } else {
    stateFiltered = allCountries;
  }
  return stateFiltered;
};

export { sortedCountries, filterByActivity, filterByContinent };
