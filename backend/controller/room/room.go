package room

import (
	"net/http"

	"github.com/gin-gonic/gin"
	//"github.com/Parichatx/user-system2/config"
	//"github.com/Parichatx/user-system2/entity"
	
)

func GetRooms(c *gin.Context) {
	var rooms []entity.Rooms
	if err := entity.DB().Find(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, rooms)
}

func CreateRoom(c *gin.Context) {
	var room entity.Rooms
	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&room).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, room)
}
