import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import CreateAgencyBtn from "../src/components/CreateAgencyBtn/CreateAgencyBtn";

const mockHistoryPush = jest.fn();

// Creates a mock router to be used for testing
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

// Checks if the rendered button from the CreateAgencyBtn component redirects to the correct URL
describe('CreateAgencyBtn', () => {
    it('Button goes to the correct URL on click', () => {
      const { getByRole } = render(
        <MemoryRouter>
          <CreateAgencyBtn />
        </MemoryRouter>,
      );
      fireEvent.click(getByRole('button'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/create-agency');
    });
  });