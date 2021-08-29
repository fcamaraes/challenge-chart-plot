import {
  formatSentence, timeDifference, parseInput,
} from './index';

test('replace underscore with whitespace', () => {
  expect(formatSentence('Hello_World')).toBe('Hello World');
});

test('return correct timeDifference object', () => {
  const expected = {
    years: 0, days: 0, hours: 0, milliseconds: 0, months: 0, seconds: 0, minutes: 1,
  };
  const actual = timeDifference(1519862460000, 1519862400000);
  expect(actual._data).toMatchObject(expected);
});

const expectedArray = [
  {
    type: 'start',
    timestamp: 1519862400000,
    select: ['min_response_time', 'max_response_time'],
    group: ['os', 'browser'],
  },
  {
    type: 'span',
    timestamp: 1519862400000,
    begin: 1519862400000,
    end: 1519862460000,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'linux',
    browser: 'chrome',
    min_response_time: 0.1,
    max_response_time: 1.3,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'mac',
    browser: 'chrome',
    min_response_time: 0.2,
    max_response_time: 1.2,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'mac',
    browser: 'firefox',
    min_response_time: 0.3,
    max_response_time: 1.2,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'linux',
    browser: 'firefox',
    min_response_time: 0.1,
    max_response_time: 1,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'linux',
    browser: 'chrome',
    min_response_time: 0.2,
    max_response_time: 0.9,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'mac',
    browser: 'chrome',
    min_response_time: 0.1,
    max_response_time: 1,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'mac',
    browser: 'firefox',
    min_response_time: 0.2,
    max_response_time: 1.1,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'linux',
    browser: 'firefox',
    min_response_time: 0.3,
    max_response_time: 1.4,
  },
  { type: 'stop', timestamp: 1519862460000 },
];

test('return correct data array when input has keys with no double quotes and is separated by new lines', () => {
  const actual = parseInput(`{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']}
  {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
  {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.3}
  {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 1.2}
  {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.2}
  {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', 'min_response_time': 0.1, 'max_response_time': 1.0}
  {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 0.9}
  {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.0}
  {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', 'min_response_time': 0.2, 'max_response_time': 1.1}
  {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.4}
  {type: 'stop', timestamp: 1519862460000}`);

  expect(actual).toEqual(expectedArray);
});

test('return correct data array when input has keys with no double quotes and is separated by commas', () => {
  const actual = parseInput("{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']},{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000},{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.3},{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 1.2},{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.2},{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', 'min_response_time': 0.1, 'max_response_time': 1.0},{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 0.9},{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.0},{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', 'min_response_time': 0.2, 'max_response_time': 1.1},{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.4},{type: 'stop', timestamp: 1519862460000}");

  expect(actual).toEqual(expectedArray);
});

test('return correct data array when input has keys with no double quotes and is concatenated', () => {
  const actual = parseInput(`{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']}
{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.3}{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 1.2}{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.2}{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', 'min_response_time': 0.1, 'max_response_time': 1.0}
{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 0.9}{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.0}{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', 'min_response_time': 0.2, 'max_response_time': 1.1}{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.4}{type: 'stop', timestamp: 1519862460000}`);

  expect(actual).toEqual(expectedArray);
});

test('return correct data when receiving json string separated by new line', () => {
  const actual = parseInput(`{"type": "start", "timestamp": 1519862400000, "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]}
  {"type": "span", "timestamp": 1519862400000, "begin": 1519862400000, "end": 1519862460000}
  {"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.3}
  {"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 1.2}
  {"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.2}
  {"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "firefox", "min_response_time": 0.1, "max_response_time": 1.0}
  {"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 0.9}
  {"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.0}
  {"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "firefox", "min_response_time": 0.2, "max_response_time": 1.1}
  {"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.4}
  {"type": "stop", "timestamp": 1519862460000}`);

  expect(actual).toEqual(expectedArray);
});

test('return correct data when receiving concatenated json string', () => {
  const actual = parseInput('{"type": "start", "timestamp": 1519862400000, "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]}{"type": "span", "timestamp": 1519862400000, "begin": 1519862400000, "end": 1519862460000}{"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.3}{"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 1.2}{"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.2}{"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "firefox", "min_response_time": 0.1, "max_response_time": 1.0}{"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 0.9}{"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.0}{"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "firefox", "min_response_time": 0.2, "max_response_time": 1.1}{"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.4}{"type": "stop", "timestamp": 1519862460000}');

  expect(actual).toEqual(expectedArray);
});

test('return correct data when receiving json string separated by commas', () => {
  const actual = parseInput('{"type": "start", "timestamp": 1519862400000, "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]},{"type": "span", "timestamp": 1519862400000, "begin": 1519862400000, "end": 1519862460000},{"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.3},{"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 1.2},{"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.2},{"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "firefox", "min_response_time": 0.1, "max_response_time": 1.0},{"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 0.9},{"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.0},{"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "firefox", "min_response_time": 0.2, "max_response_time": 1.1},{"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.4},{"type": "stop", "timestamp": 1519862460000}');

  expect(actual).toEqual(expectedArray);
});

test('return false when input is empty', () => {
  const input = '';

  expect(parseInput(input)).toBe(false);
});

test("return false when it's not possible to convert input into json", () => {
  const input = '"type":{ "start", "timestamp": 1519862400000, "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]}';

  expect(parseInput(input)).toStrictEqual([false]);
});
