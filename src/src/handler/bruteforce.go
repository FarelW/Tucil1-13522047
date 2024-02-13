package handler


func BruteForce(matrix [][]string, visited [][]bool, row, col int, combination []Result, allCombinations *[][]Result, size int) {
	if len(combination) == size {
		*allCombinations = append(*allCombinations, combination)
		return
	}

	if len(combination) == 0 {
		for i := 0; i < len(matrix[0]); i++ {
			newComb := []Result{{Col: i, Row: 0, Token: matrix[0][i]}}
			visited[0][i] = true
			BruteForce(matrix, visited, 0, i, newComb, allCombinations, size)
			visited[0][i] = false
		}
	} else {
		if len(combination)%2 == 1 {
			for j := 0; j < len(matrix); j++ {
				if j != row && !visited[j][col] {
					newComb := append([]Result{}, combination...)
					newComb = append(newComb, Result{Col: col, Row: j, Token: matrix[j][col]})
					visited[j][col] = true
					BruteForce(matrix, visited, j, col, newComb, allCombinations, size)
					visited[j][col] = false
				}
			}
		} else {
			for j := 0; j < len(matrix[0]); j++ {
				if j != col && !visited[row][j] {
					newComb := append([]Result{}, combination...)
					newComb = append(newComb, Result{Col: j, Row: row, Token: matrix[row][j]})
					visited[row][j] = true
					BruteForce(matrix, visited, row, j, newComb, allCombinations, size)
					visited[row][j] = false
				}
			}
		}
	}
}

func SearchPoint(combination [][]Result, seq []struct {
	Sequence []string
	Reward   int
}, total int) (int,[]Result) {
	mark:=0
	for i := 0; i < len(combination); i++ {
		temp := 0
		for j := 0; j < len(seq); j++ {
			if containsSequence(combination[i], seq[j].Sequence) {
				temp += seq[j].Reward
			}
		}

		if temp > total {
			total = temp
			mark=i
		}
	}

	return total,combination[mark]
}

func containsSequence(combination []Result, target []string) bool {
	if len(combination) < len(target) {
		return false
	}

	for i := 0; i <= len(combination)-len(target); i++ {
		found := true
		for j := 0; j < len(target); j++ {
			if combination[i+j].Token != target[j] {
				found = false
				break
			}
		}
		if found {
			return true
		}
	}
	return false
}