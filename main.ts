import { Hono } from "https://deno.land/x/hono@v3.3.1/mod.ts";

const app = new Hono();

app.post("/", async (c) => {
  const body = await c.req.json();
  const url = body.url;

  const kv = await Deno.openKv();
  const result = await kv.get([url]);
  if (result.value) {
    return c.json({ registered: true });
  } else {
    await kv.set([url], new Date().toISOString());
    return c.json({ registered: false, url: url });
  }
})

Deno.serve(app.fetch);
