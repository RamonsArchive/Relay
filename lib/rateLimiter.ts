// utils/rateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {redis} from "@/upstash/Redis";

// Initialize the rate limiter
console.log("REDIS URL", process.env.UPSTASH_REDIS_REST_URL);
console.log("REDIS KEY", process.env.UPSTASH_REDIS_REST_TOKEN);
console.log("REdis ", Redis.fromEnv());

export const rateLimiter = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(10, "30 s"), // Allow 10 requests per 10 seconds
  analytics: true,
});

export const clientRateLimiter = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(50, "10 s"), // Allow 10 requests per 10 seconds
  analytics: true,
});