let config = {
    logger: {
        appenders: { main: { type: "dateFile", filename: "./logs/log.log", encoding: 'UTF-8', pattern: "yyyy-MM-dd-hh.log", compress: true, numBackups: 24 * 365 } },
        categories: { default: { appenders: ["main"], level: "all" } },
    }
}

module.exports=config