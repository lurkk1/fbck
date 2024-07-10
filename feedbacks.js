import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

const getFeedbackCount = async (feedbackValue) => {
  const kv = await Deno.openKv();
  const count = await kv.get(["feedback", feedbackValue]);
  return count.value ?? 0;
};

const incrementFeedbackCount = async (feedbackValue) => {
  const kv = await Deno.openKv();
  const currentCount = await getFeedbackCount(feedbackValue);
  await kv.set(["feedback", feedbackValue], currentCount + 1);
};

export { getFeedbackCount, incrementFeedbackCount };
