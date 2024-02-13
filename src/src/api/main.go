package main

import (
	"fmt"
	"io"
	"src/handler"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Use(func(c *fiber.Ctx) error {
        c.Set("Access-Control-Allow-Origin", "*")
        c.Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        c.Set("Access-Control-Allow-Headers", "Content-Type")
        if c.Method() == "OPTIONS" {
            return c.SendStatus(fiber.StatusOK)
        }
        return c.Next()
    })

	app.Post("/fileinput", func(c *fiber.Ctx) error {
		file, err := c.FormFile("file")
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error uploading file")
		}

		if !strings.HasSuffix(file.Filename, ".txt") {
			return c.Status(fiber.StatusBadRequest).SendString("Error: File must have a .txt extension")
		}

		fileContent, err := file.Open()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error reading file")
		}
		defer fileContent.Close()

		content, err := io.ReadAll(fileContent)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error reading file")
		}

		data, err := handler.ReadRequestBody(string(content))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error parsing file content")
		}

		start := time.Now()
		visited := make([][]bool, len(data.Matrix))
		for i := range visited {
			visited[i] = make([]bool, len(data.Matrix[0]))
		}

		var allCombinations [][]handler.Result

		handler.BruteForce(data.Matrix, visited ,0, 0, []handler.Result{},&allCombinations,data.BufferSize)

		total,opt:=handler.SearchPoint(allCombinations,data.Sequences,0)

		fmt.Println(total)
		fmt.Println(opt)
		elapsed := time.Since(start)
		fmt.Printf("Processing time: %s\n", elapsed)

		response := map[string]interface{}{
			"matrix":data.Matrix,
			"total": total,
			"opt":   opt,
			"time":float64(elapsed.Microseconds())/1000,
			"sequences":data.Sequences,
		}

		return c.JSON(response)
	})

	app.Post("/manualinput", func(c *fiber.Ctx) error {
		var requestBody map[string]interface{}
		if err := c.BodyParser(&requestBody); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing request body")
		}

		start := time.Now()
		data, err := handler.ReadRandomize(requestBody)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error parsing request data")
		}

		visited := make([][]bool, len(data.Matrix))
		for i := range visited {
			visited[i] = make([]bool, len(data.Matrix[0]))
		}

		var allCombinations [][]handler.Result

		handler.BruteForce(data.Matrix, visited ,0, 0, []handler.Result{},&allCombinations,data.BufferSize)
	
		total,opt:=handler.SearchPoint(allCombinations,data.Sequences,0)

		fmt.Println(total)
		fmt.Println(opt)
		elapsed := time.Since(start)
		fmt.Printf("Processing time: %s\n", elapsed)

		response := map[string]interface{}{
			"matrix":data.Matrix,
			"total": total,
			"opt":   opt,
			"time":float64(elapsed.Microseconds())/1000,
			"sequences":data.Sequences,
		}
	
		return c.JSON(response)
	})
	

	fmt.Println("Server listening on port 8080")
	app.Listen(":8080")
}
