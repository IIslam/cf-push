"use-strict";
require("dotenv").config();
const { exec } = require("child_process");

const cfPush = (path, callback, errorCallback) => {
  const endpoint = process.env.ENDPOINT;
  const username = process.env.USER_NAME;
  const password = process.env.PASSWORD;

  // console.log("End Point =>", endpoint);
  // console.log("Username =>", username);

  const lowCodeAppGUID = "41d24d5f-0761-4557-b754-56a1238de546";
  const developmentSpaceGUID = "e9977f50-ca20-4dff-a049-e8626c44bfe8";
  const filePath = `${__dirname}/application.zip`;
  const lowCodeAppName = "low-code-app";
  exec(
    `cf login -a ${endpoint} -u ${username} -p ${password} -o digital-coe -s development`,
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
        `cf push ${lowCodeAppName} -b staticfile_buildpack -p ./app`,
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
          console.log(index);
          let url = `${stdout.substring(index, index + 100).split("\n")[0]}`;
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
