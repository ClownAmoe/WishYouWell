import cluster from "cluster";
import os from "os";

const numWorkers = 2;
const basePort = 3001;

if (cluster.isPrimary) {
  console.log(`Master PID: ${process.pid}`);

  const ports: Record<number, number> = {};

  for (let i = 0; i < numWorkers; i++) {
    const port = basePort + i;
    const worker = cluster.fork({ WORKER_PORT: port });

    ports[worker.id] = port;

    console.log(`Started worker ${worker.process.pid} on port ${port}`);
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died.`);

    const oldPort = ports[worker.id];
    console.log(`Restarting on same port ${oldPort}...`);

    const newWorker = cluster.fork({ WORKER_PORT: oldPort });

    ports[newWorker.id] = oldPort;
    delete ports[worker.id];
  });
} else {
  await import("./worker/worker.js");
}
