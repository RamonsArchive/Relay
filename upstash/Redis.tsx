import { Redis } from "@upstash/redis";

console.log("REDIST URL", process.env.UPSTASH_REDIS_REST_URL);
console.log("REdist key", process.env.UPSTASH_REDIS_REST_TOKEN);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

await redis.set("foo", "bar");
const data = await redis.get("foo");
