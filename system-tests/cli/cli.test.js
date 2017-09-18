"use strict";
const cli = require("../../lib/cli");
const sinon = require("sinon");

const argv = process.argv;
let exit;
let log;
describe("cli", () => {
  beforeEach(function() {
    exit = sinon.stub(process, "exit");
    log = sinon.stub(console, "log");
  });

  afterEach(function() {
    process.argv = argv;
    process.exitCode = 0;
    exit.restore();
    log.restore();
  });

  it("basic", () => {
    return expect(cli()).rejects.toHaveProperty("code", 78);
  });

  it("--help", () => {
    process.argv = ["--help"];
    return cli()
      .catch(() => {
        //
      })
      .then(() => {
        expect(log.firstCall.args[0]).toMatch(/Usage:/);
      });
  });
});
