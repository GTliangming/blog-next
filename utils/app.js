const next = require("next");
const express = require('express');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const server = express();

module.exports = {
	dev,
	app,
	server,
};
