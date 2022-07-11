package config

import (
	"sync"

	"github.com/spf13/viper"
)

type configure struct {
	Db  *viper.Viper
	Log *viper.Viper
	App *viper.Viper
	Rsa *viper.Viper
}

var (
	Configure configure

	configOnce sync.Once
)

func Init() {
	configOnce.Do(func() {
		c := &Configure
		c.Db = c.load("db")
		c.Log = c.load("log")
		c.App = c.load("app")
		c.Rsa = c.load("rsa")
	})
}

func (c *configure) load(configureName string) *viper.Viper {
	conf := viper.New()
	conf.SetConfigType("toml")
	conf.SetConfigName(configureName)
	conf.AddConfigPath("./conf")
	err := conf.ReadInConfig() // Find and read the config file
	if err != nil {            // Handle errors reading the config file
		panic(err)
	}
	return conf
}
