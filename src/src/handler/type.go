package handler

type Data struct {
    BufferSize int
    Width      int
    Height     int
    Matrix     [][]string
    Sequences   []struct {
        Sequence []string
        Reward   int
    }
}

type Result struct {
	Col int
	Row int
	Token string
}

type Manual struct {
    UniqueTokenTotal int
    UniqueToken      string
    BufferSize       int
    Height           int
    MatrixWeight     int
    SequenceTotal1   int
    SequenceTotal2   int
}