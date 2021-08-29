# Challenge Chart Plot

## Libraries
To complete the challenge I used the following libraries:

 - ChartJS: It was used to plot the line chart.
 - Moment: It was used to do some date calculations.
 - Ace Editor: It was used to implement the code editor.
 - Styled Components: It was used to do the styles of the application.

The first important choice was what chart library to use, I have some experience with `plotly.js` and `ChartJS` and chose ChartJS because of better support and documentation, specially when using alongside `React`.
`Moment` was chosen to sped up the process, as doing date calculations can sometimes be really troublesome.
I chose `AceEditor` mostly because I needed a simple and easy to use code editor, I have used some rich text editors but thought they would be overkill since I just wanted to be able to follow the layout and have the user input JSON or JSON-like strings directly. 
`Styled components` make it easier to control your styles and better organize my project file structure.

I also used `create-react-app` to build the application.

## Building the chart

ChartJS have a lot of config options but I decided for simplicity so I could have the most time possible to finish the challenge. So the initial config was this object:
```js
const  chartConfig  = {
	type:  'line',
		data: {
		}
		options: {
			maintainAspectRatio:  false,
			scales: {
				y: {
					ticks: {
						display:  false,
					}
			}
		}
		plugins: {
			legend: {
				position:  'right'
				align:  'start',
			},
		},
	},
};
```
The data property expects an array of what is going to be plotted in the chart. I needed to format the user's input so the chart could be plotted, so I used mostly regex to do it, first by getting everything that was between curly brackets, and then by putting double quotes around the key values of the string.

Then it was important to put the `select` into an array to iterate over them and create the points using the pairs of `min_response_time` and `max_response_time`. All that was left was to subtract the end and begin time to use as the x axis of the chart.

## Protection

To protect the input from huge amounts of data I used a simple solution, maybe it's too simple but I think it's a good starting point. I decided to limit the length of the input to 10000, so anything more than that is blocked by the application and the user has to click a button to trim the length to the acceptable range. The number was just a guess as "huge amount" can change depending on the context. There is a counter for the user to check how much of the limit his being used.

## Testing

I created tests for the most important functions used: `formatSentence`, `timeDifference` ad `parseInput`. formatSentence is used to format the legend text, timeDifference is used to calculate the begin and end difference and parseInput has all the regex and logic to support both JSON and the JSON-like format proposed by the challenge.

## What is missing
I wasn't able to fully apply the resize feature. I tried to use the css property resize together with overflow, but I ran into some problems with flex-grow and flex-shrink. I also tried to resize the containers by changing the height by subtracting and adding the values but also ran into some problems and couldn't make it work. I think calculating the size and changing it dynamically is the right approach but I may need some help or more time.

## Run Project

To run the project simply run the commands:

    yarn
    yarn start

## Example inputs
### JSON:
```json
{"type": "start", "timestamp": 1519862400000, "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]}
{"type": "span", "timestamp": 1519862400000, "begin": 1519862400000, "end": 1519862460000}
{"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.3}
{"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 1.2}
{"type": "data", "timestamp": 1519862400000, "os": "mac", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.2}
{"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "firefox", "min_response_time": 0.1, "max_response_time": 1.0}
{"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "chrome", "min_response_time": 0.2, "max_response_time": 0.9}
{"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.0}
{"type": "data", "timestamp": 1519862460000, "os": "mac", "browser": "firefox", "min_response_time": 0.2, "max_response_time": 1.1}
{"type": "data", "timestamp": 1519862460000, "os": "linux", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 1.4}
{"type": "stop", "timestamp": 1519862460000}
```
### JSON-like:
```
{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group:['os', 'browser']}
{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.3}
{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 1.2}
{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.2}
{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', 'min_response_time': 0.1, 'max_response_time': 1.0}
{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', 'min_response_time': 0.2, 'max_response_time': 0.9}
{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', 'min_response_time': 0.1, 'max_response_time': 1.0}
{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', 'min_response_time': 0.2, 'max_response_time': 1.1}
{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', 'min_response_time': 0.3, 'max_response_time': 1.4}
{type: 'stop', timestamp: 1519862460000}
```