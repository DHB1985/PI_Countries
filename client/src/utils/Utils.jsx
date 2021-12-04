const sortedCountries = (payload, allCountries)=>{
    let sortedCountries;
    if (payload === "Orden") {
      sortedCountries = allCountries;
    } else {
      if (payload === "ascendName") {
        sortedCountries = countries.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "descendName") {
        sortedCountries = countries.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      } else if (payload === "ascendPob") {
        sortedCountries = countries.sort((a, b) => {
          if (a.population > b.population) {
            return 1;
          } else if (b.population > a.population) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "descendPob") {
        sortedCountries = countries.sort((a, b) => {
          if (a.population > b.population) {
            return -1;
          } else if (b.population > a.population) {
            return 1;
          }
          return 0;
        });
      }
    }

    return sortedCountries
}

export default {
    sortedCountries
}