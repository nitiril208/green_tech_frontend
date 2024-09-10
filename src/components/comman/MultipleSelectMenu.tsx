// src/Autocomplete.tsx
import React, { useState } from "react";

interface AutocompleteProps {
  suggestions: {
    label: string;
    value: string;
  }[];
  selectedItems: {
    label: string;
    value: string;
  }[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  setSelectedItems,
  selectedItems,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { label: string; value: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = () => {
    setFilteredSuggestions(
      suggestions.filter(
        (suggestion) =>
          !selectedItems.find((item) => item.value === suggestion.value)
      )
    );
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: {
    label: string;
    value: string;
  }) => {
    if (!selectedItems.includes(suggestion)) {
      setSelectedItems([...selectedItems, suggestion]);
      setInputValue(""); // Clear input field on selection
    }
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i?.label !== item));
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click event to register
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleFocus = () => {
    if (inputValue || selectedItems.length) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex flex-wrap items-center border border-gray-300 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          {/* Optional: Add icon or placeholder */}
        </div>
        <div className="flex flex-wrap w-full p-2">
          {selectedItems.map((item) => (
            <span
              key={item?.label}
              className="bg-slate-200 text-black px-2 py-1 rounded-md flex items-center mr-2"
            >
              {item?.label}
              <button
                type="button"
                onClick={() => handleRemoveItem(item?.label)}
                className="ml-2 text-black hover:text-gray-200 font-abhaya"
              >
                &times;
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseUp={() => {
              handleInputChange();
            }}
            className="flex-1 px-2 py-1 border-none focus:ring-0 focus:border focus:border-[#4b4b4b] shadow-none outline-none"
            placeholder={
              selectedItems.length ? "Select More..." : "Type to search..."
            }
          />
        </div>
      </div>
      {showSuggestions && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10  max-h-[200px] h-auto overflow-auto">
          {filteredSuggestions?.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 min-h-[100px] flex items-center justify-center font-semibold">
              No Data
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
