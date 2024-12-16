package main

import (
	 //"github.com/Parichatx/SE-PARI/backend/config"
	// "github.com/Parichatx/user-system2/controller/course"
	// "github.com/Parichatx/user-system2/controller/course_category"
	// "github.com/Parichatx/user-system2/controller/like"
	// "github.com/Parichatx/user-system2/controller/login_history"
	// "github.com/Parichatx/user-system2/controller/payment"
	// "github.com/Parichatx/user-system2/controller/review"
	// "github.com/Parichatx/user-system2/controller/task"
	// "github.com/Parichatx/user-system2/controller/tutor_profiles"
	// "github.com/Parichatx/user-system2/controller/promptpay"
	// "github.com/Parichatx/user-system2/controller/creditcard"
	// "github.com/Parichatx/user-system2/controller/payment_method"
	 "github.com/Parichatx/SE-PARI"
	
	"github.com/gin-gonic/gin"
	
)

const PORT = "8000"

func main() {

	// เปิดการเชื่อมต่อฐานข้อมูล
	config.ConnectionDB()

	// สร้างฐานข้อมูล
	config.SetupDatabase()

	r := gin.Default()

	// Middleware can be added here (for example authentication check)
	// r.Use(middlewares.AuthMiddleware())

	// Define Routes
	api := r.Group("/api")
	{
		//api.GET("/users", GetUsers)
		// api.POST("/users", CreateUser)

		// api.GET("/rooms", GetRooms)
		// api.POST("/rooms", CreateRoom)

		// api.GET("/contracts", GetContracts)
		// api.POST("/contracts", CreateContract)

		 api.GET("/usages", SE-PARI.backend.controller.usage.GetUsages)
		// api.POST("/usages", CreateUsage)

		// api.GET("/billings", GetBillings)
		// api.POST("/billings", CreateBilling)
	}

	// Start the server
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// เริ่มรันเซิร์ฟเวอร์
	r.Run("localhost:" + PORT)
}
