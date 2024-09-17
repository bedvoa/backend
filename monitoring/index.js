const express = require("express");
const prometheus = require("prom-client");

// prometheus 기본 설정
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Counter 예제
const counter = new prometheus.Counter({
  name: "node_request_operations_total",
  help: "The total number of processed requests",
});

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  counter.inc();
  res.send("Hello World!");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", prometheus.register.contentType);
    const metrics = await prometheus.register.metrics(); // 비동기 처리
    res.end(metrics); // 메트릭을 응답으로 보냄
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
