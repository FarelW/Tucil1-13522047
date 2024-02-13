package handler

import (
    "fmt"
    "bufio"
	"log"
    "strconv"
    "strings"
    "math/rand"
    "time"
)

func ReadRequestBody(body string) (Data, error) {
	var data Data

	scanner := bufio.NewScanner(strings.NewReader(body))

	if scanner.Scan() {
		line := scanner.Text()
		bufferSize, err := strconv.Atoi(strings.TrimSpace(line))
		if err != nil {
			log.Printf("Error parsing buffer size: %v", err)
			return data, err
		}
		data.BufferSize = bufferSize
	}

	if scanner.Scan() {
		line := scanner.Text()
		dimensions := strings.Split(strings.TrimSpace(line), " ")
		if len(dimensions) != 2 {
			return data, fmt.Errorf("invalid dimensions format")
		}
		width, err := strconv.Atoi(dimensions[0])
		if err != nil {
			return data, fmt.Errorf("error parsing width: %v", err)
		}
		height, err := strconv.Atoi(dimensions[1])
		if err != nil {
			return data, fmt.Errorf("error parsing height: %v", err)
		}
		data.Width = width
		data.Height = height
	}

	data.Matrix = make([][]string, data.Height)
	for i := 0; i < data.Height; i++ {
		if !scanner.Scan() {
			return data, fmt.Errorf("unexpected end of input while reading matrix")
		}
		line := scanner.Text()
		elements := strings.Fields(line)
		if len(elements) != data.Width {
			return data, fmt.Errorf("invalid matrix row length: %d (expected: %d)", len(elements), data.Width)
		}
		data.Matrix[i] = elements
	}

	if scanner.Scan() {
		line := scanner.Text()
		sequenceLength, err := strconv.Atoi(strings.TrimSpace(line))
		if err != nil {
			log.Printf("Error parsing sequence length: %v", err)
			return data, err
		}
		data.Sequences = make([]struct {
			Sequence []string
			Reward   int
		}, sequenceLength)
	}

	for i := 0; i < len(data.Sequences); i++ {
		if !scanner.Scan() {
			return data, fmt.Errorf("unexpected end of input while reading sequence")
		}
		line := scanner.Text()
		sequence := strings.Fields(line)
		data.Sequences[i].Sequence = sequence
		if !scanner.Scan() {
			return data, fmt.Errorf("unexpected end of input while reading reward")
		}
		line = scanner.Text()
		reward, err := strconv.Atoi(strings.TrimSpace(line))
		if err != nil {
			log.Printf("Error parsing reward: %v", err)
			return data, err
		}
		data.Sequences[i].Reward = reward
	}

	return data, nil
}

func ReadRandomize(body map[string]interface{}) (Data, error) {
    var data Data

    parsedData := Manual{
        UniqueTokenTotal: getIntValue(body, "uniqueTokenTotal"),
        UniqueToken:      getStringValue(body, "uniqueToken"),
        BufferSize:       getIntValue(body, "bufferSize"),
        Height:           getIntValue(body, "height"),
        MatrixWeight:     getIntValue(body, "matrixWeight"),
        SequenceTotal1:   getIntValue(body, "sequenceTotal1"),
        SequenceTotal2:   getIntValue(body, "sequenceTotal2"),
    }

    data.BufferSize=parsedData.BufferSize
    data.Height=parsedData.Height
    data.Width=parsedData.MatrixWeight

    tokens := strings.Fields(parsedData.UniqueToken)

    if len(tokens) != parsedData.UniqueTokenTotal {
        return data, fmt.Errorf("the number of tokens does not match the uniqueTokenTotal")
    }

    matrix := make([][]string, parsedData.Height)
    for i := range matrix {
        matrix[i] = make([]string, parsedData.MatrixWeight)
    }

    tokenIndex := 0
    rand.Seed(time.Now().UnixNano())
    for i := range matrix {
        for j := range matrix[i] {
            tokenIndex = rand.Intn(len(tokens))
            matrix[i][j] = tokens[tokenIndex]
        }
    }

    data.Matrix = matrix

    sequences := make([]struct {
        Sequence []string
        Reward   int
    }, parsedData.SequenceTotal1)

    for i := range sequences {
        sequenceLength := rand.Intn(parsedData.SequenceTotal2-1) + 2 
        sequence := make([]string, sequenceLength)
        for j := range sequence {
            tokenIndex = rand.Intn(len(tokens))
            sequence[j] = tokens[tokenIndex]
        }
        reward := rand.Intn(20) * 5 +5
        sequences[i].Sequence = sequence
        sequences[i].Reward = reward
    }

    data.Sequences = sequences

    for _, row := range matrix {
        fmt.Println(row)
    }

    for _, seq := range sequences {
        fmt.Printf("Sequence: %v, Reward: %d\n", seq.Sequence, seq.Reward)
    }

    return data, nil
}

func getIntValue(data map[string]interface{}, key string) int {
    if val, ok := data[key].(float64); ok {
        return int(val)
    }
    return 0
}

func getStringValue(data map[string]interface{}, key string) string {
    if val, ok := data[key].(string); ok {
        return val
    }
    return ""
}