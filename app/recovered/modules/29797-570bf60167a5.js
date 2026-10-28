// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436);
  let r = { x: 16, y: 16 },
    n = (0, t.$)((e, t) => ({
      pipStream: null,
      currentPageMintId: null,
      currentPageVodId: null,
      miniPlayerPosition: r,
      resumeState: null,
      _pipStreamTime: 0,
      setPipStream: (t, r) => {
        e({ pipStream: t, _pipStreamTime: r ?? 0, resumeState: null });
      },
      clearPipStream: () => {
        let { pipStream: r, _pipStreamTime: n } = t(),
          i = null;
        if (r?.originPath) {
          let e = r.originPath.match(/clip=([^&]+)/);
          i = e ? e[1] : null;
        }
        e({
          pipStream: null,
          _pipStreamTime: 0,
          resumeState:
            r && n > 0 ? { mintId: r.mintId, vodId: i, time: n } : null,
        });
      },
      setCurrentPage: (t, r = null) =>
        e({ currentPageMintId: t, currentPageVodId: r }),
      setMiniPlayerPosition: (t) => e({ miniPlayerPosition: t }),
      setCurrentTime: (t) => e({ _pipStreamTime: t }),
      clearResumeState: () => e({ resumeState: null }),
    }));
  e.s(["f", 0, n]);
};
