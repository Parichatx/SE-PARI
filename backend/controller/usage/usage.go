package usage

import (
	"net/http"

	//"github.com/Parichatx/user-system2/entity"
	"github.com/gin-gonic/gin"
)

func GetUsages(c *gin.Context) {
	var usages []entity.Usage
	if err := entity.DB().Preload("Fee").Preload("Billing").Find(&usages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, usages)
}

func CreateUsage(c *gin.Context) {
	var usage entity.Usage
	if err := c.ShouldBindJSON(&usage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&usage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, usage)
}
