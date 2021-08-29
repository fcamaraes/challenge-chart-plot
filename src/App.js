import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import {
  Container, Wrapper, Title, MainContainer, ContentContainer, Button, Warning,
  TrimButton, InputCounterContainer,
} from './App.styles';
import {
  formatSentence, randomColor, timeDifference, parseInput, padStart,
} from './utils';

function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);
  const [editorState, setEditorState] = useState({ readOnly: false });
  const [inputLength, setInputLength] = useState(0);
  const chartContainer = useRef(null);
  const editorContainer = useRef(null);

  const chartConfig = {
    type: 'line',
    data: {
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          position: 'right',
          align: 'start',
        },
      },
    },
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const createChart = (input, newData) => {
    if (!input) {
      return false;
    }

    let selects;
    let dataObject;

    const inputAsArray = parseInput(input);
    const dataTypeArray = [];

    if (!inputAsArray) {
      return false;
    }

    inputAsArray.map((item) => {
      switch (item.type) {
        case 'start':
          selects = item.select;
          break;
        case 'span':
          const timeDiff = timeDifference(item.end, item.begin);
          newData.labels = ['00:00', `${padStart(timeDiff.minutes())}:${padStart(timeDiff.seconds())}`];
          break;
        case 'data':
          selects.forEach((select) => {
            const formatedItem = formatSentence(`${item.os} ${item.browser} ${select}`);
            const existingItem = dataTypeArray.find((dataType) => dataType.label === formatedItem);

            if (!existingItem) {
              const color = randomColor();

              dataObject = {
                label: formatedItem,
                data: [item[select]],
                pointRadius: 5,
                borderColor: color,
                backgroundColor: color,
                fill: false,
              };

              dataTypeArray.push(dataObject);
            } else {
              existingItem.data.push(item[select]);
            }
          });
          break;
        default:

          break;
      }
      return false
    });

    newData.datasets = dataTypeArray;
    setData(newData);
  };

  const handleEditorChange = (value, event) => {
    setInputLength(value.length);
    if (inputLength < 10000) {
      setInput(value);
    } else {
      setEditorState({ readOnly: true });
    }
  };

  const updateDataset = (newData) => {
    chartInstance.data = newData;
    chartInstance.update();
  };

  const onButtonClick = () => {
    createChart(input, data);
    updateDataset(data);
  };

  const trimInput = () => {
    const { value } = editorContainer.current.props;
    const trimmedValue = value.substring(0, 9999);
    setEditorState(editorState.readOnly = false);
    setInput(trimmedValue);
    setInputLength(trimmedValue.length);
  };

  return (
    <MainContainer>
      <Wrapper>
        <Title>Felipe&apos;s Challenge</Title>
        <InputCounterContainer>
          <Warning show={editorState.readOnly}>
            Input limit reached
            <TrimButton onClick={trimInput}>Trim input</TrimButton>
          </Warning>
          <span>
            {inputLength}
            /10000
          </span>
        </InputCounterContainer>
      </Wrapper>

      <ContentContainer>
        <Container>
          <AceEditor
            ref={editorContainer}
            placeholder="Placeholder Text"
            mode="json"
            theme="solarized_dark"
            height="100%"
            width="100%"
            onChange={handleEditorChange}
            fontSize={14}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={input}
            readOnly={editorState.readOnly}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
              fontFamily: 'Source Code Pro',
            }}
          />
        </Container>

        <Container>
          <canvas ref={chartContainer} />
        </Container>
      </ContentContainer>

      <Wrapper>
        <Button onClick={onButtonClick} disabled={editorState.readOnly}>Generate Chart</Button>
      </Wrapper>

    </MainContainer>
  );
}

export default App;
