package contract

import (
	"net/http"

	//"github.com/Parichatx/user-system2/config"
	//"github.com/Parichatx/user-system2/entity"
	"github.com/gin-gonic/gin"
)


func GetContracts(c *gin.Context) {
	var contracts []entity.Contract
	if err := entity.DB().Preload("Room").Preload("Member").Find(&contracts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, contracts)
}

func CreateContract(c *gin.Context) {
	var contract entity.Contract
	if err := c.ShouldBindJSON(&contract); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&contract).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, contract)
}
