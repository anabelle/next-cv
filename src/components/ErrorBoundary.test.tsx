import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Mock console.error to avoid polluting test output
const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

// Simple component that throws an error
const ProblemChild = () => {
  throw new Error('Test error');
};

// Simple component that renders fine
const GoodChild = () => <div>Test Child</div>;

describe('ErrorBoundary', () => {
  afterEach(() => {
    // Clear mock calls after each test
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    // Restore original console.error after all tests
    consoleErrorSpy.mockRestore();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>,
    );

    // Check if the child content is present
    expect(screen.getByText('Test Child')).toBeInTheDocument();

    // Check if the fallback UI is NOT present
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();

    // Check if console.error was NOT called with an actual Error object
    // This ignores potential warnings logged by React/Testing Library itself
    expect(consoleErrorSpy).not.toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object),
    );
  });

  it('should render fallback UI and log error when a child component throws an error', () => {
    // Prevent Jest from failing the test due to the caught error
    try {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );
    } catch (e) {
      // Expected error caught by ErrorBoundary, do nothing in test runner
    }

    // Check if the fallback UI is present
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    // Check if the child content (or any part of it) is NOT present
    expect(screen.queryByText('Test Child')).not.toBeInTheDocument(); // Assuming ProblemChild doesn't render this

    // Check if console.error WAS called by componentDidCatch
    expect(consoleErrorSpy).toHaveBeenCalled();
    // Optional: Check the arguments passed to console.error
    // expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), expect.any(Object));
  });
});
