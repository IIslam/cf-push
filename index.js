"use-strict";
require("dotenv").config();

const endpoint = process.env.ENDPOINT;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

console.log("End Point =>", endpoint);
console.log("Username =>", username);

const CloudController = new (require("cf-nodejs-client").CloudController)(
  endpoint
);
const UsersUAA = new (require("cf-nodejs-client").UsersUAA)();
const Apps = new (require("cf-nodejs-client").Apps)(endpoint);

CloudController.getInfo()
  .then(result => {
    UsersUAA.setEndPoint(result.authorization_endpoint);
    return UsersUAA.login(username, password);
  })
  .then(result => {
    console.log("Auth Result", result);
    Apps.setToken(result);
    return Apps.getApps();
  })
  .then(result => {
    console.log(result);
  })
  .catch(reason => {
    console.error("Error: " + reason);
  });
