const server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
const { assert, expect } = require("chai");

chai.use(chaiHttp);
const TEST_BASEURL = "localhost:1313/api/v1";

// Case will be added bellow  -
