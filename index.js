"use-strict";
require("dotenv").config();
const { exec } = require("child_process");
const { cfPush } = require("./cf-push");
const endpoint = process.env.ENDPOINT;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

// console.log("End Point =>", endpoint);
// console.log("Username =>", username);

const lowCodeAppGUID = "41d24d5f-0761-4557-b754-56a1238de546";
const developmentSpaceGUID = "e9977f50-ca20-4dff-a049-e8626c44bfe8";
const filePath = `${__dirname}/application.zip`;
const lowCodeAppName = "low-code-app";

cfPush("./app", lowCodeAppName, url => {
  console.log("URL=>", url);
});
