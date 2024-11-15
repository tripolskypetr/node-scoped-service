import micro from "micro";
import http from "http";
import Router from "router";
import finalhandler from "finalhandler";
import serveHandler from "serve-handler";

import { ioc, AppwriteService } from './lib';

import { getAuthToken } from "./utils/getAuthToken";

const router = Router();

router.get("/api/v1/count_todo", (req, res) => {
  const jwtToken = getAuthToken(req);
  AppwriteService.runInContext(async () => {
    micro.send(res, 200, await ioc.todoRequestService.getTodoCount());
  }, jwtToken);
});

router.get("/api/v1/list_todo", (req, res) => {
  const jwtToken = getAuthToken(req);
  AppwriteService.runInContext(async () => {
    micro.send(res, 200, await ioc.todoViewService.list());
  }, jwtToken);
});

router.post("/api/v1/create_todo", async (req, res) => {
  const { title } = <any>await micro.json(req); 
  const jwtToken = getAuthToken(req);
  AppwriteService.runInContext(async () => {
    micro.send(res, 200, await ioc.todoViewService.create({ title, completed: false }));
  }, jwtToken);
});

router.get("/*", (req, res) => serveHandler(req, res, {
  public: "./public",
}));

const server = new http.Server(
  micro.serve(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    return router(
      req,
      res,
      finalhandler(req, res),
    );
  })
);

server.listen(80);

console.log("Server listening on http://localhost:80")
