// __mocks__/vanillaExtractMock.js

// Super simple mock for *.css, *.scss, *.css.ts
// Returns a basic object.
// Any accessed property returns a mock function that returns a simple string.

const simpleHandler = {
  get: function (target, prop) {
    const propStr = prop.toString();
    // console.log(`Simple mock GET: ${propStr}`);

    // For common module/jest properties:
    if (prop === '__esModule') return false;
    if (prop === 'then') return undefined;

    // For any other property (like buttonStyle, atoms, style, variants, standard, alternate, etc.):
    // Return a *callable* mock function that also has a toString
    const mockFn = jest.fn((...args) => `mock-fn-call-${propStr}`);
    mockFn.toString = () => `mock-prop-string-${propStr}`;
    mockFn[Symbol.toPrimitive] = (hint) => {
      if (hint === 'string') {
        return `mock-prop-primitive-${propStr}`;
      }
      return null;
    };
    // Return the mock function directly
    return mockFn;
  },
};

module.exports = new Proxy({}, simpleHandler);
