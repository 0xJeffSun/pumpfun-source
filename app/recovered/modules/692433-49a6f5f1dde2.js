// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(352386),
    t = e.i(325320),
    a = e.i(596904),
    r = e.i(54567),
    i = e.i(445242),
    o = e.i(944410),
    s = e.i(132838),
    l = e.i(641768),
    c = e.i(967388),
    u = e.i(613677),
    d = e.i(342463),
    m = e.i(760185),
    p = e.i(89085);
  let f = u.z.object({ token: d.z.string(), role: m.z.nativeEnum(p.A) });
  var h = e.i(275762);
  e.s(
    [
      "f",
      0,
      ({
        mintId: e,
        viewer: u,
        onSuccess: d,
        onError: m,
        hidden: g,
        enabled: k = !0,
        recorder: T,
        joinAsCohost: v,
      }) => {
        var y;
        let b,
          E,
          _,
          S,
          w,
          I,
          A,
          N,
          { token: R, setToken: P, isDisconnected: O } = (0, t.E)(),
          x = (0, h.X)(e),
          { mutate: C, isPending: M } =
            ((y = {
              mintId: e,
              onSuccess: d,
              onError: () => {
                (P(null), m?.());
              },
              viewer: u,
              hidden: g,
              recorder: T,
            }),
            (I = (0, i.c)(17)),
            (A = (0, h.X)(y.mintId)),
            (N = (0, o.useLivestreamApiClient)()),
            I[0] !== y.hidden || I[1] !== y.mintId || I[2] !== y.viewer
              ? ((b = () => {
                  r.logger.debug(
                    "[useJoinLivestream] Attempting to join livestream via API",
                    { mintId: y.mintId, viewer: y.viewer, hidden: y.hidden },
                  );
                }),
                (I[0] = y.hidden),
                (I[1] = y.mintId),
                (I[2] = y.viewer),
                (I[3] = b))
              : (b = I[3]),
            I[4] !== N || I[5] !== y
              ? ((E = async (e) => {
                  let { joinAsCohost: n } = e,
                    t = await N.post("livestream/join", {
                      json: { ...y, joinAsCohost: n },
                    }).json();
                  return f.parse(t);
                }),
                (I[4] = N),
                (I[5] = y),
                (I[6] = E))
              : (E = I[6]),
            I[7] !== A || I[8] !== y
              ? ((_ = (e) => {
                  let n = e.role !== p.A.VIEWER;
                  ((0, l.J)({
                    mint: y.mintId,
                    livestreamId: A?.id ? String(A.id) : void 0,
                    isHostOrCohost: n,
                    creator: A?.creatorAddress ?? "",
                    didClip: !1,
                    viewDurationSeconds: 0,
                    context: c.K.JOIN,
                  }),
                    r.logger.debug(
                      "[useJoinLivestream] Successfully joined, invalidating query",
                      { mintId: y.mintId, role: e.role },
                    ),
                    y.onSuccess(e));
                }),
                (I[7] = A),
                (I[8] = y),
                (I[9] = _))
              : (_ = I[9]),
            I[10] !== y
              ? ((S = (e) => {
                  (r.logger.error(
                    "[useJoinLivestream] Failed to join livestream",
                    {
                      mintId: y.mintId,
                      error:
                        e.message || "Unknown error during join livestream",
                    },
                  ),
                    y.onError?.());
                }),
                (I[10] = y),
                (I[11] = S))
              : (S = I[11]),
            I[12] !== b || I[13] !== E || I[14] !== _ || I[15] !== S
              ? ((w = { onMutate: b, mutationFn: E, onSuccess: _, onError: S }),
                (I[12] = b),
                (I[13] = E),
                (I[14] = _),
                (I[15] = S),
                (I[16] = w))
              : (w = I[16]),
            (0, s.f)(w)),
          D = (0, n.useRef)(!1),
          L = (0, n.useRef)(0),
          U = (0, a.f)();
        ((0, n.useEffect)(() => {
          R?.token && (L.current = Date.now());
        }, [R?.token]),
          (0, n.useEffect)(() => {
            if (!k || !x || R?.token || O || M)
              (!k || R?.token || O) && (D.current = !1);
            else {
              let n = Date.now() - L.current;
              if (L.current > 0 && n < 5e3)
                return void r.logger.debug(
                  "[useAutoJoinLivestream] In rejoin cooldown, skipping auto-join",
                  { mintId: e, sinceLastTokenSet: n },
                );
              D.current ||
                (r.logger.info(
                  "[useAutoJoinLivestream] Conditions met (enabled), attempting auto-join",
                  {
                    mintId: e,
                    hasLivestream: !!x,
                    hasToken: !!R?.token,
                    isDisconnected: O,
                    isJoining: M,
                    enabled: k,
                  },
                ),
                C({ joinAsCohost: v }),
                (D.current = !0));
            }
          }, [k, x, R?.token, O, M, C, e, v]));
        let F = (0, n.useRef)(!1);
        return (
          (0, n.useEffect)(() => {
            if (!F.current) {
              F.current = !0;
              return;
            }
            P(null);
          }, [v]),
          (0, n.useEffect)(() => {
            D.current = !1;
          }, [e]),
          (0, n.useEffect)(() => {
            D.current = !1;
          }, [U]),
          { isJoining: M }
        );
      },
    ],
    692433,
  );
};
