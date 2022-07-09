package config

import (
	"fmt"
	"sync"

	"github.com/spf13/viper"
)

type configure struct {
	Db  *viper.Viper
	Log *viper.Viper
}

var (
	Configure configure

	configOnce sync.Once
)

func (c *configure) Init() {
	configOnce.Do(func() {
		c.Db = c.load("db")
		c.Log = c.load("log")
	})
}

func (c *configure) load(configureName string) *viper.Viper {
	conf := viper.New()
	conf.SetConfigType("yaml")
	conf.SetConfigName(configureName)
	conf.AddConfigPath("/etc/appname/")
	err := conf.ReadInConfig() // Find and read the config file
	if err != nil {            // Handle errors reading the config file
		panic(fmt.Errorf("fatal error config file: %w", err))
	}
	return conf
}
