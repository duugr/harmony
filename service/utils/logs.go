package utils

import (
	"os"

	"github.com/natefinch/lumberjack"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	Logger *zap.Logger
	Sugar  *zap.SugaredLogger
)

func LogInit() {
	writeSyncer := getLogWriter()
	encoder := getEncoder()
	enab := getEnab()
	// core := zapcore.NewCore(encoder, os.Stdout, zapcore.DebugLevel)
	core := zapcore.NewCore(encoder, writeSyncer, enab)

	Logger = zap.New(core, zap.AddCaller())
	Sugar = Logger.Sugar()
	defer Logger.Sync()
}

func getEnab() zapcore.LevelEnabler {
	switch os.Getenv("LOG_LEVEL") {
	case "fatal":
		return zapcore.FatalLevel
	case "panic":
		return zapcore.PanicLevel
	case "error":
		return zapcore.ErrorLevel
	case "warn":
		return zapcore.WarnLevel
	case "info":
		return zapcore.InfoLevel
	default:
		return zapcore.DebugLevel
	}
}

func getEncoder() zapcore.Encoder {
	encoderConfig := zap.NewProductionEncoderConfig()
	// encoderConfig := zap.NewDevelopmentEncoderConfig()
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	return zapcore.NewConsoleEncoder(encoderConfig)
}

func getLogWriter() zapcore.WriteSyncer {
	envLogfile := os.Getenv("LOG_FILE")

	lumberJackLogger := &lumberjack.Logger{
		Filename:   envLogfile,
		MaxSize:    1,
		MaxBackups: 5,
		MaxAge:     30,
		Compress:   false,
	}
	return zapcore.AddSync(lumberJackLogger)
}
