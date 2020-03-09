"use-strict";
require("dotenv").config();
const { cfPush } = require("./cf-push");
const lowCodeAppGUID = "41d24d5f-0761-4557-b754-56a1238de546";
const developmentSpaceGUID = "e9977f50-ca20-4dff-a049-e8626c44bfe8";
const lowCodeAppName = "low-code-app";

cfPush("./app", lowCodeAppName, url => {
  console.log("URL=>", url);
});
