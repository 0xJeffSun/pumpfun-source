// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(445242),
    t = e.i(484869),
    a = e.i(247889),
    r = e.i(852687),
    i = e.i(352386),
    o = e.i(54567);
  function s(e) {
    return "" !== e.deviceId;
  }
  function l(e) {
    return "" !== e.deviceId;
  }
  e.s([
    "f",
    0,
    (e) => {
      let c,
        u,
        d,
        m,
        p,
        f,
        h,
        g,
        k,
        T = (0, n.c)(32),
        { room: v, canPublishHint: y } = e;
      e: {
        let e = v?.localParticipant?.permissions;
        if (e) {
          let n,
            t,
            a,
            i = !!e.canPublish;
          T[0] !== e.canPublishSources
            ? ((n = e.canPublishSources ?? []),
              (T[0] = e.canPublishSources),
              (T[1] = n))
            : (n = T[1]);
          let o = n;
          T[2] !== o
            ? ((t = o.includes(r.l.CAMERA)), (T[2] = o), (T[3] = t))
            : (t = T[3]);
          let s = t;
          T[4] !== o
            ? ((a = o.includes(r.l.MICROPHONE)), (T[4] = o), (T[5] = a))
            : (a = T[5]);
          let l = a;
          c = i || s || l;
          break e;
        }
        c = !!y;
      }
      let b = c,
        E = b ? (v ?? void 0) : void 0;
      T[6] !== b || T[7] !== E
        ? ((u = { kind: "audioinput", requestPermissions: b, room: E }),
          (T[6] = b),
          (T[7] = E),
          (T[8] = u))
        : (u = T[8]);
      let _ = (0, t.f)(u),
        S = b ? (v ?? void 0) : void 0;
      T[9] !== b || T[10] !== S
        ? ((d = { kind: "videoinput", requestPermissions: b, room: S }),
          (T[9] = b),
          (T[10] = S),
          (T[11] = d))
        : (d = T[11]);
      let w = (0, t.f)(d),
        I = (0, a.f)();
      T[12] !== _.devices
        ? ((m = _.devices.filter(s)), (T[12] = _.devices), (T[13] = m))
        : (m = T[13]);
      let A = m;
      T[14] !== w.devices
        ? ((p = w.devices.filter(l)), (T[14] = w.devices), (T[15] = p))
        : (p = T[15]);
      let N = p,
        R =
          _.activeDeviceId && "" !== _.activeDeviceId
            ? _.activeDeviceId
            : "default",
        P =
          w.activeDeviceId && "" !== w.activeDeviceId
            ? w.activeDeviceId
            : "default";
      T[16] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = { audio: !1, video: !1 }), (T[16] = f))
        : (f = T[16]);
      let O = (0, i.useRef)(f);
      return (
        T[17] !== _ || T[18] !== I || T[19] !== b || T[20] !== w
          ? ((g = () => {
              if (b) {
                if (!O.current.audio && _.devices.length > 0) {
                  let e = I.userChoices.audioDeviceId;
                  (o.logger.debug("Attempting to restore audio device", {
                    savedId: e,
                  }),
                    e &&
                      "default" !== e &&
                      e !== _.activeDeviceId &&
                      _.devices.some((n) => n.deviceId === e) &&
                      _.setActiveMediaDevice(e)
                        .then(() => {
                          (I.saveAudioInputDeviceId(e),
                            o.logger.info(
                              "Successfully restored audio device",
                              { deviceId: e },
                            ));
                        })
                        .catch((n) =>
                          o.logger.error("Error restoring audio device", {
                            error: n,
                            deviceId: e,
                          }),
                        ),
                    (O.current.audio = !0));
                }
                if (!O.current.video && w.devices.length > 0) {
                  let e = I.userChoices.videoDeviceId;
                  (o.logger.debug("Attempting to restore video device", {
                    savedId: e,
                  }),
                    e &&
                      "default" !== e &&
                      e !== w.activeDeviceId &&
                      w.devices.some((n) => n.deviceId === e) &&
                      w
                        .setActiveMediaDevice(e)
                        .then(() => {
                          (I.saveVideoInputDeviceId(e),
                            o.logger.info(
                              "Successfully restored video device",
                              { deviceId: e },
                            ));
                        })
                        .catch((n) =>
                          o.logger.error("Error restoring video device", {
                            error: n,
                            deviceId: e,
                          }),
                        ),
                    (O.current.video = !0));
                }
              }
            }),
            (h = [
              _.devices,
              w.devices,
              _.activeDeviceId,
              w.activeDeviceId,
              I.userChoices.audioDeviceId,
              I.userChoices.videoDeviceId,
              _.setActiveMediaDevice,
              w.setActiveMediaDevice,
              I.saveAudioInputDeviceId,
              I.saveVideoInputDeviceId,
              _,
              I,
              w,
              b,
            ]),
            (T[17] = _),
            (T[18] = I),
            (T[19] = b),
            (T[20] = w),
            (T[21] = h),
            (T[22] = g))
          : ((h = T[21]), (g = T[22])),
        (0, i.useEffect)(g, h),
        T[23] !== R ||
        T[24] !== _.setActiveMediaDevice ||
        T[25] !== A ||
        T[26] !== I.saveAudioInputDeviceId ||
        T[27] !== I.saveVideoInputDeviceId ||
        T[28] !== P ||
        T[29] !== w.setActiveMediaDevice ||
        T[30] !== N
          ? ((k = {
              audioInputDevices: A,
              videoInputDevices: N,
              audioDeviceId: R,
              videoDeviceId: P,
              audioSetActiveMediaDevice: _.setActiveMediaDevice,
              videoSetActiveMediaDevice: w.setActiveMediaDevice,
              saveAudioInputDeviceId: I.saveAudioInputDeviceId,
              saveVideoInputDeviceId: I.saveVideoInputDeviceId,
            }),
            (T[23] = R),
            (T[24] = _.setActiveMediaDevice),
            (T[25] = A),
            (T[26] = I.saveAudioInputDeviceId),
            (T[27] = I.saveVideoInputDeviceId),
            (T[28] = P),
            (T[29] = w.setActiveMediaDevice),
            (T[30] = N),
            (T[31] = k))
          : (k = T[31]),
        k
      );
    },
  ]);
};
