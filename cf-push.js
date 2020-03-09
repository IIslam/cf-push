"use-strict";
require("dotenv").config();
const { exec } = require("child_process");

const cfPush = (path, appName, callback, errorCallback) => {
  const endpoint = process.env.ENDPOINT;
  const username = process.env.USER_NAME;
  const password = process.env.PASSWORD;
  const organization = process.env.ORG;
  const space = process.env.SPACE;
  exec(
    `cf login -a ${endpoint} -u ${username} -p ${password} -o ${organization} -s ${space}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return errorCallback({ error: `error: ${error.message}` });
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return errorCallback({ error: `stderr: ${stderr}` });
      }
      console.log(`stdout: ${stdout}`);

      exec(
        `cf push ${appName} -b staticfile_buildpack -p ${path}`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return errorCallback({ error: `error: ${error.message}` });
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return errorCallback({ error: `stderr: ${stderr}` });
          }

          let index = stdout.lastIndexOf("routes:");
          let url = `${stdout.substring(index, index + 50).split("\n")[0]}`;
          console.log({ url });
          return callback({ url: url.split(":")[1] });
        }
      );
    }
  );
};

module.exports = {
  cfPush
};
