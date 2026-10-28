// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(445242),
    a = e.i(44470),
    r = e.i(352386),
    i = e.i(914485),
    o = e.i(292686),
    s = e.i(484169),
    l = e.i(790290),
    c = e.i(967388),
    u = e.i(325320),
    d = e.i(89085),
    m = e.i(54567),
    p = e.i(275762);
  let f = (0, r.createContext)(void 0);
  e.s(
    [
      "K",
      0,
      (e) => {
        let r,
          h,
          g,
          k,
          T = (0, t.c)(19),
          { children: v, canPublishHint: y } = e,
          b = (0, a.f)();
        T[0] !== y || T[1] !== b
          ? ((r = { room: b, canPublishHint: y }),
            (T[0] = y),
            (T[1] = b),
            (T[2] = r))
          : (r = T[2]);
        let {
          audioInputDevices: E,
          videoInputDevices: _,
          audioDeviceId: S,
          videoDeviceId: w,
          audioSetActiveMediaDevice: I,
          videoSetActiveMediaDevice: A,
          saveAudioInputDeviceId: N,
          saveVideoInputDeviceId: R,
        } = (0, i.f)(r);
        T[3] !== I || T[4] !== b || T[5] !== N || T[6] !== R || T[7] !== A
          ? ((h = {
              room: b,
              audioSetActiveMediaDevice: I,
              videoSetActiveMediaDevice: A,
              saveAudioInputDeviceId: N,
              saveVideoInputDeviceId: R,
            }),
            (T[3] = I),
            (T[4] = b),
            (T[5] = N),
            (T[6] = R),
            (T[7] = A),
            (T[8] = h))
          : (h = T[8]);
        let { handleSetAudioDevice: P, handleSetVideoDevice: O } = (({
          room: e,
          audioSetActiveMediaDevice: n,
          videoSetActiveMediaDevice: t,
          saveAudioInputDeviceId: a,
          saveVideoInputDeviceId: r,
        }) => {
          let { mintId: i, token: f } = (0, u.E)(),
            h = (0, p.X)(i),
            g = e && f?.role !== d.A.HOST ? o.W7.COHOST : o.W7.HOST;
          return {
            handleSetAudioDevice: async (t, r) => {
              try {
                if (e?.state === s.ConnectionState.Connected)
                  try {
                    (m.logger.debug(
                      "[useDeviceSelectionHandlers] Attempting audio switch via room.switchActiveDevice",
                      { deviceId: t },
                    ),
                      await e.switchActiveDevice("audioinput", t),
                      (0, l.n)({
                        mint: i ?? "",
                        livestreamId: h?.id ? String(h.id) : void 0,
                        sourceName: r ?? t,
                        role: g,
                        context: c.c.DEVICE_SELECTOR,
                      }));
                  } catch (n) {
                    let e = n instanceof Error ? n.message : String(n);
                    m.logger.error(
                      "[useDeviceSelectionHandlers] In-Stream: Failed to switch audio device",
                      { deviceId: t, error: e },
                    );
                  }
                else
                  (m.logger.debug(
                    "[useDeviceSelectionHandlers] Attempting audio switch via audioSetActiveMediaDevice (not connected)",
                    { deviceId: t },
                  ),
                    await n(t),
                    (0, l.n)({
                      mint: i ?? "",
                      livestreamId: h?.id ? String(h.id) : void 0,
                      sourceName: r ?? t,
                      role: g,
                      context: c.c.DEVICE_SELECTOR,
                    }));
                a(t);
              } catch (n) {
                let e = n instanceof Error ? n.message : String(n);
                m.logger.error(
                  "[useDeviceSelectionHandlers] Error setting audio device",
                  { deviceId: t, error: e },
                );
              }
            },
            handleSetVideoDevice: async (n, a) => {
              try {
                if (e?.state === s.ConnectionState.Connected)
                  try {
                    (m.logger.debug(
                      "[useDeviceSelectionHandlers] Attempting video switch via room.switchActiveDevice",
                      { deviceId: n },
                    ),
                      await e.switchActiveDevice("videoinput", n),
                      (0, l.$)({
                        mint: i ?? "",
                        livestreamId: h?.id ? String(h.id) : void 0,
                        sourceName: a ?? n,
                        role: g,
                        context: c.c.DEVICE_SELECTOR,
                      }));
                  } catch (t) {
                    let e = t instanceof Error ? t.message : String(t);
                    m.logger.error(
                      "[useDeviceSelectionHandlers] In-Stream: Failed to switch video device",
                      { deviceId: n, error: e },
                    );
                  }
                else
                  (m.logger.debug(
                    "[useDeviceSelectionHandlers] Attempting video switch via videoSetActiveMediaDevice (not in room)",
                    { deviceId: n },
                  ),
                    await t(n),
                    (0, l.$)({
                      mint: i ?? "",
                      livestreamId: h?.id ? String(h.id) : void 0,
                      sourceName: a ?? n,
                      role: g,
                      context: c.c.DEVICE_SELECTOR,
                    }));
                r(n);
              } catch (t) {
                let e = t instanceof Error ? t.message : String(t);
                m.logger.error(
                  "[useDeviceSelectionHandlers] Error setting video device",
                  { deviceId: n, error: e },
                );
              }
            },
          };
        })(h);
        T[9] !== S ||
        T[10] !== E ||
        T[11] !== P ||
        T[12] !== O ||
        T[13] !== w ||
        T[14] !== _
          ? ((g = {
              audioInputDevices: E,
              videoInputDevices: _,
              audioDeviceId: S,
              videoDeviceId: w,
              handleSetAudioDevice: P,
              handleSetVideoDevice: O,
            }),
            (T[9] = S),
            (T[10] = E),
            (T[11] = P),
            (T[12] = O),
            (T[13] = w),
            (T[14] = _),
            (T[15] = g))
          : (g = T[15]);
        let x = g;
        return (
          T[16] !== v || T[17] !== x
            ? ((k = (0, n.jsx)(f.Provider, { value: x, children: v })),
              (T[16] = v),
              (T[17] = x),
              (T[18] = k))
            : (k = T[18]),
          k
        );
      },
      "G",
      0,
      () => {
        let e = (0, r.useContext)(f);
        if (void 0 === e)
          throw Error(
            "useDeviceSelectionContext must be used within a DeviceSelectionProvider",
          );
        return e;
      },
    ],
    302636,
  );
};
