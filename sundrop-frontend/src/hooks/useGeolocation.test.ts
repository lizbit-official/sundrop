import React from 'react';
import { renderHook } from '@testing-library/react';
import { useGeolocation } from '@hooks/useGeolocation';
import {
  mockGeolocationNotAvailable,
  mockGeolocationAvailable
} from '@test-utils/mockGeolocation';

describe('useGeolocation', () => {
  test('should error if no geolocation support', () => {
    const { result } = renderHook(useGeolocation);
    expect(result.current.statusMessage).toMatch(/^Error/i);
  });

  test('should prompt user to access location', () => {

  });
});
