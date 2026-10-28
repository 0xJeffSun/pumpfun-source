// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(944410),
    s = e.i(132838),
    r = e.i(606933),
    o = e.i(63289),
    i = e.i(777683),
    a = e.i(711902),
    u = e.i(114549),
    d = e.i(38279),
    l = e.i(598144);
  let c = (e, t) =>
    "object" != typeof e || null == e || e.taskId !== t.taskId
      ? e
      : {
          ...e,
          unbanRequest: t.unbanRequest,
          ...(void 0 === t.unbanInfo ? {} : { unbanInfo: t.unbanInfo }),
        };
  e.s(
    [
      "a",
      0,
      (e) => {
        let a,
          m,
          p,
          y,
          b = (0, t.c)(12),
          z = (0, n.useLivestreamApiClient)(),
          I = (0, r.useQueryClient)();
        return (
          b[0] !== z
            ? ((a = async (e) => {
                let { taskId: t, body: n } = e,
                  s = await z
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/unban-request/accept`,
                      { json: n },
                    )
                    .json();
                return u.r.parse(s);
              }),
              (b[0] = z),
              (b[1] = a))
            : (a = b[1]),
          b[2] !== e || b[3] !== I
            ? ((m = (t, n, s) => {
                (I.setQueryData(d.Q.BOUNTY_PUBLIC_TASK(t.taskId), (e) =>
                  c(e, {
                    taskId: t.taskId,
                    unbanRequest: t.unbanRequest,
                    unbanInfo: t.unbanInfo,
                  }),
                ),
                  I.setQueryData(d.Q.BOUNTY_TASK(t.taskId), (e) =>
                    c(e, {
                      taskId: t.taskId,
                      unbanRequest: t.unbanRequest,
                      unbanInfo: t.unbanInfo,
                    }),
                  ),
                  (0, l.z)(I),
                  (0, l.a)(I),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(t.taskId),
                  }),
                  I.invalidateQueries({ queryKey: d.Q.BOUNTY_TASK(t.taskId) }),
                  e?.onSuccess?.(t, n, s));
              }),
              (b[2] = e),
              (b[3] = I),
              (b[4] = m))
            : (m = b[4]),
          b[5] !== e
            ? ((p = async (t, n, s) => {
                let r = await (0, i.u)(
                  t,
                  "Could not accept bounty unban request.",
                );
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (b[5] = e),
              (b[6] = p))
            : (p = b[6]),
          b[7] !== e || b[8] !== a || b[9] !== m || b[10] !== p
            ? ((y = { ...e, mutationFn: a, onSuccess: m, onError: p }),
              (b[7] = e),
              (b[8] = a),
              (b[9] = m),
              (b[10] = p),
              (b[11] = y))
            : (y = b[11]),
          (0, s.f)(y)
        );
      },
      "r",
      0,
      (e) => {
        let a,
          c,
          m,
          p,
          y = (0, t.c)(12),
          b = (0, n.useLivestreamApiClient)(),
          z = (0, r.useQueryClient)();
        return (
          y[0] !== b
            ? ((a = async (e) => {
                let { taskId: t, submissionId: n } = e,
                  s = await b
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/submissions/${encodeURIComponent(n)}/approve`,
                    )
                    .json();
                return u.f.parse(s);
              }),
              (y[0] = b),
              (y[1] = a))
            : (a = y[1]),
          y[2] !== e || y[3] !== z
            ? ((c = (t, n, s) => {
                (o.c.success("Submission approved"),
                  (0, l.z)(z),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_MODERATION_QUEUE(
                      "submissions-pending-review",
                      {},
                    ),
                  }),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
                  }),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSION(
                      n.taskId,
                      n.submissionId,
                    ),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (y[2] = e),
              (y[3] = z),
              (y[4] = c))
            : (c = y[4]),
          y[5] !== e
            ? ((m = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not approve submission.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (y[5] = e),
              (y[6] = m))
            : (m = y[6]),
          y[7] !== e || y[8] !== a || y[9] !== c || y[10] !== m
            ? ((p = { ...e, mutationFn: a, onSuccess: c, onError: m }),
              (y[7] = e),
              (y[8] = a),
              (y[9] = c),
              (y[10] = m),
              (y[11] = p))
            : (p = y[11]),
          (0, s.f)(p)
        );
      },
      "N",
      0,
      (e) => {
        let a,
          c,
          m,
          p,
          y = (0, t.c)(12),
          b = (0, n.useLivestreamApiClient)(),
          z = (0, r.useQueryClient)();
        return (
          y[0] !== b
            ? ((a = async (e) => {
                let { taskId: t } = e,
                  n = await b
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/approve`,
                    )
                    .json();
                return u.y.parse(n);
              }),
              (y[0] = b),
              (y[1] = a))
            : (a = y[1]),
          y[2] !== e || y[3] !== z
            ? ((c = (t, n, s) => {
                (o.c.success("Bounty approved"),
                  (0, l.z)(z),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_MODERATION_QUEUE(
                      "tasks-pending-review",
                      {},
                    ),
                  }),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (y[2] = e),
              (y[3] = z),
              (y[4] = c))
            : (c = y[4]),
          y[5] !== e
            ? ((m = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not approve bounty.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (y[5] = e),
              (y[6] = m))
            : (m = y[6]),
          y[7] !== e || y[8] !== a || y[9] !== c || y[10] !== m
            ? ((p = { ...e, mutationFn: a, onSuccess: c, onError: m }),
              (y[7] = e),
              (y[8] = a),
              (y[9] = c),
              (y[10] = m),
              (y[11] = p))
            : (p = y[11]),
          (0, s.f)(p)
        );
      },
      "j",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { commentId: t, body: n } = e;
                await y
                  .post(
                    `bounties/moderation/comments/${encodeURIComponent(t)}/ban`,
                    { json: n },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  b.invalidateQueries({ queryKey: d.Q.BOUNTY_COMMENTS_PREFIX }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_COMMENT(n.commentId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not ban comment.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "S",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t, submissionId: n, body: s } = e;
                await y
                  .post(
                    `bounties/moderation/tasks/${encodeURIComponent(t)}/submissions/${encodeURIComponent(n)}/ban`,
                    { json: s },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  (0, l.a)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
                  }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSION(
                      n.taskId,
                      n.submissionId,
                    ),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not ban submission.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "u",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t, body: n } = e;
                await y
                  .post(
                    `bounties/moderation/tasks/${encodeURIComponent(t)}/ban`,
                    { json: n },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  (0, l.a)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not ban bounty.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "X",
      0,
      (e) => {
        let a,
          l,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async () => {
                let e = await y.post("bounties/v2/admin/reindex").json();
                return u.l.parse(e);
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((l = (t, n, s) => {
                let r = () => {
                  for (let e of (b.invalidateQueries({
                    queryKey: ["bounties", "publicListV2"],
                  }),
                  b.invalidateQueries({ queryKey: ["bounties", "publicList"] }),
                  d.w))
                    b.invalidateQueries({ queryKey: e });
                };
                (r(),
                  window.setTimeout(r, 9e4),
                  o.c.success(
                    "Bounty search reindex started. Listings may take a minute to catch up.",
                  ),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = l))
            : (l = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not reindex bounty search.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== l || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: l, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = l),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "R",
      0,
      (e) => {
        let u,
          c,
          m,
          p,
          y = (0, t.c)(12),
          b = (0, n.useLivestreamApiClient)(),
          z = (0, r.useQueryClient)();
        return (
          y[0] !== b
            ? ((u = async (e) => {
                let { commentId: t } = e,
                  n = await b
                    .post(
                      `bounties/moderation/comments/${encodeURIComponent(t)}/dismiss-reports`,
                    )
                    .json();
                return a.s.parse(n);
              }),
              (y[0] = b),
              (y[1] = u))
            : (u = y[1]),
          y[2] !== e || y[3] !== z
            ? ((c = (t, n, s) => {
                (o.c.success("Reports dismissed"),
                  (0, l.z)(z),
                  z.invalidateQueries({ queryKey: d.Q.BOUNTY_COMMENTS_PREFIX }),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_COMMENT(n.commentId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (y[2] = e),
              (y[3] = z),
              (y[4] = c))
            : (c = y[4]),
          y[5] !== e
            ? ((m = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not dismiss reports.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (y[5] = e),
              (y[6] = m))
            : (m = y[6]),
          y[7] !== e || y[8] !== u || y[9] !== c || y[10] !== m
            ? ((p = { ...e, mutationFn: u, onSuccess: c, onError: m }),
              (y[7] = e),
              (y[8] = u),
              (y[9] = c),
              (y[10] = m),
              (y[11] = p))
            : (p = y[11]),
          (0, s.f)(p)
        );
      },
      "Z",
      0,
      (e) => {
        let u,
          c,
          m,
          p,
          y = (0, t.c)(12),
          b = (0, n.useLivestreamApiClient)(),
          z = (0, r.useQueryClient)();
        return (
          y[0] !== b
            ? ((u = async (e) => {
                let { taskId: t, submissionId: n } = e,
                  s = await b
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/submissions/${encodeURIComponent(n)}/dismiss-reports`,
                    )
                    .json();
                return a.s.parse(s);
              }),
              (y[0] = b),
              (y[1] = u))
            : (u = y[1]),
          y[2] !== e || y[3] !== z
            ? ((c = (t, n, s) => {
                (o.c.success("Reports dismissed"),
                  (0, l.z)(z),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
                  }),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSION(
                      n.taskId,
                      n.submissionId,
                    ),
                  }),
                  z.invalidateQueries({
                    queryKey: ["bounties", "moderation", "task-view", n.taskId],
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (y[2] = e),
              (y[3] = z),
              (y[4] = c))
            : (c = y[4]),
          y[5] !== e
            ? ((m = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not dismiss reports.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (y[5] = e),
              (y[6] = m))
            : (m = y[6]),
          y[7] !== e || y[8] !== u || y[9] !== c || y[10] !== m
            ? ((p = { ...e, mutationFn: u, onSuccess: c, onError: m }),
              (y[7] = e),
              (y[8] = u),
              (y[9] = c),
              (y[10] = m),
              (y[11] = p))
            : (p = y[11]),
          (0, s.f)(p)
        );
      },
      "Y",
      0,
      (e) => {
        let u,
          c,
          m,
          p,
          y = (0, t.c)(12),
          b = (0, n.useLivestreamApiClient)(),
          z = (0, r.useQueryClient)();
        return (
          y[0] !== b
            ? ((u = async (e) => {
                let { taskId: t } = e,
                  n = await b
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/dismiss-reports`,
                    )
                    .json();
                return a.s.parse(n);
              }),
              (y[0] = b),
              (y[1] = u))
            : (u = y[1]),
          y[2] !== e || y[3] !== z
            ? ((c = (t, n, s) => {
                (o.c.success("Reports dismissed"),
                  (0, l.z)(z),
                  z.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  z.invalidateQueries({
                    queryKey: ["bounties", "moderation", "task-view", n.taskId],
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (y[2] = e),
              (y[3] = z),
              (y[4] = c))
            : (c = y[4]),
          y[5] !== e
            ? ((m = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not dismiss reports.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (y[5] = e),
              (y[6] = m))
            : (m = y[6]),
          y[7] !== e || y[8] !== u || y[9] !== c || y[10] !== m
            ? ((p = { ...e, mutationFn: u, onSuccess: c, onError: m }),
              (y[7] = e),
              (y[8] = u),
              (y[9] = c),
              (y[10] = m),
              (y[11] = p))
            : (p = y[11]),
          (0, s.f)(p)
        );
      },
      "U",
      0,
      (e) => {
        let i,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((i = async (e) => {
                let { taskId: t, body: n } = e,
                  s = await y
                    .post(
                      `bounties/tasks/${encodeURIComponent(t)}/finalize-expired`,
                      { json: n },
                    )
                    .json();
                return a.o.parse(s);
              }),
              (p[0] = y),
              (p[1] = i))
            : (i = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                (o.c.success("Expired bounty finalized"),
                  (0, l.z)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = (t, n, s) => {
                e?.onError?.(t, n, s);
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== i || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: i, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = i),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "J",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t } = e,
                  n = await y
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/reconcile-decision`,
                    )
                    .json();
                return l.S.parse(n);
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_MODERATION_TASK_PROPOSALS(n.taskId),
                  }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  b.invalidateQueries({
                    queryKey: [
                      "bounties",
                      "moderation",
                      "decisionContext",
                      n.taskId,
                    ],
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not sync decision state.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "T",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t } = e,
                  n = await y
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/reconcile-finalize`,
                    )
                    .json();
                return l.q.parse(n);
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_MODERATION_TASK_PROPOSALS(n.taskId),
                  }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  b.invalidateQueries({
                    queryKey: [
                      "bounties",
                      "moderation",
                      "decisionContext",
                      n.taskId,
                    ],
                  }),
                  (0, l.y)(b, n.taskId),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not sync finalize state.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "b",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t } = e,
                  n = await y
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/reconcile-payout`,
                    )
                    .json();
                return l.d.parse(n);
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_MODERATION_TASK_PROPOSALS(n.taskId),
                  }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  b.invalidateQueries({
                    queryKey: [
                      "bounties",
                      "moderation",
                      "decisionContext",
                      n.taskId,
                    ],
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not sync payout state.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "c",
      0,
      (e, u) => {
        let l,
          c,
          m,
          p,
          y = (0, t.c)(13),
          b = (0, n.useLivestreamApiClient)(),
          z = (0, r.useQueryClient)();
        return (
          y[0] !== b
            ? ((l = async (e) => {
                let { taskId: t } = e,
                  n = await b
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/reconcile-fees`,
                    )
                    .json();
                return a.Z.parse(n);
              }),
              (y[0] = b),
              (y[1] = l))
            : (l = y[1]),
          y[2] !== e || y[3] !== z
            ? ((c = (t, n, s) => {
                (z.invalidateQueries({
                  queryKey: d.Q.BOUNTY_MODERATION_TASK_FEES(n.taskId),
                }),
                  e?.onSuccess?.(t, n, s));
              }),
              (y[2] = e),
              (y[3] = z),
              (y[4] = c))
            : (c = y[4]),
          y[5] !== u?.suppressErrorToast || y[6] !== e
            ? ((m = async (t, n, s) => {
                if (!u?.suppressErrorToast) {
                  let e = await (0, i.u)(
                    t,
                    "Could not sync fee settlement state.",
                  );
                  o.c.error(e);
                }
                e?.onError?.(t, n, s);
              }),
              (y[5] = u?.suppressErrorToast),
              (y[6] = e),
              (y[7] = m))
            : (m = y[7]),
          y[8] !== e || y[9] !== l || y[10] !== c || y[11] !== m
            ? ((p = { ...e, mutationFn: l, onSuccess: c, onError: m }),
              (y[8] = e),
              (y[9] = l),
              (y[10] = c),
              (y[11] = m),
              (y[12] = p))
            : (p = y[12]),
          (0, s.f)(p)
        );
      },
      "C",
      0,
      (e, a) => {
        let c,
          m,
          p,
          y,
          b = (0, t.c)(14),
          z = (0, n.useLivestreamApiClient)(),
          I = (0, r.useQueryClient)();
        return (
          b[0] !== z
            ? ((c = async (e) => {
                let { taskId: t, body: n } = e,
                  s = await z
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/proposals`,
                      { json: n },
                    )
                    .json();
                return u.U.parse(s);
              }),
              (b[0] = z),
              (b[1] = c))
            : (c = b[1]),
          b[2] !== a?.suppressInvalidation || b[3] !== e || b[4] !== I
            ? ((m = (t, n, s) => {
                (a?.suppressInvalidation ||
                  ((0, l.z)(I),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_MODERATION_TASK_PROPOSALS(n.taskId),
                  }),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_DISPUTES(n.taskId),
                  }),
                  (0, l.y)(I, n.taskId)),
                  e?.onSuccess?.(t, n, s));
              }),
              (b[2] = a?.suppressInvalidation),
              (b[3] = e),
              (b[4] = I),
              (b[5] = m))
            : (m = b[5]),
          b[6] !== a?.suppressErrorToast || b[7] !== e
            ? ((p = async (t, n, s) => {
                if (!a?.suppressErrorToast) {
                  let e = await (0, i.u)(t, "Could not record proposal.");
                  o.c.error(e);
                }
                e?.onError?.(t, n, s);
              }),
              (b[6] = a?.suppressErrorToast),
              (b[7] = e),
              (b[8] = p))
            : (p = b[8]),
          b[9] !== e || b[10] !== c || b[11] !== m || b[12] !== p
            ? ((y = { ...e, mutationFn: c, onSuccess: m, onError: p }),
              (b[9] = e),
              (b[10] = c),
              (b[11] = m),
              (b[12] = p),
              (b[13] = y))
            : (y = b[13]),
          (0, s.f)(y)
        );
      },
      "V",
      0,
      (e, a) => {
        let c,
          m,
          p,
          y,
          b = (0, t.c)(13),
          z = (0, n.useLivestreamApiClient)(),
          I = (0, r.useQueryClient)();
        return (
          b[0] !== z
            ? ((c = async (e) => {
                let { taskId: t, transactionIndex: n, kind: s } = e,
                  r = await z
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/proposals/${encodeURIComponent(n)}/refresh`,
                      { searchParams: { kind: s } },
                    )
                    .json();
                return u.U.parse(r);
              }),
              (b[0] = z),
              (b[1] = c))
            : (c = b[1]),
          b[2] !== e || b[3] !== I
            ? ((m = (t, n, s) => {
                ((0, l.z)(I),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_MODERATION_TASK_PROPOSALS(n.taskId),
                  }),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_DISPUTES(n.taskId),
                  }),
                  (0, l.y)(I, n.taskId),
                  e?.onSuccess?.(t, n, s));
              }),
              (b[2] = e),
              (b[3] = I),
              (b[4] = m))
            : (m = b[4]),
          b[5] !== a?.suppressErrorToast || b[6] !== e
            ? ((p = async (t, n, s) => {
                if (!a?.suppressErrorToast) {
                  let e = await (0, i.u)(t, "Could not refresh proposal.");
                  o.c.error(e);
                }
                e?.onError?.(t, n, s);
              }),
              (b[5] = a?.suppressErrorToast),
              (b[6] = e),
              (b[7] = p))
            : (p = b[7]),
          b[8] !== e || b[9] !== c || b[10] !== m || b[11] !== p
            ? ((y = { ...e, mutationFn: c, onSuccess: m, onError: p }),
              (b[8] = e),
              (b[9] = c),
              (b[10] = m),
              (b[11] = p),
              (b[12] = y))
            : (y = b[12]),
          (0, s.f)(y)
        );
      },
      "W",
      0,
      (e) => {
        let a,
          d,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { identityType: t, identityValue: n } = e,
                  s = await y
                    .post("bounties/moderation/users/reinstate", {
                      json: { identityType: t, identityValue: n },
                    })
                    .json();
                return u.S.parse(s);
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((d = (t, n, s) => {
                (o.c.success("User reinstated"),
                  (0, l.z)(b),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = d))
            : (d = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not reinstate user.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== d || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: d, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = d),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "K",
      0,
      (e) => {
        let a,
          m,
          p,
          y,
          b = (0, t.c)(12),
          z = (0, n.useLivestreamApiClient)(),
          I = (0, r.useQueryClient)();
        return (
          b[0] !== z
            ? ((a = async (e) => {
                let { taskId: t, body: n } = e,
                  s = await z
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/unban-request/reject`,
                      { json: n },
                    )
                    .json();
                return u.m.parse(s);
              }),
              (b[0] = z),
              (b[1] = a))
            : (a = b[1]),
          b[2] !== e || b[3] !== I
            ? ((m = (t, n, s) => {
                (I.setQueryData(d.Q.BOUNTY_PUBLIC_TASK(t.taskId), (e) =>
                  c(e, { taskId: t.taskId, unbanRequest: t.unbanRequest }),
                ),
                  I.setQueryData(d.Q.BOUNTY_TASK(t.taskId), (e) =>
                    c(e, { taskId: t.taskId, unbanRequest: t.unbanRequest }),
                  ),
                  (0, l.z)(I),
                  (0, l.a)(I),
                  I.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(t.taskId),
                  }),
                  I.invalidateQueries({ queryKey: d.Q.BOUNTY_TASK(t.taskId) }),
                  e?.onSuccess?.(t, n, s));
              }),
              (b[2] = e),
              (b[3] = I),
              (b[4] = m))
            : (m = b[4]),
          b[5] !== e
            ? ((p = async (t, n, s) => {
                let r = await (0, i.u)(
                  t,
                  "Could not reject bounty unban request.",
                );
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (b[5] = e),
              (b[6] = p))
            : (p = b[6]),
          b[7] !== e || b[8] !== a || b[9] !== m || b[10] !== p
            ? ((y = { ...e, mutationFn: a, onSuccess: m, onError: p }),
              (b[7] = e),
              (b[8] = a),
              (b[9] = m),
              (b[10] = p),
              (b[11] = y))
            : (y = b[11]),
          (0, s.f)(y)
        );
      },
      "d",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t, submissionId: n, body: s } = e;
                await y
                  .post(
                    `bounties/moderation/tasks/${encodeURIComponent(t)}/submissions/${encodeURIComponent(n)}/nsfw`,
                    { json: s },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  (0, l.a)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
                  }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSION(
                      n.taskId,
                      n.submissionId,
                    ),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(
                  t,
                  "Could not update submission NSFW status.",
                );
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "x",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t, body: n } = e;
                await y
                  .post(
                    `bounties/moderation/tasks/${encodeURIComponent(t)}/nsfw`,
                    { json: n },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  (0, l.a)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(
                  t,
                  "Could not update bounty NSFW status.",
                );
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "e",
      0,
      (e) => {
        let r,
          o,
          a,
          d = (0, t.c)(8),
          l = (0, n.useLivestreamApiClient)();
        return (
          d[0] !== l
            ? ((r = async (e) => {
                let { taskId: t, submissionId: n, attachmentKey: s } = e;
                try {
                  let e = await l
                    .post(
                      `bounties/moderation/tasks/${encodeURIComponent(t)}/submissions/${encodeURIComponent(n)}/web-detection`,
                      { json: { attachmentKey: s } },
                    )
                    .json();
                  return u.c.parse(e);
                } catch (e) {
                  throw Error(
                    await (0, i.u)(
                      e,
                      "Could not check web matches for this image.",
                    ),
                  );
                }
              }),
              (d[0] = l),
              (d[1] = r))
            : (r = d[1]),
          d[2] !== e
            ? ((o = (t, n, s) => {
                e?.onError?.(t, n, s);
              }),
              (d[2] = e),
              (d[3] = o))
            : (o = d[3]),
          d[4] !== e || d[5] !== r || d[6] !== o
            ? ((a = { ...e, mutationFn: r, onError: o }),
              (d[4] = e),
              (d[5] = r),
              (d[6] = o),
              (d[7] = a))
            : (a = d[7]),
          (0, s.f)(a)
        );
      },
      "f",
      0,
      (e, r) => {
        let a,
          d,
          l,
          c = (0, t.c)(9),
          m = (0, n.useLivestreamApiClient)();
        return (
          c[0] !== m
            ? ((a = async (e) => {
                let { taskId: t, body: n } = e,
                  s = await m
                    .post(`bounties/tasks/${encodeURIComponent(t)}/resolve`, {
                      json: n,
                    })
                    .json();
                return u.G.parse(s);
              }),
              (c[0] = m),
              (c[1] = a))
            : (a = c[1]),
          c[2] !== r?.suppressErrorToast || c[3] !== e
            ? ((d = async (t, n, s) => {
                if (!r?.suppressErrorToast) {
                  let e = await (0, i.u)(t, "Could not draft resolution.");
                  o.c.error(e);
                }
                e?.onError?.(t, n, s);
              }),
              (c[2] = r?.suppressErrorToast),
              (c[3] = e),
              (c[4] = d))
            : (d = c[4]),
          c[5] !== e || c[6] !== a || c[7] !== d
            ? ((l = { ...e, mutationFn: a, onError: d }),
              (c[5] = e),
              (c[6] = a),
              (c[7] = d),
              (c[8] = l))
            : (l = c[8]),
          (0, s.f)(l)
        );
      },
      "k",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { commentId: t, body: n } = e;
                await y
                  .post(
                    `bounties/moderation/comments/${encodeURIComponent(t)}/unban`,
                    { json: n },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  b.invalidateQueries({ queryKey: d.Q.BOUNTY_COMMENTS_PREFIX }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_COMMENT(n.commentId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not unban comment.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "O",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t, submissionId: n, body: s } = e;
                await y
                  .post(
                    `bounties/moderation/tasks/${encodeURIComponent(t)}/submissions/${encodeURIComponent(n)}/unban`,
                    { json: s },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  (0, l.a)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
                  }),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_TASK_SUBMISSION(
                      n.taskId,
                      n.submissionId,
                    ),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not unban submission.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
      "s",
      0,
      (e) => {
        let a,
          u,
          c,
          m,
          p = (0, t.c)(12),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          p[0] !== y
            ? ((a = async (e) => {
                let { taskId: t, body: n } = e;
                await y
                  .post(
                    `bounties/moderation/tasks/${encodeURIComponent(t)}/unban`,
                    { json: n },
                  )
                  .text();
              }),
              (p[0] = y),
              (p[1] = a))
            : (a = p[1]),
          p[2] !== e || p[3] !== b
            ? ((u = (t, n, s) => {
                ((0, l.z)(b),
                  (0, l.a)(b),
                  b.invalidateQueries({
                    queryKey: d.Q.BOUNTY_PUBLIC_TASK(n.taskId),
                  }),
                  e?.onSuccess?.(t, n, s));
              }),
              (p[2] = e),
              (p[3] = b),
              (p[4] = u))
            : (u = p[4]),
          p[5] !== e
            ? ((c = async (t, n, s) => {
                let r = await (0, i.u)(t, "Could not unban bounty.");
                (o.c.error(r), e?.onError?.(t, n, s));
              }),
              (p[5] = e),
              (p[6] = c))
            : (c = p[6]),
          p[7] !== e || p[8] !== a || p[9] !== u || p[10] !== c
            ? ((m = { ...e, mutationFn: a, onSuccess: u, onError: c }),
              (p[7] = e),
              (p[8] = a),
              (p[9] = u),
              (p[10] = c),
              (p[11] = m))
            : (m = p[11]),
          (0, s.f)(m)
        );
      },
    ],
    136207,
  );
  var m = e.i(761459),
    p = e.i(690877),
    y = e.i(866890);
  function b(e, t, s) {
    return (r = {}, o) => {
      let i = (0, n.useLivestreamApiClient)();
      return (0, p.useQuery)({
        ...o,
        queryKey: d.Q.BOUNTY_MODERATION_QUEUE(e, r),
        queryFn: async () => {
          let e = await i.get(`${t}${(0, l.A)(r)}`).json();
          return s.parse(e);
        },
      });
    };
  }
  function z(e, t, s) {
    return (r = {}) => {
      let o = r.limit ?? l.s,
        i = (0, n.useLivestreamApiClient)();
      return (0, m.useInfiniteQuery)({
        queryKey: (0, l.v)(e, o),
        initialPageParam: void 0,
        queryFn: async ({ pageParam: e }) => {
          let n = await i
            .get(`${t}${(0, l.A)({ limit: o, cursor: e })}`)
            .json();
          return s.parse(n);
        },
        getNextPageParam: (e) => e.nextCursor,
      });
    };
  }
  function I(e, t, s) {
    return (r = {}) => {
      let o = r.limit ?? l.s,
        i = (0, n.useLivestreamApiClient)();
      return (0, m.useInfiniteQuery)({
        queryKey: (0, l.o)(e, o),
        initialPageParam: void 0,
        queryFn: async ({ pageParam: e }) => {
          let n = await i
            .get(`${t}${(0, l.A)({ limit: o, cursor: e })}`)
            .json();
          return s.parse(n);
        },
        getNextPageParam: (e) => e.nextCursor,
      });
    };
  }
  let S = b(
      "pending-resolution",
      "bounties/moderation/tasks/pending-resolution",
      u.k,
    ),
    g = b("expired", "bounties/moderation/tasks/expired", u.k),
    C = b("in-dispute", "bounties/moderation/tasks/in-dispute", u.K),
    E = b(
      "pending-final-resolution",
      "bounties/moderation/tasks/pending-final-resolution",
      u.K,
    ),
    T = b("awaiting-payout", "bounties/moderation/tasks/awaiting-payout", u.X),
    A = b("completed", "bounties/moderation/tasks/completed", u.D),
    U = z(
      "tasks-pending-review",
      "bounties/moderation/tasks/pending-review",
      u.h,
    ),
    k = z(
      "pending-resolution",
      "bounties/moderation/tasks/pending-resolution",
      u.k,
    ),
    Q = z("expired", "bounties/moderation/tasks/expired", u.k),
    _ = z("in-dispute", "bounties/moderation/tasks/in-dispute", u.K),
    O = z(
      "pending-final-resolution",
      "bounties/moderation/tasks/pending-final-resolution",
      u.K,
    ),
    v = z("awaiting-payout", "bounties/moderation/tasks/awaiting-payout", u.X),
    K = z("completed", "bounties/moderation/tasks/completed", u.D),
    N = y.z.array(u.U);
  b("tasks-banned", "bounties/moderation/tasks/banned", u.M);
  let R = I("tasks-banned", "bounties/moderation/tasks/banned", u.M);
  b(
    "tasks-pending-unban-request",
    "bounties/moderation/tasks/pending-unban-requests",
    u.B,
  );
  let j = I(
    "tasks-pending-unban-request",
    "bounties/moderation/tasks/pending-unban-requests",
    u.B,
  );
  b("submissions-banned", "bounties/moderation/submissions/banned", u.o);
  let w = I(
    "submissions-banned",
    "bounties/moderation/submissions/banned",
    u.o,
  );
  b("tasks-reported", "bounties/moderation/tasks/reported", u.L);
  let q = I("tasks-reported", "bounties/moderation/tasks/reported", u.L);
  b("submissions-reported", "bounties/moderation/submissions/reported", u.E);
  let B = I(
    "submissions-reported",
    "bounties/moderation/submissions/reported",
    u.E,
  );
  b("comments-reported", "bounties/moderation/comments/reported", u.T);
  let f = I("comments-reported", "bounties/moderation/comments/reported", u.T),
    L = I("comments-banned", "bounties/moderation/comments/banned", u.n),
    P = b(
      "tasks-pending-review",
      "bounties/moderation/tasks/pending-review",
      u.h,
    ),
    x = b(
      "submissions-pending-review",
      "bounties/moderation/submissions/pending-review",
      u.q,
    ),
    F = (e) => {
      let t = new URLSearchParams();
      (e.kind && t.set("kind", e.kind),
        e.status && t.set("status", e.status),
        void 0 !== e.limit && t.set("limit", String(e.limit)),
        void 0 !== e.cursor && t.set("cursor", e.cursor));
      let n = t.toString();
      return n ? `?${n}` : "";
    };
  function D(e) {
    return e.nextCursor;
  }
  function M(e) {
    return e.nextCursor;
  }
  (e.s(
    [
      "B",
      0,
      v,
      "p",
      0,
      L,
      "C",
      0,
      w,
      "o",
      0,
      R,
      "q",
      0,
      (e) => {
        let s,
          r,
          o = (0, t.c)(7),
          i = void 0 === e ? { status: "shadow" } : e,
          a = i.limit ?? l.s,
          d = (0, l.x)(i.status),
          c = (0, n.useLivestreamApiClient)(),
          p = (0, l.o)(d, a);
        return (
          o[0] !== c || o[1] !== i || o[2] !== a
            ? ((s = async (e) => {
                let { pageParam: t } = e,
                  n = await c
                    .get(
                      `bounties/moderation/users/banned${(0, l.f)({ status: i.status, limit: a, cursor: t })}`,
                    )
                    .json();
                return u.a.parse(n);
              }),
              (o[0] = c),
              (o[1] = i),
              (o[2] = a),
              (o[3] = s))
            : (s = o[3]),
          o[4] !== p || o[5] !== s
            ? ((r = {
                queryKey: p,
                initialPageParam: void 0,
                queryFn: s,
                getNextPageParam: D,
              }),
              (o[4] = p),
              (o[5] = s),
              (o[6] = r))
            : (r = o[6]),
          (0, m.useInfiniteQuery)(r)
        );
      },
      "r",
      0,
      K,
      "J",
      0,
      Q,
      "x",
      0,
      _,
      "s",
      0,
      (e) => {
        let s,
          r,
          o = (0, t.c)(7),
          i = void 0 === e ? {} : e,
          a = i.limit ?? l.i,
          c = (0, n.useLivestreamApiClient)(),
          p = `${i.kind ?? ""}|${i.status ?? ""}`,
          y = d.Q.BOUNTY_MODERATION_QUEUE("proposals-open", {
            limit: a,
            filter: p,
            variant: l.p,
          });
        return (
          o[0] !== c || o[1] !== i || o[2] !== a
            ? ((s = async (e) => {
                let { pageParam: t } = e,
                  n = await c
                    .get(
                      `bounties/moderation/proposals/open${F({ limit: a, cursor: t, kind: i.kind, status: i.status })}`,
                    )
                    .json();
                return u.I.parse(n);
              }),
              (o[0] = c),
              (o[1] = i),
              (o[2] = a),
              (o[3] = s))
            : (s = o[3]),
          o[4] !== y || o[5] !== s
            ? ((r = {
                queryKey: y,
                initialPageParam: void 0,
                queryFn: s,
                getNextPageParam: M,
              }),
              (o[4] = y),
              (o[5] = s),
              (o[6] = r))
            : (r = o[6]),
          (0, m.useInfiniteQuery)(r)
        );
      },
      "H",
      0,
      O,
      "f",
      0,
      k,
      "W",
      0,
      U,
      "R",
      0,
      j,
      "T",
      0,
      f,
      "l",
      0,
      B,
      "G",
      0,
      q,
      "D",
      0,
      T,
      "j",
      0,
      (e) => {
        let s,
          r,
          o,
          i = (0, t.c)(9),
          { submissionId: u } = e,
          d = (0, n.useLivestreamApiClient)(),
          l = "string" == typeof u && "" !== u,
          c = u ?? "";
        return (
          i[0] !== c
            ? ((s = ["bounties", "moderation", "banned-submission", c]),
              (i[0] = c),
              (i[1] = s))
            : (s = i[1]),
          i[2] !== d || i[3] !== u
            ? ((r = async () => {
                let e = await d
                  .get(
                    `bounties/moderation/submissions/${encodeURIComponent(u ?? "")}`,
                  )
                  .json();
                return a.c.parse(e);
              }),
              (i[2] = d),
              (i[3] = u),
              (i[4] = r))
            : (r = i[4]),
          i[5] !== l || i[6] !== s || i[7] !== r
            ? ((o = { enabled: l, queryKey: s, queryFn: r }),
              (i[5] = l),
              (i[6] = s),
              (i[7] = r),
              (i[8] = o))
            : (o = i[8]),
          (0, p.useQuery)(o)
        );
      },
      "I",
      0,
      () => {
        let e,
          s,
          r = (0, t.c)(3),
          o = (0, n.useLivestreamApiClient)();
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, l._)("submissions-banned")), (r[0] = e))
            : (e = r[0]),
          r[1] !== o
            ? ((s = {
                queryKey: e,
                queryFn: async () => {
                  let e = await o
                    .get("bounties/moderation/submissions/banned/count")
                    .json();
                  return u.z.parse(e).count;
                },
              }),
              (r[1] = o),
              (r[2] = s))
            : (s = r[2]),
          (0, p.useQuery)(s)
        );
      },
      "t",
      0,
      () => {
        let e,
          s,
          r = (0, t.c)(3),
          o = (0, n.useLivestreamApiClient)();
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, l._)("tasks-banned")), (r[0] = e))
            : (e = r[0]),
          r[1] !== o
            ? ((s = {
                queryKey: e,
                queryFn: async () => {
                  let e = await o
                    .get("bounties/moderation/tasks/banned/count")
                    .json();
                  return u.z.parse(e).count;
                },
              }),
              (r[1] = o),
              (r[2] = s))
            : (s = r[2]),
          (0, p.useQuery)(s)
        );
      },
      "u",
      0,
      (e, s) => {
        let r,
          o,
          i,
          a = (0, t.c)(12),
          l = (0, n.useLivestreamApiClient)(),
          c = !!e.taskId && (s?.enabled ?? !0);
        return (
          a[0] !== e.decisionKind || a[1] !== e.taskId
            ? ((r = d.Q.BOUNTY_MODERATION_DECISION_CONTEXT(
                e.taskId ?? "",
                e.decisionKind,
              )),
              (a[0] = e.decisionKind),
              (a[1] = e.taskId),
              (a[2] = r))
            : (r = a[2]),
          a[3] !== l || a[4] !== e.decisionKind || a[5] !== e.taskId
            ? ((o = async () => {
                let t = await l
                  .get(
                    `bounties/moderation/tasks/${encodeURIComponent(e.taskId ?? "")}/decision-context?decisionKind=${e.decisionKind}`,
                  )
                  .json();
                return u.V.parse(t);
              }),
              (a[3] = l),
              (a[4] = e.decisionKind),
              (a[5] = e.taskId),
              (a[6] = o))
            : (o = a[6]),
          a[7] !== s || a[8] !== c || a[9] !== r || a[10] !== o
            ? ((i = { ...s, enabled: c, queryKey: r, queryFn: o }),
              (a[7] = s),
              (a[8] = c),
              (a[9] = r),
              (a[10] = o),
              (a[11] = i))
            : (i = a[11]),
          (0, p.useQuery)(i)
        );
      },
      "g",
      0,
      A,
      "e",
      0,
      g,
      "i",
      0,
      C,
      "K",
      0,
      (e, s) => {
        let r,
          o,
          i,
          u = (0, t.c)(10),
          l = (0, n.useLivestreamApiClient)(),
          c = !!e && (s?.enabled ?? !0);
        return (
          u[0] !== e
            ? ((r = d.Q.BOUNTY_MODERATION_TASK_FEES(e ?? "")),
              (u[0] = e),
              (u[1] = r))
            : (r = u[1]),
          u[2] !== l || u[3] !== e
            ? ((o = async () => {
                let t = await l
                  .get(
                    `bounties/moderation/tasks/${encodeURIComponent(e ?? "")}/fees`,
                  )
                  .json();
                return a.Z.parse(t);
              }),
              (u[2] = l),
              (u[3] = e),
              (u[4] = o))
            : (o = u[4]),
          u[5] !== s || u[6] !== c || u[7] !== r || u[8] !== o
            ? ((i = { ...s, enabled: c, queryKey: r, queryFn: o }),
              (u[5] = s),
              (u[6] = c),
              (u[7] = r),
              (u[8] = o),
              (u[9] = i))
            : (i = u[9]),
          (0, p.useQuery)(i)
        );
      },
      "v",
      0,
      (e) => {
        let s,
          o,
          i,
          u,
          d,
          c,
          m = (0, t.c)(13),
          y = (0, n.useLivestreamApiClient)(),
          b = (0, r.useQueryClient)();
        return (
          m[0] !== e
            ? ((s = Array.from(new Set(e)).sort()),
              (u = p.useQuery),
              (o = s.length > 0),
              (i = ["bounties", "moderation", "task-titles", ...s]),
              (m[0] = e),
              (m[1] = s),
              (m[2] = o),
              (m[3] = i),
              (m[4] = u))
            : ((s = m[1]), (o = m[2]), (i = m[3]), (u = m[4])),
          m[5] !== y || m[6] !== s || m[7] !== b
            ? ((d = async () =>
                Object.fromEntries(
                  await Promise.all(
                    s.map(async (e) => {
                      let t = b.getQueryData((0, l.P)(e));
                      if (void 0 !== t) return [e, t];
                      try {
                        let t = await y
                            .get(
                              `bounties/moderation/tasks/${encodeURIComponent(e)}/moderation-view`,
                            )
                            .json(),
                          n = a.o.parse(t);
                        return (
                          b.setQueryData((0, l.P)(e), n.title),
                          [e, n.title]
                        );
                      } catch {
                        return (b.setQueryData((0, l.P)(e), null), [e, null]);
                      }
                    }),
                  ),
                )),
              (m[5] = y),
              (m[6] = s),
              (m[7] = b),
              (m[8] = d))
            : (d = m[8]),
          m[9] !== o || m[10] !== i || m[11] !== d
            ? ((c = { enabled: o, queryKey: i, queryFn: d }),
              (m[9] = o),
              (m[10] = i),
              (m[11] = d),
              (m[12] = c))
            : (c = m[12]),
          u(c)
        );
      },
      "m",
      0,
      (e, s) => {
        let r,
          o,
          i,
          u = (0, t.c)(10),
          d = (0, n.useLivestreamApiClient)(),
          l = !!e.taskId && (s?.enabled ?? !0),
          c = e.taskId ?? "";
        return (
          u[0] !== c
            ? ((r = ["bounties", "moderation", "task-view", c]),
              (u[0] = c),
              (u[1] = r))
            : (r = u[1]),
          u[2] !== d || u[3] !== e.taskId
            ? ((o = async () => {
                let t = await d
                  .get(
                    `bounties/moderation/tasks/${encodeURIComponent(e.taskId ?? "")}/moderation-view`,
                  )
                  .json();
                return a.o.parse(t);
              }),
              (u[2] = d),
              (u[3] = e.taskId),
              (u[4] = o))
            : (o = u[4]),
          u[5] !== s || u[6] !== l || u[7] !== r || u[8] !== o
            ? ((i = { ...s, enabled: l, queryKey: r, queryFn: o }),
              (u[5] = s),
              (u[6] = l),
              (u[7] = r),
              (u[8] = o),
              (u[9] = i))
            : (i = u[9]),
          (0, p.useQuery)(i)
        );
      },
      "y",
      0,
      (e, s) => {
        let r,
          o,
          i = (0, t.c)(7),
          a = void 0 === e ? {} : e,
          l = (0, n.useLivestreamApiClient)(),
          c = `${a.kind ?? ""}|${a.status ?? ""}`,
          m = d.Q.BOUNTY_MODERATION_QUEUE("proposals-open", {
            limit: a.limit,
            cursor: a.cursor,
            filter: c,
          });
        return (
          i[0] !== l || i[1] !== a
            ? ((r = async () => {
                let e = await l
                  .get(`bounties/moderation/proposals/open${F(a)}`)
                  .json();
                return u.I.parse(e);
              }),
              (i[0] = l),
              (i[1] = a),
              (i[2] = r))
            : (r = i[2]),
          i[3] !== s || i[4] !== m || i[5] !== r
            ? ((o = { ...s, queryKey: m, queryFn: r }),
              (i[3] = s),
              (i[4] = m),
              (i[5] = r),
              (i[6] = o))
            : (o = i[6]),
          (0, p.useQuery)(o)
        );
      },
      "L",
      0,
      E,
      "h",
      0,
      S,
      "M",
      0,
      x,
      "X",
      0,
      P,
      "V",
      0,
      (e, s) => {
        let r,
          o,
          i,
          a = (0, t.c)(10),
          u = (0, n.useLivestreamApiClient)(),
          l = !!e && (s?.enabled ?? !0);
        return (
          a[0] !== e
            ? ((r = d.Q.BOUNTY_MODERATION_TASK_PROPOSALS(e ?? "")),
              (a[0] = e),
              (a[1] = r))
            : (r = a[1]),
          a[2] !== u || a[3] !== e
            ? ((o = async () => {
                let t = await u
                  .get(
                    `bounties/moderation/tasks/${encodeURIComponent(e ?? "")}/proposals`,
                  )
                  .json();
                return N.parse(t);
              }),
              (a[2] = u),
              (a[3] = e),
              (a[4] = o))
            : (o = a[4]),
          a[5] !== s || a[6] !== l || a[7] !== r || a[8] !== o
            ? ((i = { ...s, enabled: l, queryKey: r, queryFn: o }),
              (a[5] = s),
              (a[6] = l),
              (a[7] = r),
              (a[8] = o),
              (a[9] = i))
            : (i = a[9]),
          (0, p.useQuery)(i)
        );
      },
    ],
    929083,
  ),
    e.s([], 622862));
};
