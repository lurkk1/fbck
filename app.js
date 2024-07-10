import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as feedbacks from "./feedbacks.js";

const app = new Hono();
const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

app.get("/", async (c) => {
  const html = await eta.render("index.eta", {});
  return c.html(html);
});

app.get("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  const feedbackCount = await feedbacks.getFeedbackCount(id);
  return c.text(`Feedback ${id}: ${feedbackCount}`);
});

app.post("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  await feedbacks.incrementFeedbackCount(id);
  return c.redirect("/");
});

export default app;
