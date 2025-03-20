import cron from "cron";
import https from "https";
import "dotenv/config";

const job = new cron.CronJob("*/14 * * * * ", function () {
  https
    .get("process.env.API_URL", (res) => {
      if (res.statusCode === 200) console.log("API is working");
      else console.log("API is down");
    })
    .on("error", (e) => {
      "Error while sending request", e;
    });
});
export default job;
