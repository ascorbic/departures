import { Link, navigate } from "gatsby";
import * as React from "react";
import { wrapper, homeLink } from "./station-search.module.css";

import * as autocompleteTheme from "./autocomplete.module.css";
import Autosuggest from "react-autosuggest";
import slugify from "slugify";

async function getSuggestions(
  value: string,
  stations: Array<{ crs: string; name: string }>
) {
  if (value.length < 2) {
    return [];
  }
  const val = value.toUpperCase();
  return stations.filter((station) => {
    if (value.length === 3 && val === station.crs) {
      return true;
    }
    return station.name.toUpperCase().includes(val);
  });
}

const getName = (suggestion) => suggestion.name;

function onSuggestionSelected(e, { suggestion }) {
  navigate(suggestion.url);
}

interface Props {
  initial?: string;
  allStations?: {
    name: string;
    crs: string;
    url: string;
  }[];
}

export const StationSearch: React.FC<Props> = function StationSearch({
  initial = "",
  allStations = [],
}) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [station, setStation] = React.useState(initial);
  function onSuggestionsFetchRequested({ value }) {
    getSuggestions(value, allStations).then(setSuggestions);
  }

  return (
    <div className={wrapper}>
      <Link className={homeLink} to="/" aria-label="Home"></Link>

      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={getName}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestion={(station) => (
          <Link to={station.url}>{station.name}</Link>
        )}
        inputProps={{
          value: station,
          onChange: (event, { newValue }) => setStation(newValue),
          placeholder: "Search for a station...",
        }}
        theme={autocompleteTheme}
      />
    </div>
  );
};
