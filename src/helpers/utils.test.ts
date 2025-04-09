import { getFullName, formatDate } from './utils';
import { type CMSPersonalInformation } from '../cms-integration/markdown/personal';

describe('utils helpers', () => {
  describe('getFullName', () => {
    it('should return the full name correctly', () => {
      const mockPersonalInfo: CMSPersonalInformation = {
        attributes: {
          givenName: 'Mocky',
          familyName: 'McMockface',
          location: 'Mockville',
          // other optional fields don't matter for this test
        },
        html: '',
      };
      expect(getFullName(mockPersonalInfo)).toBe('Mocky McMockface');
    });
  });

  describe('formatDate', () => {
    it('should format a Date object correctly', () => {
      const testDate = new Date(2023, 5, 15); // June 15, 2023
      expect(formatDate(testDate)).toBe('June 2023');
    });

    it('should format a number timestamp correctly', () => {
      // Timestamp for July 20, 2024
      const testTimestamp = new Date(2024, 6, 20).getTime();
      expect(formatDate(testTimestamp)).toBe('July 2024');
    });

    // Example for a different locale if needed, though the function hardcodes 'en-US'
    // it('should format date according to en-US locale', () => {
    //   const testDate = new Date(2023, 0, 1); // Jan 1, 2023
    //   // Mocking or checking specific locale output can be complex
    //   expect(formatDate(testDate)).toBe('January 2023');
    // });
  });
});
