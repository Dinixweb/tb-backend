import server from "../../app";
import chai from "chai";
import chaiHttp from "chai";
const should = chai.should();
import { assert, expect } from "chai";

chai.use(chaiHttp);
const TEST_BASEURL = "localhost:1313/api/v1";

// Case will be added bellow  -
