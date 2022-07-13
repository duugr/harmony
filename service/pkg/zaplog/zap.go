package zaplog

import (
	"os"

	"github.com/duugr/harmony/service/core/config"
	"github.com/natefinch/lumberjack"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	Logger *zap.Logger
	Sugar  *zap.SugaredLogger
)

// logpath 日志文件路径
// loglevel 日志级别
func InitLogger() {
	// 日志分割
	write := getLogWriter()

	// 设置日志级别
	// debug 可以打印出 info debug warn
	// info  级别可以打印 warn info
	// warn  只能打印 warn
	// debug->info->warn->error
	level := getEnab()
	encoderConfig := getEncoder()

	var enc zapcore.Encoder

	switch config.Configure.Log.GetString("env") {
	case "prod":
		enc = zapcore.NewJSONEncoder(encoderConfig)
	default:
		enc = zapcore.NewConsoleEncoder(encoderConfig)
	}

	// 设置日志级别
	core := zapcore.NewCore(
		enc,
		zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout), zapcore.AddSync(write)), // 打印到控制台和文件
		// write,
		level,
	)

	// 开启文件及行号
	option := zap.Development()
	// 开启开发模式，堆栈跟踪
	caller := zap.AddCaller()
	// 设置初始化字段,如：添加一个服务器名称
	filed := zap.Fields(zap.String(config.Configure.App.GetString("app.name"), config.Configure.App.GetString("app.sub.name")))
	// 构造日志
	Logger = zap.New(core, caller, option, filed)
	Sugar = Logger.Sugar()
	defer Logger.Sync()
}
func getEncoder() zapcore.EncoderConfig {

	return zapcore.EncoderConfig{
		TimeKey:        "time",
		LevelKey:       "level",
		NameKey:        "logger",
		CallerKey:      "linenum",
		MessageKey:     "msg",
		StacktraceKey:  "stacktrace",
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeLevel:    zapcore.LowercaseLevelEncoder,  // 小写编码器
		EncodeTime:     zapcore.ISO8601TimeEncoder,     // ISO8601 UTC 时间格式
		EncodeDuration: zapcore.SecondsDurationEncoder, //
		EncodeCaller:   zapcore.FullCallerEncoder,      // 全路径编码器
		EncodeName:     zapcore.FullNameEncoder,
	}
}

func getEnab() zapcore.LevelEnabler {
	switch config.Configure.Log.GetString("level") {
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

func getLogWriter() zapcore.WriteSyncer {
	envLogfile := config.Configure.Log.GetString("file")
	maxSize := config.Configure.Log.GetInt("max_size")
	maxBackups := config.Configure.Log.GetInt("max_backups")
	maxAge := config.Configure.Log.GetInt("max_age")
	compress := config.Configure.Log.GetBool("compress")

	// 日志分割
	lumberJackLogger := &lumberjack.Logger{
		Filename:   envLogfile, // 日志文件路径，默认 os.TempDir()
		MaxSize:    maxSize,    // 每个日志文件保存10M，默认 100M,
		MaxBackups: maxBackups, // 保留30个备份，默认不限
		MaxAge:     maxAge,     // 保留7天，默认不限
		Compress:   compress,   // 是否压缩，默认不压缩
	}
	return zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout), zapcore.AddSync(lumberJackLogger)) // 打印到控制台和文件
}
