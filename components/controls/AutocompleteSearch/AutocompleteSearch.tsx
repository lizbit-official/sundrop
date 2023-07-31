import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import styles from '@/styles/form.module.scss';

export interface AutocompleteSearchProps<T = any | null> {
  label?: string;
  options?: T[];
  renderOption?: (
    option: T | null,
    optIdx: number,
    activeIdx: number,
    onSelected: (value: T) => void,
  ) => JSX.Element;
  onSelected?: (option: T | null) => any;
  onSearch?: (searchInput: string) => any;
}

const AutocompleteSearch = <T = any>({
  label = '',
  options,
  onSelected,
  onSearch,
  renderOption = () => (<></>),
}: AutocompleteSearchProps<T | null>) => {
  const [searchInput, setSearchInput] = useState('');

  // which option in the result dropdown is hovered / active (via focus or tabindex)
  const [highlightedOptionIdx, setHighlightedOptionIdx] = useState(-1);

  // pass `searchInput` value to `onSearch` prop to look up options whenever it changes
  useEffect(() => {
    onSearch && onSearch(searchInput);
  }, [onSearch, searchInput]);

  const handleSelected = useCallback((option: T | null = null) => {
    setSearchInput('');
    onSelected && onSelected(option);
  }, [onSelected]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setHighlightedOptionIdx(-1);
  }, []);

  const handleInputClear = useCallback(() => {
    // clear input / text field
    setSearchInput('');

    // emit null selected option
    onSelected && onSelected(null);
  }, [onSelected]);

  // todo: switch to useReducer?
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Tab') {
      e.preventDefault();
      setHighlightedOptionIdx(highlightedOptionIdx < (options?.length || -1) ? highlightedOptionIdx + 1 : 0);
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedOptionIdx(highlightedOptionIdx > 0 ? highlightedOptionIdx - 1 : options?.length || 0);
    }
    else if (e.key === 'Enter' && highlightedOptionIdx > -1 && options?.[highlightedOptionIdx]) {
      e.preventDefault();
      handleSelected(options[highlightedOptionIdx]);
      setHighlightedOptionIdx(-1);
    }
  }, [handleSelected, highlightedOptionIdx, options]);

  return (
    <div className={styles.formControl}>
      <label
        className={styles.label}
        htmlFor="autocomplete-search"
      >{label ?? 'Enter search terms'}</label>
      <input
        className={styles.input}
        type="search"
        role="searchbox"
        aria-label="autocomplete-search"
        id="autocomplete-search"
        name="autocomplete-search"
        autoFocus={true}
        value={searchInput}
        onChange={handleInputChange}
        onReset={handleInputClear}
        onKeyDown={handleKeyDown}
      />
      {searchInput && (
        <div className={styles.optionsMenu}>
          {options?.map((option, optIdx) => renderOption(option, optIdx, highlightedOptionIdx, handleSelected))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
