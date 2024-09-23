import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { ListGroup, FormControl } from "react-bootstrap";

interface AddressSuggestion {
  label: string;
  value: string;
}

interface Props {
  setResult: Dispatch<SetStateAction<string>>;
  defaultValue?: string;
}

function AddressAutocomplete({ setResult, defaultValue = "" }: Props) {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [selectedAddressWasManual, setSelectedAddressWasManual] =
    useState(false);
  const [firstLock, setFirstLock] = useState(true);

  useEffect(() => {
    setQuery(defaultValue);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2 && !selectedAddressWasManual) {
        console.log("appel");
        try {
          const response = await axios.get(
            `https://api-adresse.data.gouv.fr/search/?q=${query}`
          );
          const addresses = response.data.features.map((feature: any) => ({
            label: feature.properties.label,
            value: feature.properties.label,
          }));
          if (firstLock) setFirstLock(false);
          else setSuggestions(addresses);
        } catch (error) {
          console.error("Error fetching address suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
      if (!selectedAddressWasManual) setSelectedAddressWasManual(false);
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (address: string) => {
    setResult(address);
    setSelectedAddressWasManual(true);
    setQuery(address);
    setSuggestions([]);
  };

  return (
    <>
      <FormControl
        value={query}
        onChange={handleChange}
        placeholder="Rechercher une adresse"
        aria-label="Adresse"
      />
      {suggestions.length > 0 && (
        <ListGroup className="mt-2">
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleSelect(suggestion.value)}
            >
              {suggestion.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default AddressAutocomplete;
