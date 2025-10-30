/**
 * Unified System Monitoring Script
 * Supports production, development, and experimental (AI-powered) modes
 */

const ENV = process.env.NODE_ENV || "production";

const monitorConfig = {
  production: {
    interval: 60000,
    alertThreshold: 80,
    debugMode: false,
  },
  development: {
    interval: 5000,
    alertThreshold: 90,
    debugMode: true,
    verboseLogging: true,
  },
  experimental: {
    interval: 30000,
    alertThreshold: 75,
    aiEnabled: true,
    mlModelPath: "./models/anomaly-detection.h5",
    cloudProviders: ["aws", "azure", "gcp"],
    predictiveWindow: 300, // 5 minutes ahead
  },
};

const config = monitorConfig[ENV];

// 🕒 Added uptime tracker feature
let startTime = Date.now();

function getUptime() {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

console.log("================================================");
console.log(`DevOps Simulator - Monitor (${ENV.toUpperCase()} MODE)`);
if (ENV === "experimental") {
  console.log("AI-Powered Predictive Monitoring ENABLED");
}
console.log("================================================");

function predictFutureMetrics() {
  console.log("\n🤖 AI Prediction Engine:");
  console.log("Analyzing historical patterns...");
  const prediction = {
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    traffic: Math.random() * 1000,
    confidence: (Math.random() * 30 + 70).toFixed(2),
  };

  console.log(`📊 Predicted metrics in ${config.predictiveWindow}s:`);
  console.log(
    `   CPU: ${prediction.cpu.toFixed(2)}% (confidence: ${prediction.confidence}%)`
  );
  console.log(
    `   Memory: ${prediction.memory.toFixed(2)}% (confidence: ${prediction.confidence}%)`
  );
  console.log(
    `   Traffic: ${prediction.traffic.toFixed(0)} req/s (confidence: ${prediction.confidence}%)`
  );

  if (prediction.cpu > config.alertThreshold) {
    console.log("⚠️  PREDICTIVE ALERT: High CPU expected - Pre-scaling initiated");
  }
}

function checkSystemHealth() {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] === SYSTEM HEALTH CHECK ===`);
  console.log(`Uptime: ${getUptime()}`); // 🕒 Added uptime output

  // Basic system metrics
  const cpu = Math.random() * 100;
  const mem = Math.random() * 100;
  const disk = Math.random() * 100;

  console.log(`CPU: ${cpu.toFixed(2)}%`);
  console.log(`Memory: ${mem.toFixed(2)}%`);
  console.log(`Disk: ${disk.toFixed(2)}%`);

  // AI-powered monitoring
  if (ENV === "experimental" && config.aiEnabled) {
    console.log("\n☁️ Multi-Cloud Status:");
    config.cloudProviders.forEach((cloud) => {
      console.log(`   ${cloud.toUpperCase()}: HEALTHY`);
    });
    console.log("\n🤖 Running AI Analysis...");
    predictFutureMetrics();
  }

  // Status summary
  const maxUsage = Math.max(cpu, mem, disk);
  if (maxUsage > config.alertThreshold) {
    console.log("\n🔴 System Status: WARNING - High resource usage");
  } else {
    console.log("\n🟢 System Status: HEALTHY");
  }
}

console.log(`\nMonitoring interval: ${config.interval}ms`);
setInterval(checkSystemHealth, config.interval);
checkSystemHealth();
