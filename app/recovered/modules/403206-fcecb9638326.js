// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.bookmarksRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.string().regex(/^[a-zA-Z0-9 _-]+$/),
    a = o.z
      .string()
      .nullable()
      .describe(
        "ISO 8601 UTC at second precision; null when cc holds no timestamp.",
      ),
    i = o.z.object({ item_id: o.z.string(), created_at: a }),
    l = o.z.object({
      id: o.z.string(),
      name: o.z.string(),
      created_at: a,
      items: o.z
        .array(i)
        .describe("Sorted by item_id; [] for an empty folder."),
    }),
    d = o.z.object({
      id: o.z.string(),
      name: o.z.string(),
      items: o.z
        .array(i)
        .describe(
          "Always [] — cc returns no row on create, so the body is reconstructed without a created_at.",
        ),
    }),
    c = o.z.object({
      id: o.z.string(),
      name: o.z.string(),
      created_at: a,
      bookmark_items: o.z
        .array(o.z.string())
        .describe("Item ids sorted ascending; [] for an empty folder."),
      bookmark_items_with_created_at: o.z
        .array(i)
        .optional()
        .describe(
          "Present only without withPreviewImages and only when the folder has items.",
        ),
      preview_images: o.z
        .array(o.z.string())
        .optional()
        .describe(
          "Present only with withPreviewImages=true; up to three coin image URLs.",
        ),
    }),
    u = o.z.object({ success: o.z.boolean() }),
    h = o.z.object({
      successes: o.z.array(o.z.string()),
      failures: o.z.array(o.z.string()),
    }),
    m = o.z.object({ bookmarkId: o.z.uuid() }),
    p = o.z.object({ itemId: o.z.string() }),
    b = o.z.object({
      bookmarkId: o.z
        .union([o.z.uuid(), o.z.literal("default")])
        .describe(
          'A folder id, or "default" for the default folder (created on first add; a remove 404s when it does not exist).',
        ),
    }),
    g = o.z.object({ itemId: o.z.string() }),
    w = o.z.object({
      itemId: o.z.string(),
      bookmarkIds: o.z
        .array(o.z.string().min(1))
        .min(1)
        .max(50)
        .describe(
          'Bookmark folder ids; the literal "default" targets the default folder.',
        ),
    });
  r.bookmarksRoutes = (0, n.defineRoutes)({
    "POST /bookmarks": {
      summary: "Create a bookmark folder",
      body: o.z.object({ name: s }),
      response: d,
    },
    "GET /bookmarks": {
      summary: "List the user bookmark folders",
      query: o.z.object({ withPreviewImages: o.z.boolean().optional() }),
      response: o.z.array(c),
    },
    "PUT /bookmarks/{bookmarkId}": {
      summary: "Rename a bookmark folder",
      params: m,
      body: o.z.object({ newName: s }),
      response: l,
    },
    "DELETE /bookmarks/{bookmarkId}": {
      summary: "Delete a bookmark folder",
      params: m,
      response: u,
    },
    "POST /bookmarks/items/add": {
      summary: "Add an item to multiple bookmark folders",
      body: w,
      response: h,
    },
    "POST /bookmarks/items/remove": {
      summary: "Remove an item from multiple bookmark folders",
      body: w,
      response: h,
    },
    "POST /bookmarks/{bookmarkId}/items": {
      summary: "Add an item to a bookmark folder",
      params: b,
      body: g,
      response: u,
      emits: ["COIN_BLOCKED"],
    },
    "DELETE /bookmarks/{bookmarkId}/items/{itemId}": {
      summary: "Remove an item from a bookmark folder",
      params: b.extend(p.shape),
      response: u,
    },
    "DELETE /bookmarks/default/{itemId}": {
      summary: "Remove an item from the default bookmark folder",
      params: p,
      response: u,
    },
    "DELETE /bookmarks/{bookmarkId}/{itemId}": {
      summary: "Remove an item from a bookmark folder",
      params: m.extend(p.shape),
      response: u,
    },
  });
};
