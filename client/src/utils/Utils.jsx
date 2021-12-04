const sortedCountries = (payload, countries)=>{
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

    return sorted
}

export {
    sortedCountries
}