// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e, r, a, s, n, i;
  var o =
    ((e = []),
    (r = 0),
    (a = (t) => {
      t();
    }),
    (s = (t) => {
      t();
    }),
    (n = (t) => setTimeout(t, 0)),
    {
      batch: (t) => {
        let i;
        r++;
        try {
          i = t();
        } finally {
          let t;
          --r ||
            ((t = e),
            (e = []),
            t.length &&
              n(() => {
                s(() => {
                  t.forEach((t) => {
                    a(t);
                  });
                });
              }));
        }
        return i;
      },
      batchCalls:
        (t) =>
        (...e) => {
          i(() => {
            t(...e);
          });
        },
      schedule: (i = (t) => {
        r
          ? e.push(t)
          : n(() => {
              a(t);
            });
      }),
      setNotifyFunction: (t) => {
        a = t;
      },
      setBatchNotifyFunction: (t) => {
        s = t;
      },
      setScheduler: (t) => {
        n = t;
      },
    });
  t.s(["f", 0, o]);
};
