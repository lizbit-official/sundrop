/// <reference types="@types/google.maps" />
'use client';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import { useLocalStorageState } from 'ahooks';
import AutocompleteSearch from '@/components/controls/AutocompleteSearch/AutocompleteSearch';
import Button from '@/components/buttons/Button';
import { getAutocompleteResultsQuery, getPlaceFromCoordinatesQuery } from '@/services/places/places.client';
import type { Place } from '@/services/places/places.types';
import { useGeolocation } from '@/hooks/useGeolocation';
import styles from './PlaceAutocompleteInput.module.scss';

interface PlaceAutocompleteInputProps {
  place: Place | null;
}

const PlaceAutocompleteInput = (props: PlaceAutocompleteInputProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(!props.place);
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  // selected place ID (persistent)
  const [placeId, setPlaceId] = useLocalStorageState<string>(
    'place-id',
    { defaultValue: '' }
  );

  // utils to get geolocation data from browser
  const { locationCoords, isLocating, getGeolocation } = useGeolocation();

  // called when an option is selected from the location search
  const handleOptionSelected = useCallback((option: google.maps.places.AutocompletePrediction | null) => {
    if (option) {
      setPlaceId(option.place_id);
    }
  }, [setPlaceId]);

  // click handler for change location button
  const handleChangeLocation = useCallback(() => {
    setIsOpen(true);
  }, []);

  // click handler for use current location button
  const handleUseCurrentLocation = useCallback(() => {
    setIsOpen(false);
    setSearchInput('');
    getGeolocation();
  }, [getGeolocation]);

  // redirect to placeId route when placeId changes
  useEffect(() => {
    if (placeId) {
      router.push(`/${placeId}`);
    }
  }, [placeId, router]);

  // load autocomplete options if searchInput changes
  useEffect(() => {
    if (searchInput) {
      getAutocompleteResultsQuery(searchInput).then((predictions) => {
        setOptions(predictions);
      });
    }
  }, [searchInput]);

  // load place if locationCoords changes (user geolocation)
  useEffect(() => {
    if (locationCoords) {
      getPlaceFromCoordinatesQuery(locationCoords).then((place) => {
        setPlaceId(place.placeId);
      });
    }
  }, [locationCoords, placeId, setPlaceId]);

  const newPlaceIsLoading = placeId && props.place?.placeId !== placeId;

  if (isOpen) {
    console.log(newPlaceIsLoading, placeId, props?.place?.placeId);
    return (
      <div className={cx(styles.PlaceAutocompleteInput)}>
        {(isLocating || newPlaceIsLoading)
          ? <div>Loading place data...</div>
          : (
            <>
              <AutocompleteSearch<google.maps.places.AutocompletePrediction>
                label="Enter location"
                options={options}
                onSelected={handleOptionSelected}
                onSearch={setSearchInput}
                renderOption={(option, pIdx, activeIdx, handleSelected): ReactElement => (
                  <div
                    className={cx(styles.LocationPickerItem, {
                      [styles.highlighted]: pIdx === activeIdx,
                    })}
                    key={`result-${option?.place_id ?? ''}`}
                    onClick={(): void => { handleSelected(option); }}
                  >{option?.description}</div>
                )}
              />
              <Button
                isLoading={isLocating}
                label="Use Current Location"
                onClick={handleUseCurrentLocation}
              />
            </>
          )}
      </div>
    );
  }
  // else: closed, w/ place
  else {
    return (
      <div className={cx(styles.PlaceAutocompleteInput)}>
        <div className={cx(styles.placeName)}>{props.place?.name ?? '- none -'}</div>
        <Button
          label="Change Location"
          onClick={handleChangeLocation}
        />
      </div>
    );
  }
};

export default PlaceAutocompleteInput;
