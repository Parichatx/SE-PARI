package CourseCategories

import (
	"net/http"

	"github.com/gin-gonic/gin"
	//"github.com/Parichatx/user-system2/config"
	//"github.com/Parichatx/user-system2/entity"
	
)

// GET /Course
func GetRooms(c *gin.Context)      { c.JSON(http.StatusOK, gin.H{"message": "Get all rooms"}) }
func CreateRoom(c *gin.Context)   { c.JSON(http.StatusCreated, gin.H{"message": "Create a room"}) }
func UpdateRoom(c *gin.Context)   { c.JSON(http.StatusOK, gin.H{"message": "Update a room"}) }
func DeleteRoom(c *gin.Context)   { c.JSON(http.StatusOK, gin.H{"message": "Delete a room"}) }
func GetResidents(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "Get all residents"}) }
func CreateResident(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "Create a resident"})
}
func UpdateResident(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Update a resident"})
}
func DeleteResident(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Delete a resident"})
}