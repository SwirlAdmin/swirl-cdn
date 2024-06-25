var Swiper = function () { "use strict"; function e(e) { return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object } function t(s, a) { void 0 === s && (s = {}), void 0 === a && (a = {}), Object.keys(a).forEach((i => { void 0 === s[i] ? s[i] = a[i] : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i]) })) } const s = { body: {}, addEventListener() { }, removeEventListener() { }, activeElement: { blur() { }, nodeName: "" }, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createEvent: () => ({ initEvent() { } }), createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() { }, getElementsByTagName: () => [] }), createElementNS: () => ({}), importNode: () => null, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" } }; function a() { const e = "undefined" != typeof document ? document : {}; return t(e, s), e } const i = { document: s, navigator: { userAgent: "" }, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" }, history: { replaceState() { }, pushState() { }, go() { }, back() { } }, CustomEvent: function () { return this }, addEventListener() { }, removeEventListener() { }, getComputedStyle: () => ({ getPropertyValue: () => "" }), Image() { }, Date() { }, screen: {}, setTimeout() { }, clearTimeout() { }, matchMedia: () => ({}), requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0), cancelAnimationFrame(e) { "undefined" != typeof setTimeout && clearTimeout(e) } }; function r() { const e = "undefined" != typeof window ? window : {}; return t(e, i), e } function n(e) { return void 0 === e && (e = ""), e.trim().split(" ").filter((e => !!e.trim())) } function l(e, t) { return void 0 === t && (t = 0), setTimeout(e, t) } function o() { return Date.now() } function d(e, t) { void 0 === t && (t = "x"); const s = r(); let a, i, n; const l = function (e) { const t = r(); let s; return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s }(e); return s.WebKitCSSMatrix ? (i = l.transform || l.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e => e.replace(",", "."))).join(", ")), n = new s.WebKitCSSMatrix("none" === i ? "" : i)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), a = n.toString().split(",")), "x" === t && (i = s.WebKitCSSMatrix ? n.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = s.WebKitCSSMatrix ? n.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0 } function c(e) { return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1) } function p() { const e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = ["__proto__", "constructor", "prototype"]; for (let a = 1; a < arguments.length; a += 1) { const i = a < 0 || arguments.length <= a ? void 0 : arguments[a]; if (null != i && (s = i, !("undefined" != typeof window && void 0 !== window.HTMLElement ? s instanceof HTMLElement : s && (1 === s.nodeType || 11 === s.nodeType)))) { const s = Object.keys(Object(i)).filter((e => t.indexOf(e) < 0)); for (let t = 0, a = s.length; t < a; t += 1) { const a = s[t], r = Object.getOwnPropertyDescriptor(i, a); void 0 !== r && r.enumerable && (c(e[a]) && c(i[a]) ? i[a].__swiper__ ? e[a] = i[a] : p(e[a], i[a]) : !c(e[a]) && c(i[a]) ? (e[a] = {}, i[a].__swiper__ ? e[a] = i[a] : p(e[a], i[a])) : e[a] = i[a]) } } } var s; return e } function u(e, t, s) { e.style.setProperty(t, s) } function m(e) { let { swiper: t, targetPosition: s, side: a } = e; const i = r(), n = -t.translate; let l, o = null; const d = t.params.speed; t.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(t.cssModeFrameID); const c = s > n ? "next" : "prev", p = (e, t) => "next" === c && e >= t || "prev" === c && e <= t, u = () => { l = (new Date).getTime(), null === o && (o = l); const e = Math.max(Math.min((l - o) / d, 1), 0), r = .5 - Math.cos(e * Math.PI) / 2; let c = n + r * (s - n); if (p(c, s) && (c = s), t.wrapperEl.scrollTo({ [a]: c }), p(c, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout((() => { t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({ [a]: c }) })), void i.cancelAnimationFrame(t.cssModeFrameID); t.cssModeFrameID = i.requestAnimationFrame(u) }; u() } function h(e) { return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e } function f(e, t) { return void 0 === t && (t = ""), [...e.children].filter((e => e.matches(t))) } function g(e) { try { return void console.warn(e) } catch (e) { } } function v(e, t) { void 0 === t && (t = []); const s = document.createElement(e); return s.classList.add(...Array.isArray(t) ? t : n(t)), s } function w(e) { const t = r(), s = a(), i = e.getBoundingClientRect(), n = s.body, l = e.clientTop || n.clientTop || 0, o = e.clientLeft || n.clientLeft || 0, d = e === t ? t.scrollY : e.scrollTop, c = e === t ? t.scrollX : e.scrollLeft; return { top: i.top + d - l, left: i.left + c - o } } function b(e, t) { return r().getComputedStyle(e, null).getPropertyValue(t) } function y(e) { let t, s = e; if (s) { for (t = 0; null !== (s = s.previousSibling);)1 === s.nodeType && (t += 1); return t } } function E(e, t) { const s = []; let a = e.parentElement; for (; a;)t ? a.matches(t) && s.push(a) : s.push(a), a = a.parentElement; return s } function x(e, t) { t && e.addEventListener("transitionend", (function s(a) { a.target === e && (t.call(e, a), e.removeEventListener("transitionend", s)) })) } function S(e, t, s) { const a = r(); return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth } let T, M, C; function P() { return T || (T = function () { const e = r(), t = a(); return { smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style, touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch) } }()), T } function L(e) { return void 0 === e && (e = {}), M || (M = function (e) { let { userAgent: t } = void 0 === e ? {} : e; const s = P(), a = r(), i = a.navigator.platform, n = t || a.navigator.userAgent, l = { ios: !1, android: !1 }, o = a.screen.width, d = a.screen.height, c = n.match(/(Android);?[\s\/]+([\d.]+)?/); let p = n.match(/(iPad).*OS\s([\d_]+)/); const u = n.match(/(iPod)(.*OS\s([\d_]+))?/), m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), h = "Win32" === i; let f = "MacIntel" === i; return !p && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${d}`) >= 0 && (p = n.match(/(Version)\/([\d.]+)/), p || (p = [0, 1, "13_0_0"]), f = !1), c && !h && (l.os = "android", l.android = !0), (p || m || u) && (l.os = "ios", l.ios = !0), l }(e)), M } function A() { return C || (C = function () { const e = r(); let t = !1; function s() { const t = e.navigator.userAgent.toLowerCase(); return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0 } if (s()) { const s = String(e.navigator.userAgent); if (s.includes("Version/")) { const [e, a] = s.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e))); t = e < 16 || 16 === e && a < 2 } } return { isSafari: t || s(), needPerspectiveFix: t, isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent) } }()), C } var I = { on(e, t, s) { const a = this; if (!a.eventsListeners || a.destroyed) return a; if ("function" != typeof t) return a; const i = s ? "unshift" : "push"; return e.split(" ").forEach((e => { a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][i](t) })), a }, once(e, t, s) { const a = this; if (!a.eventsListeners || a.destroyed) return a; if ("function" != typeof t) return a; function i() { a.off(e, i), i.__emitterProxy && delete i.__emitterProxy; for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)r[n] = arguments[n]; t.apply(a, r) } return i.__emitterProxy = t, a.on(e, i, s) }, onAny(e, t) { const s = this; if (!s.eventsListeners || s.destroyed) return s; if ("function" != typeof e) return s; const a = t ? "unshift" : "push"; return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s }, offAny(e) { const t = this; if (!t.eventsListeners || t.destroyed) return t; if (!t.eventsAnyListeners) return t; const s = t.eventsAnyListeners.indexOf(e); return s >= 0 && t.eventsAnyListeners.splice(s, 1), t }, off(e, t) { const s = this; return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => { void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((a, i) => { (a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e].splice(i, 1) })) })), s) : s }, emit() { const e = this; if (!e.eventsListeners || e.destroyed) return e; if (!e.eventsListeners) return e; let t, s, a; for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)r[n] = arguments[n]; "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], s = r.slice(1, r.length), a = e) : (t = r[0].events, s = r[0].data, a = r[0].context || e), s.unshift(a); return (Array.isArray(t) ? t : t.split(" ")).forEach((t => { e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => { e.apply(a, [t, ...s]) })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => { e.apply(a, s) })) })), e } }; const z = (e, t) => { if (!e || e.destroyed || !e.params) return; const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`); if (s) { let t = s.querySelector(`.${e.params.lazyPreloaderClass}`); !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => { s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), t && t.remove()) }))), t && t.remove() } }, $ = (e, t) => { if (!e.slides[t]) return; const s = e.slides[t].querySelector('[loading="lazy"]'); s && s.removeAttribute("loading") }, k = e => { if (!e || e.destroyed || !e.params) return; let t = e.params.lazyPreloadPrevNext; const s = e.slides.length; if (!s || !t || t < 0) return; t = Math.min(t, s); const a = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), i = e.activeIndex; if (e.params.grid && e.params.grid.rows > 1) { const s = i, r = [s - t]; return r.push(...Array.from({ length: t }).map(((e, t) => s + a + t))), void e.slides.forEach(((t, s) => { r.includes(t.column) && $(e, s) })) } const r = i + a - 1; if (e.params.rewind || e.params.loop) for (let a = i - t; a <= r + t; a += 1) { const t = (a % s + s) % s; (t < i || t > r) && $(e, t) } else for (let a = Math.max(i - t, 0); a <= Math.min(r + t, s - 1); a += 1)a !== i && (a > r || a < i) && $(e, a) }; var O = { updateSize: function () { const e = this; let t, s; const a = e.el; t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(b(a, "padding-left") || 0, 10) - parseInt(b(a, "padding-right") || 0, 10), s = s - parseInt(b(a, "padding-top") || 0, 10) - parseInt(b(a, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s })) }, updateSlides: function () { const e = this; function t(t, s) { return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0) } const s = e.params, { wrapperEl: a, slidesEl: i, size: r, rtlTranslate: n, wrongRTL: l } = e, o = e.virtual && s.virtual.enabled, d = o ? e.virtual.slides.length : e.slides.length, c = f(i, `.${e.params.slideClass}, swiper-slide`), p = o ? e.virtual.slides.length : c.length; let m = []; const h = [], g = []; let v = s.slidesOffsetBefore; "function" == typeof v && (v = s.slidesOffsetBefore.call(e)); let w = s.slidesOffsetAfter; "function" == typeof w && (w = s.slidesOffsetAfter.call(e)); const y = e.snapGrid.length, E = e.slidesGrid.length; let x = s.spaceBetween, T = -v, M = 0, C = 0; if (void 0 === r) return; "string" == typeof x && x.indexOf("%") >= 0 ? x = parseFloat(x.replace("%", "")) / 100 * r : "string" == typeof x && (x = parseFloat(x)), e.virtualSize = -x, c.forEach((e => { n ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = "" })), s.centeredSlides && s.cssMode && (u(a, "--swiper-centered-offset-before", ""), u(a, "--swiper-centered-offset-after", "")); const P = s.grid && s.grid.rows > 1 && e.grid; let L; P ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides(); const A = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e => void 0 !== s.breakpoints[e].slidesPerView)).length > 0; for (let a = 0; a < p; a += 1) { let i; if (L = 0, c[a] && (i = c[a]), P && e.grid.updateSlide(a, i, c), !c[a] || "none" !== b(i, "display")) { if ("auto" === s.slidesPerView) { A && (c[a].style[e.getDirectionLabel("width")] = ""); const r = getComputedStyle(i), n = i.style.transform, l = i.style.webkitTransform; if (n && (i.style.transform = "none"), l && (i.style.webkitTransform = "none"), s.roundLengths) L = e.isHorizontal() ? S(i, "width", !0) : S(i, "height", !0); else { const e = t(r, "width"), s = t(r, "padding-left"), a = t(r, "padding-right"), n = t(r, "margin-left"), l = t(r, "margin-right"), o = r.getPropertyValue("box-sizing"); if (o && "border-box" === o) L = e + n + l; else { const { clientWidth: t, offsetWidth: r } = i; L = e + s + a + n + l + (r - t) } } n && (i.style.transform = n), l && (i.style.webkitTransform = l), s.roundLengths && (L = Math.floor(L)) } else L = (r - (s.slidesPerView - 1) * x) / s.slidesPerView, s.roundLengths && (L = Math.floor(L)), c[a] && (c[a].style[e.getDirectionLabel("width")] = `${L}px`); c[a] && (c[a].swiperSlideSize = L), g.push(L), s.centeredSlides ? (T = T + L / 2 + M / 2 + x, 0 === M && 0 !== a && (T = T - r / 2 - x), 0 === a && (T = T - r / 2 - x), Math.abs(T) < .001 && (T = 0), s.roundLengths && (T = Math.floor(T)), C % s.slidesPerGroup == 0 && m.push(T), h.push(T)) : (s.roundLengths && (T = Math.floor(T)), (C - Math.min(e.params.slidesPerGroupSkip, C)) % e.params.slidesPerGroup == 0 && m.push(T), h.push(T), T = T + L + x), e.virtualSize += L + x, M = L, C += 1 } } if (e.virtualSize = Math.max(e.virtualSize, r) + w, n && l && ("slide" === s.effect || "coverflow" === s.effect) && (a.style.width = `${e.virtualSize + x}px`), s.setWrapperSize && (a.style[e.getDirectionLabel("width")] = `${e.virtualSize + x}px`), P && e.grid.updateWrapperSize(L, m), !s.centeredSlides) { const t = []; for (let a = 0; a < m.length; a += 1) { let i = m[a]; s.roundLengths && (i = Math.floor(i)), m[a] <= e.virtualSize - r && t.push(i) } m = t, Math.floor(e.virtualSize - r) - Math.floor(m[m.length - 1]) > 1 && m.push(e.virtualSize - r) } if (o && s.loop) { const t = g[0] + x; if (s.slidesPerGroup > 1) { const a = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup), i = t * s.slidesPerGroup; for (let e = 0; e < a; e += 1)m.push(m[m.length - 1] + i) } for (let a = 0; a < e.virtual.slidesBefore + e.virtual.slidesAfter; a += 1)1 === s.slidesPerGroup && m.push(m[m.length - 1] + t), h.push(h[h.length - 1] + t), e.virtualSize += t } if (0 === m.length && (m = [0]), 0 !== x) { const t = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight"); c.filter(((e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1)).forEach((e => { e.style[t] = `${x}px` })) } if (s.centeredSlides && s.centeredSlidesBounds) { let e = 0; g.forEach((t => { e += t + (x || 0) })), e -= x; const t = e - r; m = m.map((e => e <= 0 ? -v : e > t ? t + w : e)) } if (s.centerInsufficientSlides) { let e = 0; if (g.forEach((t => { e += t + (x || 0) })), e -= x, e < r) { const t = (r - e) / 2; m.forEach(((e, s) => { m[s] = e - t })), h.forEach(((e, s) => { h[s] = e + t })) } } if (Object.assign(e, { slides: c, snapGrid: m, slidesGrid: h, slidesSizesGrid: g }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) { u(a, "--swiper-centered-offset-before", -m[0] + "px"), u(a, "--swiper-centered-offset-after", e.size / 2 - g[g.length - 1] / 2 + "px"); const t = -e.snapGrid[0], s = -e.slidesGrid[0]; e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + s)) } if (p !== d && e.emit("slidesLengthChange"), m.length !== y && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== E && e.emit("slidesGridLengthChange"), s.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !(o || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) { const t = `${s.containerModifierClass}backface-hidden`, a = e.el.classList.contains(t); p <= s.maxBackfaceHiddenSlides ? a || e.el.classList.add(t) : a && e.el.classList.remove(t) } }, updateAutoHeight: function (e) { const t = this, s = [], a = t.virtual && t.params.virtual.enabled; let i, r = 0; "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed); const n = e => a ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]; if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) if (t.params.centeredSlides) (t.visibleSlides || []).forEach((e => { s.push(e) })); else for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) { const e = t.activeIndex + i; if (e > t.slides.length && !a) break; s.push(n(e)) } else s.push(n(t.activeIndex)); for (i = 0; i < s.length; i += 1)if (void 0 !== s[i]) { const e = s[i].offsetHeight; r = e > r ? e : r } (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`) }, updateSlidesOffset: function () { const e = this, t = e.slides, s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0; for (let a = 0; a < t.length; a += 1)t[a].swiperSlideOffset = (e.isHorizontal() ? t[a].offsetLeft : t[a].offsetTop) - s - e.cssOverflowAdjustment() }, updateSlidesProgress: function (e) { void 0 === e && (e = this && this.translate || 0); const t = this, s = t.params, { slides: a, rtlTranslate: i, snapGrid: r } = t; if (0 === a.length) return; void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset(); let n = -e; i && (n = e), a.forEach((e => { e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass) })), t.visibleSlidesIndexes = [], t.visibleSlides = []; let l = s.spaceBetween; "string" == typeof l && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : "string" == typeof l && (l = parseFloat(l)); for (let e = 0; e < a.length; e += 1) { const o = a[e]; let d = o.swiperSlideOffset; s.cssMode && s.centeredSlides && (d -= a[0].swiperSlideOffset); const c = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l), p = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l), u = -(n - d), m = u + t.slidesSizesGrid[e], h = u >= 0 && u <= t.size - t.slidesSizesGrid[e]; (u >= 0 && u < t.size - 1 || m > 1 && m <= t.size || u <= 0 && m >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), a[e].classList.add(s.slideVisibleClass)), h && a[e].classList.add(s.slideFullyVisibleClass), o.progress = i ? -c : c, o.originalProgress = i ? -p : p } }, updateProgress: function (e) { const t = this; if (void 0 === e) { const s = t.rtlTranslate ? -1 : 1; e = t && t.translate && t.translate * s || 0 } const s = t.params, a = t.maxTranslate() - t.minTranslate(); let { progress: i, isBeginning: r, isEnd: n, progressLoop: l } = t; const o = r, d = n; if (0 === a) i = 0, r = !0, n = !0; else { i = (e - t.minTranslate()) / a; const s = Math.abs(e - t.minTranslate()) < 1, l = Math.abs(e - t.maxTranslate()) < 1; r = s || i <= 0, n = l || i >= 1, s && (i = 0), l && (i = 1) } if (s.loop) { const s = t.getSlideIndexByData(0), a = t.getSlideIndexByData(t.slides.length - 1), i = t.slidesGrid[s], r = t.slidesGrid[a], n = t.slidesGrid[t.slidesGrid.length - 1], o = Math.abs(e); l = o >= i ? (o - i) / n : (o + n - r) / n, l > 1 && (l -= 1) } Object.assign(t, { progress: i, progressLoop: l, isBeginning: r, isEnd: n }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !d && t.emit("reachEnd toEdge"), (o && !r || d && !n) && t.emit("fromEdge"), t.emit("progress", i) }, updateSlidesClasses: function () { const e = this, { slides: t, params: s, slidesEl: a, activeIndex: i } = e, r = e.virtual && s.virtual.enabled, n = e.grid && s.grid && s.grid.rows > 1, l = e => f(a, `.${s.slideClass}${e}, swiper-slide${e}`)[0]; let o, d, c; if (t.forEach((e => { e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass) })), r) if (s.loop) { let t = i - e.virtual.slidesBefore; t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), o = l(`[data-swiper-slide-index="${t}"]`) } else o = l(`[data-swiper-slide-index="${i}"]`); else n ? (o = t.filter((e => e.column === i))[0], c = t.filter((e => e.column === i + 1))[0], d = t.filter((e => e.column === i - 1))[0]) : o = t[i]; o && (o.classList.add(s.slideActiveClass), n ? (c && c.classList.add(s.slideNextClass), d && d.classList.add(s.slidePrevClass)) : (c = function (e, t) { const s = []; for (; e.nextElementSibling;) { const a = e.nextElementSibling; t ? a.matches(t) && s.push(a) : s.push(a), e = a } return s }(o, `.${s.slideClass}, swiper-slide`)[0], s.loop && !c && (c = t[0]), c && c.classList.add(s.slideNextClass), d = function (e, t) { const s = []; for (; e.previousElementSibling;) { const a = e.previousElementSibling; t ? a.matches(t) && s.push(a) : s.push(a), e = a } return s }(o, `.${s.slideClass}, swiper-slide`)[0], s.loop && 0 === !d && (d = t[t.length - 1]), d && d.classList.add(s.slidePrevClass))), e.emitSlidesClasses() }, updateActiveIndex: function (e) { const t = this, s = t.rtlTranslate ? t.translate : -t.translate, { snapGrid: a, params: i, activeIndex: r, realIndex: n, snapIndex: l } = t; let o, d = e; const c = e => { let s = e - t.virtual.slidesBefore; return s < 0 && (s = t.virtual.slides.length + s), s >= t.virtual.slides.length && (s -= t.virtual.slides.length), s }; if (void 0 === d && (d = function (e) { const { slidesGrid: t, params: s } = e, a = e.rtlTranslate ? e.translate : -e.translate; let i; for (let e = 0; e < t.length; e += 1)void 0 !== t[e + 1] ? a >= t[e] && a < t[e + 1] - (t[e + 1] - t[e]) / 2 ? i = e : a >= t[e] && a < t[e + 1] && (i = e + 1) : a >= t[e] && (i = e); return s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i }(t)), a.indexOf(s) >= 0) o = a.indexOf(s); else { const e = Math.min(i.slidesPerGroupSkip, d); o = e + Math.floor((d - e) / i.slidesPerGroup) } if (o >= a.length && (o = a.length - 1), d === r && !t.params.loop) return void (o !== l && (t.snapIndex = o, t.emit("snapIndexChange"))); if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled) return void (t.realIndex = c(d)); const p = t.grid && i.grid && i.grid.rows > 1; let u; if (t.virtual && i.virtual.enabled && i.loop) u = c(d); else if (p) { const e = t.slides.filter((e => e.column === d))[0]; let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10); Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)), u = Math.floor(s / i.grid.rows) } else if (t.slides[d]) { const e = t.slides[d].getAttribute("data-swiper-slide-index"); u = e ? parseInt(e, 10) : d } else u = d; Object.assign(t, { previousSnapIndex: l, snapIndex: o, previousRealIndex: n, realIndex: u, previousIndex: r, activeIndex: d }), t.initialized && k(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && (n !== u && t.emit("realIndexChange"), t.emit("slideChange")) }, updateClickedSlide: function (e, t) { const s = this, a = s.params; let i = e.closest(`.${a.slideClass}, swiper-slide`); !i && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e => { !i && e.matches && e.matches(`.${a.slideClass}, swiper-slide`) && (i = e) })); let r, n = !1; if (i) for (let e = 0; e < s.slides.length; e += 1)if (s.slides[e] === i) { n = !0, r = e; break } if (!i || !n) return s.clickedSlide = void 0, void (s.clickedIndex = void 0); s.clickedSlide = i, s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = r, a.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide() } }; var D = { getTranslate: function (e) { void 0 === e && (e = this.isHorizontal() ? "x" : "y"); const { params: t, rtlTranslate: s, translate: a, wrapperEl: i } = this; if (t.virtualTranslate) return s ? -a : a; if (t.cssMode) return a; let r = d(i, e); return r += this.cssOverflowAdjustment(), s && (r = -r), r || 0 }, setTranslate: function (e, t) { const s = this, { rtlTranslate: a, params: i, wrapperEl: r, progress: n } = s; let l, o = 0, d = 0; s.isHorizontal() ? o = a ? -e : e : d = e, i.roundLengths && (o = Math.floor(o), d = Math.floor(d)), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? o : d, i.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : i.virtualTranslate || (s.isHorizontal() ? o -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(), r.style.transform = `translate3d(${o}px, ${d}px, 0px)`); const c = s.maxTranslate() - s.minTranslate(); l = 0 === c ? 0 : (e - s.minTranslate()) / c, l !== n && s.updateProgress(e), s.emit("setTranslate", s.translate, t) }, minTranslate: function () { return -this.snapGrid[0] }, maxTranslate: function () { return -this.snapGrid[this.snapGrid.length - 1] }, translateTo: function (e, t, s, a, i) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === a && (a = !0); const r = this, { params: n, wrapperEl: l } = r; if (r.animating && n.preventInteractionOnTransition) return !1; const o = r.minTranslate(), d = r.maxTranslate(); let c; if (c = a && e > o ? o : a && e < d ? d : e, r.updateProgress(c), n.cssMode) { const e = r.isHorizontal(); if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c; else { if (!r.support.smoothScroll) return m({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0; l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" }) } return !0 } return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) { r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd")) }), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0 } }; function G(e) { let { swiper: t, runCallbacks: s, direction: a, step: i } = e; const { activeIndex: r, previousIndex: n } = t; let l = a; if (l || (l = r > n ? "next" : r < n ? "prev" : "reset"), t.emit(`transition${i}`), s && r !== n) { if ("reset" === l) return void t.emit(`slideResetTransition${i}`); t.emit(`slideChangeTransition${i}`), "next" === l ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`) } } var X = { slideTo: function (e, t, s, a, i) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10)); const r = this; let n = e; n < 0 && (n = 0); const { params: l, snapGrid: o, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: h, enabled: f } = r; if (r.animating && l.preventInteractionOnTransition || !f && !a && !i) return !1; const g = Math.min(r.params.slidesPerGroupSkip, n); let v = g + Math.floor((n - g) / r.params.slidesPerGroup); v >= o.length && (v = o.length - 1); const w = -o[v]; if (l.normalizeSlideIndex) for (let e = 0; e < d.length; e += 1) { const t = -Math.floor(100 * w), s = Math.floor(100 * d[e]), a = Math.floor(100 * d[e + 1]); void 0 !== d[e + 1] ? t >= s && t < a - (a - s) / 2 ? n = e : t >= s && t < a && (n = e + 1) : t >= s && (n = e) } if (r.initialized && n !== p) { if (!r.allowSlideNext && (u ? w > r.translate && w > r.minTranslate() : w < r.translate && w < r.minTranslate())) return !1; if (!r.allowSlidePrev && w > r.translate && w > r.maxTranslate() && (p || 0) !== n) return !1 } let b; if (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(w), b = n > p ? "next" : n < p ? "prev" : "reset", u && -w === r.translate || !u && w === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(w), "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)), !1; if (l.cssMode) { const e = r.isHorizontal(), s = u ? w : -w; if (0 === t) { const t = r.virtual && r.params.virtual.enabled; t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame((() => { h[e ? "scrollLeft" : "scrollTop"] = s }))) : h[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame((() => { r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1 })) } else { if (!r.support.smoothScroll) return m({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0; h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" }) } return !0 } return r.setTransition(t), r.setTranslate(w), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, b), 0 === t ? r.transitionEnd(s, b) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) { r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, b)) }), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0 }, slideToLoop: function (e, t, s, a) { if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) { e = parseInt(e, 10) } const i = this, r = i.grid && i.params.grid && i.params.grid.rows > 1; let n = e; if (i.params.loop) if (i.virtual && i.params.virtual.enabled) n += i.virtual.slidesBefore; else { let e; if (r) { const t = n * i.params.grid.rows; e = i.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === t))[0].column } else e = i.getSlideIndexByData(n); const t = r ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length, { centeredSlides: s } = i.params; let a = i.params.slidesPerView; "auto" === a ? a = i.slidesPerViewDynamic() : (a = Math.ceil(parseFloat(i.params.slidesPerView, 10)), s && a % 2 == 0 && (a += 1)); let l = t - e < a; if (s && (l = l || e < Math.ceil(a / 2)), l) { const a = s ? e < i.activeIndex ? "prev" : "next" : e - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev"; i.loopFix({ direction: a, slideTo: !0, activeSlideIndex: "next" === a ? e + 1 : e - t + 1, slideRealIndex: "next" === a ? i.realIndex : void 0 }) } if (r) { const e = n * i.params.grid.rows; n = i.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0].column } else n = i.getSlideIndexByData(n) } return requestAnimationFrame((() => { i.slideTo(n, t, s, a) })), i }, slideNext: function (e, t, s) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); const a = this, { enabled: i, params: r, animating: n } = a; if (!i) return a; let l = r.slidesPerGroup; "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", !0), 1)); const o = a.activeIndex < r.slidesPerGroupSkip ? 1 : l, d = a.virtual && r.virtual.enabled; if (r.loop) { if (n && !d && r.loopPreventsSliding) return !1; if (a.loopFix({ direction: "next" }), a._clientLeft = a.wrapperEl.clientLeft, a.activeIndex === a.slides.length - 1 && r.cssMode) return requestAnimationFrame((() => { a.slideTo(a.activeIndex + o, e, t, s) })), !0 } return r.rewind && a.isEnd ? a.slideTo(0, e, t, s) : a.slideTo(a.activeIndex + o, e, t, s) }, slidePrev: function (e, t, s) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); const a = this, { params: i, snapGrid: r, slidesGrid: n, rtlTranslate: l, enabled: o, animating: d } = a; if (!o) return a; const c = a.virtual && i.virtual.enabled; if (i.loop) { if (d && !c && i.loopPreventsSliding) return !1; a.loopFix({ direction: "prev" }), a._clientLeft = a.wrapperEl.clientLeft } function p(e) { return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e) } const u = p(l ? a.translate : -a.translate), m = r.map((e => p(e))); let h = r[m.indexOf(u) - 1]; if (void 0 === h && i.cssMode) { let e; r.forEach(((t, s) => { u >= t && (e = s) })), void 0 !== e && (h = r[e > 0 ? e - 1 : e]) } let f = 0; if (void 0 !== h && (f = n.indexOf(h), f < 0 && (f = a.activeIndex - 1), "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (f = f - a.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), i.rewind && a.isBeginning) { const i = a.params.virtual && a.params.virtual.enabled && a.virtual ? a.virtual.slides.length - 1 : a.slides.length - 1; return a.slideTo(i, e, t, s) } return i.loop && 0 === a.activeIndex && i.cssMode ? (requestAnimationFrame((() => { a.slideTo(f, e, t, s) })), !0) : a.slideTo(f, e, t, s) }, slideReset: function (e, t, s) { return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, s) }, slideToClosest: function (e, t, s, a) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === a && (a = .5); const i = this; let r = i.activeIndex; const n = Math.min(i.params.slidesPerGroupSkip, r), l = n + Math.floor((r - n) / i.params.slidesPerGroup), o = i.rtlTranslate ? i.translate : -i.translate; if (o >= i.snapGrid[l]) { const e = i.snapGrid[l]; o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup) } else { const e = i.snapGrid[l - 1]; o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup) } return r = Math.max(r, 0), r = Math.min(r, i.slidesGrid.length - 1), i.slideTo(r, e, t, s) }, slideToClickedSlide: function () { const e = this, { params: t, slidesEl: s } = e, a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView; let i, r = e.clickedIndex; const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`; if (t.loop) { if (e.animating) return; i = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), r = e.getSlideIndex(f(s, `${n}[data-swiper-slide-index="${i}"]`)[0]), l((() => { e.slideTo(r) }))) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(), r = e.getSlideIndex(f(s, `${n}[data-swiper-slide-index="${i}"]`)[0]), l((() => { e.slideTo(r) }))) : e.slideTo(r) } else e.slideTo(r) } }; var H = { loopCreate: function (e) { const t = this, { params: s, slidesEl: a } = t; if (!s.loop || t.virtual && t.params.virtual.enabled) return; const i = () => { f(a, `.${s.slideClass}, swiper-slide`).forEach(((e, t) => { e.setAttribute("data-swiper-slide-index", t) })) }, r = t.grid && s.grid && s.grid.rows > 1, n = s.slidesPerGroup * (r ? s.grid.rows : 1), l = t.slides.length % n != 0, o = r && t.slides.length % s.grid.rows != 0, d = e => { for (let a = 0; a < e; a += 1) { const e = t.isElement ? v("swiper-slide", [s.slideBlankClass]) : v("div", [s.slideClass, s.slideBlankClass]); t.slidesEl.append(e) } }; if (l) { if (s.loopAddBlankSlides) { d(n - t.slides.length % n), t.recalcSlides(), t.updateSlides() } else g("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"); i() } else if (o) { if (s.loopAddBlankSlides) { d(s.grid.rows - t.slides.length % s.grid.rows), t.recalcSlides(), t.updateSlides() } else g("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"); i() } else i(); t.loopFix({ slideRealIndex: e, direction: s.centeredSlides ? void 0 : "next" }) }, loopFix: function (e) { let { slideRealIndex: t, slideTo: s = !0, direction: a, setTranslate: i, activeSlideIndex: r, byController: n, byMousewheel: l } = void 0 === e ? {} : e; const o = this; if (!o.params.loop) return; o.emit("beforeLoopFix"); const { slides: d, allowSlidePrev: c, allowSlideNext: p, slidesEl: u, params: m } = o, { centeredSlides: h } = m; if (o.allowSlidePrev = !0, o.allowSlideNext = !0, o.virtual && m.virtual.enabled) return s && (m.centeredSlides || 0 !== o.snapIndex ? m.centeredSlides && o.snapIndex < m.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0) : o.slideTo(o.virtual.slides.length, 0, !1, !0)), o.allowSlidePrev = c, o.allowSlideNext = p, void o.emit("loopFix"); let f = m.slidesPerView; "auto" === f ? f = o.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(m.slidesPerView, 10)), h && f % 2 == 0 && (f += 1)); const v = m.slidesPerGroupAuto ? f : m.slidesPerGroup; let w = v; w % v != 0 && (w += v - w % v), w += m.loopAdditionalSlides, o.loopedSlides = w; const b = o.grid && m.grid && m.grid.rows > 1; d.length < f + w ? g("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : b && "row" === m.grid.fill && g("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"); const y = [], E = []; let x = o.activeIndex; void 0 === r ? r = o.getSlideIndex(d.filter((e => e.classList.contains(m.slideActiveClass)))[0]) : x = r; const S = "next" === a || !a, T = "prev" === a || !a; let M = 0, C = 0; const P = b ? Math.ceil(d.length / m.grid.rows) : d.length, L = (b ? d[r].column : r) + (h && void 0 === i ? -f / 2 + .5 : 0); if (L < w) { M = Math.max(w - L, v); for (let e = 0; e < w - L; e += 1) { const t = e - Math.floor(e / P) * P; if (b) { const e = P - t - 1; for (let t = d.length - 1; t >= 0; t -= 1)d[t].column === e && y.push(t) } else y.push(P - t - 1) } } else if (L + f > P - w) { C = Math.max(L - (P - 2 * w), v); for (let e = 0; e < C; e += 1) { const t = e - Math.floor(e / P) * P; b ? d.forEach(((e, s) => { e.column === t && E.push(s) })) : E.push(t) } } if (o.__preventObserver__ = !0, requestAnimationFrame((() => { o.__preventObserver__ = !1 })), T && y.forEach((e => { d[e].swiperLoopMoveDOM = !0, u.prepend(d[e]), d[e].swiperLoopMoveDOM = !1 })), S && E.forEach((e => { d[e].swiperLoopMoveDOM = !0, u.append(d[e]), d[e].swiperLoopMoveDOM = !1 })), o.recalcSlides(), "auto" === m.slidesPerView ? o.updateSlides() : b && (y.length > 0 && T || E.length > 0 && S) && o.slides.forEach(((e, t) => { o.grid.updateSlide(t, e, o.slides) })), m.watchSlidesProgress && o.updateSlidesOffset(), s) if (y.length > 0 && T) { if (void 0 === t) { const e = o.slidesGrid[x], t = o.slidesGrid[x + M] - e; l ? o.setTranslate(o.translate - t) : (o.slideTo(x + M, 0, !1, !0), i && (o.touchEventsData.startTranslate = o.touchEventsData.startTranslate - t, o.touchEventsData.currentTranslate = o.touchEventsData.currentTranslate - t)) } else if (i) { const e = b ? y.length / m.grid.rows : y.length; o.slideTo(o.activeIndex + e, 0, !1, !0), o.touchEventsData.currentTranslate = o.translate } } else if (E.length > 0 && S) if (void 0 === t) { const e = o.slidesGrid[x], t = o.slidesGrid[x - C] - e; l ? o.setTranslate(o.translate - t) : (o.slideTo(x - C, 0, !1, !0), i && (o.touchEventsData.startTranslate = o.touchEventsData.startTranslate - t, o.touchEventsData.currentTranslate = o.touchEventsData.currentTranslate - t)) } else { const e = b ? E.length / m.grid.rows : E.length; o.slideTo(o.activeIndex - e, 0, !1, !0) } if (o.allowSlidePrev = c, o.allowSlideNext = p, o.controller && o.controller.control && !n) { const e = { slideRealIndex: t, direction: a, setTranslate: i, activeSlideIndex: r, byController: !0 }; Array.isArray(o.controller.control) ? o.controller.control.forEach((t => { !t.destroyed && t.params.loop && t.loopFix({ ...e, slideTo: t.params.slidesPerView === m.slidesPerView && s }) })) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix({ ...e, slideTo: o.controller.control.params.slidesPerView === m.slidesPerView && s }) } o.emit("loopFix") }, loopDestroy: function () { const e = this, { params: t, slidesEl: s } = e; if (!t.loop || e.virtual && e.params.virtual.enabled) return; e.recalcSlides(); const a = []; e.slides.forEach((e => { const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex; a[t] = e })), e.slides.forEach((e => { e.removeAttribute("data-swiper-slide-index") })), a.forEach((e => { s.append(e) })), e.recalcSlides(), e.slideTo(e.realIndex, 0) } }; function N(e, t, s) { const a = r(), { params: i } = e, n = i.edgeSwipeDetection, l = i.edgeSwipeThreshold; return !n || !(s <= l || s >= a.innerWidth - l) || "prevent" === n && (t.preventDefault(), !0) } function Y(e) { const t = this, s = a(); let i = e; i.originalEvent && (i = i.originalEvent); const n = t.touchEventsData; if ("pointerdown" === i.type) { if (null !== n.pointerId && n.pointerId !== i.pointerId) return; n.pointerId = i.pointerId } else "touchstart" === i.type && 1 === i.targetTouches.length && (n.touchId = i.targetTouches[0].identifier); if ("touchstart" === i.type) return void N(t, i, i.targetTouches[0].pageX); const { params: l, touches: d, enabled: c } = t; if (!c) return; if (!l.simulateTouch && "mouse" === i.pointerType) return; if (t.animating && l.preventInteractionOnTransition) return; !t.animating && l.cssMode && l.loop && t.loopFix(); let p = i.target; if ("wrapper" === l.touchEventsTarget && !t.wrapperEl.contains(p)) return; if ("which" in i && 3 === i.which) return; if ("button" in i && i.button > 0) return; if (n.isTouched && n.isMoved) return; const u = !!l.noSwipingClass && "" !== l.noSwipingClass, m = i.composedPath ? i.composedPath() : i.path; u && i.target && i.target.shadowRoot && m && (p = m[0]); const h = l.noSwipingSelector ? l.noSwipingSelector : `.${l.noSwipingClass}`, f = !(!i.target || !i.target.shadowRoot); if (l.noSwiping && (f ? function (e, t) { return void 0 === t && (t = this), function t(s) { if (!s || s === a() || s === r()) return null; s.assignedSlot && (s = s.assignedSlot); const i = s.closest(e); return i || s.getRootNode ? i || t(s.getRootNode().host) : null }(t) }(h, p) : p.closest(h))) return void (t.allowClick = !0); if (l.swipeHandler && !p.closest(l.swipeHandler)) return; d.currentX = i.pageX, d.currentY = i.pageY; const g = d.currentX, v = d.currentY; if (!N(t, i, g)) return; Object.assign(n, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), d.startX = g, d.startY = v, n.touchStartTime = o(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, l.threshold > 0 && (n.allowThresholdMove = !1); let w = !0; p.matches(n.focusableElements) && (w = !1, "SELECT" === p.nodeName && (n.isTouched = !1)), s.activeElement && s.activeElement.matches(n.focusableElements) && s.activeElement !== p && s.activeElement.blur(); const b = w && t.allowTouchMove && l.touchStartPreventDefault; !l.touchStartForcePreventDefault && !b || p.isContentEditable || i.preventDefault(), l.freeMode && l.freeMode.enabled && t.freeMode && t.animating && !l.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", i) } function B(e) { const t = a(), s = this, i = s.touchEventsData, { params: r, touches: n, rtlTranslate: l, enabled: d } = s; if (!d) return; if (!r.simulateTouch && "mouse" === e.pointerType) return; let c, p = e; if (p.originalEvent && (p = p.originalEvent), "pointermove" === p.type) { if (null !== i.touchId) return; if (p.pointerId !== i.pointerId) return } if ("touchmove" === p.type) { if (c = [...p.changedTouches].filter((e => e.identifier === i.touchId))[0], !c || c.identifier !== i.touchId) return } else c = p; if (!i.isTouched) return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", p)); const u = c.pageX, m = c.pageY; if (p.preventedByNestedSwiper) return n.startX = u, void (n.startY = m); if (!s.allowTouchMove) return p.target.matches(i.focusableElements) || (s.allowClick = !1), void (i.isTouched && (Object.assign(n, { startX: u, startY: m, currentX: u, currentY: m }), i.touchStartTime = o())); if (r.touchReleaseOnEdges && !r.loop) if (s.isVertical()) { if (m < n.startY && s.translate <= s.maxTranslate() || m > n.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1) } else if (u < n.startX && s.translate <= s.maxTranslate() || u > n.startX && s.translate >= s.minTranslate()) return; if (t.activeElement && p.target === t.activeElement && p.target.matches(i.focusableElements)) return i.isMoved = !0, void (s.allowClick = !1); i.allowTouchCallbacks && s.emit("touchMove", p), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = u, n.currentY = m; const h = n.currentX - n.startX, f = n.currentY - n.startY; if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold) return; if (void 0 === i.isScrolling) { let e; s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : h * h + f * f >= 25 && (e = 180 * Math.atan2(Math.abs(f), Math.abs(h)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle) } if (i.isScrolling && s.emit("touchMoveOpposite", p), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) return void (i.isTouched = !1); if (!i.startMoving) return; s.allowClick = !1, !r.cssMode && p.cancelable && p.preventDefault(), r.touchMoveStopPropagation && !r.nested && p.stopPropagation(); let g = s.isHorizontal() ? h : f, v = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY; r.oneWayMovement && (g = Math.abs(g) * (l ? 1 : -1), v = Math.abs(v) * (l ? 1 : -1)), n.diff = g, g *= r.touchRatio, l && (g = -g, v = -v); const w = s.touchesDirection; s.swipeDirection = g > 0 ? "prev" : "next", s.touchesDirection = v > 0 ? "prev" : "next"; const b = s.params.loop && !r.cssMode, y = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev; if (!i.isMoved) { if (b && y && s.loopFix({ direction: s.swipeDirection }), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) { const e = new window.CustomEvent("transitionend", { bubbles: !0, cancelable: !0 }); s.wrapperEl.dispatchEvent(e) } i.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", p) } if ((new Date).getTime(), i.isMoved && i.allowThresholdMove && w !== s.touchesDirection && b && y && Math.abs(g) >= 1) return Object.assign(n, { startX: u, startY: m, currentX: u, currentY: m, startTranslate: i.currentTranslate }), i.loopSwapReset = !0, void (i.startTranslate = i.currentTranslate); s.emit("sliderMove", p), i.isMoved = !0, i.currentTranslate = g + i.startTranslate; let E = !0, x = r.resistanceRatio; if (r.touchReleaseOnEdges && (x = 0), g > 0 ? (b && y && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] : s.minTranslate()) && s.loopFix({ direction: "prev", setTranslate: !0, activeSlideIndex: 0 }), i.currentTranslate > s.minTranslate() && (E = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + g) ** x))) : g < 0 && (b && y && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] : s.maxTranslate()) && s.loopFix({ direction: "next", setTranslate: !0, activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10))) }), i.currentTranslate < s.maxTranslate() && (E = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - g) ** x))), E && (p.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) { if (!(Math.abs(g) > r.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate); if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void (n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY) } r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate)) } function R(e) { const t = this, s = t.touchEventsData; let a, i = e; i.originalEvent && (i = i.originalEvent); if ("touchend" === i.type || "touchcancel" === i.type) { if (a = [...i.changedTouches].filter((e => e.identifier === s.touchId))[0], !a || a.identifier !== s.touchId) return } else { if (null !== s.touchId) return; if (i.pointerId !== s.pointerId) return; a = i } if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type)) { if (!(["pointercancel", "contextmenu"].includes(i.type) && (t.browser.isSafari || t.browser.isWebView))) return } s.pointerId = null, s.touchId = null; const { params: r, touches: n, rtlTranslate: d, slidesGrid: c, enabled: p } = t; if (!p) return; if (!r.simulateTouch && "mouse" === i.pointerType) return; if (s.allowTouchCallbacks && t.emit("touchEnd", i), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && r.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void (s.startMoving = !1); r.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1); const u = o(), m = u - s.touchStartTime; if (t.allowClick) { const e = i.path || i.composedPath && i.composedPath(); t.updateClickedSlide(e && e[0] || i.target, e), t.emit("tap click", i), m < 300 && u - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", i) } if (s.lastClickTime = o(), l((() => { t.destroyed || (t.allowClick = !0) })), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset) return s.isTouched = !1, s.isMoved = !1, void (s.startMoving = !1); let h; if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, h = r.followFinger ? d ? t.translate : -t.translate : -s.currentTranslate, r.cssMode) return; if (r.freeMode && r.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: h }); const f = h >= -t.maxTranslate() && !t.params.loop; let g = 0, v = t.slidesSizesGrid[0]; for (let e = 0; e < c.length; e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) { const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup; void 0 !== c[e + t] ? (f || h >= c[e] && h < c[e + t]) && (g = e, v = c[e + t] - c[e]) : (f || h >= c[e]) && (g = e, v = c[c.length - 1] - c[c.length - 2]) } let w = null, b = null; r.rewind && (t.isBeginning ? b = r.virtual && r.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (w = 0)); const y = (h - c[g]) / v, E = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup; if (m > r.longSwipesMs) { if (!r.longSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && (y >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? w : g + E) : t.slideTo(g)), "prev" === t.swipeDirection && (y > 1 - r.longSwipesRatio ? t.slideTo(g + E) : null !== b && y < 0 && Math.abs(y) > r.longSwipesRatio ? t.slideTo(b) : t.slideTo(g)) } else { if (!r.shortSwipes) return void t.slideTo(t.activeIndex); t.navigation && (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl) ? i.target === t.navigation.nextEl ? t.slideTo(g + E) : t.slideTo(g) : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : g + E), "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g)) } } function q() { const e = this, { params: t, el: s } = e; if (s && 0 === s.offsetWidth) return; t.breakpoints && e.setBreakpoint(); const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e, n = e.virtual && e.params.virtual.enabled; e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(); const l = n && t.loop; !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout((() => { e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume() }), 500)), e.allowSlidePrev = i, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow() } function V(e) { const t = this; t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))) } function _() { const e = this, { wrapperEl: t, rtlTranslate: s, enabled: a } = e; if (!a) return; let i; e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses(); const r = e.maxTranslate() - e.minTranslate(); i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, i !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1) } function F(e) { const t = this; z(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update() } function j() { const e = this; e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto")) } const W = (e, t) => { const s = a(), { params: i, el: r, wrapperEl: n, device: l } = e, o = !!i.nested, d = "on" === t ? "addEventListener" : "removeEventListener", c = t; s[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }), r[d]("touchstart", e.onTouchStart, { passive: !1 }), r[d]("pointerdown", e.onTouchStart, { passive: !1 }), s[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }), s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }), s[d]("touchend", e.onTouchEnd, { passive: !0 }), s[d]("pointerup", e.onTouchEnd, { passive: !0 }), s[d]("pointercancel", e.onTouchEnd, { passive: !0 }), s[d]("touchcancel", e.onTouchEnd, { passive: !0 }), s[d]("pointerout", e.onTouchEnd, { passive: !0 }), s[d]("pointerleave", e.onTouchEnd, { passive: !0 }), s[d]("contextmenu", e.onTouchEnd, { passive: !0 }), (i.preventClicks || i.preventClicksPropagation) && r[d]("click", e.onClick, !0), i.cssMode && n[d]("scroll", e.onScroll), i.updateOnWindowResize ? e[c](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", q, !0) : e[c]("observerUpdate", q, !0), r[d]("load", e.onLoad, { capture: !0 }) }; const U = (e, t) => e.grid && t.grid && t.grid.rows > 1; var K = { init: !0, direction: "horizontal", oneWayMovement: !1, touchEventsTarget: "wrapper", initialSlide: 0, speed: 300, cssMode: !1, updateOnWindowResize: !0, resizeObserver: !0, nested: !1, createElements: !1, eventsPrefix: "swiper", enabled: !0, focusableElements: "input, select, option, textarea, button, video, label", width: null, height: null, preventInteractionOnTransition: !1, userAgent: null, url: null, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, breakpointsBase: "window", spaceBetween: 0, slidesPerView: 1, slidesPerGroup: 1, slidesPerGroupSkip: 0, slidesPerGroupAuto: !1, centeredSlides: !1, centeredSlidesBounds: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 5, touchMoveStopPropagation: !1, touchStartPreventDefault: !0, touchStartForcePreventDefault: !1, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: .85, watchSlidesProgress: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, loop: !1, loopAddBlankSlides: !0, loopAdditionalSlides: 0, loopPreventsSliding: !0, rewind: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, maxBackfaceHiddenSlides: 10, containerModifierClass: "swiper-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-blank", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideFullyVisibleClass: "swiper-slide-fully-visible", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", lazyPreloaderClass: "swiper-lazy-preloader", lazyPreloadPrevNext: 0, runCallbacksOnInit: !0, _emitClasses: !1 }; function Z(e, t) { return function (s) { void 0 === s && (s = {}); const a = Object.keys(s)[0], i = s[a]; "object" == typeof i && null !== i ? (!0 === e[a] && (e[a] = { enabled: !0 }), "navigation" === a && e[a] && e[a].enabled && !e[a].prevEl && !e[a].nextEl && (e[a].auto = !0), ["pagination", "scrollbar"].indexOf(a) >= 0 && e[a] && e[a].enabled && !e[a].el && (e[a].auto = !0), a in e && "enabled" in i ? ("object" != typeof e[a] || "enabled" in e[a] || (e[a].enabled = !0), e[a] || (e[a] = { enabled: !1 }), p(t, s)) : p(t, s)) : p(t, s) } } const Q = { eventsEmitter: I, update: O, translate: D, transition: { setTransition: function (e, t) { const s = this; s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`, s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""), s.emit("setTransition", e, t) }, transitionStart: function (e, t) { void 0 === e && (e = !0); const s = this, { params: a } = s; a.cssMode || (a.autoHeight && s.updateAutoHeight(), G({ swiper: s, runCallbacks: e, direction: t, step: "Start" })) }, transitionEnd: function (e, t) { void 0 === e && (e = !0); const s = this, { params: a } = s; s.animating = !1, a.cssMode || (s.setTransition(0), G({ swiper: s, runCallbacks: e, direction: t, step: "End" })) } }, slide: X, loop: H, grabCursor: { setGrabCursor: function (e) { const t = this; if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return; const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl; t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame((() => { t.__preventObserver__ = !1 })) }, unsetGrabCursor: function () { const e = this; e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame((() => { e.__preventObserver__ = !1 }))) } }, events: { attachEvents: function () { const e = this, { params: t } = e; e.onTouchStart = Y.bind(e), e.onTouchMove = B.bind(e), e.onTouchEnd = R.bind(e), e.onDocumentTouchStart = j.bind(e), t.cssMode && (e.onScroll = _.bind(e)), e.onClick = V.bind(e), e.onLoad = F.bind(e), W(e, "on") }, detachEvents: function () { W(this, "off") } }, breakpoints: { setBreakpoint: function () { const e = this, { realIndex: t, initialized: s, params: a, el: i } = e, r = a.breakpoints; if (!r || r && 0 === Object.keys(r).length) return; const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el); if (!n || e.currentBreakpoint === n) return; const l = (n in r ? r[n] : void 0) || e.originalParams, o = U(e, a), d = U(e, l), c = a.enabled; o && !d ? (i.classList.remove(`${a.containerModifierClass}grid`, `${a.containerModifierClass}grid-column`), e.emitContainerClasses()) : !o && d && (i.classList.add(`${a.containerModifierClass}grid`), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === a.grid.fill) && i.classList.add(`${a.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((t => { if (void 0 === l[t]) return; const s = a[t] && a[t].enabled, i = l[t] && l[t].enabled; s && !i && e[t].disable(), !s && i && e[t].enable() })); const u = l.direction && l.direction !== a.direction, m = a.loop && (l.slidesPerView !== a.slidesPerView || u), h = a.loop; u && s && e.changeDirection(), p(e.params, l); const f = e.params.enabled, g = e.params.loop; Object.assign(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }), c && !f ? e.disable() : !c && f && e.enable(), e.currentBreakpoint = n, e.emit("_beforeBreakpoint", l), s && (m ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !h && g ? (e.loopCreate(t), e.updateSlides()) : h && !g && e.loopDestroy()), e.emit("breakpoint", l) }, getBreakpoint: function (e, t, s) { if (void 0 === t && (t = "window"), !e || "container" === t && !s) return; let a = !1; const i = r(), n = "window" === t ? i.innerHeight : s.clientHeight, l = Object.keys(e).map((e => { if ("string" == typeof e && 0 === e.indexOf("@")) { const t = parseFloat(e.substr(1)); return { value: n * t, point: e } } return { value: e, point: e } })); l.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10))); for (let e = 0; e < l.length; e += 1) { const { point: r, value: n } = l[e]; "window" === t ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r) : n <= s.clientWidth && (a = r) } return a || "max" } }, checkOverflow: { checkOverflow: function () { const e = this, { isLocked: t, params: s } = e, { slidesOffsetBefore: a } = s; if (a) { const t = e.slides.length - 1, s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a; e.isLocked = e.size > s } else e.isLocked = 1 === e.snapGrid.length; !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock") } }, classes: { addClasses: function () { const e = this, { classNames: t, params: s, rtl: a, el: i, device: r } = e, n = function (e, t) { const s = []; return e.forEach((e => { "object" == typeof e ? Object.keys(e).forEach((a => { e[a] && s.push(t + a) })) : "string" == typeof e && s.push(t + e) })), s }(["initialized", s.direction, { "free-mode": e.params.freeMode && s.freeMode.enabled }, { autoheight: s.autoHeight }, { rtl: a }, { grid: s.grid && s.grid.rows > 1 }, { "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill }, { android: r.android }, { ios: r.ios }, { "css-mode": s.cssMode }, { centered: s.cssMode && s.centeredSlides }, { "watch-progress": s.watchSlidesProgress }], s.containerModifierClass); t.push(...n), i.classList.add(...t), e.emitContainerClasses() }, removeClasses: function () { const { el: e, classNames: t } = this; e.classList.remove(...t), this.emitContainerClasses() } } }, J = {}; class ee { constructor() { let e, t; for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)i[r] = arguments[r]; 1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = p({}, t), e && !t.el && (t.el = e); const n = a(); if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) { const e = []; return n.querySelectorAll(t.el).forEach((s => { const a = p({}, t, { el: s }); e.push(new ee(a)) })), e } const l = this; l.__swiper__ = !0, l.support = P(), l.device = L({ userAgent: t.userAgent }), l.browser = A(), l.eventsListeners = {}, l.eventsAnyListeners = [], l.modules = [...l.__modules__], t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules); const o = {}; l.modules.forEach((e => { e({ params: t, swiper: l, extendParams: Z(t, o), on: l.on.bind(l), once: l.once.bind(l), off: l.off.bind(l), emit: l.emit.bind(l) }) })); const d = p({}, K, o); return l.params = p({}, d, J, t), l.originalParams = p({}, l.params), l.passedParams = p({}, t), l.params && l.params.on && Object.keys(l.params.on).forEach((e => { l.on(e, l.params.on[e]) })), l.params && l.params.onAny && l.onAny(l.params.onAny), Object.assign(l, { enabled: l.params.enabled, el: e, classNames: [], slides: [], slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: () => "horizontal" === l.params.direction, isVertical: () => "vertical" === l.params.direction, activeIndex: 0, realIndex: 0, isBeginning: !0, isEnd: !1, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: !1, cssOverflowAdjustment() { return Math.trunc(this.translate / 2 ** 23) * 2 ** 23 }, allowSlideNext: l.params.allowSlideNext, allowSlidePrev: l.params.allowSlidePrev, touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, focusableElements: l.params.focusableElements, lastClickTime: 0, clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, startMoving: void 0, pointerId: null, touchId: null }, allowClick: !0, allowTouchMove: l.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }), l.emit("_swiper"), l.params.init && l.init(), l } getDirectionLabel(e) { return this.isHorizontal() ? e : { width: "height", "margin-top": "margin-left", "margin-bottom ": "margin-right", "margin-left": "margin-top", "margin-right": "margin-bottom", "padding-left": "padding-top", "padding-right": "padding-bottom", marginRight: "marginBottom" }[e] } getSlideIndex(e) { const { slidesEl: t, params: s } = this, a = y(f(t, `.${s.slideClass}, swiper-slide`)[0]); return y(e) - a } getSlideIndexByData(e) { return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0]) } recalcSlides() { const { slidesEl: e, params: t } = this; this.slides = f(e, `.${t.slideClass}, swiper-slide`) } enable() { const e = this; e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable")) } disable() { const e = this; e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable")) } setProgress(e, t) { const s = this; e = Math.min(Math.max(e, 0), 1); const a = s.minTranslate(), i = (s.maxTranslate() - a) * e + a; s.translateTo(i, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses() } emitContainerClasses() { const e = this; if (!e.params._emitClasses || !e.el) return; const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass))); e.emit("_containerClasses", t.join(" ")) } getSlideClasses(e) { const t = this; return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ") } emitSlidesClasses() { const e = this; if (!e.params._emitClasses || !e.el) return; const t = []; e.slides.forEach((s => { const a = e.getSlideClasses(s); t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a) })), e.emit("_slideClasses", t) } slidesPerViewDynamic(e, t) { void 0 === e && (e = "current"), void 0 === t && (t = !1); const { params: s, slides: a, slidesGrid: i, slidesSizesGrid: r, size: n, activeIndex: l } = this; let o = 1; if ("number" == typeof s.slidesPerView) return s.slidesPerView; if (s.centeredSlides) { let e, t = a[l] ? a[l].swiperSlideSize : 0; for (let s = l + 1; s < a.length; s += 1)a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0)); for (let s = l - 1; s >= 0; s -= 1)a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0)) } else if ("current" === e) for (let e = l + 1; e < a.length; e += 1) { (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1) } else for (let e = l - 1; e >= 0; e -= 1) { i[l] - i[e] < n && (o += 1) } return o } update() { const e = this; if (!e || e.destroyed) return; const { snapGrid: t, params: s } = e; function a() { const t = e.rtlTranslate ? -1 * e.translate : e.translate, s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate()); e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses() } let i; if (s.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => { t.complete && z(e, t) })), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), s.freeMode && s.freeMode.enabled && !s.cssMode) a(), s.autoHeight && e.updateAutoHeight(); else { if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) { const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides; i = e.slideTo(t.length - 1, 0, !1, !0) } else i = e.slideTo(e.activeIndex, 0, !1, !0); i || a() } s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update") } changeDirection(e, t) { void 0 === t && (t = !0); const s = this, a = s.params.direction; return e || (e = "horizontal" === a ? "vertical" : "horizontal"), e === a || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${a}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach((t => { "vertical" === e ? t.style.width = "" : t.style.height = "" })), s.emit("changeDirection"), t && s.update()), s } changeLanguageDirection(e) { const t = this; t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update()) } mount(e) { const t = this; if (t.mounted) return !0; let s = e || t.params.el; if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1; s.swiper = t, s.parentNode && s.parentNode.host && "SWIPER-CONTAINER" === s.parentNode.host.nodeName && (t.isElement = !0); const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`; let i = (() => { if (s && s.shadowRoot && s.shadowRoot.querySelector) { return s.shadowRoot.querySelector(a()) } return f(s, a())[0] })(); return !i && t.params.createElements && (i = v("div", t.params.wrapperClass), s.append(i), f(s, `.${t.params.slideClass}`).forEach((e => { i.append(e) }))), Object.assign(t, { el: s, wrapperEl: i, slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : i, hostEl: t.isElement ? s.parentNode.host : s, mounted: !0, rtl: "rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction"), rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction")), wrongRTL: "-webkit-box" === b(i, "display") }), !0 } init(e) { const t = this; if (t.initialized) return t; if (!1 === t.mount(e)) return t; t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents(); const s = [...t.el.querySelectorAll('[loading="lazy"]')]; return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), s.forEach((e => { e.complete ? z(t, e) : e.addEventListener("load", (e => { z(t, e.target) })) })), k(t), t.initialized = !0, k(t), t.emit("init"), t.emit("afterInit"), t } destroy(e, t) { void 0 === e && (e = !0), void 0 === t && (t = !0); const s = this, { params: a, el: i, wrapperEl: r, slides: n } = s; return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), i.removeAttribute("style"), r.removeAttribute("style"), n && n.length && n.forEach((e => { e.classList.remove(a.slideVisibleClass, a.slideFullyVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index") }))), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e => { s.off(e) })), !1 !== e && (s.el.swiper = null, function (e) { const t = e; Object.keys(t).forEach((e => { try { t[e] = null } catch (e) { } try { delete t[e] } catch (e) { } })) }(s)), s.destroyed = !0), null } static extendDefaults(e) { p(J, e) } static get extendedDefaults() { return J } static get defaults() { return K } static installModule(e) { ee.prototype.__modules__ || (ee.prototype.__modules__ = []); const t = ee.prototype.__modules__; "function" == typeof e && t.indexOf(e) < 0 && t.push(e) } static use(e) { return Array.isArray(e) ? (e.forEach((e => ee.installModule(e))), ee) : (ee.installModule(e), ee) } } function te(e, t, s, a) { return e.params.createElements && Object.keys(a).forEach((i => { if (!s[i] && !0 === s.auto) { let r = f(e.el, `.${a[i]}`)[0]; r || (r = v("div", a[i]), r.className = a[i], e.el.append(r)), s[i] = r, t[i] = r } })), s } function se(e) { return void 0 === e && (e = ""), `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}` } function ae(e) { const t = this, { params: s, slidesEl: a } = t; s.loop && t.loopDestroy(); const i = e => { if ("string" == typeof e) { const t = document.createElement("div"); t.innerHTML = e, a.append(t.children[0]), t.innerHTML = "" } else a.append(e) }; if ("object" == typeof e && "length" in e) for (let t = 0; t < e.length; t += 1)e[t] && i(e[t]); else i(e); t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update() } function ie(e) { const t = this, { params: s, activeIndex: a, slidesEl: i } = t; s.loop && t.loopDestroy(); let r = a + 1; const n = e => { if ("string" == typeof e) { const t = document.createElement("div"); t.innerHTML = e, i.prepend(t.children[0]), t.innerHTML = "" } else i.prepend(e) }; if ("object" == typeof e && "length" in e) { for (let t = 0; t < e.length; t += 1)e[t] && n(e[t]); r = a + e.length } else n(e); t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), t.slideTo(r, 0, !1) } function re(e, t) { const s = this, { params: a, activeIndex: i, slidesEl: r } = s; let n = i; a.loop && (n -= s.loopedSlides, s.loopDestroy(), s.recalcSlides()); const l = s.slides.length; if (e <= 0) return void s.prependSlide(t); if (e >= l) return void s.appendSlide(t); let o = n > e ? n + 1 : n; const d = []; for (let t = l - 1; t >= e; t -= 1) { const e = s.slides[t]; e.remove(), d.unshift(e) } if ("object" == typeof t && "length" in t) { for (let e = 0; e < t.length; e += 1)t[e] && r.append(t[e]); o = n > e ? n + t.length : n } else r.append(t); for (let e = 0; e < d.length; e += 1)r.append(d[e]); s.recalcSlides(), a.loop && s.loopCreate(), a.observer && !s.isElement || s.update(), a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1) } function ne(e) { const t = this, { params: s, activeIndex: a } = t; let i = a; s.loop && (i -= t.loopedSlides, t.loopDestroy()); let r, n = i; if ("object" == typeof e && "length" in e) { for (let s = 0; s < e.length; s += 1)r = e[s], t.slides[r] && t.slides[r].remove(), r < n && (n -= 1); n = Math.max(n, 0) } else r = e, t.slides[r] && t.slides[r].remove(), r < n && (n -= 1), n = Math.max(n, 0); t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1) } function le() { const e = this, t = []; for (let s = 0; s < e.slides.length; s += 1)t.push(s); e.removeSlide(t) } function oe(e) { const { effect: t, swiper: s, on: a, setTranslate: i, setTransition: r, overwriteParams: n, perspective: l, recreateShadows: o, getEffectParams: d } = e; let c; a("beforeInit", (() => { if (s.params.effect !== t) return; s.classNames.push(`${s.params.containerModifierClass}${t}`), l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`); const e = n ? n() : {}; Object.assign(s.params, e), Object.assign(s.originalParams, e) })), a("setTranslate", (() => { s.params.effect === t && i() })), a("setTransition", ((e, a) => { s.params.effect === t && r(a) })), a("transitionEnd", (() => { if (s.params.effect === t && o) { if (!d || !d().slideShadows) return; s.slides.forEach((e => { e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e => e.remove())) })), o() } })), a("virtualUpdate", (() => { s.params.effect === t && (s.slides.length || (c = !0), requestAnimationFrame((() => { c && s.slides && s.slides.length && (i(), c = !1) }))) })) } function de(e, t) { const s = h(t); return s !== t && (s.style.backfaceVisibility = "hidden", s.style["-webkit-backface-visibility"] = "hidden"), s } function ce(e) { let { swiper: t, duration: s, transformElements: a, allSlides: i } = e; const { activeIndex: r } = t; if (t.params.virtualTranslate && 0 !== s) { let e, s = !1; e = i ? a : a.filter((e => { const s = e.classList.contains("swiper-slide-transform") ? (e => { if (!e.parentElement) return t.slides.filter((t => t.shadowRoot && t.shadowRoot === e.parentNode))[0]; return e.parentElement })(e) : e; return t.getSlideIndex(s) === r })), e.forEach((e => { x(e, (() => { if (s) return; if (!t || t.destroyed) return; s = !0, t.animating = !1; const e = new window.CustomEvent("transitionend", { bubbles: !0, cancelable: !0 }); t.wrapperEl.dispatchEvent(e) })) })) } } function pe(e, t, s) { const a = `swiper-slide-shadow${s ? `-${s}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`, i = h(t); let r = i.querySelector(`.${a.split(" ").join(".")}`); return r || (r = v("div", a.split(" ")), i.append(r)), r } Object.keys(Q).forEach((e => { Object.keys(Q[e]).forEach((t => { ee.prototype[t] = Q[e][t] })) })), ee.use([function (e) { let { swiper: t, on: s, emit: a } = e; const i = r(); let n = null, l = null; const o = () => { t && !t.destroyed && t.initialized && (a("beforeResize"), a("resize")) }, d = () => { t && !t.destroyed && t.initialized && a("orientationchange") }; s("init", (() => { t.params.resizeObserver && void 0 !== i.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e => { l = i.requestAnimationFrame((() => { const { width: s, height: a } = t; let i = s, r = a; e.forEach((e => { let { contentBoxSize: s, contentRect: a, target: n } = e; n && n !== t.el || (i = a ? a.width : (s[0] || s).inlineSize, r = a ? a.height : (s[0] || s).blockSize) })), i === s && r === a || o() })) })), n.observe(t.el)) : (i.addEventListener("resize", o), i.addEventListener("orientationchange", d)) })), s("destroy", (() => { l && i.cancelAnimationFrame(l), n && n.unobserve && t.el && (n.unobserve(t.el), n = null), i.removeEventListener("resize", o), i.removeEventListener("orientationchange", d) })) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const n = [], l = r(), o = function (e, s) { void 0 === s && (s = {}); const a = new (l.MutationObserver || l.WebkitMutationObserver)((e => { if (t.__preventObserver__) return; if (1 === e.length) return void i("observerUpdate", e[0]); const s = function () { i("observerUpdate", e[0]) }; l.requestAnimationFrame ? l.requestAnimationFrame(s) : l.setTimeout(s, 0) })); a.observe(e, { attributes: void 0 === s.attributes || s.attributes, childList: void 0 === s.childList || s.childList, characterData: void 0 === s.characterData || s.characterData }), n.push(a) }; s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }), a("init", (() => { if (t.params.observer) { if (t.params.observeParents) { const e = E(t.hostEl); for (let t = 0; t < e.length; t += 1)o(e[t]) } o(t.hostEl, { childList: t.params.observeSlideChildren }), o(t.wrapperEl, { attributes: !1 }) } })), a("destroy", (() => { n.forEach((e => { e.disconnect() })), n.splice(0, n.length) })) }]); const ue = [function (e) { let t, { swiper: s, extendParams: i, on: r, emit: n } = e; i({ virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, renderExternalUpdate: !0, addSlidesBefore: 0, addSlidesAfter: 0 } }); const l = a(); s.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] }; const o = l.createElement("div"); function d(e, t) { const a = s.params.virtual; if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t]; let i; return a.renderSlide ? (i = a.renderSlide.call(s, e, t), "string" == typeof i && (o.innerHTML = i, i = o.children[0])) : i = s.isElement ? v("swiper-slide") : v("div", s.params.slideClass), i.setAttribute("data-swiper-slide-index", t), a.renderSlide || (i.innerHTML = e), a.cache && (s.virtual.cache[t] = i), i } function c(e) { const { slidesPerView: t, slidesPerGroup: a, centeredSlides: i, loop: r } = s.params, { addSlidesBefore: l, addSlidesAfter: o } = s.params.virtual, { from: c, to: p, slides: u, slidesGrid: m, offset: h } = s.virtual; s.params.cssMode || s.updateActiveIndex(); const g = s.activeIndex || 0; let v, w, b; v = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top", i ? (w = Math.floor(t / 2) + a + o, b = Math.floor(t / 2) + a + l) : (w = t + (a - 1) + o, b = (r ? t : a) + l); let y = g - b, E = g + w; r || (y = Math.max(y, 0), E = Math.min(E, u.length - 1)); let x = (s.slidesGrid[y] || 0) - (s.slidesGrid[0] || 0); function S() { s.updateSlides(), s.updateProgress(), s.updateSlidesClasses(), n("virtualUpdate") } if (r && g >= b ? (y -= b, i || (x += s.slidesGrid[0])) : r && g < b && (y = -b, i && (x += s.slidesGrid[0])), Object.assign(s.virtual, { from: y, to: E, offset: x, slidesGrid: s.slidesGrid, slidesBefore: b, slidesAfter: w }), c === y && p === E && !e) return s.slidesGrid !== m && x !== h && s.slides.forEach((e => { e.style[v] = x - Math.abs(s.cssOverflowAdjustment()) + "px" })), s.updateProgress(), void n("virtualUpdate"); if (s.params.virtual.renderExternal) return s.params.virtual.renderExternal.call(s, { offset: x, from: y, to: E, slides: function () { const e = []; for (let t = y; t <= E; t += 1)e.push(u[t]); return e }() }), void (s.params.virtual.renderExternalUpdate ? S() : n("virtualUpdate")); const T = [], M = [], C = e => { let t = e; return e < 0 ? t = u.length + e : t >= u.length && (t -= u.length), t }; if (e) s.slides.filter((e => e.matches(`.${s.params.slideClass}, swiper-slide`))).forEach((e => { e.remove() })); else for (let e = c; e <= p; e += 1)if (e < y || e > E) { const t = C(e); s.slides.filter((e => e.matches(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`))).forEach((e => { e.remove() })) } const P = r ? -u.length : 0, L = r ? 2 * u.length : u.length; for (let t = P; t < L; t += 1)if (t >= y && t <= E) { const s = C(t); void 0 === p || e ? M.push(s) : (t > p && M.push(s), t < c && T.push(s)) } if (M.forEach((e => { s.slidesEl.append(d(u[e], e)) })), r) for (let e = T.length - 1; e >= 0; e -= 1) { const t = T[e]; s.slidesEl.prepend(d(u[t], t)) } else T.sort(((e, t) => t - e)), T.forEach((e => { s.slidesEl.prepend(d(u[e], e)) })); f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e => { e.style[v] = x - Math.abs(s.cssOverflowAdjustment()) + "px" })), S() } r("beforeInit", (() => { if (!s.params.virtual.enabled) return; let e; if (void 0 === s.passedParams.virtual.slides) { const t = [...s.slidesEl.children].filter((e => e.matches(`.${s.params.slideClass}, swiper-slide`))); t && t.length && (s.virtual.slides = [...t], e = !0, t.forEach(((e, t) => { e.setAttribute("data-swiper-slide-index", t), s.virtual.cache[t] = e, e.remove() }))) } e || (s.virtual.slides = s.params.virtual.slides), s.classNames.push(`${s.params.containerModifierClass}virtual`), s.params.watchSlidesProgress = !0, s.originalParams.watchSlidesProgress = !0, c() })), r("setTranslate", (() => { s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t), t = setTimeout((() => { c() }), 100)) : c()) })), r("init update resize", (() => { s.params.virtual.enabled && s.params.cssMode && u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`) })), Object.assign(s.virtual, { appendSlide: function (e) { if ("object" == typeof e && "length" in e) for (let t = 0; t < e.length; t += 1)e[t] && s.virtual.slides.push(e[t]); else s.virtual.slides.push(e); c(!0) }, prependSlide: function (e) { const t = s.activeIndex; let a = t + 1, i = 1; if (Array.isArray(e)) { for (let t = 0; t < e.length; t += 1)e[t] && s.virtual.slides.unshift(e[t]); a = t + e.length, i = e.length } else s.virtual.slides.unshift(e); if (s.params.virtual.cache) { const e = s.virtual.cache, t = {}; Object.keys(e).forEach((s => { const a = e[s], r = a.getAttribute("data-swiper-slide-index"); r && a.setAttribute("data-swiper-slide-index", parseInt(r, 10) + i), t[parseInt(s, 10) + i] = a })), s.virtual.cache = t } c(!0), s.slideTo(a, 0) }, removeSlide: function (e) { if (null == e) return; let t = s.activeIndex; if (Array.isArray(e)) for (let a = e.length - 1; a >= 0; a -= 1)s.params.virtual.cache && (delete s.virtual.cache[e[a]], Object.keys(s.virtual.cache).forEach((t => { t > e && (s.virtual.cache[t - 1] = s.virtual.cache[t], s.virtual.cache[t - 1].setAttribute("data-swiper-slide-index", t - 1), delete s.virtual.cache[t]) }))), s.virtual.slides.splice(e[a], 1), e[a] < t && (t -= 1), t = Math.max(t, 0); else s.params.virtual.cache && (delete s.virtual.cache[e], Object.keys(s.virtual.cache).forEach((t => { t > e && (s.virtual.cache[t - 1] = s.virtual.cache[t], s.virtual.cache[t - 1].setAttribute("data-swiper-slide-index", t - 1), delete s.virtual.cache[t]) }))), s.virtual.slides.splice(e, 1), e < t && (t -= 1), t = Math.max(t, 0); c(!0), s.slideTo(t, 0) }, removeAllSlides: function () { s.virtual.slides = [], s.params.virtual.cache && (s.virtual.cache = {}), c(!0), s.slideTo(0, 0) }, update: c }) }, function (e) { let { swiper: t, extendParams: s, on: i, emit: n } = e; const l = a(), o = r(); function d(e) { if (!t.enabled) return; const { rtlTranslate: s } = t; let a = e; a.originalEvent && (a = a.originalEvent); const i = a.keyCode || a.charCode, r = t.params.keyboard.pageUpDown, d = r && 33 === i, c = r && 34 === i, p = 37 === i, u = 39 === i, m = 38 === i, h = 40 === i; if (!t.allowSlideNext && (t.isHorizontal() && u || t.isVertical() && h || c)) return !1; if (!t.allowSlidePrev && (t.isHorizontal() && p || t.isVertical() && m || d)) return !1; if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || l.activeElement && l.activeElement.nodeName && ("input" === l.activeElement.nodeName.toLowerCase() || "textarea" === l.activeElement.nodeName.toLowerCase()))) { if (t.params.keyboard.onlyInViewport && (d || c || p || u || m || h)) { let e = !1; if (E(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 && 0 === E(t.el, `.${t.params.slideActiveClass}`).length) return; const a = t.el, i = a.clientWidth, r = a.clientHeight, n = o.innerWidth, l = o.innerHeight, d = w(a); s && (d.left -= a.scrollLeft); const c = [[d.left, d.top], [d.left + i, d.top], [d.left, d.top + r], [d.left + i, d.top + r]]; for (let t = 0; t < c.length; t += 1) { const s = c[t]; if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) { if (0 === s[0] && 0 === s[1]) continue; e = !0 } } if (!e) return } t.isHorizontal() ? ((d || c || p || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((c || u) && !s || (d || p) && s) && t.slideNext(), ((d || p) && !s || (c || u) && s) && t.slidePrev()) : ((d || c || m || h) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (c || h) && t.slideNext(), (d || m) && t.slidePrev()), n("keyPress", i) } } function c() { t.keyboard.enabled || (l.addEventListener("keydown", d), t.keyboard.enabled = !0) } function p() { t.keyboard.enabled && (l.removeEventListener("keydown", d), t.keyboard.enabled = !1) } t.keyboard = { enabled: !1 }, s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }), i("init", (() => { t.params.keyboard.enabled && c() })), i("destroy", (() => { t.keyboard.enabled && p() })), Object.assign(t.keyboard, { enable: c, disable: p }) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const n = r(); let d; s({ mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarget: "container", thresholdDelta: null, thresholdTime: null, noMousewheelClass: "swiper-no-mousewheel" } }), t.mousewheel = { enabled: !1 }; let c, p = o(); const u = []; function m() { t.enabled && (t.mouseEntered = !0) } function h() { t.enabled && (t.mouseEntered = !1) } function f(e) { return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) && (!(t.params.mousewheel.thresholdTime && o() - p < t.params.mousewheel.thresholdTime) && (e.delta >= 6 && o() - p < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), i("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), i("scroll", e.raw)), p = (new n.Date).getTime(), !1))) } function g(e) { let s = e, a = !0; if (!t.enabled) return; if (e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`)) return; const r = t.params.mousewheel; t.params.cssMode && s.preventDefault(); let n = t.el; "container" !== t.params.mousewheel.eventsTarget && (n = document.querySelector(t.params.mousewheel.eventsTarget)); const p = n && n.contains(s.target); if (!t.mouseEntered && !p && !r.releaseOnEdges) return !0; s.originalEvent && (s = s.originalEvent); let m = 0; const h = t.rtlTranslate ? -1 : 1, g = function (e) { let t = 0, s = 0, a = 0, i = 0; return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), a = 10 * t, i = 10 * s, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (a = e.deltaX), e.shiftKey && !a && (a = i, i = 0), (a || i) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, i *= 40) : (a *= 800, i *= 800)), a && !t && (t = a < 1 ? -1 : 1), i && !s && (s = i < 1 ? -1 : 1), { spinX: t, spinY: s, pixelX: a, pixelY: i } }(s); if (r.forceToAxis) if (t.isHorizontal()) { if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0; m = -g.pixelX * h } else { if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0; m = -g.pixelY } else m = Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY; if (0 === m) return !0; r.invert && (m = -m); let v = t.getTranslate() + m * r.sensitivity; if (v >= t.minTranslate() && (v = t.minTranslate()), v <= t.maxTranslate() && (v = t.maxTranslate()), a = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()), a && t.params.nested && s.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) { const e = { time: o(), delta: Math.abs(m), direction: Math.sign(m) }, a = c && e.time < c.time + 500 && e.delta <= c.delta && e.direction === c.direction; if (!a) { c = void 0; let n = t.getTranslate() + m * r.sensitivity; const o = t.isBeginning, p = t.isEnd; if (n >= t.minTranslate() && (n = t.minTranslate()), n <= t.maxTranslate() && (n = t.maxTranslate()), t.setTransition(0), t.setTranslate(n), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!o && t.isBeginning || !p && t.isEnd) && t.updateSlidesClasses(), t.params.loop && t.loopFix({ direction: e.direction < 0 ? "next" : "prev", byMousewheel: !0 }), t.params.freeMode.sticky) { clearTimeout(d), d = void 0, u.length >= 15 && u.shift(); const s = u.length ? u[u.length - 1] : void 0, a = u[0]; if (u.push(e), s && (e.delta > s.delta || e.direction !== s.direction)) u.splice(0); else if (u.length >= 15 && e.time - a.time < 500 && a.delta - e.delta >= 1 && e.delta <= 6) { const s = m > 0 ? .8 : .2; c = e, u.splice(0), d = l((() => { t.slideToClosest(t.params.speed, !0, void 0, s) }), 0) } d || (d = l((() => { c = e, u.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5) }), 500)) } if (a || i("scroll", s), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), r.releaseOnEdges && (n === t.minTranslate() || n === t.maxTranslate())) return !0 } } else { const s = { time: o(), delta: Math.abs(m), direction: Math.sign(m), raw: e }; u.length >= 2 && u.shift(); const a = u.length ? u[u.length - 1] : void 0; if (u.push(s), a ? (s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && f(s) : f(s), function (e) { const s = t.params.mousewheel; if (e.direction < 0) { if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0 } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges) return !0; return !1 }(s)) return !0 } return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1 } function v(e) { let s = t.el; "container" !== t.params.mousewheel.eventsTarget && (s = document.querySelector(t.params.mousewheel.eventsTarget)), s[e]("mouseenter", m), s[e]("mouseleave", h), s[e]("wheel", g) } function w() { return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", g), !0) : !t.mousewheel.enabled && (v("addEventListener"), t.mousewheel.enabled = !0, !0) } function b() { return t.params.cssMode ? (t.wrapperEl.addEventListener(event, g), !0) : !!t.mousewheel.enabled && (v("removeEventListener"), t.mousewheel.enabled = !1, !0) } a("init", (() => { !t.params.mousewheel.enabled && t.params.cssMode && b(), t.params.mousewheel.enabled && w() })), a("destroy", (() => { t.params.cssMode && w(), t.mousewheel.enabled && b() })), Object.assign(t.mousewheel, { enable: w, disable: b }) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; s({ navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock", navigationDisabledClass: "swiper-navigation-disabled" } }), t.navigation = { nextEl: null, prevEl: null }; const r = e => (Array.isArray(e) ? e : [e]).filter((e => !!e)); function n(e) { let s; return e && "string" == typeof e && t.isElement && (s = t.el.querySelector(e), s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))), e && !s ? e : s) } function l(e, s) { const a = t.params.navigation; (e = r(e)).forEach((e => { e && (e.classList[s ? "add" : "remove"](...a.disabledClass.split(" ")), "BUTTON" === e.tagName && (e.disabled = s), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](a.lockClass)) })) } function o() { const { nextEl: e, prevEl: s } = t.navigation; if (t.params.loop) return l(s, !1), void l(e, !1); l(s, t.isBeginning && !t.params.rewind), l(e, t.isEnd && !t.params.rewind) } function d(e) { e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), i("navigationPrev")) } function c(e) { e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), i("navigationNext")) } function p() { const e = t.params.navigation; if (t.params.navigation = te(t, t.originalParams.navigation, t.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }), !e.nextEl && !e.prevEl) return; let s = n(e.nextEl), a = n(e.prevEl); Object.assign(t.navigation, { nextEl: s, prevEl: a }), s = r(s), a = r(a); const i = (s, a) => { s && s.addEventListener("click", "next" === a ? c : d), !t.enabled && s && s.classList.add(...e.lockClass.split(" ")) }; s.forEach((e => i(e, "next"))), a.forEach((e => i(e, "prev"))) } function u() { let { nextEl: e, prevEl: s } = t.navigation; e = r(e), s = r(s); const a = (e, s) => { e.removeEventListener("click", "next" === s ? c : d), e.classList.remove(...t.params.navigation.disabledClass.split(" ")) }; e.forEach((e => a(e, "next"))), s.forEach((e => a(e, "prev"))) } a("init", (() => { !1 === t.params.navigation.enabled ? m() : (p(), o()) })), a("toEdge fromEdge lock unlock", (() => { o() })), a("destroy", (() => { u() })), a("enable disable", (() => { let { nextEl: e, prevEl: s } = t.navigation; e = r(e), s = r(s), t.enabled ? o() : [...e, ...s].filter((e => !!e)).forEach((e => e.classList.add(t.params.navigation.lockClass))) })), a("click", ((e, s) => { let { nextEl: a, prevEl: n } = t.navigation; a = r(a), n = r(n); const l = s.target; if (t.params.navigation.hideOnClick && !n.includes(l) && !a.includes(l)) { if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === l || t.pagination.el.contains(l))) return; let e; a.length ? e = a[0].classList.contains(t.params.navigation.hiddenClass) : n.length && (e = n[0].classList.contains(t.params.navigation.hiddenClass)), i(!0 === e ? "navigationShow" : "navigationHide"), [...a, ...n].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass))) } })); const m = () => { t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), u() }; Object.assign(t.navigation, { enable: () => { t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), p(), o() }, disable: m, update: o, init: p, destroy: u }) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const r = "swiper-pagination"; let n; s({ pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: e => e, formatFractionTotal: e => e, bulletClass: `${r}-bullet`, bulletActiveClass: `${r}-bullet-active`, modifierClass: `${r}-`, currentClass: `${r}-current`, totalClass: `${r}-total`, hiddenClass: `${r}-hidden`, progressbarFillClass: `${r}-progressbar-fill`, progressbarOppositeClass: `${r}-progressbar-opposite`, clickableClass: `${r}-clickable`, lockClass: `${r}-lock`, horizontalClass: `${r}-horizontal`, verticalClass: `${r}-vertical`, paginationDisabledClass: `${r}-disabled` } }), t.pagination = { el: null, bullets: [] }; let l = 0; const o = e => (Array.isArray(e) ? e : [e]).filter((e => !!e)); function d() { return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length } function c(e, s) { const { bulletActiveClass: a } = t.params.pagination; e && (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${a}-${s}`), (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${a}-${s}-${s}`)) } function p(e) { const s = e.target.closest(se(t.params.pagination.bulletClass)); if (!s) return; e.preventDefault(); const a = y(s) * t.params.slidesPerGroup; if (t.params.loop) { if (t.realIndex === a) return; t.slideToLoop(a) } else t.slideTo(a) } function u() { const e = t.rtl, s = t.params.pagination; if (d()) return; let a, r, p = t.pagination.el; p = o(p); const u = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length, m = t.params.loop ? Math.ceil(u / t.params.slidesPerGroup) : t.snapGrid.length; if (t.params.loop ? (r = t.previousRealIndex || 0, a = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (a = t.snapIndex, r = t.previousSnapIndex) : (r = t.previousIndex || 0, a = t.activeIndex || 0), "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) { const i = t.pagination.bullets; let o, d, u; if (s.dynamicBullets && (n = S(i[0], t.isHorizontal() ? "width" : "height", !0), p.forEach((e => { e.style[t.isHorizontal() ? "width" : "height"] = n * (s.dynamicMainBullets + 4) + "px" })), s.dynamicMainBullets > 1 && void 0 !== r && (l += a - (r || 0), l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)), o = Math.max(a - l, 0), d = o + (Math.min(i.length, s.dynamicMainBullets) - 1), u = (d + o) / 2), i.forEach((e => { const t = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e => `${s.bulletActiveClass}${e}`))].map((e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat(); e.classList.remove(...t) })), p.length > 1) i.forEach((e => { const i = y(e); i === a ? e.classList.add(...s.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"), s.dynamicBullets && (i >= o && i <= d && e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")), i === o && c(e, "prev"), i === d && c(e, "next")) })); else { const e = i[a]; if (e && e.classList.add(...s.bulletActiveClass.split(" ")), t.isElement && i.forEach(((e, t) => { e.setAttribute("part", t === a ? "bullet-active" : "bullet") })), s.dynamicBullets) { const e = i[o], t = i[d]; for (let e = o; e <= d; e += 1)i[e] && i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" ")); c(e, "prev"), c(t, "next") } } if (s.dynamicBullets) { const a = Math.min(i.length, s.dynamicMainBullets + 4), r = (n * a - n) / 2 - u * n, l = e ? "right" : "left"; i.forEach((e => { e.style[t.isHorizontal() ? l : "top"] = `${r}px` })) } } p.forEach(((e, r) => { if ("fraction" === s.type && (e.querySelectorAll(se(s.currentClass)).forEach((e => { e.textContent = s.formatFractionCurrent(a + 1) })), e.querySelectorAll(se(s.totalClass)).forEach((e => { e.textContent = s.formatFractionTotal(m) }))), "progressbar" === s.type) { let i; i = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical"; const r = (a + 1) / m; let n = 1, l = 1; "horizontal" === i ? n = r : l = r, e.querySelectorAll(se(s.progressbarFillClass)).forEach((e => { e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`, e.style.transitionDuration = `${t.params.speed}ms` })) } "custom" === s.type && s.renderCustom ? (e.innerHTML = s.renderCustom(t, a + 1, m), 0 === r && i("paginationRender", e)) : (0 === r && i("paginationRender", e), i("paginationUpdate", e)), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](s.lockClass) })) } function m() { const e = t.params.pagination; if (d()) return; const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.grid && t.params.grid.rows > 1 ? t.slides.length / Math.ceil(t.params.grid.rows) : t.slides.length; let a = t.pagination.el; a = o(a); let r = ""; if ("bullets" === e.type) { let a = t.params.loop ? Math.ceil(s / t.params.slidesPerGroup) : t.snapGrid.length; t.params.freeMode && t.params.freeMode.enabled && a > s && (a = s); for (let s = 0; s < a; s += 1)e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>` } "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), t.pagination.bullets = [], a.forEach((s => { "custom" !== e.type && (s.innerHTML = r || ""), "bullets" === e.type && t.pagination.bullets.push(...s.querySelectorAll(se(e.bulletClass))) })), "custom" !== e.type && i("paginationRender", a[0]) } function h() { t.params.pagination = te(t, t.originalParams.pagination, t.params.pagination, { el: "swiper-pagination" }); const e = t.params.pagination; if (!e.el) return; let s; "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)), s || "string" != typeof e.el || (s = [...document.querySelectorAll(e.el)]), s || (s = e.el), s && 0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(s) && s.length > 1 && (s = [...t.el.querySelectorAll(e.el)], s.length > 1 && (s = s.filter((e => E(e, ".swiper")[0] === t.el))[0])), Array.isArray(s) && 1 === s.length && (s = s[0]), Object.assign(t.pagination, { el: s }), s = o(s), s.forEach((s => { "bullets" === e.type && e.clickable && s.classList.add(...(e.clickableClass || "").split(" ")), s.classList.add(e.modifierClass + e.type), s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (s.classList.add(`${e.modifierClass}${e.type}-dynamic`), l = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && s.classList.add(e.progressbarOppositeClass), e.clickable && s.addEventListener("click", p), t.enabled || s.classList.add(e.lockClass) }))) } function f() { const e = t.params.pagination; if (d()) return; let s = t.pagination.el; s && (s = o(s), s.forEach((s => { s.classList.remove(e.hiddenClass), s.classList.remove(e.modifierClass + e.type), s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && (s.classList.remove(...(e.clickableClass || "").split(" ")), s.removeEventListener("click", p)) }))), t.pagination.bullets && t.pagination.bullets.forEach((t => t.classList.remove(...e.bulletActiveClass.split(" ")))) } a("changeDirection", (() => { if (!t.pagination || !t.pagination.el) return; const e = t.params.pagination; let { el: s } = t.pagination; s = o(s), s.forEach((s => { s.classList.remove(e.horizontalClass, e.verticalClass), s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass) })) })), a("init", (() => { !1 === t.params.pagination.enabled ? g() : (h(), m(), u()) })), a("activeIndexChange", (() => { void 0 === t.snapIndex && u() })), a("snapIndexChange", (() => { u() })), a("snapGridLengthChange", (() => { m(), u() })), a("destroy", (() => { f() })), a("enable disable", (() => { let { el: e } = t.pagination; e && (e = o(e), e.forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass)))) })), a("lock unlock", (() => { u() })), a("click", ((e, s) => { const a = s.target, r = o(t.pagination.el); if (t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !a.classList.contains(t.params.pagination.bulletClass)) { if (t.navigation && (t.navigation.nextEl && a === t.navigation.nextEl || t.navigation.prevEl && a === t.navigation.prevEl)) return; const e = r[0].classList.contains(t.params.pagination.hiddenClass); i(!0 === e ? "paginationShow" : "paginationHide"), r.forEach((e => e.classList.toggle(t.params.pagination.hiddenClass))) } })); const g = () => { t.el.classList.add(t.params.pagination.paginationDisabledClass); let { el: e } = t.pagination; e && (e = o(e), e.forEach((e => e.classList.add(t.params.pagination.paginationDisabledClass)))), f() }; Object.assign(t.pagination, { enable: () => { t.el.classList.remove(t.params.pagination.paginationDisabledClass); let { el: e } = t.pagination; e && (e = o(e), e.forEach((e => e.classList.remove(t.params.pagination.paginationDisabledClass)))), h(), m(), u() }, disable: g, render: m, update: u, init: h, destroy: f }) }, function (e) { let { swiper: t, extendParams: s, on: i, emit: r } = e; const o = a(); let d, c, p, u, m = !1, h = null, f = null; function g() { if (!t.params.scrollbar.el || !t.scrollbar.el) return; const { scrollbar: e, rtlTranslate: s } = t, { dragEl: a, el: i } = e, r = t.params.scrollbar, n = t.params.loop ? t.progressLoop : t.progress; let l = c, o = (p - c) * n; s ? (o = -o, o > 0 ? (l = c - o, o = 0) : -o + c > p && (l = p + o)) : o < 0 ? (l = c + o, o = 0) : o + c > p && (l = p - o), t.isHorizontal() ? (a.style.transform = `translate3d(${o}px, 0, 0)`, a.style.width = `${l}px`) : (a.style.transform = `translate3d(0px, ${o}px, 0)`, a.style.height = `${l}px`), r.hide && (clearTimeout(h), i.style.opacity = 1, h = setTimeout((() => { i.style.opacity = 0, i.style.transitionDuration = "400ms" }), 1e3)) } function b() { if (!t.params.scrollbar.el || !t.scrollbar.el) return; const { scrollbar: e } = t, { dragEl: s, el: a } = e; s.style.width = "", s.style.height = "", p = t.isHorizontal() ? a.offsetWidth : a.offsetHeight, u = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), c = "auto" === t.params.scrollbar.dragSize ? p * u : parseInt(t.params.scrollbar.dragSize, 10), t.isHorizontal() ? s.style.width = `${c}px` : s.style.height = `${c}px`, a.style.display = u >= 1 ? "none" : "", t.params.scrollbar.hide && (a.style.opacity = 0), t.params.watchOverflow && t.enabled && e.el.classList[t.isLocked ? "add" : "remove"](t.params.scrollbar.lockClass) } function y(e) { return t.isHorizontal() ? e.clientX : e.clientY } function E(e) { const { scrollbar: s, rtlTranslate: a } = t, { el: i } = s; let r; r = (y(e) - w(i)[t.isHorizontal() ? "left" : "top"] - (null !== d ? d : c / 2)) / (p - c), r = Math.max(Math.min(r, 1), 0), a && (r = 1 - r); const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r; t.updateProgress(n), t.setTranslate(n), t.updateActiveIndex(), t.updateSlidesClasses() } function x(e) { const s = t.params.scrollbar, { scrollbar: a, wrapperEl: i } = t, { el: n, dragEl: l } = a; m = !0, d = e.target === l ? y(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), i.style.transitionDuration = "100ms", l.style.transitionDuration = "100ms", E(e), clearTimeout(f), n.style.transitionDuration = "0ms", s.hide && (n.style.opacity = 1), t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"), r("scrollbarDragStart", e) } function S(e) { const { scrollbar: s, wrapperEl: a } = t, { el: i, dragEl: n } = s; m && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, E(e), a.style.transitionDuration = "0ms", i.style.transitionDuration = "0ms", n.style.transitionDuration = "0ms", r("scrollbarDragMove", e)) } function T(e) { const s = t.params.scrollbar, { scrollbar: a, wrapperEl: i } = t, { el: n } = a; m && (m = !1, t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "", i.style.transitionDuration = ""), s.hide && (clearTimeout(f), f = l((() => { n.style.opacity = 0, n.style.transitionDuration = "400ms" }), 1e3)), r("scrollbarDragEnd", e), s.snapOnRelease && t.slideToClosest()) } function M(e) { const { scrollbar: s, params: a } = t, i = s.el; if (!i) return; const r = i, n = !!a.passiveListeners && { passive: !1, capture: !1 }, l = !!a.passiveListeners && { passive: !0, capture: !1 }; if (!r) return; const d = "on" === e ? "addEventListener" : "removeEventListener"; r[d]("pointerdown", x, n), o[d]("pointermove", S, n), o[d]("pointerup", T, l) } function C() { const { scrollbar: e, el: s } = t; t.params.scrollbar = te(t, t.originalParams.scrollbar, t.params.scrollbar, { el: "swiper-scrollbar" }); const a = t.params.scrollbar; if (!a.el) return; let i, r; if ("string" == typeof a.el && t.isElement && (i = t.el.querySelector(a.el)), i || "string" != typeof a.el) i || (i = a.el); else if (i = o.querySelectorAll(a.el), !i.length) return; t.params.uniqueNavElements && "string" == typeof a.el && i.length > 1 && 1 === s.querySelectorAll(a.el).length && (i = s.querySelector(a.el)), i.length > 0 && (i = i[0]), i.classList.add(t.isHorizontal() ? a.horizontalClass : a.verticalClass), i && (r = i.querySelector(se(t.params.scrollbar.dragClass)), r || (r = v("div", t.params.scrollbar.dragClass), i.append(r))), Object.assign(e, { el: i, dragEl: r }), a.draggable && t.params.scrollbar.el && t.scrollbar.el && M("on"), i && i.classList[t.enabled ? "remove" : "add"](...n(t.params.scrollbar.lockClass)) } function P() { const e = t.params.scrollbar, s = t.scrollbar.el; s && s.classList.remove(...n(t.isHorizontal() ? e.horizontalClass : e.verticalClass)), t.params.scrollbar.el && t.scrollbar.el && M("off") } s({ scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag", scrollbarDisabledClass: "swiper-scrollbar-disabled", horizontalClass: "swiper-scrollbar-horizontal", verticalClass: "swiper-scrollbar-vertical" } }), t.scrollbar = { el: null, dragEl: null }, i("init", (() => { !1 === t.params.scrollbar.enabled ? L() : (C(), b(), g()) })), i("update resize observerUpdate lock unlock", (() => { b() })), i("setTranslate", (() => { g() })), i("setTransition", ((e, s) => { !function (e) { t.params.scrollbar.el && t.scrollbar.el && (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`) }(s) })), i("enable disable", (() => { const { el: e } = t.scrollbar; e && e.classList[t.enabled ? "remove" : "add"](...n(t.params.scrollbar.lockClass)) })), i("destroy", (() => { P() })); const L = () => { t.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)), t.scrollbar.el && t.scrollbar.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)), P() }; Object.assign(t.scrollbar, { enable: () => { t.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)), t.scrollbar.el && t.scrollbar.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)), C(), b(), g() }, disable: L, updateSize: b, setTranslate: g, init: C, destroy: P }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ parallax: { enabled: !1 } }); const i = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]", r = (e, s) => { const { rtl: a } = t, i = a ? -1 : 1, r = e.getAttribute("data-swiper-parallax") || "0"; let n = e.getAttribute("data-swiper-parallax-x"), l = e.getAttribute("data-swiper-parallax-y"); const o = e.getAttribute("data-swiper-parallax-scale"), d = e.getAttribute("data-swiper-parallax-opacity"), c = e.getAttribute("data-swiper-parallax-rotate"); if (n || l ? (n = n || "0", l = l || "0") : t.isHorizontal() ? (n = r, l = "0") : (l = r, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * s * i + "%" : n * s * i + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px", null != d) { const t = d - (d - 1) * (1 - Math.abs(s)); e.style.opacity = t } let p = `translate3d(${n}, ${l}, 0px)`; if (null != o) { p += ` scale(${o - (o - 1) * (1 - Math.abs(s))})` } if (c && null != c) { p += ` rotate(${c * s * -1}deg)` } e.style.transform = p }, n = () => { const { el: e, slides: s, progress: a, snapGrid: n, isElement: l } = t, o = f(e, i); t.isElement && o.push(...f(t.hostEl, i)), o.forEach((e => { r(e, a) })), s.forEach(((e, s) => { let l = e.progress; t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (l += Math.ceil(s / 2) - a * (n.length - 1)), l = Math.min(Math.max(l, -1), 1), e.querySelectorAll(`${i}, [data-swiper-parallax-rotate]`).forEach((e => { r(e, l) })) })) }; a("beforeInit", (() => { t.params.parallax.enabled && (t.params.watchSlidesProgress = !0, t.originalParams.watchSlidesProgress = !0) })), a("init", (() => { t.params.parallax.enabled && n() })), a("setTranslate", (() => { t.params.parallax.enabled && n() })), a("setTransition", ((e, s) => { t.params.parallax.enabled && function (e) { void 0 === e && (e = t.params.speed); const { el: s, hostEl: a } = t, r = [...s.querySelectorAll(i)]; t.isElement && r.push(...a.querySelectorAll(i)), r.forEach((t => { let s = parseInt(t.getAttribute("data-swiper-parallax-duration"), 10) || e; 0 === e && (s = 0), t.style.transitionDuration = `${s}ms` })) }(s) })) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const n = r(); s({ zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }), t.zoom = { enabled: !1 }; let l, o, c = 1, p = !1; const u = [], m = { originX: 0, originY: 0, slideEl: void 0, slideWidth: void 0, slideHeight: void 0, imageEl: void 0, imageWrapEl: void 0, maxRatio: 3 }, h = { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, g = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 }; let v = 1; function b() { if (u.length < 2) return 1; const e = u[0].pageX, t = u[0].pageY, s = u[1].pageX, a = u[1].pageY; return Math.sqrt((s - e) ** 2 + (a - t) ** 2) } function y(e) { const s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`; return !!e.target.matches(s) || t.slides.filter((t => t.contains(e.target))).length > 0 } function x(e) { if ("mouse" === e.pointerType && u.splice(0, u.length), !y(e)) return; const s = t.params.zoom; if (l = !1, o = !1, u.push(e), !(u.length < 2)) { if (l = !0, m.scaleStart = b(), !m.slideEl) { m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`), m.slideEl || (m.slideEl = t.slides[t.activeIndex]); let a = m.slideEl.querySelector(`.${s.containerClass}`); if (a && (a = a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = a, m.imageWrapEl = a ? E(m.imageEl, `.${s.containerClass}`)[0] : void 0, !m.imageWrapEl) return void (m.imageEl = void 0); m.maxRatio = m.imageWrapEl.getAttribute("data-swiper-zoom") || s.maxRatio } if (m.imageEl) { const [e, t] = function () { if (u.length < 2) return { x: null, y: null }; const e = m.imageEl.getBoundingClientRect(); return [(u[0].pageX + (u[1].pageX - u[0].pageX) / 2 - e.x - n.scrollX) / c, (u[0].pageY + (u[1].pageY - u[0].pageY) / 2 - e.y - n.scrollY) / c] }(); m.originX = e, m.originY = t, m.imageEl.style.transitionDuration = "0ms" } p = !0 } } function S(e) { if (!y(e)) return; const s = t.params.zoom, a = t.zoom, i = u.findIndex((t => t.pointerId === e.pointerId)); i >= 0 && (u[i] = e), u.length < 2 || (o = !0, m.scaleMove = b(), m.imageEl && (a.scale = m.scaleMove / m.scaleStart * c, a.scale > m.maxRatio && (a.scale = m.maxRatio - 1 + (a.scale - m.maxRatio + 1) ** .5), a.scale < s.minRatio && (a.scale = s.minRatio + 1 - (s.minRatio - a.scale + 1) ** .5), m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`)) } function T(e) { if (!y(e)) return; if ("mouse" === e.pointerType && "pointerout" === e.type) return; const s = t.params.zoom, a = t.zoom, i = u.findIndex((t => t.pointerId === e.pointerId)); i >= 0 && u.splice(i, 1), l && o && (l = !1, o = !1, m.imageEl && (a.scale = Math.max(Math.min(a.scale, m.maxRatio), s.minRatio), m.imageEl.style.transitionDuration = `${t.params.speed}ms`, m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`, c = a.scale, p = !1, a.scale > 1 && m.slideEl ? m.slideEl.classList.add(`${s.zoomedSlideClass}`) : a.scale <= 1 && m.slideEl && m.slideEl.classList.remove(`${s.zoomedSlideClass}`), 1 === a.scale && (m.originX = 0, m.originY = 0, m.slideEl = void 0))) } function M(e) { if (!y(e) || !function (e) { const s = `.${t.params.zoom.containerClass}`; return !!e.target.matches(s) || [...t.hostEl.querySelectorAll(s)].filter((t => t.contains(e.target))).length > 0 }(e)) return; const s = t.zoom; if (!m.imageEl) return; if (!h.isTouched || !m.slideEl) return; h.isMoved || (h.width = m.imageEl.offsetWidth, h.height = m.imageEl.offsetHeight, h.startX = d(m.imageWrapEl, "x") || 0, h.startY = d(m.imageWrapEl, "y") || 0, m.slideWidth = m.slideEl.offsetWidth, m.slideHeight = m.slideEl.offsetHeight, m.imageWrapEl.style.transitionDuration = "0ms"); const a = h.width * s.scale, i = h.height * s.scale; if (a < m.slideWidth && i < m.slideHeight) return; h.minX = Math.min(m.slideWidth / 2 - a / 2, 0), h.maxX = -h.minX, h.minY = Math.min(m.slideHeight / 2 - i / 2, 0), h.maxY = -h.minY, h.touchesCurrent.x = u.length > 0 ? u[0].pageX : e.pageX, h.touchesCurrent.y = u.length > 0 ? u[0].pageY : e.pageY; if (Math.max(Math.abs(h.touchesCurrent.x - h.touchesStart.x), Math.abs(h.touchesCurrent.y - h.touchesStart.y)) > 5 && (t.allowClick = !1), !h.isMoved && !p) { if (t.isHorizontal() && (Math.floor(h.minX) === Math.floor(h.startX) && h.touchesCurrent.x < h.touchesStart.x || Math.floor(h.maxX) === Math.floor(h.startX) && h.touchesCurrent.x > h.touchesStart.x)) return void (h.isTouched = !1); if (!t.isHorizontal() && (Math.floor(h.minY) === Math.floor(h.startY) && h.touchesCurrent.y < h.touchesStart.y || Math.floor(h.maxY) === Math.floor(h.startY) && h.touchesCurrent.y > h.touchesStart.y)) return void (h.isTouched = !1) } e.cancelable && e.preventDefault(), e.stopPropagation(), h.isMoved = !0; const r = (s.scale - c) / (m.maxRatio - t.params.zoom.minRatio), { originX: n, originY: l } = m; h.currentX = h.touchesCurrent.x - h.touchesStart.x + h.startX + r * (h.width - 2 * n), h.currentY = h.touchesCurrent.y - h.touchesStart.y + h.startY + r * (h.height - 2 * l), h.currentX < h.minX && (h.currentX = h.minX + 1 - (h.minX - h.currentX + 1) ** .8), h.currentX > h.maxX && (h.currentX = h.maxX - 1 + (h.currentX - h.maxX + 1) ** .8), h.currentY < h.minY && (h.currentY = h.minY + 1 - (h.minY - h.currentY + 1) ** .8), h.currentY > h.maxY && (h.currentY = h.maxY - 1 + (h.currentY - h.maxY + 1) ** .8), g.prevPositionX || (g.prevPositionX = h.touchesCurrent.x), g.prevPositionY || (g.prevPositionY = h.touchesCurrent.y), g.prevTime || (g.prevTime = Date.now()), g.x = (h.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2, g.y = (h.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2, Math.abs(h.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0), Math.abs(h.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0), g.prevPositionX = h.touchesCurrent.x, g.prevPositionY = h.touchesCurrent.y, g.prevTime = Date.now(), m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)` } function C() { const e = t.zoom; m.slideEl && t.activeIndex !== t.slides.indexOf(m.slideEl) && (m.imageEl && (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), m.imageWrapEl && (m.imageWrapEl.style.transform = "translate3d(0,0,0)"), m.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`), e.scale = 1, c = 1, m.slideEl = void 0, m.imageEl = void 0, m.imageWrapEl = void 0, m.originX = 0, m.originY = 0) } function P(e) { const s = t.zoom, a = t.params.zoom; if (!m.slideEl) { e && e.target && (m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`)), m.slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex]); let s = m.slideEl.querySelector(`.${a.containerClass}`); s && (s = s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = s, m.imageWrapEl = s ? E(m.imageEl, `.${a.containerClass}`)[0] : void 0 } if (!m.imageEl || !m.imageWrapEl) return; let i, r, l, o, d, p, u, g, v, b, y, x, S, T, M, C, P, L; t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), m.slideEl.classList.add(`${a.zoomedSlideClass}`), void 0 === h.touchesStart.x && e ? (i = e.pageX, r = e.pageY) : (i = h.touchesStart.x, r = h.touchesStart.y); const A = "number" == typeof e ? e : null; 1 === c && A && (i = void 0, r = void 0), s.scale = A || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, c = A || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, !e || 1 === c && A ? (u = 0, g = 0) : (P = m.slideEl.offsetWidth, L = m.slideEl.offsetHeight, l = w(m.slideEl).left + n.scrollX, o = w(m.slideEl).top + n.scrollY, d = l + P / 2 - i, p = o + L / 2 - r, v = m.imageEl.offsetWidth, b = m.imageEl.offsetHeight, y = v * s.scale, x = b * s.scale, S = Math.min(P / 2 - y / 2, 0), T = Math.min(L / 2 - x / 2, 0), M = -S, C = -T, u = d * s.scale, g = p * s.scale, u < S && (u = S), u > M && (u = M), g < T && (g = T), g > C && (g = C)), A && 1 === s.scale && (m.originX = 0, m.originY = 0), m.imageWrapEl.style.transitionDuration = "300ms", m.imageWrapEl.style.transform = `translate3d(${u}px, ${g}px,0)`, m.imageEl.style.transitionDuration = "300ms", m.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})` } function L() { const e = t.zoom, s = t.params.zoom; if (!m.slideEl) { t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex]; let e = m.slideEl.querySelector(`.${s.containerClass}`); e && (e = e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = e, m.imageWrapEl = e ? E(m.imageEl, `.${s.containerClass}`)[0] : void 0 } m.imageEl && m.imageWrapEl && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, c = 1, m.imageWrapEl.style.transitionDuration = "300ms", m.imageWrapEl.style.transform = "translate3d(0,0,0)", m.imageEl.style.transitionDuration = "300ms", m.imageEl.style.transform = "translate3d(0,0,0) scale(1)", m.slideEl.classList.remove(`${s.zoomedSlideClass}`), m.slideEl = void 0, m.originX = 0, m.originY = 0) } function A(e) { const s = t.zoom; s.scale && 1 !== s.scale ? L() : P(e) } function I() { return { passiveListener: !!t.params.passiveListeners && { passive: !0, capture: !1 }, activeListenerWithCapture: !t.params.passiveListeners || { passive: !1, capture: !0 } } } function z() { const e = t.zoom; if (e.enabled) return; e.enabled = !0; const { passiveListener: s, activeListenerWithCapture: a } = I(); t.wrapperEl.addEventListener("pointerdown", x, s), t.wrapperEl.addEventListener("pointermove", S, a), ["pointerup", "pointercancel", "pointerout"].forEach((e => { t.wrapperEl.addEventListener(e, T, s) })), t.wrapperEl.addEventListener("pointermove", M, a) } function $() { const e = t.zoom; if (!e.enabled) return; e.enabled = !1; const { passiveListener: s, activeListenerWithCapture: a } = I(); t.wrapperEl.removeEventListener("pointerdown", x, s), t.wrapperEl.removeEventListener("pointermove", S, a), ["pointerup", "pointercancel", "pointerout"].forEach((e => { t.wrapperEl.removeEventListener(e, T, s) })), t.wrapperEl.removeEventListener("pointermove", M, a) } Object.defineProperty(t.zoom, "scale", { get: () => v, set(e) { if (v !== e) { const t = m.imageEl, s = m.slideEl; i("zoomChange", e, t, s) } v = e } }), a("init", (() => { t.params.zoom.enabled && z() })), a("destroy", (() => { $() })), a("touchStart", ((e, s) => { t.zoom.enabled && function (e) { const s = t.device; if (!m.imageEl) return; if (h.isTouched) return; s.android && e.cancelable && e.preventDefault(), h.isTouched = !0; const a = u.length > 0 ? u[0] : e; h.touchesStart.x = a.pageX, h.touchesStart.y = a.pageY }(s) })), a("touchEnd", ((e, s) => { t.zoom.enabled && function () { const e = t.zoom; if (!m.imageEl) return; if (!h.isTouched || !h.isMoved) return h.isTouched = !1, void (h.isMoved = !1); h.isTouched = !1, h.isMoved = !1; let s = 300, a = 300; const i = g.x * s, r = h.currentX + i, n = g.y * a, l = h.currentY + n; 0 !== g.x && (s = Math.abs((r - h.currentX) / g.x)), 0 !== g.y && (a = Math.abs((l - h.currentY) / g.y)); const o = Math.max(s, a); h.currentX = r, h.currentY = l; const d = h.width * e.scale, c = h.height * e.scale; h.minX = Math.min(m.slideWidth / 2 - d / 2, 0), h.maxX = -h.minX, h.minY = Math.min(m.slideHeight / 2 - c / 2, 0), h.maxY = -h.minY, h.currentX = Math.max(Math.min(h.currentX, h.maxX), h.minX), h.currentY = Math.max(Math.min(h.currentY, h.maxY), h.minY), m.imageWrapEl.style.transitionDuration = `${o}ms`, m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)` }() })), a("doubleTap", ((e, s) => { !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && A(s) })), a("transitionEnd", (() => { t.zoom.enabled && t.params.zoom.enabled && C() })), a("slideChange", (() => { t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && C() })), Object.assign(t.zoom, { enable: z, disable: $, in: P, out: L, toggle: A }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; function i(e, t) { const s = function () { let e, t, s; return (a, i) => { for (t = -1, e = a.length; e - t > 1;)s = e + t >> 1, a[s] <= i ? t = s : e = s; return e } }(); let a, i; return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) { return e ? (i = s(this.x, e), a = i - 1, (e - this.x[a]) * (this.y[i] - this.y[a]) / (this.x[i] - this.x[a]) + this.y[a]) : 0 }, this } function r() { t.controller.control && t.controller.spline && (t.controller.spline = void 0, delete t.controller.spline) } s({ controller: { control: void 0, inverse: !1, by: "slide" } }), t.controller = { control: void 0 }, a("beforeInit", (() => { if ("undefined" != typeof window && ("string" == typeof t.params.controller.control || t.params.controller.control instanceof HTMLElement)) { const e = document.querySelector(t.params.controller.control); if (e && e.swiper) t.controller.control = e.swiper; else if (e) { const s = a => { t.controller.control = a.detail[0], t.update(), e.removeEventListener("init", s) }; e.addEventListener("init", s) } } else t.controller.control = t.params.controller.control })), a("update", (() => { r() })), a("resize", (() => { r() })), a("observerUpdate", (() => { r() })), a("setTranslate", ((e, s, a) => { t.controller.control && !t.controller.control.destroyed && t.controller.setTranslate(s, a) })), a("setTransition", ((e, s, a) => { t.controller.control && !t.controller.control.destroyed && t.controller.setTransition(s, a) })), Object.assign(t.controller, { setTranslate: function (e, s) { const a = t.controller.control; let r, n; const l = t.constructor; function o(e) { if (e.destroyed) return; const s = t.rtlTranslate ? -t.translate : t.translate; "slide" === t.params.controller.by && (!function (e) { t.controller.spline = t.params.loop ? new i(t.slidesGrid, e.slidesGrid) : new i(t.snapGrid, e.snapGrid) }(e), n = -t.controller.spline.interpolate(-s)), n && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()), !Number.isNaN(r) && Number.isFinite(r) || (r = 1), n = (s - t.minTranslate()) * r + e.minTranslate()), t.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, t), e.updateActiveIndex(), e.updateSlidesClasses() } if (Array.isArray(a)) for (let e = 0; e < a.length; e += 1)a[e] !== s && a[e] instanceof l && o(a[e]); else a instanceof l && s !== a && o(a) }, setTransition: function (e, s) { const a = t.constructor, i = t.controller.control; let r; function n(s) { s.destroyed || (s.setTransition(e, t), 0 !== e && (s.transitionStart(), s.params.autoHeight && l((() => { s.updateAutoHeight() })), x(s.wrapperEl, (() => { i && s.transitionEnd() })))) } if (Array.isArray(i)) for (r = 0; r < i.length; r += 1)i[r] !== s && i[r] instanceof a && n(i[r]); else i instanceof a && s !== i && n(i) } }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", slideLabelMessage: "{{index}} / {{slidesLength}}", containerMessage: null, containerRoleDescriptionMessage: null, itemRoleDescriptionMessage: null, slideRole: "group", id: null } }), t.a11y = { clicked: !1 }; let i = null; function r(e) { const t = i; 0 !== t.length && (t.innerHTML = "", t.innerHTML = e) } const n = e => (Array.isArray(e) ? e : [e]).filter((e => !!e)); function l(e) { (e = n(e)).forEach((e => { e.setAttribute("tabIndex", "0") })) } function o(e) { (e = n(e)).forEach((e => { e.setAttribute("tabIndex", "-1") })) } function d(e, t) { (e = n(e)).forEach((e => { e.setAttribute("role", t) })) } function c(e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-roledescription", t) })) } function p(e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-label", t) })) } function u(e) { (e = n(e)).forEach((e => { e.setAttribute("aria-disabled", !0) })) } function m(e) { (e = n(e)).forEach((e => { e.setAttribute("aria-disabled", !1) })) } function h(e) { if (13 !== e.keyCode && 32 !== e.keyCode) return; const s = t.params.a11y, a = e.target; t.pagination && t.pagination.el && (a === t.pagination.el || t.pagination.el.contains(e.target)) && !e.target.matches(se(t.params.pagination.bulletClass)) || (t.navigation && t.navigation.nextEl && a === t.navigation.nextEl && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)), t.navigation && t.navigation.prevEl && a === t.navigation.prevEl && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)), t.pagination && a.matches(se(t.params.pagination.bulletClass)) && a.click()) } function f() { return t.pagination && t.pagination.bullets && t.pagination.bullets.length } function g() { return f() && t.params.pagination.clickable } const w = (e, t, s) => { l(e), "BUTTON" !== e.tagName && (d(e, "button"), e.addEventListener("keydown", h)), p(e, s), function (e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-controls", t) })) }(e, t) }, b = () => { t.a11y.clicked = !0 }, E = () => { requestAnimationFrame((() => { requestAnimationFrame((() => { t.destroyed || (t.a11y.clicked = !1) })) })) }, x = e => { if (t.a11y.clicked) return; const s = e.target.closest(`.${t.params.slideClass}, swiper-slide`); if (!s || !t.slides.includes(s)) return; const a = t.slides.indexOf(s) === t.activeIndex, i = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s); a || i || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0, t.slideTo(t.slides.indexOf(s), 0)) }, S = () => { const e = t.params.a11y; e.itemRoleDescriptionMessage && c(t.slides, e.itemRoleDescriptionMessage), e.slideRole && d(t.slides, e.slideRole); const s = t.slides.length; e.slideLabelMessage && t.slides.forEach(((a, i) => { const r = t.params.loop ? parseInt(a.getAttribute("data-swiper-slide-index"), 10) : i; p(a, e.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, s)) })) }, T = () => { const e = t.params.a11y; t.el.append(i); const s = t.el; e.containerRoleDescriptionMessage && c(s, e.containerRoleDescriptionMessage), e.containerMessage && p(s, e.containerMessage); const a = t.wrapperEl, r = e.id || a.getAttribute("id") || `swiper-wrapper-${l = 16, void 0 === l && (l = 16), "x".repeat(l).replace(/x/g, (() => Math.round(16 * Math.random()).toString(16)))}`; var l; const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite"; var d; d = r, n(a).forEach((e => { e.setAttribute("id", d) })), function (e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-live", t) })) }(a, o), S(); let { nextEl: u, prevEl: m } = t.navigation ? t.navigation : {}; if (u = n(u), m = n(m), u && u.forEach((t => w(t, r, e.nextSlideMessage))), m && m.forEach((t => w(t, r, e.prevSlideMessage))), g()) { n(t.pagination.el).forEach((e => { e.addEventListener("keydown", h) })) } t.el.addEventListener("focus", x, !0), t.el.addEventListener("pointerdown", b, !0), t.el.addEventListener("pointerup", E, !0) }; a("beforeInit", (() => { i = v("span", t.params.a11y.notificationClass), i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true") })), a("afterInit", (() => { t.params.a11y.enabled && T() })), a("slidesLengthChange snapGridLengthChange slidesGridLengthChange", (() => { t.params.a11y.enabled && S() })), a("fromEdge toEdge afterInit lock unlock", (() => { t.params.a11y.enabled && function () { if (t.params.loop || t.params.rewind || !t.navigation) return; const { nextEl: e, prevEl: s } = t.navigation; s && (t.isBeginning ? (u(s), o(s)) : (m(s), l(s))), e && (t.isEnd ? (u(e), o(e)) : (m(e), l(e))) }() })), a("paginationUpdate", (() => { t.params.a11y.enabled && function () { const e = t.params.a11y; f() && t.pagination.bullets.forEach((s => { t.params.pagination.clickable && (l(s), t.params.pagination.renderBullet || (d(s, "button"), p(s, e.paginationBulletMessage.replace(/\{\{index\}\}/, y(s) + 1)))), s.matches(se(t.params.pagination.bulletActiveClass)) ? s.setAttribute("aria-current", "true") : s.removeAttribute("aria-current") })) }() })), a("destroy", (() => { t.params.a11y.enabled && function () { i && i.remove(); let { nextEl: e, prevEl: s } = t.navigation ? t.navigation : {}; e = n(e), s = n(s), e && e.forEach((e => e.removeEventListener("keydown", h))), s && s.forEach((e => e.removeEventListener("keydown", h))), g() && n(t.pagination.el).forEach((e => { e.removeEventListener("keydown", h) })); t.el.removeEventListener("focus", x, !0), t.el.removeEventListener("pointerdown", b, !0), t.el.removeEventListener("pointerup", E, !0) }() })) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ history: { enabled: !1, root: "", replaceState: !1, key: "slides", keepQuery: !1 } }); let i = !1, n = {}; const l = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""), o = e => { const t = r(); let s; s = e ? new URL(e) : t.location; const a = s.pathname.slice(1).split("/").filter((e => "" !== e)), i = a.length; return { key: a[i - 2], value: a[i - 1] } }, d = (e, s) => { const a = r(); if (!i || !t.params.history.enabled) return; let n; n = t.params.url ? new URL(t.params.url) : a.location; const o = t.slides[s]; let d = l(o.getAttribute("data-history")); if (t.params.history.root.length > 0) { let s = t.params.history.root; "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), d = `${s}/${e ? `${e}/` : ""}${d}` } else n.pathname.includes(e) || (d = `${e ? `${e}/` : ""}${d}`); t.params.history.keepQuery && (d += n.search); const c = a.history.state; c && c.value === d || (t.params.history.replaceState ? a.history.replaceState({ value: d }, null, d) : a.history.pushState({ value: d }, null, d)) }, c = (e, s, a) => { if (s) for (let i = 0, r = t.slides.length; i < r; i += 1) { const r = t.slides[i]; if (l(r.getAttribute("data-history")) === s) { const s = t.getSlideIndex(r); t.slideTo(s, e, a) } } else t.slideTo(0, e, a) }, p = () => { n = o(t.params.url), c(t.params.speed, n.value, !1) }; a("init", (() => { t.params.history.enabled && (() => { const e = r(); if (t.params.history) { if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void (t.params.hashNavigation.enabled = !0); i = !0, n = o(t.params.url), n.key || n.value ? (c(0, n.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", p)) : t.params.history.replaceState || e.addEventListener("popstate", p) } })() })), a("destroy", (() => { t.params.history.enabled && (() => { const e = r(); t.params.history.replaceState || e.removeEventListener("popstate", p) })() })), a("transitionEnd _freeModeNoMomentumRelease", (() => { i && d(t.params.history.key, t.activeIndex) })), a("slideChange", (() => { i && t.params.cssMode && d(t.params.history.key, t.activeIndex) })) }, function (e) { let { swiper: t, extendParams: s, emit: i, on: n } = e, l = !1; const o = a(), d = r(); s({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1, getSlideIndex(e, s) { if (t.virtual && t.params.virtual.enabled) { const e = t.slides.filter((e => e.getAttribute("data-hash") === s))[0]; if (!e) return 0; return parseInt(e.getAttribute("data-swiper-slide-index"), 10) } return t.getSlideIndex(f(t.slidesEl, `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`)[0]) } } }); const c = () => { i("hashChange"); const e = o.location.hash.replace("#", ""), s = t.virtual && t.params.virtual.enabled ? t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`) : t.slides[t.activeIndex]; if (e !== (s ? s.getAttribute("data-hash") : "")) { const s = t.params.hashNavigation.getSlideIndex(t, e); if (void 0 === s || Number.isNaN(s)) return; t.slideTo(s) } }, p = () => { if (!l || !t.params.hashNavigation.enabled) return; const e = t.virtual && t.params.virtual.enabled ? t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`) : t.slides[t.activeIndex], s = e ? e.getAttribute("data-hash") || e.getAttribute("data-history") : ""; t.params.hashNavigation.replaceState && d.history && d.history.replaceState ? (d.history.replaceState(null, null, `#${s}` || ""), i("hashSet")) : (o.location.hash = s || "", i("hashSet")) }; n("init", (() => { t.params.hashNavigation.enabled && (() => { if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled) return; l = !0; const e = o.location.hash.replace("#", ""); if (e) { const s = 0, a = t.params.hashNavigation.getSlideIndex(t, e); t.slideTo(a || 0, s, t.params.runCallbacksOnInit, !0) } t.params.hashNavigation.watchState && d.addEventListener("hashchange", c) })() })), n("destroy", (() => { t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d.removeEventListener("hashchange", c) })), n("transitionEnd _freeModeNoMomentumRelease", (() => { l && p() })), n("slideChange", (() => { l && t.params.cssMode && p() })) }, function (e) { let t, s, { swiper: i, extendParams: r, on: n, emit: l, params: o } = e; i.autoplay = { running: !1, paused: !1, timeLeft: 0 }, r({ autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !1, stopOnLastSlide: !1, reverseDirection: !1, pauseOnMouseEnter: !1 } }); let d, c, p, u, m, h, f, g, v = o && o.autoplay ? o.autoplay.delay : 3e3, w = o && o.autoplay ? o.autoplay.delay : 3e3, b = (new Date).getTime(); function y(e) { i && !i.destroyed && i.wrapperEl && e.target === i.wrapperEl && (i.wrapperEl.removeEventListener("transitionend", y), g || C()) } const E = () => { if (i.destroyed || !i.autoplay.running) return; i.autoplay.paused ? c = !0 : c && (w = d, c = !1); const e = i.autoplay.paused ? d : b + w - (new Date).getTime(); i.autoplay.timeLeft = e, l("autoplayTimeLeft", e, e / v), s = requestAnimationFrame((() => { E() })) }, x = e => { if (i.destroyed || !i.autoplay.running) return; cancelAnimationFrame(s), E(); let a = void 0 === e ? i.params.autoplay.delay : e; v = i.params.autoplay.delay, w = i.params.autoplay.delay; const r = (() => { let e; if (e = i.virtual && i.params.virtual.enabled ? i.slides.filter((e => e.classList.contains("swiper-slide-active")))[0] : i.slides[i.activeIndex], !e) return; return parseInt(e.getAttribute("data-swiper-autoplay"), 10) })(); !Number.isNaN(r) && r > 0 && void 0 === e && (a = r, v = r, w = r), d = a; const n = i.params.speed, o = () => { i && !i.destroyed && (i.params.autoplay.reverseDirection ? !i.isBeginning || i.params.loop || i.params.rewind ? (i.slidePrev(n, !0, !0), l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(i.slides.length - 1, n, !0, !0), l("autoplay")) : !i.isEnd || i.params.loop || i.params.rewind ? (i.slideNext(n, !0, !0), l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(0, n, !0, !0), l("autoplay")), i.params.cssMode && (b = (new Date).getTime(), requestAnimationFrame((() => { x() })))) }; return a > 0 ? (clearTimeout(t), t = setTimeout((() => { o() }), a)) : requestAnimationFrame((() => { o() })), a }, S = () => { b = (new Date).getTime(), i.autoplay.running = !0, x(), l("autoplayStart") }, T = () => { i.autoplay.running = !1, clearTimeout(t), cancelAnimationFrame(s), l("autoplayStop") }, M = (e, s) => { if (i.destroyed || !i.autoplay.running) return; clearTimeout(t), e || (f = !0); const a = () => { l("autoplayPause"), i.params.autoplay.waitForTransition ? i.wrapperEl.addEventListener("transitionend", y) : C() }; if (i.autoplay.paused = !0, s) return h && (d = i.params.autoplay.delay), h = !1, void a(); const r = d || i.params.autoplay.delay; d = r - ((new Date).getTime() - b), i.isEnd && d < 0 && !i.params.loop || (d < 0 && (d = 0), a()) }, C = () => { i.isEnd && d < 0 && !i.params.loop || i.destroyed || !i.autoplay.running || (b = (new Date).getTime(), f ? (f = !1, x(d)) : x(), i.autoplay.paused = !1, l("autoplayResume")) }, P = () => { if (i.destroyed || !i.autoplay.running) return; const e = a(); "hidden" === e.visibilityState && (f = !0, M(!0)), "visible" === e.visibilityState && C() }, L = e => { "mouse" === e.pointerType && (f = !0, g = !0, i.animating || i.autoplay.paused || M(!0)) }, A = e => { "mouse" === e.pointerType && (g = !1, i.autoplay.paused && C()) }; n("init", (() => { i.params.autoplay.enabled && (i.params.autoplay.pauseOnMouseEnter && (i.el.addEventListener("pointerenter", L), i.el.addEventListener("pointerleave", A)), a().addEventListener("visibilitychange", P), S()) })), n("destroy", (() => { i.el.removeEventListener("pointerenter", L), i.el.removeEventListener("pointerleave", A), a().removeEventListener("visibilitychange", P), i.autoplay.running && T() })), n("_freeModeStaticRelease", (() => { (u || f) && C() })), n("_freeModeNoMomentumRelease", (() => { i.params.autoplay.disableOnInteraction ? T() : M(!0, !0) })), n("beforeTransitionStart", ((e, t, s) => { !i.destroyed && i.autoplay.running && (s || !i.params.autoplay.disableOnInteraction ? M(!0, !0) : T()) })), n("sliderFirstMove", (() => { !i.destroyed && i.autoplay.running && (i.params.autoplay.disableOnInteraction ? T() : (p = !0, u = !1, f = !1, m = setTimeout((() => { f = !0, u = !0, M(!0) }), 200))) })), n("touchEnd", (() => { if (!i.destroyed && i.autoplay.running && p) { if (clearTimeout(m), clearTimeout(t), i.params.autoplay.disableOnInteraction) return u = !1, void (p = !1); u && i.params.cssMode && C(), u = !1, p = !1 } })), n("slideChange", (() => { !i.destroyed && i.autoplay.running && (h = !0) })), Object.assign(i.autoplay, { start: S, stop: T, pause: M, resume: C }) }, function (e) { let { swiper: t, extendParams: s, on: i } = e; s({ thumbs: { swiper: null, multipleActiveThumbs: !0, autoScrollOffset: 0, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-thumbs" } }); let r = !1, n = !1; function l() { const e = t.thumbs.swiper; if (!e || e.destroyed) return; const s = e.clickedIndex, a = e.clickedSlide; if (a && a.classList.contains(t.params.thumbs.slideThumbActiveClass)) return; if (null == s) return; let i; i = e.params.loop ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : s, t.params.loop ? t.slideToLoop(i) : t.slideTo(i) } function o() { const { thumbs: e } = t.params; if (r) return !1; r = !0; const s = t.constructor; if (e.swiper instanceof s) t.thumbs.swiper = e.swiper, Object.assign(t.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), Object.assign(t.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), t.thumbs.swiper.update(); else if (c(e.swiper)) { const a = Object.assign({}, e.swiper); Object.assign(a, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), t.thumbs.swiper = new s(a), n = !0 } return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", l), !0 } function d(e) { const s = t.thumbs.swiper; if (!s || s.destroyed) return; const a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView; let i = 1; const r = t.params.thumbs.slideThumbActiveClass; if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (i = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (i = 1), i = Math.floor(i), s.slides.forEach((e => e.classList.remove(r))), s.params.loop || s.params.virtual && s.params.virtual.enabled) for (let e = 0; e < i; e += 1)f(s.slidesEl, `[data-swiper-slide-index="${t.realIndex + e}"]`).forEach((e => { e.classList.add(r) })); else for (let e = 0; e < i; e += 1)s.slides[t.realIndex + e] && s.slides[t.realIndex + e].classList.add(r); const n = t.params.thumbs.autoScrollOffset, l = n && !s.params.loop; if (t.realIndex !== s.realIndex || l) { const i = s.activeIndex; let r, o; if (s.params.loop) { const e = s.slides.filter((e => e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`))[0]; r = s.slides.indexOf(e), o = t.activeIndex > t.previousIndex ? "next" : "prev" } else r = t.realIndex, o = r > t.previousIndex ? "next" : "prev"; l && (r += "next" === o ? n : -1 * n), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(r) < 0 && (s.params.centeredSlides ? r = r > i ? r - Math.floor(a / 2) + 1 : r + Math.floor(a / 2) - 1 : r > i && s.params.slidesPerGroup, s.slideTo(r, e ? 0 : void 0)) } } t.thumbs = { swiper: null }, i("beforeInit", (() => { const { thumbs: e } = t.params; if (e && e.swiper) if ("string" == typeof e.swiper || e.swiper instanceof HTMLElement) { const s = a(), i = () => { const a = "string" == typeof e.swiper ? s.querySelector(e.swiper) : e.swiper; if (a && a.swiper) e.swiper = a.swiper, o(), d(!0); else if (a) { const s = i => { e.swiper = i.detail[0], a.removeEventListener("init", s), o(), d(!0), e.swiper.update(), t.update() }; a.addEventListener("init", s) } return a }, r = () => { if (t.destroyed) return; i() || requestAnimationFrame(r) }; requestAnimationFrame(r) } else o(), d(!0) })), i("slideChange update resize observerUpdate", (() => { d() })), i("setTransition", ((e, s) => { const a = t.thumbs.swiper; a && !a.destroyed && a.setTransition(s) })), i("beforeDestroy", (() => { const e = t.thumbs.swiper; e && !e.destroyed && n && e.destroy() })), Object.assign(t.thumbs, { init: o, update: d }) }, function (e) { let { swiper: t, extendParams: s, emit: a, once: i } = e; s({ freeMode: { enabled: !1, momentum: !0, momentumRatio: 1, momentumBounce: !0, momentumBounceRatio: 1, momentumVelocityRatio: 1, sticky: !1, minimumVelocity: .02 } }), Object.assign(t, { freeMode: { onTouchStart: function () { if (t.params.cssMode) return; const e = t.getTranslate(); t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({ currentPos: t.rtl ? t.translate : -t.translate }) }, onTouchMove: function () { if (t.params.cssMode) return; const { touchEventsData: e, touches: s } = t; 0 === e.velocities.length && e.velocities.push({ position: s[t.isHorizontal() ? "startX" : "startY"], time: e.touchStartTime }), e.velocities.push({ position: s[t.isHorizontal() ? "currentX" : "currentY"], time: o() }) }, onTouchEnd: function (e) { let { currentPos: s } = e; if (t.params.cssMode) return; const { params: r, wrapperEl: n, rtlTranslate: l, snapGrid: d, touchEventsData: c } = t, p = o() - c.touchStartTime; if (s < -t.minTranslate()) t.slideTo(t.activeIndex); else if (s > -t.maxTranslate()) t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1); else { if (r.freeMode.momentum) { if (c.velocities.length > 1) { const e = c.velocities.pop(), s = c.velocities.pop(), a = e.position - s.position, i = e.time - s.time; t.velocity = a / i, t.velocity /= 2, Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0), (i > 150 || o() - e.time > 300) && (t.velocity = 0) } else t.velocity = 0; t.velocity *= r.freeMode.momentumVelocityRatio, c.velocities.length = 0; let e = 1e3 * r.freeMode.momentumRatio; const s = t.velocity * e; let p = t.translate + s; l && (p = -p); let u, m = !1; const h = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio; let f; if (p < t.maxTranslate()) r.freeMode.momentumBounce ? (p + t.maxTranslate() < -h && (p = t.maxTranslate() - h), u = t.maxTranslate(), m = !0, c.allowMomentumBounce = !0) : p = t.maxTranslate(), r.loop && r.centeredSlides && (f = !0); else if (p > t.minTranslate()) r.freeMode.momentumBounce ? (p - t.minTranslate() > h && (p = t.minTranslate() + h), u = t.minTranslate(), m = !0, c.allowMomentumBounce = !0) : p = t.minTranslate(), r.loop && r.centeredSlides && (f = !0); else if (r.freeMode.sticky) { let e; for (let t = 0; t < d.length; t += 1)if (d[t] > -p) { e = t; break } p = Math.abs(d[e] - p) < Math.abs(d[e - 1] - p) || "next" === t.swipeDirection ? d[e] : d[e - 1], p = -p } if (f && i("transitionEnd", (() => { t.loopFix() })), 0 !== t.velocity) { if (e = l ? Math.abs((-p - t.translate) / t.velocity) : Math.abs((p - t.translate) / t.velocity), r.freeMode.sticky) { const s = Math.abs((l ? -p : p) - t.translate), a = t.slidesSizesGrid[t.activeIndex]; e = s < a ? r.speed : s < 2 * a ? 1.5 * r.speed : 2.5 * r.speed } } else if (r.freeMode.sticky) return void t.slideToClosest(); r.freeMode.momentumBounce && m ? (t.updateProgress(u), t.setTransition(e), t.setTranslate(p), t.transitionStart(!0, t.swipeDirection), t.animating = !0, x(n, (() => { t && !t.destroyed && c.allowMomentumBounce && (a("momentumBounce"), t.setTransition(r.speed), setTimeout((() => { t.setTranslate(u), x(n, (() => { t && !t.destroyed && t.transitionEnd() })) }), 0)) }))) : t.velocity ? (a("_freeModeNoMomentumRelease"), t.updateProgress(p), t.setTransition(e), t.setTranslate(p), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, x(n, (() => { t && !t.destroyed && t.transitionEnd() })))) : t.updateProgress(p), t.updateActiveIndex(), t.updateSlidesClasses() } else { if (r.freeMode.sticky) return void t.slideToClosest(); r.freeMode && a("_freeModeNoMomentumRelease") } (!r.freeMode.momentum || p >= r.longSwipesMs) && (a("_freeModeStaticRelease"), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses()) } } } }) }, function (e) { let t, s, a, i, { swiper: r, extendParams: n, on: l } = e; n({ grid: { rows: 1, fill: "column" } }); const o = () => { let e = r.params.spaceBetween; return "string" == typeof e && e.indexOf("%") >= 0 ? e = parseFloat(e.replace("%", "")) / 100 * r.size : "string" == typeof e && (e = parseFloat(e)), e }; l("init", (() => { i = r.params.grid && r.params.grid.rows > 1 })), l("update", (() => { const { params: e, el: t } = r, s = e.grid && e.grid.rows > 1; i && !s ? (t.classList.remove(`${e.containerModifierClass}grid`, `${e.containerModifierClass}grid-column`), a = 1, r.emitContainerClasses()) : !i && s && (t.classList.add(`${e.containerModifierClass}grid`), "column" === e.grid.fill && t.classList.add(`${e.containerModifierClass}grid-column`), r.emitContainerClasses()), i = s })), r.grid = { initSlides: e => { const { slidesPerView: i } = r.params, { rows: n, fill: l } = r.params.grid, o = r.virtual && r.params.virtual.enabled ? r.virtual.slides.length : e.length; a = Math.floor(o / n), t = Math.floor(o / n) === o / n ? o : Math.ceil(o / n) * n, "auto" !== i && "row" === l && (t = Math.max(t, i * n)), s = t / n }, unsetSlides: () => { r.slides && r.slides.forEach((e => { e.swiperSlideGridSet && (e.style.height = "", e.style[r.getDirectionLabel("margin-top")] = "") })) }, updateSlide: (e, i, n) => { const { slidesPerGroup: l } = r.params, d = o(), { rows: c, fill: p } = r.params.grid, u = r.virtual && r.params.virtual.enabled ? r.virtual.slides.length : n.length; let m, h, f; if ("row" === p && l > 1) { const s = Math.floor(e / (l * c)), a = e - c * l * s, r = 0 === s ? l : Math.min(Math.ceil((u - s * c * l) / c), l); f = Math.floor(a / r), h = a - f * r + s * l, m = h + f * t / c, i.style.order = m } else "column" === p ? (h = Math.floor(e / c), f = e - h * c, (h > a || h === a && f === c - 1) && (f += 1, f >= c && (f = 0, h += 1))) : (f = Math.floor(e / s), h = e - f * s); i.row = f, i.column = h, i.style.height = `calc((100% - ${(c - 1) * d}px) / ${c})`, i.style[r.getDirectionLabel("margin-top")] = 0 !== f ? d && `${d}px` : "", i.swiperSlideGridSet = !0 }, updateWrapperSize: (e, s) => { const { centeredSlides: a, roundLengths: i } = r.params, n = o(), { rows: l } = r.params.grid; if (r.virtualSize = (e + n) * t, r.virtualSize = Math.ceil(r.virtualSize / l) - n, r.params.cssMode || (r.wrapperEl.style[r.getDirectionLabel("width")] = `${r.virtualSize + n}px`), a) { const e = []; for (let t = 0; t < s.length; t += 1) { let a = s[t]; i && (a = Math.floor(a)), s[t] < r.virtualSize + s[0] && e.push(a) } s.splice(0, s.length), s.push(...e) } } } }, function (e) { let { swiper: t } = e; Object.assign(t, { appendSlide: ae.bind(t), prependSlide: ie.bind(t), addSlide: re.bind(t), removeSlide: ne.bind(t), removeAllSlides: le.bind(t) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ fadeEffect: { crossFade: !1 } }), oe({ effect: "fade", swiper: t, on: a, setTranslate: () => { const { slides: e } = t; t.params.fadeEffect; for (let s = 0; s < e.length; s += 1) { const e = t.slides[s]; let a = -e.swiperSlideOffset; t.params.virtualTranslate || (a -= t.translate); let i = 0; t.isHorizontal() || (i = a, a = 0); const r = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e.progress), 0) : 1 + Math.min(Math.max(e.progress, -1), 0), n = de(0, e); n.style.opacity = r, n.style.transform = `translate3d(${a}px, ${i}px, 0px)` } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms` })), ce({ swiper: t, duration: e, transformElements: s, allSlides: !0 }) }, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 } }); const i = (e, t, s) => { let a = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"), i = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom"); a || (a = v("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "left" : "top")).split(" ")), e.append(a)), i || (i = v("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "right" : "bottom")).split(" ")), e.append(i)), a && (a.style.opacity = Math.max(-t, 0)), i && (i.style.opacity = Math.max(t, 0)) }; oe({ effect: "cube", swiper: t, on: a, setTranslate: () => { const { el: e, wrapperEl: s, slides: a, width: r, height: n, rtlTranslate: l, size: o, browser: d } = t, c = t.params.cubeEffect, p = t.isHorizontal(), u = t.virtual && t.params.virtual.enabled; let m, h = 0; c.shadow && (p ? (m = t.wrapperEl.querySelector(".swiper-cube-shadow"), m || (m = v("div", "swiper-cube-shadow"), t.wrapperEl.append(m)), m.style.height = `${r}px`) : (m = e.querySelector(".swiper-cube-shadow"), m || (m = v("div", "swiper-cube-shadow"), e.append(m)))); for (let e = 0; e < a.length; e += 1) { const s = a[e]; let r = e; u && (r = parseInt(s.getAttribute("data-swiper-slide-index"), 10)); let n = 90 * r, d = Math.floor(n / 360); l && (n = -n, d = Math.floor(-n / 360)); const m = Math.max(Math.min(s.progress, 1), -1); let f = 0, g = 0, v = 0; r % 4 == 0 ? (f = 4 * -d * o, v = 0) : (r - 1) % 4 == 0 ? (f = 0, v = 4 * -d * o) : (r - 2) % 4 == 0 ? (f = o + 4 * d * o, v = o) : (r - 3) % 4 == 0 && (f = -o, v = 3 * o + 4 * o * d), l && (f = -f), p || (g = f, f = 0); const w = `rotateX(${p ? 0 : -n}deg) rotateY(${p ? n : 0}deg) translate3d(${f}px, ${g}px, ${v}px)`; m <= 1 && m > -1 && (h = 90 * r + 90 * m, l && (h = 90 * -r - 90 * m), t.browser && t.browser.isSafari && Math.abs(h) / 90 % 2 == 1 && (h += .001)), s.style.transform = w, c.slideShadows && i(s, m, p) } if (s.style.transformOrigin = `50% 50% -${o / 2}px`, s.style["-webkit-transform-origin"] = `50% 50% -${o / 2}px`, c.shadow) if (p) m.style.transform = `translate3d(0px, ${r / 2 + c.shadowOffset}px, ${-r / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${c.shadowScale})`; else { const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90), t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2), s = c.shadowScale, a = c.shadowScale / t, i = c.shadowOffset; m.style.transform = `scale3d(${s}, 1, ${a}) translate3d(0px, ${n / 2 + i}px, ${-n / 2 / a}px) rotateX(-89.99deg)` } const f = (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0; s.style.transform = `translate3d(0px,0,${f}px) rotateX(${t.isHorizontal() ? 0 : h}deg) rotateY(${t.isHorizontal() ? -h : 0}deg)`, s.style.setProperty("--swiper-cube-translate-z", `${f}px`) }, setTransition: e => { const { el: s, slides: a } = t; if (a.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), t.params.cubeEffect.shadow && !t.isHorizontal()) { const t = s.querySelector(".swiper-cube-shadow"); t && (t.style.transitionDuration = `${e}ms`) } }, recreateShadows: () => { const e = t.isHorizontal(); t.slides.forEach((t => { const s = Math.max(Math.min(t.progress, 1), -1); i(t, s, e) })) }, getEffectParams: () => t.params.cubeEffect, perspective: () => !0, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ flipEffect: { slideShadows: !0, limitRotation: !0 } }); const i = (e, s) => { let a = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"), i = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom"); a || (a = pe("flip", e, t.isHorizontal() ? "left" : "top")), i || (i = pe("flip", e, t.isHorizontal() ? "right" : "bottom")), a && (a.style.opacity = Math.max(-s, 0)), i && (i.style.opacity = Math.max(s, 0)) }; oe({ effect: "flip", swiper: t, on: a, setTranslate: () => { const { slides: e, rtlTranslate: s } = t, a = t.params.flipEffect; for (let r = 0; r < e.length; r += 1) { const n = e[r]; let l = n.progress; t.params.flipEffect.limitRotation && (l = Math.max(Math.min(n.progress, 1), -1)); const o = n.swiperSlideOffset; let d = -180 * l, c = 0, p = t.params.cssMode ? -o - t.translate : -o, u = 0; t.isHorizontal() ? s && (d = -d) : (u = p, p = 0, c = -d, d = 0), t.browser && t.browser.isSafari && (Math.abs(d) / 90 % 2 == 1 && (d += .001), Math.abs(c) / 90 % 2 == 1 && (c += .001)), n.style.zIndex = -Math.abs(Math.round(l)) + e.length, a.slideShadows && i(n, l); const m = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`; de(0, n).style.transform = m } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), ce({ swiper: t, duration: e, transformElements: s }) }, recreateShadows: () => { t.params.flipEffect, t.slides.forEach((e => { let s = e.progress; t.params.flipEffect.limitRotation && (s = Math.max(Math.min(e.progress, 1), -1)), i(e, s) })) }, getEffectParams: () => t.params.flipEffect, perspective: () => !0, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ coverflowEffect: { rotate: 50, stretch: 0, depth: 100, scale: 1, modifier: 1, slideShadows: !0 } }), oe({ effect: "coverflow", swiper: t, on: a, setTranslate: () => { const { width: e, height: s, slides: a, slidesSizesGrid: i } = t, r = t.params.coverflowEffect, n = t.isHorizontal(), l = t.translate, o = n ? e / 2 - l : s / 2 - l, d = n ? r.rotate : -r.rotate, c = r.depth; for (let e = 0, s = a.length; e < s; e += 1) { const s = a[e], l = i[e], p = (o - s.swiperSlideOffset - l / 2) / l, u = "function" == typeof r.modifier ? r.modifier(p) : p * r.modifier; let m = n ? d * u : 0, h = n ? 0 : d * u, f = -c * Math.abs(u), g = r.stretch; "string" == typeof g && -1 !== g.indexOf("%") && (g = parseFloat(r.stretch) / 100 * l); let v = n ? 0 : g * u, w = n ? g * u : 0, b = 1 - (1 - r.scale) * Math.abs(u); Math.abs(w) < .001 && (w = 0), Math.abs(v) < .001 && (v = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(h) < .001 && (h = 0), Math.abs(b) < .001 && (b = 0), t.browser && t.browser.isSafari && (Math.abs(m) / 90 % 2 == 1 && (m += .001), Math.abs(h) / 90 % 2 == 1 && (h += .001)); const y = `translate3d(${w}px,${v}px,${f}px)  rotateX(${h}deg) rotateY(${m}deg) scale(${b})`; if (de(0, s).style.transform = y, s.style.zIndex = 1 - Math.abs(Math.round(u)), r.slideShadows) { let e = n ? s.querySelector(".swiper-slide-shadow-left") : s.querySelector(".swiper-slide-shadow-top"), t = n ? s.querySelector(".swiper-slide-shadow-right") : s.querySelector(".swiper-slide-shadow-bottom"); e || (e = pe("coverflow", s, n ? "left" : "top")), t || (t = pe("coverflow", s, n ? "right" : "bottom")), e && (e.style.opacity = u > 0 ? u : 0), t && (t.style.opacity = -u > 0 ? -u : 0) } } }, setTransition: e => { t.slides.map((e => h(e))).forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => { t.style.transitionDuration = `${e}ms` })) })) }, perspective: () => !0, overwriteParams: () => ({ watchSlidesProgress: !0 }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ creativeEffect: { limitProgress: 1, shadowPerProgress: !1, progressMultiplier: 1, perspective: !0, prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 }, next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 } } }); const i = e => "string" == typeof e ? e : `${e}px`; oe({ effect: "creative", swiper: t, on: a, setTranslate: () => { const { slides: e, wrapperEl: s, slidesSizesGrid: a } = t, r = t.params.creativeEffect, { progressMultiplier: n } = r, l = t.params.centeredSlides; if (l) { const e = a[0] / 2 - t.params.slidesOffsetBefore || 0; s.style.transform = `translateX(calc(50% - ${e}px))` } for (let s = 0; s < e.length; s += 1) { const a = e[s], o = a.progress, d = Math.min(Math.max(a.progress, -r.limitProgress), r.limitProgress); let c = d; l || (c = Math.min(Math.max(a.originalProgress, -r.limitProgress), r.limitProgress)); const p = a.swiperSlideOffset, u = [t.params.cssMode ? -p - t.translate : -p, 0, 0], m = [0, 0, 0]; let h = !1; t.isHorizontal() || (u[1] = u[0], u[0] = 0); let f = { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 }; d < 0 ? (f = r.next, h = !0) : d > 0 && (f = r.prev, h = !0), u.forEach(((e, t) => { u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d * n)}))` })), m.forEach(((e, s) => { let a = f.rotate[s] * Math.abs(d * n); t.browser && t.browser.isSafari && Math.abs(a) / 90 % 2 == 1 && (a += .001), m[s] = a })), a.style.zIndex = -Math.abs(Math.round(o)) + e.length; const g = u.join(", "), v = `rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`, w = c < 0 ? `scale(${1 + (1 - f.scale) * c * n})` : `scale(${1 - (1 - f.scale) * c * n})`, b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n, y = `translate3d(${g}) ${v} ${w}`; if (h && f.shadow || !h) { let e = a.querySelector(".swiper-slide-shadow"); if (!e && f.shadow && (e = pe("creative", a)), e) { const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d; e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1) } } const E = de(0, a); E.style.transform = y, E.style.opacity = b, f.origin && (E.style.transformOrigin = f.origin) } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), ce({ swiper: t, duration: e, transformElements: s, allSlides: !0 }) }, perspective: () => t.params.creativeEffect.perspective, overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ cardsEffect: { slideShadows: !0, rotate: !0, perSlideRotate: 2, perSlideOffset: 8 } }), oe({ effect: "cards", swiper: t, on: a, setTranslate: () => { const { slides: e, activeIndex: s, rtlTranslate: a } = t, i = t.params.cardsEffect, { startTranslate: r, isTouched: n } = t.touchEventsData, l = a ? -t.translate : t.translate; for (let o = 0; o < e.length; o += 1) { const d = e[o], c = d.progress, p = Math.min(Math.max(c, -4), 4); let u = d.swiperSlideOffset; t.params.centeredSlides && !t.params.cssMode && (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (u -= e[0].swiperSlideOffset); let m = t.params.cssMode ? -u - t.translate : -u, h = 0; const f = -100 * Math.abs(p); let g = 1, v = -i.perSlideRotate * p, w = i.perSlideOffset - .75 * Math.abs(p); const b = t.virtual && t.params.virtual.enabled ? t.virtual.from + o : o, y = (b === s || b === s - 1) && p > 0 && p < 1 && (n || t.params.cssMode) && l < r, E = (b === s || b === s + 1) && p < 0 && p > -1 && (n || t.params.cssMode) && l > r; if (y || E) { const e = (1 - Math.abs((Math.abs(p) - .5) / .5)) ** .5; v += -28 * p * e, g += -.5 * e, w += 96 * e, h = -25 * e * Math.abs(p) + "%" } if (m = p < 0 ? `calc(${m}px ${a ? "-" : "+"} (${w * Math.abs(p)}%))` : p > 0 ? `calc(${m}px ${a ? "-" : "+"} (-${w * Math.abs(p)}%))` : `${m}px`, !t.isHorizontal()) { const e = h; h = m, m = e } const x = p < 0 ? "" + (1 + (1 - g) * p) : "" + (1 - (1 - g) * p), S = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${i.rotate ? a ? -v : v : 0}deg)\n        scale(${x})\n      `; if (i.slideShadows) { let e = d.querySelector(".swiper-slide-shadow"); e || (e = pe("cards", d)), e && (e.style.opacity = Math.min(Math.max((Math.abs(p) - .5) / .5, 0), 1)) } d.style.zIndex = -Math.abs(Math.round(c)) + e.length; de(0, d).style.transform = S } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), ce({ swiper: t, duration: e, transformElements: s }) }, perspective: () => !0, overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode }) }) }]; return ee.use(ue), ee }();

var ssv13_videoDataArray = [], ssv13_currentVideoTimer = null; function generateUUIDssv13() { var e = (new Date).getTime(), t = "undefined" != typeof performance && performance.now && 1e3 * performance.now() || 0; return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (a) { var i = 16 * Math.random(); return e > 0 ? (i = (e + i) % 16 | 0, e = Math.floor(e / 16)) : (i = (t + i) % 16 | 0, t = Math.floor(t / 16)), ("x" === a ? i : 3 & i | 8).toString(16) })) } function getDeviceTypessv13() { const e = window.innerWidth; return e <= 767 ? "Mobile" : e >= 768 && e <= 1024 ? "Tablet" : "Desktop" } async function initializeVideoDatassv13(e, t, a) { let i = !1; const s = ssv13_videoDataArray.find((t => t.id === e)), o = localStorage.getItem("ssv13_responseData"), n = JSON.parse(o), r = document.getElementById(e), d = s || { id: e, url: t, unique_views: 0, watch_time: 0, brand_id: n.swirls.customization.brand_id, total_views: 0, duration: n?.swirls[a]?.find((e => e.server_url == t))?.video_len, video_title: n?.swirls[a]?.find((e => e.server_url == t))?.video_title, drop_of_point: [], skip_points: [], segments: [], location_details: {}, system_detail: { swirl_machine_id: generateUUIDssv13(), device_type: getDeviceTypessv13() } }; initializeSegmentssv13(d), ssv13_currentVideoTimer && clearInterval(ssv13_currentVideoTimer), s && (d.watch_time = parseInt(s.watch_time || 0, 10)), r.addEventListener("timeupdate", (() => { const e = Math.floor(r.currentTime); d.segments.find((t => e >= t.start && e <= t.end)); 0 == e || i || (d.unique_views = 1, d.total_views += 1, i = !0, localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), ssv13_currentVideoTimer = setInterval((() => { r.paused || (tenPercent = Math.floor(.1 * d.duration), d.watch_time += 1, localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) }), 1e3), r.addEventListener("pause", (() => { const e = Math.floor(r.currentTime), t = d.segments.find((t => e >= t.start && e <= t.end)); t && (d.drop_of_point.push({ segment_id: t.segment_id, timestamp: e }), localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), r.addEventListener("ended", (() => { const e = Math.floor(r.currentTime), t = d.segments.find((t => e >= t.start && e <= t.end)); t && (d.drop_of_point.push({ segment_id: t.segment_id, timestamp: e }), localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), r.addEventListener("seeked", (() => { const e = Math.floor(r.currentTime), t = d.segments.find((t => e >= t.start && e <= t.end)); t && (0 == d?.skip_points.length || d.skip_points[d.skip_points.length - 1].to ? d.skip_points.push({ from: { segmentId: t.segmentId, timeStamp: e }, to: null }) : d.skip_points[d.skip_points.length - 1].to = { segmentId: t?.segmentId, timeStamp: e }, localStorage.setItem("_all_video_data", JSON.stringify(ssv13_videoDataArray))) })), s ? Object.assign(s, d) : ssv13_videoDataArray.push(d) } function initializeSegmentssv13(e) { for (let t = 0; t < Math.ceil(e.duration / 3); t++)e.segments.push({ segment_id: t + 1, start: 3 * t, end: Math.min(3 * (t + 1), e.duration) }) } function pushAnalyticsdatassv13() { substring_to_remove = "ssv13-video-m-"; const e = JSON.parse(localStorage.getItem("_all_video_data")), t = e?.map((async e => (e.video_id = e.id.replace(substring_to_remove, ""), e))); t.length > 0 && Promise.all(t).then((async e => { await fetch("https://goswirl.world:3001/insertVideoData", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payloads: e }) }).then((e => { if (ssv13_videoDataArray = [], !e.ok) throw new Error("Network response was not ok"); localStorage.removeItem("_all_video_data") })).catch((e => { console.error("Error sending data:", e) })) })).catch((e => console.log(e))) } async function impressionCountssv13(e, t, a) { let i = window.location.href.split("?")[0]; const s = localStorage.getItem("uuid"), o = localStorage.getItem("timestamp"); if (s && o) { const e = 144e5; if ((new Date).getTime() - parseInt(o, 10) < e) return void console.log("Using existing UUID:", s) } const n = generateUUIDssv13(); localStorage.setItem("uuid", n), localStorage.setItem("timestamp", (new Date).getTime().toString()); let r = { id: n, playlist: t || "", current_url: i, brand_id: e, video_ids: a }; await fetch("https://goswirl.world:3001/insertImpression", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ impressionData: r }) }).then((e => { })).catch((e => { console.error("Error sending data:", e) })) } window.addEventListener("unload", (() => { const e = localStorage.getItem("_all_video_data"); if (e) try { const t = JSON.parse(e); localStorage.removeItem("_all_video_data"); const a = t?.map((async e => (e.video_id = e.id.replace("ssv13-video-m-", ""), e))); if (a) try { if (!navigator.sendBeacon("https://goswirl.world:3001/insertVideoDataOnWindowclose", JSON.stringify(t))) throw new Error("Beacon transmission failed"); localStorage.removeItem("_all_video_data") } catch (e) { console.error("Error sending data:", e) } } catch (e) { localStorage.removeItem("_all_video_data"), console.error("Error parsing analytics data:", e) } }));

const urlSearchParamssv13 = new URLSearchParams(window.location.search);
const getParamssv13 = Object.fromEntries(urlSearchParamssv13.entries());

let ssv13_globalMute = true;
let ssv13_pipMode = false;
let ssv13_brandCustomizations = [];
let ssv13_storeURL = '';
let ssv13_storeType = '0';
let ssv13_storeCode = '';
let ssv13_storePlaylist = [];
let ssv13_storePdp = '';
let ssv13_responseData = [];
let ssv13_productIds = [];
let ssv13_pdppip = false;
let ssv13_pdppipURL = '';
let ssv13_swiper = [];
let ssv13_swiper_modal = [];
let ssv13_swiper_product = [];
let ssv13_swiper_review = [];
let ssv13_userData = null;
let ssv13_currentModal = 0;
let ssv13_modalState = 0;
let ssv13_commentsLoaded = [];
let ssv13_fsdb = [];
let ssv13_gptPrompt = [];

(() => {
    initssv13();
})();

function initssv13() {
    let cUrl = window.location.href;

    // check PIP 
    if (localStorage.getItem('ssv13_pip') && document.querySelectorAll('.swirl-short-videos-c-ssv13').length == 0) {
        ssv13_pipMode = true;
        let cDiv = document.createElement('div');
        cDiv.style.display = 'none';
        cDiv.innerHTML = `
            <div class="swirl-short-videos-c-ssv13" data-code="${localStorage.getItem('ssv13_storeCode')}" data-playlist="${localStorage.getItem('ssv13_storePlaylist')}"
                data-pdp="${localStorage.getItem('ssv13_storePdp')}" data-wt="${localStorage.getItem('ssv13_storeType')}"></div>
        `;
        document.body.appendChild(cDiv);
    } else if (document.querySelectorAll('.swirl-short-videos-c-ssv13').length) {
        // PDP or Normal        
        let pSet = document.querySelectorAll('.swirl-short-videos-c-ssv13')[0].dataset.pdp;
        pSet.split(',').forEach(pVal => {
            if (cUrl.includes(pVal) || pVal.includes('/home')) ssv13_pdppip = true;
        });
    }

    if (document.querySelectorAll('.swirl-short-videos-c-ssv13').length == 0) {
        console.log('SSV: Div missing.');
        return;
    }

    let style = document.createElement("style");
    style.textContent = `
        @font-face{font-family:swiper-icons;src:url('data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA');font-weight:400;font-style:normal}:root{--swiper-theme-color:#007aff}:host{position:relative;display:block;margin-left:auto;margin-right:auto;z-index:1}.swiper{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);box-sizing:content-box}.swiper-android .swiper-slide,.swiper-ios .swiper-slide,.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}.swiper-slide-invisible-blank{visibility:hidden}.swiper-autoheight,.swiper-autoheight .swiper-slide{height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden .swiper-slide{transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-cube-shadow,.swiper-3d .swiper-slide{transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper::before{content:'';flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered>.swiper-wrapper>.swiper-slide{scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper>.swiper-slide:first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper::before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper>.swiper-slide:first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper::before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-bottom,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-3d .swiper-slide-shadow{background:rgba(0,0,0,.15)}.swiper-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader,.swiper:not(.swiper-watch-progress) .swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.swiper-virtual .swiper-slide{-webkit-backface-visibility:hidden;transform:translateZ(0)}.swiper-virtual.swiper-css-mode .swiper-wrapper::after{content:'';position:absolute;left:0;top:0;pointer-events:none}.swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper::after{height:1px;width:var(--swiper-virtual-size)}.swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper::after{width:1px;height:var(--swiper-virtual-size)}:root{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{position:absolute;top:var(--swiper-navigation-top-offset,50%);width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size)/ 2));z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next.swiper-button-hidden,.swiper-button-prev.swiper-button-hidden{opacity:0;cursor:auto;pointer-events:none}.swiper-navigation-disabled .swiper-button-next,.swiper-navigation-disabled .swiper-button-prev{display:none!important}.swiper-button-next svg,.swiper-button-prev svg{width:100%;height:100%;object-fit:contain;transform-origin:center}.swiper-rtl .swiper-button-next svg,.swiper-rtl .swiper-button-prev svg{transform:rotate(180deg)}.swiper-button-prev,.swiper-rtl .swiper-button-next{left:var(--swiper-navigation-sides-offset,10px);right:auto}.swiper-button-next,.swiper-rtl .swiper-button-prev{right:var(--swiper-navigation-sides-offset,10px);left:auto}.swiper-button-lock{display:none}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;font-variant:initial;line-height:1}.swiper-button-prev:after,.swiper-rtl .swiper-button-next:after{content:'prev'}.swiper-button-next,.swiper-rtl .swiper-button-prev{right:var(--swiper-navigation-sides-offset,10px);left:auto}.swiper-button-next:after,.swiper-rtl .swiper-button-prev:after{content:'next'}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:var(--swiper-pagination-bottom,8px);top:var(--swiper-pagination-top,auto);left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:var(--swiper-pagination-bullet-width,var(--swiper-pagination-bullet-size,8px));height:var(--swiper-pagination-bullet-height,var(--swiper-pagination-bullet-size,8px));display:inline-block;border-radius:var(--swiper-pagination-bullet-border-radius,50%);background:var(--swiper-pagination-bullet-inactive-color,#000);opacity:var(--swiper-pagination-bullet-inactive-opacity, .2)}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{opacity:var(--swiper-pagination-bullet-opacity, 1);background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-pagination-vertical.swiper-pagination-bullets,.swiper-vertical>.swiper-pagination-bullets{right:var(--swiper-pagination-right,8px);left:var(--swiper-pagination-left,auto);top:50%;transform:translate3d(0px,-50%,0)}.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:var(--swiper-pagination-bullet-vertical-gap,6px) 0;display:block}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap,4px)}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-fraction{color:var(--swiper-pagination-fraction-color,inherit)}.swiper-pagination-progressbar{background:var(--swiper-pagination-progressbar-bg-color,rgba(0,0,0,.25));position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:var(--swiper-pagination-progressbar-size,4px);left:0;top:0}.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-vertical>.swiper-pagination-progressbar{width:var(--swiper-pagination-progressbar-size,4px);height:100%;left:0;top:0}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:var(--swiper-scrollbar-border-radius,10px);position:relative;touch-action:none;background:var(--swiper-scrollbar-bg-color,rgba(0,0,0,.1))}.swiper-scrollbar-disabled>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-disabled{display:none!important}.swiper-horizontal>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-horizontal{position:absolute;left:var(--swiper-scrollbar-sides-offset,1%);bottom:var(--swiper-scrollbar-bottom,4px);top:var(--swiper-scrollbar-top,auto);z-index:50;height:var(--swiper-scrollbar-size,4px);width:calc(100% - 2 * var(--swiper-scrollbar-sides-offset,1%))}.swiper-scrollbar.swiper-scrollbar-vertical,.swiper-vertical>.swiper-scrollbar{position:absolute;left:var(--swiper-scrollbar-left,auto);right:var(--swiper-scrollbar-right,4px);top:var(--swiper-scrollbar-sides-offset,1%);z-index:50;width:var(--swiper-scrollbar-size,4px);height:calc(100% - 2 * var(--swiper-scrollbar-sides-offset,1%))}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:var(--swiper-scrollbar-drag-bg-color,rgba(0,0,0,.5));border-radius:var(--swiper-scrollbar-border-radius,10px);left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}.swiper-slide-zoomed{cursor:move;touch-action:none}.swiper .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-free-mode>.swiper-wrapper{transition-timing-function:ease-out;margin:0 auto}.swiper-grid>.swiper-wrapper{flex-wrap:wrap}.swiper-grid-column>.swiper-wrapper{flex-wrap:wrap;flex-direction:column}.swiper-fade.swiper-free-mode .swiper-slide{transition-timing-function:ease-out}.swiper-fade .swiper-slide{pointer-events:none;transition-property:opacity}.swiper-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-fade .swiper-slide-active{pointer-events:auto}.swiper-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-cube{overflow:visible}.swiper-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;transform-origin:0 0;width:100%;height:100%}.swiper-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-cube.swiper-rtl .swiper-slide{transform-origin:100% 0}.swiper-cube .swiper-slide-active,.swiper-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-cube .swiper-slide-active,.swiper-cube .swiper-slide-next,.swiper-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;opacity:.6;z-index:0}.swiper-cube .swiper-cube-shadow:before{content:'';background:#000;position:absolute;left:0;top:0;bottom:0;right:0;filter:blur(50px)}.swiper-cube .swiper-slide-next+.swiper-slide{pointer-events:auto;visibility:visible}.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-bottom,.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-left,.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-right,.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-flip{overflow:visible}.swiper-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-flip .swiper-slide-active,.swiper-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-bottom,.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-left,.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-right,.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-creative .swiper-slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden;transition-property:transform,opacity,height}.swiper-cards{overflow:visible}.swiper-cards .swiper-slide{transform-origin:center bottom;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden}

        /* Common CSS */
        @font-face {
            font-family: cs-book-ssv13;
            font-style: normal;
            src: url(https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/font-family/v13/CircularStd-Book.otf);
        }

        @font-face {
            font-family: cs-light-ssv13;
            font-style: normal;
            src: url(https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/font-family/v13/CircularStd-Light.otf);
        }

        @font-face {
            font-family: cs-bold-ssv13;
            font-style: normal;
            src: url(https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/font-family/v13/CircularStd-Bold.otf);
        }

        @font-face {
            font-family: cs-medium-ssv13;
            font-style: normal;
            src: url(https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/font-family/v13/CircularStd-Medium.otf);
        }

        @font-face {
            font-family: cs-black-ssv13;
            font-style: normal;
            src: url(https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/font-family/v13/CircularStd-Black.otf);
        }

        :root {
            --ssv13BgWhite: #ffffff;
            --ssv13BgBlack: #323232;
            --ssv13FontWhite: #ffffff;
            --ssv13FontBlack: #454549;
            --ssv13BrandBg: #131306;
            --ssv13BrandFont: #ee7;
        }

        .swirl-short-videos-c-ssv13 *,
        .swirl-short-videos-m-ssv13 *,
        .swirl-short-videos-c-ssv13 input,
        .swirl-short-videos-m-ssv13 input,
        .swirl-short-videos-c-ssv13 :before,
        .swirl-short-videos-m-ssv13 :before,
        .swirl-short-videos-c-ssv13 :after,
        .swirl-short-videos-m-ssv13 :after {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .swirl-short-videos-c-ssv13,
        .swirl-short-videos-m-ssv13 {
            margin: 0 auto;
            width: 100%;
            color: var(--ssv13FontBlack);
        }

        .swirl-short-videos-c-ssv13 *,
        .swirl-short-videos-m-ssv13 * {
            font-family: cs-book-ssv13 !important;
            -webkit-tap-highlight-color: transparent;
            text-transform: none !important;
        }

        .swirl-short-videos-c-ssv13 p,
        .swirl-short-videos-c-ssv13 section,
        .swirl-short-videos-c-ssv13 label,
        .swirl-short-videos-c-ssv13 button,
        .swirl-short-videos-m-ssv13 p,
        .swirl-short-videos-m-ssv13 section,
        .swirl-short-videos-m-ssv13 label,
        .swirl-short-videos-m-ssv13 button {
            line-height: normal;
            letter-spacing: normal !important;
            text-transform: none !important;
        }

        .swirl-short-videos-c-ssv13 input,
        .swirl-short-videos-c-ssv13 textarea,
        .swirl-short-videos-m-ssv13 input,
        .swirl-short-videos-m-ssv13 textarea {
            color: var(--ssv13FontBlack) !important;
            text-align: left !important;
            text-transform: none !important;
        }

        .swirl-short-videos-c-ssv13 input::placeholder,
        .swirl-short-videos-c-ssv13 textarea::placeholder,
        .swirl-short-videos-m-ssv13 input::placeholder,
        .swirl-short-videos-m-ssv13 textarea::placeholder{
            text-transform: none !important;
            font-weight: normal;
        }

        .swirl-short-videos-c-ssv13 button,
        .swirl-short-videos-m-ssv13 button {
            cursor: pointer !important;
            text-transform: none !important;
            font-weight: normal !important;
            min-height: inherit;
            text-align: center !important;
            min-width: 1px !important;
            --button-border-color: none !important;
            overflow: unset !important;
        }

        /* .swirl-short-videos-c-ssv13 button:hover,
        .swirl-short-videos-m-ssv13 button:hover {
            background: inherit !important;
            border: inherit !important;
            color: inherit !important;
        } */

        .swirl-short-videos-c-ssv13 a,
        .swirl-short-videos-m-ssv13 a {
            text-decoration: none !important;
            cursor: pointer !important;
        }

        .swirl-short-videos-c-ssv13 form,
        .swirl-short-videos-m-ssv13 form {
            margin: 0 !important;
        }

        /* Main CSS */
        .swiper-ssv13-c {
            height: 100%;
            width: auto;
        }

        .swiper-ssv13-c .swiper-wrapper {
            padding-bottom: 10px;
        }

        .swiper-ssv13-c .swiper-slide {
            position: relative;
            /* -webkit-box-shadow: rgb(35 35 35 / 30%) 1px 1px 5px 1px;
            -moz-box-shadow: rgb(35 35 35 / 30%) 1px 1px 5px 1px;
            box-shadow: rgb(35 35 35 / 30%) 1px 1px 5px 1px; */
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            height: max-content;
            -webkit-backface-visibility: hidden;
            -webkit-transform: translateZ(0);
        }

        .swiper-ssv13-c .swiper-button-next-ssv13-c,
        .swiper-ssv13-c .swiper-button-prev-ssv13-c {
            width: 40px;
            height: 40px;
            background-image: none !important;
        }

        .swiper-ssv13-c .swiper-button-next-ssv13-c svg,
        .swiper-ssv13-c .swiper-button-prev-ssv13-c svg {
            width: 100%;
            opacity: 0.7;
        }

        .swiper-button-disabled {
            display: none !important;
        }

        .swiper-button-next-ssv13-c,
        .swiper-button-prev-ssv13-c,
        .swiper-button-next-ssv13-m,
        .swiper-button-prev-ssv13-m {
            position: absolute;
            top: var(--swiper-navigation-top-offset, 50%);
            width: calc(var(--swiper-navigation-size)/ 44 * 27);
            height: var(--swiper-navigation-size);
            margin-top: calc(0px - (var(--swiper-navigation-size)/ 2));
            z-index: 10;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--swiper-navigation-color, var(--swiper-theme-color));
        }

        .swiper-button-next-ssv13-c {
            right: var(--swiper-navigation-sides-offset, 10px);
            left: auto;
        }

        .swiper-button-prev-ssv13-c {
            left: var(--swiper-navigation-sides-offset, 10px);
            right: auto;
        }

        .swiper-ssv13-m {
            height: 100%;
            width: auto;
        }

        .swiper-ssv13-m .swiper-wrapper {
            width: 100%;
            height: 100%;
        }

        .swiper-ssv13-m .swiper-slide {
            height: 100%;
        }

        .swiper-ssv13-m .swiper-button-next-ssv13-m,
        .swiper-ssv13-m .swiper-button-prev-ssv13-m {
            width: 50px;
            height: 50px;
            background-image: none !important;
        }

        .swiper-ssv13-m .swiper-button-prev-ssv13-m {
            left: 25px;
        }

        .swiper-ssv13-m .swiper-button-next-ssv13-m {
            right: 25px;
        }

        .swiper-ssv13-m .swiper-button-next-ssv13-m svg,
        .swiper-ssv13-m .swiper-button-prev-ssv13-m svg {
            width: 100%;
        }

        .swiper-ssv13-m .swiper-slide-m:not(.swiper-slide-fully-visible) {
            opacity: 0.3;
        }

        .carousel-loader-ssv13 {
            display: flex;
            height: 300px;
            width: 100%;
            align-items: center;
            justify-content: center;
        }

        .carousel-loader-ssv13 svg {
            margin: 0 !important;
            padding: 0 !important;
            width: 150px !important;
        }

        .carousel-video-ssv13 {
            display: block;
            width: 100%;
            margin: 0 !important;
        }

        .carousel-video-ssv13::-webkit-media-controls-panel {
            display: none !important;
            opacity: 0 !important;
        }

        .carousel-video-play-ssv13 {
            position: absolute;
            top: calc(50% - 30px);
            left: calc(50% - 30px);
            width: 60px !important;
            height: 60px !important;
            margin: 0 !important;
        }

        .video-views-count-top-ssv13 {
            position: absolute;
            top: 10px;
            right: 10px;
            /* background: rgb(0, 0, 0, 0.3); */
            padding: 3px 5px;
            border-radius: 3px;
            margin: 0 !important;
        }

        .video-views-count-top-ssv13 p {
            margin: 0 !important;
            color: var(--ssv13FontWhite) !important;
            font-size: 14px;
            height: 16px;
            line-height: 16px !important;
        }

        .video-views-count-top-ssv13 p svg {
            margin: 0 !important;
            height: 16px !important;
            vertical-align: top;
            margin-right: 5px !important;
            display: inline-block !important;
            width: auto !important;
        }

        .video-timer-top-ssv13 {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgb(0, 0, 0, 0.3);
            padding: 3px 5px;
            border-radius: 3px;
            margin: 0 !important;
            display: none !important;
        }

        .video-timer-top-ssv13 p {
            margin: 0 !important;
            color: var(--ssv13FontWhite) !important;
            font-size: 14px;
            height: 16px;
            line-height: 16px !important;
        }

        .video-custome-badge-top-ssv13 {
            position: absolute;
            top: 0px;
            left: 0px;
            border-bottom-right-radius: 10px;
            overflow: hidden;
        }

        .video-cbt-hotdeal-ssv13 {
            margin: 0 !important;
            padding: 8px 10px !important;
            background: #F4E6BF;
            color: #FF9D33;
            font-size: 16px;
            line-height: 18px !important;
        }

        .video-cbt-hotdeal-ssv13 svg {
            height: 18px;
            width: 18px;
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: top;
            margin-right: 5px !important;
        }

        .video-cbt-bestseller-ssv13 {
            margin: 0 !important;
            padding: 8px 10px !important;
            background: #CD6113;
            color: #ffffff;
            font-size: 16px;
            line-height: 18px !important;
        }

        .video-cbt-bestseller-ssv13 svg {
            height: 18px;
            width: 18px;
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: top;
            margin-right: 5px !important;
        }

        .video-cbt-newarrival-ssv13 {
            margin: 0 !important;
            padding: 8px 10px !important;
            background: #9C150C;
            color: #ffffff;
            font-size: 16px;
            line-height: 18px !important;
        }

        .video-cbt-newarrival-ssv13 svg {
            height: 30px;
            width: 30px;
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: top;
        }

        .video-title-ssv13 {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 20px 10px 10px !important;
            margin: 0 !important;
            font-size: 16px !important;
            text-align: left !important;
            width: 100% !important;
            color: var(--ssv13FontWhite) !important;
            height: 55px !important;
            line-height: 25px !important;
            overflow: hidden !important;
            white-space: nowrap !important;
            text-overflow: ellipsis;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(2, 0, 36, 0.6138830532212884) 100%);
            z-index: 2;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        .video-bottom-product-ssv13 {
            align-items: center;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            padding: 30px 10px 10px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(2, 0, 36, 0.6138830532212884) 100%);
            z-index: 2;
        }

        .video-bp-img-block-ssv13 {
            width: 50px;
            position: relative;
        }

        .video-bp-img-ssv13 {
            width: 50px !important;
            height: 50px !important;
            object-fit: cover !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 8px !important;
            border: 2px solid #ffffff !important;
            background: #ffffff;
        }

        .video-bp-count-ssv13 {
            background: var(--ssv13BrandBg);
            color: var(--ssv13BrandFont);
            margin: 0 !important;
            padding: 0px 0 !important;
            display: block !important;
            height: 20px;
            width: 20px;
            line-height: 20px !important;
            text-align: center !important;
            font-size: 12px !important;
            border-radius: 50%;
            position: absolute;
            top: -10px;
            right: -8px;
        }

        .video-bp-detail-block-ssv13 {
            width: calc(100% - 50px);
            padding-left: 10px;
        }

        .video-bp-title-ssv13 {
            color: var(--ssv13FontWhite);
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px;
            line-height: 20px !important;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            display: block;
        }

        .video-bp-price-ssv13 {
            color: var(--ssv13FontWhite);
            font-size: 16px !important;
            margin: 0 !important;
            margin-top: 5px !important;
            height: 25px !important;
            line-height: 25px !important;
            overflow: hidden;
            font-family: cs-medium-ssv13 !important;
            padding: 0;
        }

        .video-bp-price-ssv13 strike {
            display: inline-block !important;
            font-size: 14px !important;
            margin: 0 !important;
            margin-left: 5px !important;
            vertical-align: top;            
            line-height: 25px !important;
        }

        .video-bp-off-ssv13 {
            display: inline-block !important;
            background: #0B895C;
            color: #ffffff;
            font-size: 15px;
            height: 22px !important;
            padding: 1px 6px !important;
            border-radius: 5px;
            line-height: 22px !important;
            margin: 1px 0 0 !important;
            margin-left: 5px !important;
            vertical-align: top;
        }

        /* Modal CSS */
        .video-modal-ssv13 {
            height: 100vh;
            width: 100%;            
            background: #2A2525B2;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 121100000;
            text-align: center;
            padding: 25px 0;
            transform: scaleY(0);
            transition: transform .5s;
        }

        .video-modal-close-btn-ssv13 {
            position: absolute;
            top: 0px;
            right: calc(50% - 35vw - 45px);
            height: 36px;
            width: 36px;
            margin: 0 !important;
            padding: 0 !important;
            cursor: pointer;
        }

        .video-modal-container-ssv13 {
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0 auto;
            display: inline-block;
            overflow: hidden;
        }

        .video-modal-structure-ssv13 {
            width: 70vw;
            height: 100%;
            margin: 0 auto !important;
            border-radius: 20px;
            overflow: hidden;
            display: flex !important;
            background: #454549;
        }

        /* Modal structure left */

        .video-modal-structure-left-ssv13 {
            height: 100%;
            width: 65%;
            transition: width .5s;
            position: relative;
        }

        .video-modal-sl-thumbs-block-ssv13 {
            height: 80px;
            padding: 10px;
            background: #2e2e33;
            overflow-y: hidden;
            white-space: nowrap;
            -ms-overflow-style: none;
            /* IE and Edge */
            scrollbar-width: none;
            /* Firefox */
        }

        .video-modal-sl-thumbs-block-ssv13::-webkit-scrollbar {
            display: none;
        }

        .video-modal-sl-thumb-container-ssv13 {
            display: inline-block !important;
            position: relative;
        }

        .video-modal-sl-thumb-ssv13 {
            display: inline-block !important;
            height: 60px;
            margin: 0 !important;
            margin-right: 10px !important;
            padding: 0 !important;
            border-radius: 5px;
            opacity: 0.4;
            cursor: pointer;            
        }
        
        .video-modal-sl-thumb-container-ssv13 div { 
            height: 36px;
            width: 36px;            
            position: absolute;
            top: 0;
            left: 0;
            background: #000000;
            opacity: 0.3;
            display: none;
            border-radius: 50%;
        }

        .video-modal-sl-thumb-toggler-ssv13 {
            cursor: pointer;
            position: absolute;
            top: 5px;
            left: 0;
            height: 50px;
            width: 50px;
            padding: 7px;
            background: rgb(255, 255, 255, .6);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom-right-radius: 30px;
            border-top-right-radius: 30px;
            display: none;
        }

        .video-modal-sl-thumb-toggler-ssv13 img {
            display: block !important;
            height: 36px;
            width: 36px;
            border: 2px solid #fff;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 50%;
            object-fit: cover;
        }

        .video-modal-sl-thumb-ssv13.active-ssv13 {
            opacity: 1;
            border: 2px solid #5E75B1;
            box-shadow: -1px 1px 7.2px 0px #5F76B1;
        }

        .active-ssv13 + .CSS-img-thumb-ssv13 {
            height: 32px;
            width: 32px;
            top: 2px;
            left: 2px;
        }

        .video-modal-sl-video-block-ssv13 {
            height: calc(100% - 80px);
            padding: 30px 0;
        }

        .video-modal-sl-video-container-ssv {
            width: auto;
            height: 100%;
            display: inline-block;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            border-radius: 12px;
        }

        .video-modal-sl-video-ssv13 {
            height: 100%;
            width: auto;
            display: block;
        }

        .video-modal-sl-controls-ssv13 {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: transparent;
            align-items: center;            
            display: none;
            cursor: pointer;
        }

        .video-modal-sl-video-play-ssv13 {
            width: 35px !important;
            height: 35px !important;
            display: block !important;
            margin: 0 auto !important;
            padding: 0 !important;
            cursor: pointer;
        }

        .video-modal-sl-top-controls-ssv13 {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            padding: 15px;
            text-align: right;
            background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(2, 0, 36, 0.6138830532212884) 100%);
        }

        .video-modal-sl-bottom-controls-ssv13 {
            position: absolute;
            bottom: 160px;
            right: 15px;
        }

        .no-products-slide-ssv13 .video-modal-sl-bottom-controls-ssv13 {
            bottom: 50px;
        }

        .video-modal-sl-video-control-ssv13 {
            height: 20px;
            width: 30px;
            display: inline-block !important;
            margin: 0 !important;
            margin-left: 12px !important;
            padding: 0 !important;
            cursor: pointer;
        }

        .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-video-control-ssv13 {
            display: block !important;
            margin: 0 !important;
            margin-top: 25px !important;
            height: 25px;
            width: 35px;
        }

        .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-pip-ssv13 {
            padding: 1px 0 !important;
        }

        .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-volume-ssv13 {
            padding: 0 !important;
        }

        .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-share-ssv13 {
            padding: 0 !important;
        }

        .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-cart-ssv13 {
            padding: 0 !important;
            display: none !important;
            width: 24px;
            height: 24px;
        }

        .video-modal-sl-top-controls-ssv13 .cart-count-ssv13 {
            background: #334499;
            color: #ffffff;
            margin: 0 !important;
            padding: 0 !important;
            height: 24px;
            width: 24px;
            line-height: 24px !important;
            text-align: center !important;
            font-size: 13px !important;
            border-radius: 50%;
            position: absolute;
            top: 12px;
            right: 92px;
            display: none !important;
        }

        .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-toggle-ssv13 {
            padding: 0 !important;
            display: none !important;
        }

        .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-close-ssv13 {
            padding: 0 !important;
            display: none !important;
        }

        .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-volume-ssv13 {
            padding: 0 3px !important;
            display: none !important;
            filter: drop-shadow(0px 2px 1px rgb(0 0 0 / 0.4));
        }

        .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-reviews-ssv13 {
            padding: 0 !important;
            display: none !important;
            filter: drop-shadow(0px 2px 1px rgb(0 0 0 / 0.4));
        }

        .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-reviews-count-ssv13 {
            display: none !important;
            color: #ffffff !important;
            font-size: 12px !important;
            text-align: center;
            margin: 0 3px !important;
            padding: 0 !important;
            line-height: normal !important;
            background: #F5F5F520;
            border-radius: 4px;
        }

        .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-comments-ssv13 {
            padding: 0 !important;
            display: none !important;
            filter: drop-shadow(0px 2px 1px rgb(0 0 0 / 0.4));
        }

        .video-modal-sl-progressbar-ssv13 {
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 6px;
        }

        .video-modal-sl-progressbar-ssv13 progress {
            height: 6px !important;
            border: none !important;
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
            display: block;
            -webkit-appearance: none;
        }

        .video-modal-sl-progressbar-ssv13 progress::-webkit-progress-bar {
            background-color: #BFBCBC;
        }

        .video-modal-sl-progressbar-ssv13 progress::-webkit-progress-value {
            background-color: #F2F4F7;
        }

        .video-modal-sl-progressbar-ssv13 progress::-moz-progress-bar {
            background-color: #F2F4F7;
        }

        .video-modal-share-popup-ssv13 {
            display: none;
            position: absolute;
            top: 50px;
            left: 10px;
            width: 100%;
            background: #ffffff;
            border-radius: 10px;            
            padding: 15px 8px;
            text-align: center !important;
            transform: translateY(0);
            transition: transform .5s;
            z-index: 2;
            width: calc(100% - 20px);
            color: #17171C;
        }

        .video-modal-sp-social-ssv13 {
            display: flex;
            width: 100%;            
        }

        .video-modal-sp-social-icon-ssv13 {
            flex: 1;
        }

        .video-modal-sp-social-icon-ssv13 svg {
            width: 35px;
            height: 35px;
            margin: 0 auto !important;
            padding: 0 !important;
            cursor: pointer;
        }

        .video-modal-sp-social-icon-ssv13 p {
            font-size: 10px !important;
            margin: 0 !important;
            padding: 0 !important;
            margin-top: 4px !important;
            color: #17171C;
        }

        .video-modal-sp-pip-ssv13 {
            text-align: left;
            margin: 0 !important;
            padding: 15px 0 !important;
            font-size: 16px !important;            
            cursor: pointer;
            display: none;
            border-bottom: 1px solid #D1D1D2;
        }

        .video-modal-sp-pip-ssv13 svg {
            margin: 0 !important;
            margin-right: 6px !important;
            height: 16px;
            vertical-align: top;
            margin-top: 2px !important;
            display: inline-block;
        }

        .video-modal-sp-download-ssv13 {
            text-align: left;
            margin: 0 !important;
            padding: 15px 0 !important;
            font-size: 16px !important;
            cursor: pointer;
            display: none;
            border-bottom: 1px solid #D1D1D2;
        }

        .video-modal-sp-download-ssv13 svg {
            margin: 0 !important;
            margin-right: 6px !important;
            height: 16px;
            vertical-align: top;
            margin-top: 2px !important;
        }

        .video-modal-sp-drager-ssv13 {
            position: absolute;
            top: 12px;
            display: none !important;
            width: 36px;
            height: auto;
            left: calc(50% - 18px);
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-fade-white-L-ssv13 {
            background: rgb(0, 0, 0, .5);
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 2;
        }

        .video-modal-product-slider-ssv13 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            display: none;
        }

        .video-modal-product-slider-ssv13 .swiper-slide {
            padding: 0 10px;
        }

        .video-modal-ps-card-ssv13 {
            width: 100%;
            background: rgb(255, 255, 255, 0.9);
            display: flex;
            text-align: left;
            height: 100px;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 22px;
            margin-bottom: 32px;
            cursor: pointer;
        }

        .video-modal-ps-img-ssv13 {
            width: 100px;
            height: 100px;
            position: relative;
        }

        .video-modal-ps-image-ssv13 {
            width: 100%;
            height: 100%;
            display: block !important;
            object-fit: cover;
        }

        .video-modal-ps-detail-ssv13 {
            width: calc(100% - 100px);
            height: 100px;
            padding: 20px 8px 10px;
            position: relative;
        }

        .video-modal-ps-badge-ssv13 {
            padding: 4px 2px;
            font-size: 14px;
            position: absolute;
            top: 0px;
            width: 100px;
            text-align: center;
            height: 22px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .video-modal-ps-bestseller-ssv13 {
            background: #CD6113;
            color: #ffffff;
        }

        .video-modal-ps-badge-ssv13 svg {
            margin: 0 !important;
            padding: 0 !important;
            height: 14px;
            width: 13px;
            vertical-align: top !important;            
            display: inline-block !important;
        }

        .video-modal-ps-hotdeal-ssv13 {
            background: #F4E6BF;
            color: #FF9D33;
        }

        .video-modal-ps-newarrival-ssv13 {
            background: #9C150C;
            color: #ffffff;
        }

        .video-modal-ps-ratting-ssv13 {
            float: right;
            margin: -20px -10px 0 0 !important;            
            font-size: 14px;
            display: inline-block !important;
            padding: 0px 10px !important;
            background: #FCFCE4;
            border-radius: 5px;
            color: #918888;
            line-height: 20px !important;
            height: 18px;
            overflow: hidden;            
        }        

        .video-modal-ps-ratting-ssv13 svg {
            vertical-align: top !important;
            margin-top: 3px !important;
            height: 12px;
        }

        .video-modal-ps-title-ssv13 {
            font-size: 16px;
            margin: 2px 0 2px !important;
            padding: 0 !important;
            height: 18px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .video-modal-ps-price-ssv13 {
            font-size: 18px !important;
            margin: 0 !important;
            padding: 0 !important;            
            height: 22px !important;
            line-height: 22px !important;
            overflow: hidden;
            font-family: cs-medium-ssv13 !important;
            color: #2E2E33;
        }

        .video-modal-ps-price-ssv13 strike {
            display: inline-block !important;
            font-size: 16px !important;
            margin: 0 !important;
            margin-left: 5px !important;
            vertical-align: top;        
            color: #747477;    
        }

        .video-modal-ps-off-ssv13 {
            display: inline-block !important;
            background: #0B895C;
            color: #ffffff;
            font-size: 15px;
            padding: 1px 6px !important;
            border-radius: 5px;
            height: 20px;
            line-height: 20px !important;
            margin: 0 !important;
            margin-left: 5px !important;
            vertical-align: top;            
        }

        .video-modal-ps-cta-ssv13 {
            display: flex;            
            position: absolute;
            bottom: 8px;
            left: 8px;
            width: calc(100% - 16px);
        }

        .video-modal-ps-buynow-ssv13 {
            width: calc(100% - 35px);
            height: 26px;
            background: var(--ssv13BrandBg) !important;
            color: var(--ssv13BrandFont) !important;
            border: none !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px;
            margin-right: 5px !important;
        }

        .video-modal-ps-addtocart-ssv13 {
            width: 30px;
            height: 26px;
            background: none !important;
            border: 0 !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-ps-addtocart-ssv13 svg {
            width: 30px !important;
            height: 26px !important;
            padding: 2px !important;
        }

        .video-modal-ps-addtocart-ssv13 label {
            font-size: 16px !important;
            line-height: 40px !important;
            vertical-align: top !important;
        }

        .swiper-review-ssv13 {
            padding-top: 20px !important;
        }

        .swiper-review-ssv13,
        .swiper-review-ssv13 .swiper-wrapper {
            height: 100%;
            width: 100%;
        }

        .swiper-review-ssv13 .swiper-pagination {
            top: 0px !important;
            height: 15px;
        }

        .swiper-review-ssv13 .swiper-pagination-bullet-active,
        .swiper-review-ssv13 .swiper-pagination-bullet {
            background: #2E2E33;
            height: 10px;
            width: 10px;
        }

        .video-modal-product-reviews-ssv13 {
            height: 70%;
            width: 100%;
            background: #ffffff;
            padding: 30px 15px 0;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            transform: translateY(110%);
            transition: transform .5s;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 3;
            display: none;
        }

        .video-modal-pr-drager-ssv13 {
            position: absolute;
            width: 100%;
            height: 30px;
            left: 0;
            top: 0;
        }

        .video-modal-pr-drager-ssv13 svg {
            display: block !important;
            height: 30px;
            width: 36px;
            margin: 0 auto !important;
            padding: 0 !important;
        }

        .video-modal-pr-container-ssv13 {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .video-modal-pr-top-outer-ssv13 {
            height: 90px;  
        } 

        .video-modal-pr-top-ssv13 {
            display: flex;
            width: 100%;
            height: 70px;
            text-align: left;
            margin-bottom: 20px;
        }

        .video-modal-pr-top-img-ssv13 {
            width: 50px;
            height: 70px;
            padding-top: 20px;
        }

        .video-modal-pr-top-image-ssv13 {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover;
            display: block !important;
            border-radius: 8px;
            border: solid 1px #eee;
            object-fit: cover;
        }        

        .video-modal-pr-top-detail-ssv13 {
            width: calc(100% - 50px);
            height: 70px;
            padding-left: 8px;
        }

        .video-modal-pr-top-bestseller-ssv13 {
            color: #FF730E;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 14px;
            margin-bottom: 3px !important;
        }

        .video-modal-pr-top-bestseller-ssv13 svg {
            height: 10px;
            width: 10px;
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            margin-right: 1px !important;
            vertical-align: top;
            margin-top: 2px !important;
        }

        .video-modal-pr-top-title-ssv13 {
            font-size: 15px;
            margin: 6px 0 0 !important;
            padding: 0 !important;
            height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #2E2E33;
        }

        .video-modal-pr-top-price-ssv13 {
            font-size: 15px !important;
            margin: 0 !important;
            padding: 0 !important;
            margin-top: 1px !important;
            height: 25px !important;
            line-height: 25px !important;
            overflow: hidden;
            font-family: cs-medium-ssv13 !important;
            color: #5D5D60;
            padding-right: 70px !important;
        }

        .video-modal-pr-top-price-ssv13 strike {
            display: inline-block !important;
            font-size: 14px !important;
            margin: 0 !important;
            margin-left: 3px !important;
            line-height: 25px !important;
            vertical-align: top;   
            color: #747477;         
        }

        .video-modal-pr-top-off-ssv13 {
            display: inline-block !important;
            background: #0B895C;
            color: #ffffff;
            font-size: 13px;
            padding: 1px 4px !important;
            border-radius: 5px;
            line-height: 17px !important;
            height: 18px !important;
            margin: 0 !important;
            margin-left: 3px !important;
            vertical-align: top;       
            margin-top: 1px !important;     
        }

        .video-modal-pr-top-ratting-ssv13 {
            float: right;
            margin: -23px 5px 0 0;
        }

        .video-modal-pr-top-ratting-ssv13 p {
            margin: 0 !important;
            padding: 0 !important;
            font-size: 14px;
            line-height: 15px !important;
            display: inline-block !important;
        }

        .video-modal-pr-top-ratting-ssv13 svg {
            height: 12px !important;
            width: 12px !important;
            vertical-align: top;
        }

        .video-modal-pr-bottom-outer-ssv13 {
            height: calc(100% - 90px);
            padding-top: 12px;
        }
        
        .video-modal-pr-bottom-ssv13 {
            height: 100%;
            width: calc(100% + 30px);
            overflow-y: scroll;
            text-align: left;
            margin: 0 -15px -15px -15px;
            padding: 0 15px;
        }

        /* width */
        .video-modal-pr-bottom-ssv13::-webkit-scrollbar {
            width: 4px;
            border-radius: 2px;
        }

        /* Track */
        .video-modal-pr-bottom-ssv13::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        .video-modal-pr-bottom-ssv13::-webkit-scrollbar-thumb {
            background: #c7c7c7;
        }

        .video-modal-pr-bottom-review-card-ssv13 {
            background: #F0F0F0;
            border-left: 2px solid #334499;
            padding: 8px 8px 12px;
            margin-top: 0;
            margin-bottom: 15px;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
        }

        .video-modal-pr-bottom-rc-svg-ssv13 {
            height: 18px;
            width: auto;
            margin: 0 !important;
            padding: 0 !important;
            margin-bottom: 8px !important;
            display: inline-block !important;
        }

        .video-modal-pr-bottom-rc-review-ssv13 {
            margin: 0 !important;
            padding: 0 !important;
            font-size: 15px !important;
            margin-bottom: 8px !important;
        }

        .video-modal-pr-bottom-rc-user-ssv13 {
            font-size: 16px;
            line-height: 17px;
            margin: 0 !important;
            padding: 0 !important;
            font-weight: normal !important;
            font-family: cs-bold-ssv13 !important;
            color: #454549 !important;
        }

        .video-modal-pr-bottom-rc-user-ssv13 label {
            font-size: 14px;
            color: #8B8B8E !important;
        }

        .video-modal-pr-bottom-rc-user-ssv13 svg {
            margin: 2px 3px !important;
            padding: 0 !important;
        }

        /* Modal structure right */

        .video-modal-structure-right-ssv13 {
            height: 100%;
            width: 35%;
            overflow: hidden;
            background: #ffffff;
            position: relative;
        }

        .video-modal-sr-product-block-ssv13 {
            height: 100%;
            background: var(--ssv13BgWhite);
            display: none;
        }

        .video-modal-sr-pb-header-ssv13 {
            display: flex;
            width: 100%;
            align-items: center;
            padding: 16px 15px 8px;
        }

        .video-modal-sr-pb-tabs-btn-ssv13 {
            width: calc(100% - 60px);
            text-align: left;
        }

        .video-modal-sr-pb-tabs-btn-ssv13 p {
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 17px !important;
            margin-right: 12px !important;
            cursor: pointer;
            height: 40px !important;
            line-height: 40px !important;
            color: #5D5D60;
        }

        .video-modal-sr-pb-tabs-btn-ssv13 p.active-ssv13 {
            color: #334499 !important;
            font-family: cs-medium-ssv13 !important;
        }

        .video-modal-sr-pb-cart-btn-ssv13 {
            width: 60px;
            padding: 0 10px;
            position: relative;
        }

        .video-modal-sr-pb-cart-btn-ssv13 svg {
            width: 40px !important;
            height: 40px !important;
            object-fit: cover !important;
            display: block !important;
            background: #E8E8E8;
            border-radius: 5px;
            padding: 8px;
            cursor: pointer;
        }

        .video-modal-sr-pb-cart-btn-ssv13 .cart-count-ssv13 {
            background: #334499;
            color: #ffffff;
            margin: 0 !important;
            padding: 0 0 !important;
            display: block !important;
            height: 20px;
            width: 20px;
            line-height: 20px !important;
            text-align: center !important;
            font-size: 12px !important;
            border-radius: 50%;
            position: absolute;
            top: -10px;
            right: 0px;
        }

        .video-modal-sr-pb-middle-ssv13 {
            position: relative;
            height: calc(100% - 64px);
            overflow: hidden;
            text-align: left;
        }

        .video-modal-sr-pb-product-list-ssv13 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            background: #ffffff;
        }

        /* width */
        .video-modal-sr-pb-product-list-ssv13::-webkit-scrollbar {
            width: 4px;
            border-radius: 2px;
        }

        /* Track */
        .video-modal-sr-pb-product-list-ssv13::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        .video-modal-sr-pb-product-list-ssv13::-webkit-scrollbar-thumb {
            background: #c7c7c7;
        }

        .video-modal-sr-pb-product-card-ssv13 {
            width: 100%;
            display: flex;
            padding: 20px 15px;            
            border-bottom: 2px solid #F5F5EE;
            cursor: pointer;
            height: 162px; 
        }

        .video-modal-sr-pb-product-card-ssv13:hover {
            background: #f5f5f5;
        }

        .video-modal-sr-pb-pc-img-ssv13 {
            width: 100px;
            border-radius: 8px;
            overflow: hidden;
        }

        .video-modal-sr-pb-pc-pimage-ssv13 {
            width: 100px !important;
            height: 100px !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            object-fit: cover;
            border: 2px solid #E8E8E8;
            border-radius: 8px;
        }

        .video-modal-sr-pb-pc-ratting-ssv13 {
            margin: 0 !important;
            padding: 3px 5px !important;
            font-size: 12px;
            line-height: 14px !important;
            background: #E8E8E8;
            vertical-align: top;
            text-align: center;
            color: #5D5D60;
            border-bottom-right-radius: 8px;
            border-bottom-left-radius: 8px;
        }

        .video-modal-sr-pb-pc-ratting-ssv13 svg {
            height: 13px !important;
            width: 12px !important;
            vertical-align: top;
            display: inline-block;
        }

        .video-modal-sr-pb-pc-details-ssv13 {
            width: calc(100% - 100px);
            position: relative;
            text-align: left;
            padding-left: 12px;
        }

        .video-modal-sr-pb-pc-title-ssv13 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px !important;        
            margin-top: 4px !important;    
        }

        .video-modal-sr-pb-pc-price-ssv13 {
            font-size: 20px !important;
            margin: 0 !important;
            padding: 0 !important;
            margin-top: 4px !important;
            height: 25px !important;
            line-height: 25px !important;
            overflow: hidden;
            font-family: cs-medium-ssv13 !important;
            color: #2E2E33;
        }

        .video-modal-sr-pb-pc-price-ssv13 strike {
            display: inline-block !important;
            font-size: 16px !important;
            margin: 0 !important;
            margin-left: 5px !important;
            vertical-align: top;            
            line-height: 25px !important;
            color: #747477;
        }

        .video-modal-sr-pb-pc-off-ssv13 {
            display: inline-block !important;
            background: #0B895C;
            color: #ffffff;
            font-size: 15px;
            padding: 1px 6px !important;
            border-radius: 5px;
            height: 22px;
            line-height: 22px !important;
            margin: 0 !important;
            margin-left: 5px !important;
            vertical-align: top;
        }

        .video-modal-sr-pb-pc-cta-ssv13 {
            display: flex;
            width: 100%;
            margin-top: 6px;
            position: absolute;
            width: calc(100% - 12px);
            left: 12px;
            bottom: 0;
        }

        .video-modal-sr-pb-pc-cta-buy-ssv13 {
            width: calc(100% - 50px);
            height: 40px;
            background: var(--ssv13BrandBg) !important;
            color: var(--ssv13BrandFont) !important;
            border: none !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px;
            margin-right: 10px !important;
        }

        .video-modal-sr-pb-pc-cta-cart-ssv13 {
            width: 40px;
            height: 40px;
            background: none !important;
            border: 2px solid #454549 !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pc-cta-cart-ssv13 svg {
            width: 36px;
            height: 36px;
            padding: 8px;
        }

        .video-modal-sr-pb-pc-cta-cart-ssv13 label {
            font-size: 16px !important;
            line-height: 40px !important;
            vertical-align: top !important;
        }

        .video-modal-sr-pb-pc-bedge-ssv13 {
            position: absolute;
            top: -20px;
            right: -15px;
        }

        .video-modal-sr-pb-pc-bedge-bestseller-ssv13 {
            background: #CD6113;
            height: 20px;
            border-top-left-radius: 12.5px;
            border-bottom-left-radius: 12.5px;
            margin: 0 !important;
            padding: 3px 10px !important;
            color: #ffffff;
            font-size: 14px;
        }

        .video-modal-sr-pb-pc-bedge-bestseller-ssv13 svg {
            height: 14px;
            width: 14px;
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: top;
            margin-right: 3px !important;
            margin-top: 2px !important;
        }

        .video-modal-sr-pb-pc-bedge-hotdeal-ssv13 {
            background: #F4E6BF;
            color: #FF9D33;
            height: 20px;
            border-top-left-radius: 12.5px;
            border-bottom-left-radius: 12.5px;
            margin: 0 !important;
            padding: 3px 10px !important;
            font-size: 14px;
        }

        .video-modal-sr-pb-pc-bedge-hotdeal-ssv13 svg {
            height: 14px;
            width: 14px;
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: top;
            margin-right: 1px !important;            
        }

        .video-modal-sr-pb-pc-bedge-newarrival-ssv13 {
            background: #9C150C;
            color: #ffffff;
            height: 20px;
            border-top-left-radius: 12.5px;
            border-bottom-left-radius: 12.5px;
            margin: 0 !important;
            padding: 2px 10px !important;
            font-size: 14px;
        }

        .video-modal-sr-pb-pc-bedge-newarrival-ssv13 svg {
            height: 14px;
            width: 14px;
            display: inline-block !important;
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: top;
            margin-right: 3px !important;
            margin-top: 1px !important;
        }

        .video-modal-sr-pb-product-info-ssv13 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            text-align: left;
            background: #ffffff;
            transform: translateX(110%);
            transition: transform .5s;
        }

        .video-modal-sr-pb-pi-header-ssv13 {
            width: 100%;
            padding: 0px 15px;
        }

        .video-modal-sr-pb-pi-drager-ssv13 {
            display: none;
            margin: 0 !important;
            position: absolute;
            top: 12px;
            left: calc(50% - 18px);
            width: 36px;
            height: auto;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pi-back-ssv13 {
            margin: 0 !important;
            padding: 0 !important;
            cursor: pointer;
            display: block;
            width: 50px;
            font-size: 14px !important;
            margin-bottom: 10px !important;
        }

        .video-modal-sr-pb-pi-back-ssv13 svg { 
            height: 12px;
            vertical-align: text-top;
            display: inline-block;
        }

        .video-modal-sr-pb-pi-review-btn-ssv13 {
            background: #F5F5F5;
            padding: 6px 12px;
            border-radius: 8px;
            width: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-bottom: 1px solid transparent;
        }

        .video-modal-sr-pb-pi-review-btn-ssv13.open-ssv13 {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: 1px solid #E8E8E8;
        }

        .video-modal-sr-pb-pi-review-btnL-ssv13 {
            width: calc(100% - 25px);
        }

        .video-modal-sr-pb-pi-review-title-ssv13 {
            margin: 0 !important;
            font-size: 16px;
            margin-bottom: 5px !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pi-review-count-ssv13 {
            margin: 0 !important;
            font-size: 16px;
            padding: 0 !important;
            color: #5D5D60;
        }

        .video-modal-sr-pb-pi-review-count-ssv13 svg {
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: middle;
            margin-top: -3px !important;
        }

        .video-modal-sr-pb-pi-review-btnR-ssv13 {
            width: 25px;
        }

        .video-modal-sr-pb-pi-review-btnR-ssv13 svg {
            width: 25px;
            height: 25px;
            margin: 0 !important;
            padding: 0 !important;
            cursor: pointer;
        }

        .video-modal-sr-pb-pi-middle-ssv13 {
            width: 100%;
            padding: 10px 15px 0px;
            height: calc(100% - 150px);
            overflow-y: hidden;
        }

        .video-modal-sr-pb-pi-reviews-ssv13 {
            width: 100%;
            height: calc(100% - 80px);
            max-height: 0%;
            padding: 0px 15px;
            overflow-y: scroll;
            background: #F5F5F5;
            transition: max-height .5s;
            margin-top: -10px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            margin-bottom: 10px !important;
        }

        .video-modal-sr-pb-pi-pdetails-ssv13 {
            width: 100%;
            height: 100%;
            margin: 10px 0px;
            overflow-y: scroll;
        }

        /* width */
        .video-modal-sr-pb-pi-reviews-ssv13::-webkit-scrollbar,
        .video-modal-sr-pb-pi-pdetails-ssv13::-webkit-scrollbar {
            width: 4px;
            border-radius: 2px;
        }

        /* Track */
        .video-modal-sr-pb-pi-reviews-ssv13::-webkit-scrollbar-track,
        .video-modal-sr-pb-pi-pdetails-ssv13::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        .video-modal-sr-pb-pi-reviews-ssv13::-webkit-scrollbar-thumb,
        .video-modal-sr-pb-pi-pdetails-ssv13::-webkit-scrollbar-thumb {
            background: #F5F5F5;
        }

        .video-modal-sr-pb-pi-pimage-ssv13 {
            height: 200px;
            width: 100%;
            margin-bottom: 15px;
        }

        .video-modal-sr-pb-pi-pimg-ssv13 {
            display: block !important;
            margin: 0 auto !important;
            padding: 0 !important;
            width: 200px !important;
            height: 200px !important;
            object-fit: cover;
            border-radius: 5px;
        }

        .video-modal-sr-pb-pi-bestseller-ssv13 {
            color: #FF730E;
            font-size: 14px;
            margin: 0 !important;
            padding: 0 !important;
            margin-bottom: 8px !important;
        }

        .video-modal-sr-pb-pi-bestseller-ssv13 svg {
            height: 12px;
            width: 12px;
            margin: 0 !important;
            margin-right: 3px !important;
            padding: 0 !important;            
        }

        .video-modal-sr-pb-pi-hotdeal-ssv13 {
            color: #FF730E;
            font-size: 14px;
            margin: 0 !important;
            padding: 0 !important;
            margin-bottom: 8px !important;
        }

        .video-modal-sr-pb-pi-hotdeal-ssv13 svg {
            height: 13px;
            width: 13px;
            margin: 0 !important;
            margin-right: 1px !important;
            padding: 0 !important;
            vertical-align: top;
        }

        .video-modal-sr-pb-pi-newarrival-ssv13 {
            color: #9C150C;
            font-size: 14px;
            margin: 0 !important;
            padding: 0 !important;
            margin-bottom: 8px !important;
        }

        .video-modal-sr-pb-pi-newarrival-ssv13 svg {
            height: 14px;
            width: 14px;
            margin: 0 !important;
            margin-right: 3px !important;
            padding: 0 !important;
            vertical-align: top;
        }

        .video-modal-sr-pb-pi-ptitle-ssv13 {
            font-size: 20px !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 22px !important;
            margin-bottom: 8px !important;
            font-weight: normal !important;
            color: #454549 !important;
        }

        .video-modal-sr-pb-pi-pprice-ssv13 {
            font-size: 22px !important;
            margin: 0 !important;
            margin-bottom: 10px !important;
            height: 25px !important;
            line-height: 25px !important;
            overflow: hidden;
            font-family: cs-medium-ssv13 !important;
            color: #2E2E33;
        }

        .video-modal-sr-pb-pi-pprice-ssv13 strike {
            display: inline-block !important;
            font-size: 18px !important;
            margin: 0 !important;
            margin-left: 5px !important;
            color: #747477;
            vertical-align: top;
        }

        .video-modal-sr-pb-pi-off-ssv13 {
            display: inline-block !important;
            background: #0B895C;
            color: #ffffff;
            font-size: 15px;
            height: 22px !important;
            padding: 1px 6px !important;
            border-radius: 5px;            
            line-height: 22px !important;
            margin: 0 !important;
            margin-left: 5px !important;
            vertical-align: top;
        }

        .video-modal-sr-pb-pi-attrtitle-ssv13 {
            font-size: 17px;
            margin: 0 !important;
            padding: 0 !important;
            margin-bottom: 2px !important;
            margin-top: 20px !important;
            font-weight: normal;
            font-family: cs-bold-ssv13 !important;
            color: #17171C !important;
        }

        .video-modal-sr-pb-pi-attrvalue-ssv13 {
            font-size: 16x;
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pi-attrselection-ssv13 {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
        }

        .video-modal-sr-pb-pi-attrselection-ssv13 p {
            margin: 0 !important;
            padding: 5px 6px !important;
            font-size: 16px;
            border: 1px solid #B9B9BB;
            margin-right: 5px !important;
            border-radius: 5px;
            margin-top: 8px !important;
            cursor: pointer;
        }

        .video-modal-sr-pb-pi-attrselection-ssv13 p.selected-ssv13 {
            background: #B9B9BB;
        }

        .video-modal-sr-pb-pi-attrselection-ssv13 p.disabled-ssv13 {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .video-modal-sr-pb-pi-qty-ssv13 {
            display: flex;
            align-items: center;
            margin-top: 12px;
        }

        .video-modal-sr-pb-pi-qty-ssv13 .qty-minus-ssv13 {
            background: none !important;
            border: 2px solid #8B8B8E;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            font-size: 16px;
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pi-qty-ssv13 .qty-minus-ssv13 svg {
            height: 26px;
            width: 26px;
            margin: 0 !important;
            padding: 8px !important;
        }

        .video-modal-sr-pb-pi-qty-ssv13 .qty-plus-ssv13 {
            background: none !important;
            border: 2px solid #8B8B8E;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            font-size: 16px;
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pi-qty-ssv13 .qty-plus-ssv13 svg {
            height: 26px;
            width: 26px;
            margin: 0 !important;
            padding: 6px !important;
        }

        .video-modal-sr-pb-pi-qty-ssv13 .qty-minus-ssv13:disabled,
        .video-modal-sr-pb-pi-qty-ssv13 .qty-minus-ssv13[disabled],
        .video-modal-sr-pb-pi-qty-ssv13 .qty-plus-ssv13:disabled,
        .video-modal-sr-pb-pi-qty-ssv13 .qty-plus-ssv13[disabled] {
            opacity: 0.5;
            cursor: not-allowed !important;
        }

        .video-modal-sr-pb-pi-qty-ssv13 .qty-val-ssv13 {
            background: none !important;
            border: none !important;
            height: 30px;
            width: 40px;
            font-size: 16px;
            text-align: center !important;
            padding: 0 !important;
            margin: 0 !important;
            outline: none;
        }

        .video-modal-sr-pb-pi-pdesc-ssv13 {
            font-size: 16px !important;
            margin: 0 0 15px !important;
            font-weight: normal !important;
            margin-bottom: 12px !important;
        }

        .video-modal-sr-pb-pi-pdesc-ssv13 * {
            font-size: 16px !important;
            font-weight: normal !important;
            background: none !important;
            border: none !important;
            height: auto !important;
            color: #454549 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pi-pdesc-ssv13 ul {
            padding-left: 15px !important;
        }

        .video-modal-sr-pb-pi-pdesc-ssv13 li {
            list-style: disc !important;
            padding: 5px 0 !important;
        }

        .video-modal-sr-pb-pi-pdesc-ssv13 h3 {
            margin-top: 12px !important;
        }

        .video-modal-sr-pb-pi-pclosed-ssv13 {            
            width: calc(100% + 30px);
            height: 80px;
            padding: 8px 15px;
            align-items: center;
            background: #F5F5F5;
            margin: 0 -15px;
            border-top: 1px solid #E8E8E8;
            display: none;
            cursor: pointer;
        }

        .video-modal-sr-pb-pic-pimg-ssv13 {
            width: 60px;
            height: 60px;
        }

        .video-modal-sr-pb-pic-pimg-ssv13 img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }

        .video-modal-sr-pb-pic-title-ssv13 {
            width: calc(100% - 85px);
            padding: 0 10px;
        }

        .video-modal-sr-pb-pic-title-ssv13 p {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px !important;            
        }

        .video-modal-sr-pb-pic-btn-ssv13 {
            width: 25px;
        }

        .video-modal-sr-pb-pic-btn-ssv13 svg {
            width: 25px;
            height: 25px;
            margin: 0 !important;
            padding: 0 !important;
            cursor: pointer;
        }

        .video-modal-sr-pb-pi-review-card-ssv13 {
            background: #F0F0F0;
            border-left: 2px solid #334499;
            padding: 8px 8px 12px;
            margin-top: 15px;
            margin-bottom: 10px;
        }

        .video-modal-sr-pb-pi-rc-svg-ssv13 {
            height: 16px;
            width: auto;
            margin: 0 !important;
            padding: 0 !important;
            margin-bottom: 8px !important;
            display: inline-block !important;
        }

        .video-modal-sr-pb-pi-rc-review-ssv13 {
            margin: 0 !important;
            padding: 0 !important;
            font-size: 15px !important;
            margin-bottom: 8px !important;
        }

        .video-modal-sr-pb-pi-rc-user-ssv13 {
            font-size: 16px;
            line-height: 17px;
            margin: 0 !important;
            padding: 0 !important;
            font-weight: normal;
            font-family: cs-bold-ssv13 !important;
            color: #2E2E33 !important; 
        }

        .video-modal-sr-pb-pi-rc-user-ssv13 label {
            font-size: 14px;
            color: #8B8B8E !important;
        }

        .video-modal-sr-pb-pi-rc-user-ssv13 svg {
            margin: 2px 3px !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-comments-ssv13 {
            padding: 0;
            height: calc(100% - 70px);
            overflow-y: scroll;
        }

        .video-modal-sr-pb-cc-drager-ssv13 {
            width: 100%;
            height: 30px;
            position: fixed;
            top: 0;
            left: 0;
            background: #ffffff;
            z-index: 1;
            display: none;
        }

        .video-modal-sr-pb-cc-drager-ssv13 svg {
            width: 36px;
            height: 30px;
            display: block !important;
            margin: 0 auto !important;
            padding: 0 !important;
        }

        /* width */
        .video-modal-sr-pb-comments-ssv13::-webkit-scrollbar {
            width: 4px;
            border-radius: 2px;
        }

        /* Track */
        .video-modal-sr-pb-comments-ssv13::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        .video-modal-sr-pb-comments-ssv13::-webkit-scrollbar-thumb {
            background: #F5F5F5;
        }

        .video-modal-sr-pb-cc-title-ssv13 {
            padding: 0 0 10px;
            height: 35px;
            position: fixed;
            width: 100%;
            background: #ffffff;
            top: 30px;
            left: 0;
            z-index: 1;
            display: none;
        }

        .video-modal-sr-pb-cc-title-ssv13 p {
            padding: 0 !important;
            margin: 0 !important;
            color: #454549;
            text-align: center;
            font-size: 18px;
        }

        .video-modal-sr-pb-comment-form-ssv13 {
            display: flex;
            width: 100%;
            padding: 15px;
            align-items: center;
        }

        .video-modal-sr-pb-cf-input-ssv13 {
            width: calc(100% - 30px);
            padding-right: 8px;
        }

        .video-modal-sr-pb-cf-input-ssv13 input {
            background: #F7F7F7;
            border: none;
            height: 40px;
            padding: 5px 20px;
            border-radius: 20px;
            outline: none;
            width: 100%;
            position: relative;        
        }

        .video-modal-sr-pb-cf-input-ssv13 input::placeholder {
            color: #8B8B8E !important;
            padding-left: 26px;    
            background-image: url("data:image/svg+xml,%3Csvg width='19' height='16' viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.99981 10.1408V10.0912C7.99981 8.08476 9.61261 6.39676 11.8022 5.90476C11.511 4.06316 9.56701 2.55996 7.1198 2.55996C4.4638 2.55996 2.3998 4.33036 2.3998 6.38396C2.3998 7.15916 2.6878 7.90396 3.2318 8.54236C3.2574 8.57276 3.2982 8.61756 3.3534 8.67436C3.82373 9.15772 4.10771 9.792 4.155 10.4648C4.72628 10.1345 5.39338 10.0097 6.04541 10.1112C6.17821 10.132 6.287 10.148 6.36941 10.1592C6.91107 10.2295 7.45995 10.2231 7.99981 10.14V10.1408ZM8.36541 11.7016C7.63763 11.8265 6.8952 11.8414 6.16301 11.7456C6.04173 11.7292 5.92065 11.7113 5.79981 11.692C5.50083 11.6454 5.19499 11.7054 4.93581 11.8616L3.4126 12.78C3.2953 12.8522 3.15792 12.885 3.0206 12.8736C2.93756 12.8673 2.85657 12.8447 2.78227 12.8071C2.70798 12.7694 2.64185 12.7175 2.58767 12.6542C2.53348 12.591 2.49232 12.5177 2.46654 12.4385C2.44075 12.3593 2.43085 12.2758 2.4374 12.1928L2.5574 10.768C2.57236 10.5892 2.54874 10.4094 2.48815 10.2406C2.42756 10.0718 2.33141 9.91797 2.2062 9.78956C2.13971 9.72178 2.07541 9.65188 2.0134 9.57996C1.2502 8.68396 0.799805 7.57836 0.799805 6.38316C0.799805 3.38796 3.6294 0.959961 7.1198 0.959961C10.3678 0.959961 13.0422 3.06156 13.3998 5.76636C16.0974 5.88876 18.2398 7.77836 18.2398 10.0912C18.2398 11.0456 17.875 11.928 17.2566 12.6432C17.2158 12.6912 17.1638 12.7472 17.1006 12.8112C16.9995 12.913 16.9217 13.0355 16.8725 13.1703C16.8233 13.3051 16.804 13.449 16.8158 13.592L16.9126 14.7304C16.9175 14.7971 16.9092 14.8642 16.8881 14.9277C16.867 14.9912 16.8335 15.0499 16.7897 15.1005C16.7458 15.151 16.6924 15.1924 16.6325 15.2222C16.5726 15.2521 16.5074 15.2698 16.4406 15.2744C16.3295 15.2835 16.2183 15.2571 16.123 15.1992L14.8886 14.4656C14.6782 14.341 14.4311 14.2932 14.1894 14.3304C14.0718 14.3488 13.9734 14.3624 13.895 14.3728C13.6422 14.4048 13.383 14.4224 13.1198 14.4224C10.9646 14.4224 9.12141 13.296 8.36541 11.7016ZM13.947 12.7496C14.3985 12.6801 14.8602 12.728 15.2878 12.8888C15.4 12.435 15.6324 12.0199 15.9606 11.6872C16.0006 11.6472 16.0302 11.6152 16.0454 11.5976C16.4366 11.1456 16.6398 10.6272 16.6398 10.0912C16.6398 8.64796 15.1174 7.35996 13.1198 7.35996C11.1222 7.35996 9.59981 8.64796 9.59981 10.0912C9.59981 11.5344 11.1222 12.8224 13.1198 12.8224C13.3126 12.8224 13.5038 12.8096 13.691 12.7856C13.755 12.7776 13.8414 12.7656 13.947 12.7488V12.7496Z' fill='%238B8B8E'/%3E%3C/svg%3E%0A");
            background-repeat: no-repeat;
            background-position: left;
            background-size: 20px 20px;            
        }

        .video-modal-sr-pb-cf-btn-ssv13 {
            width: 30px;
        }

        .video-modal-sr-pb-cf-btn-ssv13 button {
            background: none;
            outline: none;
            border: none;
            margin: 0;
            padding: 0;
        }

        .video-modal-sr-pb-cf-btn-ssv13 svg {
            width: 30px;
            height: 25px;
        }

        .video-modal-sr-pb-comment-card-ssv13 {
            position: relative;
            display: flex;
            width: 100%;
            padding: 12px 15px;
        }

        .video-modal-sr-pb-comment-card-ssv13.pinned-ssv13 {
            background: #F3F4F8;
        }

        .video-modal-sr-pb-pin-card-ssv13 {
            background: #F3F4F8;
            padding: 12px 15px;
            display: none;
            position: sticky;
            top: 0;
            z-index: 1;
            cursor: pointer;
        }

        .video-modal-sr-pb-pin-card-ssv13 p {
            font-size: 16px;
            color: #334499;
            margin: 0 !important;
            line-height: 16px !important;
            padding: 0 !important;
            overflow: hidden;
        }

        .video-modal-sr-pb-pin-card-ssv13 label {
            height: 16px;
            min-width: 16px;
            font-size: 10px;
            line-height: 16px;
            background: #334499;
            color: #ffffff;
            margin: 0 !important;
            padding: 0 !important;
            margin-left: 5px !important;
            border-radius: 8px;
            display: inline-block;
            vertical-align: text-bottom;
            text-align: center;
            padding: 0 !important;
        }

        .video-modal-sr-pb-pin-card-ssv13 svg {
            height: 16px;
            width: 16px;
            margin: 0 !important;
            padding: 0 !important;
            float: right;
            display: inline-block;
        }

        .video-modal-sr-pb-cc-profile-ssv13 {
            width: 30px;
        }

        .video-modal-sr-pb-cc-profile-ssv13 svg {
            width: 30px;
            height: 30px;
            margin: 0 !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-cc-profile-ssv13 img {
            width: 30px;
            height: 30px;
            margin: 0 !important;
            padding: 0 !important;
            display: block;
            border-radius: 50%;
            object-fit: cover !important;
        }

        .video-modal-sr-pb-cc-content-ssv13 {
            width: calc(100% - 30px);
            padding-left: 8px;
        }

        .video-modal-sr-pb-cc-user-ssv13 {
            font-size: 16px;
            line-height: 17px;
            margin: 0 !important;
            padding: 0 !important;
            margin-top: 5px !important;
            font-weight: normal !important;
            font-family: cs-bold-ssv13 !important;
            color: #454549 !important; 
        }

        .video-modal-sr-pb-cc-user-ssv13 label {
            font-size: 14px;
            color: #8B8B8E !important;
        }

        .video-modal-sr-pb-cc-user-ssv13 svg {
            margin: 2px 3px !important;
            padding: 0 !important;
        }

        .video-modal-sr-pb-cc-comment-ssv13 {
            font-size: 16px;
            margin: 0 !important;
            padding: 0 !important;
            margin-top: 4px !important;
            word-break: break-word;
        }

        .video-modal-sr-pb-cc-pin-ssv13 {
            position: absolute;
            top: 20px;
            right: 15px;
            width: 15px;
            height: 15px;
            margin: 0 !important;
            padding: 0 !important;
            display: none;
        }

        .pinned-ssv13 .video-modal-sr-pb-cc-pin-ssv13 {
            display: block;
        }

        .video-modal-sr-pb-pi-footer-ssv13 {
            display: flex;
            width: 100%;
            padding: 10px 15px;
        }

        .video-modal-sr-pb-pi-cta-buy-ssv13 {
            width: calc(50% - 8px);
            height: 40px;
            background: var(--ssv13BrandBg) !important;
            color: var(--ssv13BrandFont) !important;
            border: none !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px;
            margin-left: 8px !important;
        }

        .video-modal-sr-pb-pi-cta-cart-ssv13 {
            width: calc(50% - 8px);
            height: 40px;
            background: none !important;
            border: 2px solid var(--ssv13BrandBg) !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px;
            margin-right: 8px !important;
        }

        .video-modal-sr-pb-pi-cta-cart-ssv13 svg {
            width: 25px;
            height: 20px;
            vertical-align: bottom;
            margin: 0 !important;
            padding: 0 !important;
            display: inline-block;
        }

        .video-modal-fade-white-R-ssv13 {
            background: rgb(255, 255, 255, .7);
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 2;
        }

        .user-verification-form-ssv13 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #ffffff;
            padding: 15px;
            transform: translateY(110%);
            transition: transform .5s;
            z-index: 2;
        }

        .uvf-close-btn-ssv13 {
            display: block !important;
            float: right !important;
            cursor: pointer;
            height: 25px;
            width: 25px;
            margin: 0 !important;
            padding: 5px !important;
            margin-top: -10px !important;
            margin-right: -5px !important;
        }

        .uvf-input-ssv13 {
            outline: none !important;
            border: none !important;
            background: #F5F5F5;
            padding: 10px 20px !important;
            width: 100%;
            border-radius: 20px;
            height: 40px;
            margin: 10px 0 10px !important;
        }

        .uvf-phone-country-ssv13 {
            display: flex;
            width: 100%;
            position: relative;
        }

        .uvf-phone-ssv13 {
            width: calc(100% - 60px);
        }

        .uvf-input-fname-ssv13 {
            outline: none;
        }

        .uvf-input-phone-ssv13 {
            margin: 0 !important;
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
        }

        .uvf-submit-ssv13 {
            background: none !important;
            outline: none !important;
            border: none !important;
            padding: 10px !important;
            margin: 0 !important;
            width: 100%;
            font-size: 15px !important;
            margin-top: 10px !important;
        }

        .uvf-submit-ssv13 svg {
            margin: 0 !important;
            padding: 0 !important;
            margin-left: 5px !important;
            display: inline-block !important;
            height: 13px !important;
            width: auto !important;
        }

        /* Country Dropdown */
        .uvf-country-ssv13 {
            width: 60px;
        }

        .uvf-country-ssv13 .country-selected-ssv13 {
            position: relative;
            padding: 10px 8px;
            width: 60px;
            height: 40px;
            border: none;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            border-right: 1px solid#E8E8E8;
            background: #F5F5F5;
            cursor: pointer;
        }

        .uvf-country-ssv13 .country-selected-ssv13 svg {
            height: 10px;
            width: 15px;
            display: inline-block;
            margin: 0 !important;
            padding: 0 !important;
        }

        .uvf-country-ssv13 .country-drop-ssv13 {
            display: none;
            position: absolute;
            top: -225px;
            left: 0;
            width: 100%;
            height: 225px;
            border: 1px solid #cfcfcf;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            overflow-y: scroll;
            z-index: 1;
            text-align: left;
            padding: 10px;
        }

        .uvf-country-ssv13 .country-drop-ssv13 ul {
            list-style: none;
            padding: 0 !important;
            margin: 0 !important;
        }

        .uvf-country-ssv13 .country-drop-ssv13 li {
            padding: 0 20px;
            line-height: 34px;
            font-size: 13px;
            font-weight: 400;
            color: #828282;
            cursor: pointer;
            list-style: none;
            padding: 0 !important;
        }

        .uvf-country-ssv13 .country-drop-ssv13 li.open-ssv13 {
            display: block;
        }

        .uvf-country-flag-icon {
            box-sizing: border-box;
            display: inline-block;
            margin-right: 10px;
            width: 16px;
            height: 11px;
            background-image: url('https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/country-flags.png');
            background-repeat: no-repeat;
            color: #e3e5e7;
        }

        .uvf-country-flag-icon.uvf-cfi-in {
            background-position: -128px -66px
        }

        .uvf-country-flag-icon.uvf-cfi-ae {
            background-position: -32px 0;
        }

        .uvf-country-flag-icon.uvf-cfi-us {
            background-position: -144px -154px
        }

        .uvf-country-flag-icon.uvf-cfi-pk {
            background-position: -16px -121px
        }

        .uvf-country-flag-icon.uvf-cfi-gb {
            background-position: -176px -44px
        }

        .uvf-country-flag-icon.uvf-cfi-qa {
            background-position: -160px -121px
        }

        .uvf-country-flag-icon.uvf-cfi-sa {
            background-position: 0 -132px
        }

        .uvf-country-flag-icon.uvf-cfi-kw {
            background-position: -176px -77px
        }

        .uvf-country-flag-icon.uvf-cfi-om {
            background-position: -176px -110px
        }

        .uvf-country-flag-icon.uvf-cfi-ye {
            background-position: -96px -165px
        }

        .uvf-country-ssv13 .country-selected-ssv13 i {
            margin-right: 5px;
        }

        .video-modal-cart-popup-ssv13 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #ffffff;
            padding: 15px;
            transform: translateY(110%);
            transition: transform .5s;
            z-index: 2;
        }

        .cart-popup-btn-close-ssv13 {
            display: block !important;
            float: right !important;
            cursor: pointer;
            height: 25px;
            width: 25px;
            margin: 0 !important;
            padding: 5px !important;
            margin-top: -10px !important;
            margin-right: -5px !important;
        }

        .cart-popup-msg-ssv13 {
            color: #454549;
            font-size: 18px;
            margin: 15px 0 20px;
            padding: 0;
            line-height: normal;
            text-align: center;
        }

        .cart-popup-flex-ssv13 {
            display: flex;
            width: 100%;
        }

        .cart-popup-btn-viewcart-ssv13 {            
            width: calc(50% - 8px);
            height: 40px;
            background: none !important;
            border: 2px solid #454549 !important;
            color: #454549 !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 14px;
            margin-right: 8px !important;
        }

        .cart-popup-btn-continue-ssv13 {
            width: calc(50% - 8px);
            height: 40px;
            background: var(--ssv13BrandBg) !important;
            color: var(--ssv13BrandFont) !important;
            border: none !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 14px;
            margin-left: 8px !important;
        }

        .swiper-product-ssv13 .swiper-pagination-bullet-active,
        .swiper-product-ssv13 .swiper-pagination-bullet {
            background: #ffffff;
            height: 12px;
            width: 12px;
        }

        .video-modal-alert-L-ssv13 {
            display: none;
            position: absolute;
            left: 30px;
            top: 50%;
            width: calc(100% - 60px) !important;
            text-align: center;
            color: var(--ssv13BrandBg) !important;
            background: var(--ssv13BrandFont) !important;
            padding: 10px 15px 8px;
            border-radius: 5px;
            margin: 0 !important;
            -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            z-index: 3;
            font-size: 15px;
            font-family: cs-book-ssv13 !important;
        }

        .video-modal-alert-P-ssv13 {
            display: none;
            position: absolute;
            left: 30px;
            top: 50%;
            width: calc(100% - 60px) !important;
            text-align: center;
            color: var(--ssv13BrandBg) !important;
            background: var(--ssv13BrandFont) !important;
            padding: 10px 15px 8px;
            border-radius: 5px;
            margin: 0 !important;
            -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            z-index: 3;
            font-size: 15px;
            font-family: cs-book-ssv13 !important;
        }

        .video-modal-alert-R-ssv13 {
            display: none;
            position: absolute;
            left: 30px;
            top: 50%;
            width: calc(100% - 60px) !important;
            text-align: center;
            color: var(--ssv13BrandBg) !important;
            background: var(--ssv13BrandFont) !important;
            padding: 10px 15px 8px;
            border-radius: 5px;
            margin: 0 !important;
            -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            z-index: 3;
            font-size: 15px;
            font-family: cs-book-ssv13 !important;
        }

        .video-modal-sp-sms-ssv13 {
            display: none;
        }

        .swirl-short-video-pip-ssv13 {
            position: fixed;
            height: 300px;
            width: auto;
            border-radius: 10px;
            background: #ffffff;
            overflow: hidden;
            bottom: 100px;
            right: 20px;
            z-index: 12112503;            
            transform: scaleY(0);
            transition: transform .5s;
        }

        .swirl-short-video-pip-ssv13 * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .ssv-pip-video-ssv13 {
            height: 100%;
            width: auto;
            display: block;
            margin: 0;
            padding: 0;
        }

        .ssv-pip-close-ssv13 {
            position: absolute;
            height: 30px;
            width: 30px;
            top: 10px;
            right: 10px;
            cursor: pointer;
            margin: 0;
            padding: 0;
        }

        .ssv-pip-volume-ssv13 {
            position: absolute;
            height: 30px;
            width: 30px;
            top: 10px;
            right: 50px;
            cursor: pointer;
            margin: 0;
            background: rgb(46, 46, 51, .6);
            border-radius: 50%;
            padding: 7px;
            display: block;
        }
        
        .ssv-pip-fullscreen-ssv13 {
            height: 15px;
            width: 25px;
            display: block;
            position: absolute;
            bottom: 10px;
            left: 10px;
            border: 2px solid #ffffff;
            cursor: pointer;
        }

        .no-product-ssv13 .video-modal-structure-right-ssv13 {
            display: none;
        }

        .no-product-ssv13 .video-modal-structure-left-ssv13 {
            width: 100%;
        }

        @keyframes marqueessv13 {
            100% {
                transform: translateX(-100%);
            }
        }
        
        .video-model-marquee-ssv13 {
            width: 100%;
            position: absolute;
            bottom: 6px;
            left: 0;
            padding: 5px 15px;
            white-space: nowrap;
            overflow: hidden;
            display: none;
            background: rgb(0, 0, 0, .5) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 2;
        }
        
        .video-model-marquee-ssv13 span {
            min-width: 100% !important;
            display: inline-block !important;
            animation: marqueessv13 10s linear forwards;
            animation-duration: 4s;
            color: #fff !important;
            margin: 0 !important;
            padding: 0px !important;
            font-size: 15px !important;
            line-height: 20px !important;
        }

        .video-cta-redi-button-ssv13 {
            height: 40px;
            background: var(--ssv13BrandBg) !important;
            color: var(--ssv13BrandFont) !important;
            border: none !important;
            border-radius: 5px;
            outline: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px;
            margin-right: 10px !important;
            position: absolute;
            bottom: 40px;
            left: 10px;
            width: calc(100% - 20px);
        }

        .video-modal-sl-bottom-controls-ssv13.video-CTA-on {
            bottom: 110px;
        }

        .break-words-ssv13 {
            line-break: anywhere;
            color: #3F51B5 !important;
        }

        .CSS-review-toogler-D-ssv13 {
            display: block !important;
        }

        .CSS-review-toogler-P-ssv13 {
            display: none !important;
            width: 18px !important;
            height: 18px !important;
        }

        .carousel-video-ssv13.JS-cvideo-L-ssv13,
        .video-modal-sl-video-ssv13.JS-mvideo-L-ssv13 {
            object-fit: contain;
            background: var(--ssv13BrandFont);
        }

        /* Responsive */
        @media only screen and (max-width: 1440px) {
            .video-modal-structure-ssv13 {
                width: 76vw;
            }

            .video-modal-close-btn-ssv13 {
                position: absolute;
                top: 0px;
                right: calc(50% - 38vw - 45px);
            }
        }

        @media only screen and (max-width: 1365px) {
            .video-modal-structure-ssv13 {
                width: 80vw;
            }

            .video-modal-close-btn-ssv13 {
                position: absolute;
                top: 0px;
                right: calc(50% - 40vw - 45px);
            }
        }

        @media only screen and (max-width: 1079px) {
            .video-modal-structure-ssv13 {
                width: 90vw;
            }

            .video-modal-close-btn-ssv13 {
                position: absolute;
                top: 0px;
                right: calc(50% - 45vw - 45px);
            }
        }

        @media only screen and (max-width: 768px) {
            .video-modal-ssv13 {
                padding: 0;
            }

            .video-modal-close-btn-ssv13 {
                display: none;
            }

            .video-modal-structure-ssv13 {
                width: 100%;
                border-radius: 0;
                position: relative;
                display: block !important;
            }

            .video-modal-structure-left-ssv13 {
                width: 100%;
                position: relative;
            }

            .video-modal-structure-right-ssv13 {
                width: 100%;
                height: 70%;
                transform: translateY(110%);
                z-index: 3;
                transition: transform .5s;
                position: absolute;
                bottom: 0;
                left: 0;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }

            .video-modal-sl-thumbs-block-ssv13 {
                position: absolute;
                top: 5px;
                left: 0;
                width: auto;
                width: max-content;
                z-index: 2;
                background: rgb(255, 255, 255, .6);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                padding: 7px 7px 0;
                height: 50px;
                text-align: left;
                transform: translateX(-100%);
                transition: transform .5s;
                overflow-y: visible;
            }

            .video-modal-sl-thumb-container-ssv13 div {
                display: block;
            }

            .video-modal-sl-thumb-ssv13 {
                height: 36px;
                width: 36px;
                border-radius: 50%;
                object-fit: cover;
                opacity: 1;
            }

            .video-modal-sl-thumb-ssv13.active-ssv13 {
                box-shadow: none;
                border: 2px solid #ffffff;
            }

            .video-modal-sl-thumb-toggler-ssv13 {
                display: block;
            }

            .video-modal-sl-video-block-ssv13 {
                height: 100%;
                width: 100%;
                padding: 0;
            }

            .swiper-ssv13-m {
                width: 100%;
                height: 100%;
            }

            .swiper-ssv13-m .swiper-slide {
                width: 100%;
                height: 100%;
            }

            .video-modal-sl-video-container-ssv {
                width: 100%;
                height: 100%;
                border-radius: 0;
            }

            .video-modal-sl-video-ssv13 {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .video-modal-sl-progressbar-ssv13 {
                top: -1px;
            }

            .swiper-ssv13-m .swiper-button-next-ssv13-m,
            .swiper-ssv13-m .swiper-button-prev-ssv13-m {
                display: none;
            }

            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-share-ssv13,
            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-volume-ssv13,
            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-pip-ssv13 {
                display: none !important;
            }

            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-close-ssv13,
            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-toggle-ssv13,
            .video-modal-sl-top-controls-ssv13 .video-modal-sl-vc-cart-ssv13,
            .video-modal-sl-top-controls-ssv13 .cart-count-ssv13 {
                display: inline-block !important;
            }

            .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-comments-ssv13,
            .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-volume-ssv13,
            .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-reviews-ssv13,
            .video-modal-sl-bottom-controls-ssv13 .video-modal-sl-vc-reviews-count-ssv13 {
                display: block !important;
            }

            .video-modal-sp-pip-ssv13,
            .video-modal-sp-download-ssv13 {
                display: block;
            }

            .video-modal-sl-top-controls-ssv13 {
                padding-top: 28px;
            }

            .swiper-ssv13-m .swiper-slide-m:not(.swiper-slide-fully-visible) {
                opacity: 1;
            }

            .video-modal-product-slider-ssv13 {
                display: block;
            }

            .video-modal-sr-pb-header-ssv13 {
                display: none;
            }

            .video-modal-sr-pb-middle-ssv13 {
                height: 100%;
            }

            .video-modal-sr-pb-product-info-ssv13 {
                transform: none;
                display: none;
            }

            .video-modal-sr-pb-product-list-ssv13 {
                display: none;
            }

            .video-modal-sr-pb-pi-back-ssv13 {
                display: none;
            }

            .video-modal-sr-pb-pi-header-ssv13 {
                padding: 30px 15px 0px;
            }

            .video-modal-sr-pb-pi-drager-ssv13 {
                display: block;
            }

            .video-modal-sr-pb-pi-middle-ssv13 {
                height: calc(100% - 165px);
            }

            .video-modal-sr-pb-comments-ssv13 {
                padding-top: 65px;
            }

            .video-modal-sr-pb-cc-drager-ssv13 {
                display: block;
            }

            .video-modal-sr-pb-cc-title-ssv13 {
                display: block;
            }

            .video-modal-product-reviews-ssv13 {
                display: block;
            }            

            .video-modal-sp-sms-ssv13 {
                display: block;
            }

            .video-modal-sr-pb-comment-card-ssv13 {                
                padding: 8px;
            }

            .video-modal-sr-pb-cc-comment-ssv13 {
                margin-top: 4px !important;
            }

            .video-modal-sp-drager-ssv13 {                
                display: block !important;                
            }

            .video-modal-share-popup-ssv13 {       
                display: block;         
                padding: 40px 8px 30px;
                border-radius: 0;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;         
                transform: translateY(110%);
                width: 100%;
                left: 0;
                bottom: 0;
                top: auto;
            }

            .video-modal-sp-social-ssv13 {
                padding-top: 20px;
            }

            .video-modal-sr-pb-pi-review-btn-ssv13 {                
                background: #ffffff;
                padding: 6px 15px;                
                width: calc(100% + 30px);                
                margin: 0 -15px;
                border-bottom: 1px solid #D1D1D2;
                border-radius: 0;                
            }

            .CSS-review-toogler-D-ssv13 {
                display: none !important;
            }
    
            .CSS-review-toogler-P-ssv13 {
                display: block !important;
            }

            .video-modal-sr-pb-pi-reviews-ssv13 {
                background: #ffffff;
                padding: 0;
                border-radius: 0;
                margin: 0 -15px;
                width: calc(100% + 30px);
                padding: 0 15px;
                margin-bottom: 0px !important;
            }

            .video-modal-sr-pb-pi-review-card-ssv13 {
                background: #F5F5F5;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                margin-top: 0;
            }

            .swirl-short-video-pip-ssv13 {                
                height: 200px;
            }

            .video-model-marquee-ssv13 {
                bottom: 0;
            }
        }

        @media only screen and (min-width: 1440px) {
            .video-modal-structure-left-ssv13 {
                width: 70%;
            }

            .video-modal-structure-right-ssv13 {
                width: 30%;
            }
        }
    `;
    document.head.appendChild(style);

    let apiCall = ssv13_pdppip ? 'https://api.goswirl.live/index.php/ShortVideo/getPDPVideosv13' : 'https://api.goswirl.live/index.php/ShortVideo/getVideosv13';

    document.querySelectorAll('.swirl-short-videos-c-ssv13').forEach(elm => {
        ssv13_storeCode = elm.dataset.code;
        if (elm.dataset.playlist) {
            ssv13_storePlaylist.push(elm.dataset.playlist);
        }
        ssv13_storeType = elm.dataset.wt;
        ssv13_storePdp = elm.dataset.pdp;
    });
    ssv13_storeURL = window.location.origin;
    ssv13_storePlaylist = ssv13_storePlaylist.join(',');
    ssv13_pdppipURL = cUrl;

    if (ssv13_pipMode && !ssv13_storePlaylist && localStorage.getItem('ssv13_pdppip')) {
        ssv13_pdppipURL = cUrl = localStorage.getItem('ssv13_pdppipURL');
        ssv13_storeCode = localStorage.getItem('ssv13_storeCode');
        ssv13_storeType = localStorage.getItem('ssv13_storeType');
        ssv13_storePlaylist = localStorage.getItem('ssv13_storePlaylist');
        ssv13_storePdp = localStorage.getItem('ssv13_storePdp');
        ssv13_pdppip = localStorage.getItem('ssv13_pdppip');
        apiCall = 'https://api.goswirl.live/index.php/ShortVideo/getPDPVideosv13';
    }

    localStorage.setItem('ssv13_storeCode', ssv13_storeCode);
    localStorage.setItem('ssv13_storePlaylist', ssv13_storePlaylist);
    localStorage.setItem('ssv13_storeType', ssv13_storeType);
    localStorage.setItem('ssv13_storePdp', ssv13_storePdp);
    localStorage.setItem('ssv13_pdppip', ssv13_pdppip);
    localStorage.setItem('ssv13_pdppipURL', ssv13_pdppipURL);

    ssv13_userData = localStorage.getItem('ssv13_user') ? JSON.parse(localStorage.getItem('ssv13_user')) : null;

    let myHeaders = new Headers();
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    if (ssv13_storePlaylist || ssv13_pdppip || ssv13_pipMode) {
        fetch(`${apiCall}?sCode=${ssv13_storeCode}&pCodes=${ssv13_storePlaylist}&url=${cUrl}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result);
                if (Object.keys(data.swirls).length == 0) {
                    console.log('SSV: Videos missing.');
                    return;
                }

                ssv13_brandCustomizations = data.swirls.customization;
                localStorage.setItem('ssv13_responseData', result);

                // Mail embed code copy    
                let jqTag = '';
                jqTag = document.createElement('script');
                jqTag.rel = 'text/javascript';
                jqTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js';
                document.body.insertBefore(jqTag, document.body.lastChild);

                if (ssv13_brandCustomizations.comment_mode == '1') {
                    jqTag = document.createElement('script');
                    jqTag.rel = 'text/javascript';
                    jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js';
                    document.body.insertBefore(jqTag, document.body.lastChild);

                    jqTag = document.createElement('script');
                    jqTag.rel = 'text/javascript';
                    jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth-compat.js';
                    document.body.insertBefore(jqTag, document.body.lastChild);

                    jqTag = document.createElement('script');
                    jqTag.rel = 'text/javascript';
                    jqTag.src = 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore-compat.js';
                    document.body.insertBefore(jqTag, document.body.lastChild);
                    jqTag.onload = () => {
                        firebase.initializeApp({
                            apiKey: window.atob('QUl6YVN5QXVCWEJUb2NzaFU1a2V4T28tTzNqNW40SkZsblZReU9v'),
                            authDomain: 'swirl-short-vido.firebaseapp.com',
                            projectId: 'swirl-short-vido',
                            storageBucket: 'swirl-short-vido.appspot.com'
                        });
                        ssv13_fsdb = firebase.firestore();
                    };
                }

                let i = 0;
                document.querySelectorAll('.swirl-short-videos-c-ssv13').forEach(elm => {
                    if (!ssv13_pdppip) {
                        ssv13_responseData[elm.dataset.playlist] = data.swirls[elm.dataset.playlist];
                        generatessv13(data.swirls[elm.dataset.playlist], elm, i);
                        impressionCountssv13(data.swirls.customization.brand_id, elm.dataset.playlist, data.swirls[elm.dataset.playlist].map((item) => item.video_id));
                    } else {
                        ssv13_responseData['video'] = data.swirls.video;
                        generatessv13(data.swirls.video, elm, i);
                        impressionCountssv13(data.swirls.customization.brand_id, "", data.swirls.video.map((item) => item.video_id));
                    }
                    i++;
                });
            })
            .catch(error => {
                console.log(error);
                console.log('SSV: Video fetch failed.');
                return;
            });
    } else {
        console.log('SSV: No Playlist, No PDP.');
    }
}

function generatessv13(videos, target, no) {
    if (Object.keys(videos).length == 0) { console.log(`SSV: Div ${(no + 1)}, No videos`); return; }

    let carouselLoad = true;
    if (ssv13_pdppip && ssv13_brandCustomizations.pdppip_hidecarousel == '1') {
        target.style.display = 'none';
        carouselLoad = false;
    }

    ssv13_globalMute = ssv13_brandCustomizations.auto_play_mute_un == '1' ? true : false;

    let cSlides = '';
    let mSlides = '';
    let mRightBlocks = '';
    let mThumbs = '';
    let i = 0;

    let reviewStars = [];
    reviewStars[0] = ``;
    reviewStars[1] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStars[2] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStars[3] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStars[4] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStars[5] = `
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-sr-pb-pi-rc-svg-ssv13" width="14"
            height="13" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    let reviewStarsSlider = [];
    reviewStarsSlider[0] = ``;
    reviewStarsSlider[1] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStarsSlider[2] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#F6C64B" />
        </svg>
    `;
    reviewStarsSlider[3] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStarsSlider[4] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;
    reviewStarsSlider[5] = `
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
        <svg class="video-modal-pr-bottom-rc-svg-ssv13"
            width="14" height="13"
            viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00016 9.97624L3.08149 12.3696L4.14682 7.9029L0.660156 4.91624L5.23682 4.54957L7.00016 0.30957L8.76349 4.54957L13.3408 4.91624L9.85349 7.9029L10.9188 12.3696L7.00016 9.97624Z"
                fill="#0B895C" />
        </svg>
    `;

    let vcBadge = [];
    vcBadge[0] = ``;
    vcBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-custome-badge-top-ssv13">
            <p class="video-cbt-bestseller-ssv13">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.49736 6.92923C2.38071 6.92923 2.24073 6.9059 2.1474 6.8359C1.8441 6.67259 1.47081 6.25264 1.47081 5.13276C1.47081 2.79969 0.210953 1.44651 0.210953 1.44651L0.000976562 1.2132L1.09752 0L1.28417 0.279969C1.3075 0.3033 1.89077 1.14321 2.80066 0.909899L2.91732 1.5165C2.00742 1.7498 1.35416 1.25986 1.02753 0.909899L0.794221 1.2132C1.19084 1.72647 2.03075 3.07966 2.03075 5.13276C2.03075 5.73936 2.1474 6.15931 2.38071 6.27597C2.54403 6.36929 2.80066 6.27597 3.03397 6.04266C3.64057 5.43606 4.08385 3.94289 4.08385 3.94289L4.59713 4.12954C4.5738 4.19953 4.10719 5.80935 3.38393 6.50927C3.08063 6.78924 2.77733 6.92923 2.49736 6.92923ZM11.503 6.92923C11.6197 6.92923 11.7597 6.9059 11.853 6.8359C12.1563 6.67259 12.5296 6.25264 12.5296 5.13276C12.5296 2.77636 13.7661 1.44651 13.7894 1.42317L13.9994 1.2132L12.9029 0L12.7162 0.279969C12.6929 0.3033 12.1096 1.14321 11.1997 0.909899L11.0831 1.5165C11.993 1.7498 12.6462 1.25986 12.9729 0.909899L13.2528 1.2132C12.8562 1.72647 12.0163 3.07966 12.0163 5.13276C12.0163 5.73936 11.8996 6.15931 11.6663 6.27597C11.503 6.36929 11.2464 6.27597 11.0131 6.04266C10.4065 5.43606 9.9632 3.94289 9.9632 3.94289L9.44992 4.12954C9.47325 4.19953 9.93987 5.80935 10.6631 6.50927C10.9198 6.78924 11.2231 6.92923 11.503 6.92923ZM6.30027 5.34274H7.72345V11.0588H6.30027V5.34274Z"
                        fill="#F2B200" />
                    <path d="M6.58008 5.34375H7.41998V11.0598H6.58008V5.34375Z" fill="#F3CE58" />
                    <path
                        d="M2.2876 0C2.68422 3.59293 4.644 6.46261 7.00041 6.46261C9.35681 6.46261 11.3166 3.59293 11.7132 0H2.2876Z"
                        fill="#F2B200" />
                    <path
                        d="M3.19482 0C3.52145 3.63959 5.10794 6.5326 6.99773 6.5326C8.88752 6.5326 10.474 3.63959 10.8006 0H3.19482Z"
                        fill="#F3CE58" />
                    <path
                        d="M10.6381 12.1315H3.35889C3.35889 12.1315 4.99204 10.0317 6.99848 10.0317C9.00492 10.0317 10.6381 12.1315 10.6381 12.1315Z"
                        fill="#F2B200" />
                    <path
                        d="M9.77635 12.1308H4.22363C4.22363 12.1308 5.46016 9.98438 6.99999 9.98438C8.53982 9.98438 9.77635 12.1308 9.77635 12.1308Z"
                        fill="#F3CE58" />
                    <path d="M2.2876 12.5991H11.7132V13.999H2.2876V12.5991Z" fill="#BC845E" />
                    <path d="M3.35889 12.1318H10.6614V12.5985H3.35889V12.1318Z" fill="#916140" />
                    <path d="M4.6665 12.9497H9.33265V13.6496H4.6665V12.9497Z" fill="#F2B200" />
                    <path d="M2.2876 12.5991H2.75421V13.999H2.2876V12.5991Z" fill="#CE9C7A" />
                    <path d="M11.2456 12.5991H11.7122V13.999H11.2456V12.5991Z" fill="#916140" />
                    <path d="M4.8999 12.9497H9.09943V13.6496H4.8999V12.9497Z" fill="#F3CE58" />
                </svg>
                Bestseller
            </p>
        </div>        
    ` : '';
    vcBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-custome-badge-top-ssv13">
            <p class="video-cbt-hotdeal-ssv13">
                <svg width="12" height="15" viewBox="0 0 12 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                        fill="#FF9D33" />
                    <path
                        d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                        fill="#FFCE31" />
                    <path
                        d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                        fill="#FFDF85" />
                    <path
                        d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                        fill="#FF9D33" />
                </svg>
                Hot deals
            </p>
        </div>
    ` : '';
    vcBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-custome-badge-top-ssv13">
            <p class="video-cbt-newarrival-ssv13">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                        fill="white" />
                </svg>
            </p>
        </div>
    ` : '';
    let plBadge = [];
    plBadge[0] = ``;
    plBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-sr-pb-pc-bedge-ssv13">
            <p class="video-modal-sr-pb-pc-bedge-bestseller-ssv13">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.49736 6.92923C2.38071 6.92923 2.24073 6.9059 2.1474 6.8359C1.8441 6.67259 1.47081 6.25264 1.47081 5.13276C1.47081 2.79969 0.210953 1.44651 0.210953 1.44651L0.000976562 1.2132L1.09752 0L1.28417 0.279969C1.3075 0.3033 1.89077 1.14321 2.80066 0.909899L2.91732 1.5165C2.00742 1.7498 1.35416 1.25986 1.02753 0.909899L0.794221 1.2132C1.19084 1.72647 2.03075 3.07966 2.03075 5.13276C2.03075 5.73936 2.1474 6.15931 2.38071 6.27597C2.54403 6.36929 2.80066 6.27597 3.03397 6.04266C3.64057 5.43606 4.08385 3.94289 4.08385 3.94289L4.59713 4.12954C4.5738 4.19953 4.10719 5.80935 3.38393 6.50927C3.08063 6.78924 2.77733 6.92923 2.49736 6.92923ZM11.503 6.92923C11.6197 6.92923 11.7597 6.9059 11.853 6.8359C12.1563 6.67259 12.5296 6.25264 12.5296 5.13276C12.5296 2.77636 13.7661 1.44651 13.7894 1.42317L13.9994 1.2132L12.9029 0L12.7162 0.279969C12.6929 0.3033 12.1096 1.14321 11.1997 0.909899L11.0831 1.5165C11.993 1.7498 12.6462 1.25986 12.9729 0.909899L13.2528 1.2132C12.8562 1.72647 12.0163 3.07966 12.0163 5.13276C12.0163 5.73936 11.8996 6.15931 11.6663 6.27597C11.503 6.36929 11.2464 6.27597 11.0131 6.04266C10.4065 5.43606 9.9632 3.94289 9.9632 3.94289L9.44992 4.12954C9.47325 4.19953 9.93987 5.80935 10.6631 6.50927C10.9198 6.78924 11.2231 6.92923 11.503 6.92923ZM6.30027 5.34274H7.72345V11.0588H6.30027V5.34274Z"
                        fill="#F2B200" />
                    <path d="M6.58008 5.34375H7.41998V11.0598H6.58008V5.34375Z"
                        fill="#F3CE58" />
                    <path
                        d="M2.2876 0C2.68422 3.59293 4.644 6.46261 7.00041 6.46261C9.35681 6.46261 11.3166 3.59293 11.7132 0H2.2876Z"
                        fill="#F2B200" />
                    <path
                        d="M3.19482 0C3.52145 3.63959 5.10794 6.5326 6.99773 6.5326C8.88752 6.5326 10.474 3.63959 10.8006 0H3.19482Z"
                        fill="#F3CE58" />
                    <path
                        d="M10.6381 12.1315H3.35889C3.35889 12.1315 4.99204 10.0317 6.99848 10.0317C9.00492 10.0317 10.6381 12.1315 10.6381 12.1315Z"
                        fill="#F2B200" />
                    <path
                        d="M9.77635 12.1308H4.22363C4.22363 12.1308 5.46016 9.98438 6.99999 9.98438C8.53982 9.98438 9.77635 12.1308 9.77635 12.1308Z"
                        fill="#F3CE58" />
                    <path d="M2.2876 12.5991H11.7132V13.999H2.2876V12.5991Z"
                        fill="#BC845E" />
                    <path d="M3.35889 12.1318H10.6614V12.5985H3.35889V12.1318Z"
                        fill="#916140" />
                    <path d="M4.6665 12.9497H9.33265V13.6496H4.6665V12.9497Z"
                        fill="#F2B200" />
                    <path d="M2.2876 12.5991H2.75421V13.999H2.2876V12.5991Z"
                        fill="#CE9C7A" />
                    <path d="M11.2456 12.5991H11.7122V13.999H11.2456V12.5991Z"
                        fill="#916140" />
                    <path d="M4.8999 12.9497H9.09943V13.6496H4.8999V12.9497Z"
                        fill="#F3CE58" />
                </svg>
                Bestseller
            </p>
        </div>
    ` : '';
    plBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-sr-pb-pc-bedge-ssv13">
            <p class="video-modal-sr-pb-pc-bedge-hotdeal-ssv13">
                <svg width="12" height="15" viewBox="0 0 12 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                        fill="#FF9D33" />
                    <path
                        d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                        fill="#FFCE31" />
                    <path
                        d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                        fill="#FFDF85" />
                    <path
                        d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                        fill="#FF9D33" />
                </svg>
                Hot deals
            </p>
        </div>
    ` : '';
    plBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-sr-pb-pc-bedge-ssv13">
            <p class="video-modal-sr-pb-pc-bedge-newarrival-ssv13">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                        fill="white" />
                </svg>
                New arrival
            </p>
        </div>
    ` : '';
    let pbBadge = [];
    pbBadge[0] = ``;
    pbBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <p class="video-modal-sr-pb-pi-bestseller-ssv13">
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.96167 6.08807C1.87 6.08807 1.76 6.06973 1.68667 6.01473C1.44833 5.8864 1.155 5.5564 1.155 4.6764C1.155 2.84307 0.165 1.77973 0.165 1.77973L0 1.5964L0.861667 0.643066L1.00833 0.863066C1.02667 0.8814 1.485 1.5414 2.2 1.35807L2.29167 1.83473C1.57667 2.01807 1.06333 1.63307 0.806667 1.35807L0.623333 1.5964C0.935 1.99973 1.595 3.06307 1.595 4.6764C1.595 5.15307 1.68667 5.48307 1.87 5.57473C1.99833 5.64807 2.2 5.57473 2.38333 5.3914C2.86 4.91473 3.20833 3.7414 3.20833 3.7414L3.61167 3.88807C3.59333 3.94307 3.22667 5.20807 2.65833 5.75807C2.42 5.97807 2.18167 6.08807 1.96167 6.08807ZM9.03833 6.08807C9.13 6.08807 9.24 6.06973 9.31333 6.01473C9.55167 5.8864 9.845 5.5564 9.845 4.6764C9.845 2.82473 10.8167 1.77973 10.835 1.7614L11 1.5964L10.1383 0.643066L9.99167 0.863066C9.97333 0.8814 9.515 1.5414 8.8 1.35807L8.70833 1.83473C9.42333 2.01807 9.93667 1.63307 10.1933 1.35807L10.4133 1.5964C10.1017 1.99973 9.44167 3.06307 9.44167 4.6764C9.44167 5.15307 9.35 5.48307 9.16667 5.57473C9.03833 5.64807 8.83667 5.57473 8.65333 5.3914C8.17667 4.91473 7.82833 3.7414 7.82833 3.7414L7.425 3.88807C7.44333 3.94307 7.81 5.20807 8.37833 5.75807C8.58 5.97807 8.81833 6.08807 9.03833 6.08807ZM4.95 4.8414H6.06833V9.33307H4.95V4.8414Z"
                    fill="#F2B200" />
                <path d="M5.1709 4.8418H5.8309V9.33346H5.1709V4.8418Z"
                    fill="#FFCE31" />
                <path
                    d="M1.79736 0.643066C2.10903 3.4664 3.64903 5.7214 5.5007 5.7214C7.35236 5.7214 8.89236 3.4664 9.20403 0.643066H1.79736Z"
                    fill="#F2B200" />
                <path
                    d="M2.51025 0.643066C2.76692 3.50307 4.01359 5.7764 5.49859 5.7764C6.98359 5.7764 8.23025 3.50307 8.48692 0.643066H2.51025Z"
                    fill="#FFCE31" />
                <path
                    d="M8.35916 10.1764H2.63916C2.63916 10.1764 3.92249 8.52637 5.49916 8.52637C7.07583 8.52637 8.35916 10.1764 8.35916 10.1764Z"
                    fill="#F2B200" />
                <path
                    d="M7.6812 10.1754H3.31787C3.31787 10.1754 4.28954 8.48877 5.49954 8.48877C6.70954 8.48877 7.6812 10.1754 7.6812 10.1754Z"
                    fill="#FFCE31" />
                <path d="M1.79736 10.5444H9.20403V11.6444H1.79736V10.5444Z"
                    fill="#BC845E" />
                <path d="M2.63916 10.1753H8.37749V10.542H2.63916V10.1753Z"
                    fill="#916140" />
                <path d="M3.66699 10.8184H7.33366V11.3684H3.66699V10.8184Z"
                    fill="#F2B200" />
                <path d="M1.79736 10.5444H2.16403V11.6444H1.79736V10.5444Z"
                    fill="#CE9C7A" />
                <path d="M8.83594 10.5444H9.2026V11.6444H8.83594V10.5444Z"
                    fill="#916140" />
                <path d="M3.84961 10.8184H7.14961V11.3684H3.84961V10.8184Z"
                    fill="#FFCE31" />
            </svg>
            Bestseller
        </p>
    ` : '';
    pbBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <p class="video-modal-sr-pb-pi-hotdeal-ssv13">
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                    fill="#FF9D33" />
                <path
                    d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                    fill="#FFCE31" />
                <path
                    d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                    fill="#FFDF85" />
                <path
                    d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                    fill="#FF9D33" />
            </svg>
            Hot deals
        </p>
    ` : '';
    pbBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <p class="video-modal-sr-pb-pi-newarrival-ssv13">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="#9C150C"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                    fill="#9C150C" />
            </svg>
            New arrival
        </p>
    ` : '';
    let pcBadge = [];
    pcBadge[0] = ``;
    pcBadge[1] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-ps-badge-ssv13 video-modal-ps-bestseller-ssv13">
            <svg width="12" height="12" viewBox="0 0 12 12"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.31176 5.88445C2.2201 5.88445 2.1101 5.86612 2.03676 5.81112C1.79843 5.68279 1.5051 5.35279 1.5051 4.47279C1.5051 2.63945 0.515098 1.57612 0.515098 1.57612L0.350098 1.39279L1.21176 0.439453L1.35843 0.659453C1.37676 0.677786 1.8351 1.33779 2.5501 1.15445L2.64176 1.63112C1.92676 1.81445 1.41343 1.42945 1.15676 1.15445L0.973431 1.39279C1.2851 1.79612 1.9451 2.85945 1.9451 4.47279C1.9451 4.94945 2.03676 5.27945 2.2201 5.37112C2.34843 5.44445 2.5501 5.37112 2.73343 5.18779C3.2101 4.71112 3.55843 3.53779 3.55843 3.53779L3.96176 3.68445C3.94343 3.73945 3.57676 5.00445 3.00843 5.55445C2.7701 5.77445 2.53176 5.88445 2.31176 5.88445ZM9.38843 5.88445C9.4801 5.88445 9.5901 5.86612 9.66343 5.81112C9.90176 5.68279 10.1951 5.35279 10.1951 4.47279C10.1951 2.62112 11.1668 1.57612 11.1851 1.55779L11.3501 1.39279L10.4884 0.439453L10.3418 0.659453C10.3234 0.677786 9.8651 1.33779 9.1501 1.15445L9.05843 1.63112C9.77343 1.81445 10.2868 1.42945 10.5434 1.15445L10.7634 1.39279C10.4518 1.79612 9.79176 2.85945 9.79176 4.47279C9.79176 4.94945 9.7001 5.27945 9.51676 5.37112C9.38843 5.44445 9.18676 5.37112 9.00343 5.18779C8.52676 4.71112 8.17843 3.53779 8.17843 3.53779L7.7751 3.68445C7.79343 3.73945 8.1601 5.00445 8.72843 5.55445C8.9301 5.77445 9.16843 5.88445 9.38843 5.88445ZM5.3001 4.63779H6.41843V9.12945H5.3001V4.63779Z"
                    fill="#F2B200" />
                <path
                    d="M5.521 4.63806H6.181V9.12973H5.521V4.63806Z"
                    fill="#FFCE31" />
                <path
                    d="M2.14746 0.439453C2.45913 3.26279 3.99913 5.51779 5.85079 5.51779C7.70246 5.51779 9.24246 3.26279 9.55413 0.439453H2.14746Z"
                    fill="#F2B200" />
                <path
                    d="M2.86035 0.439453C3.11702 3.29945 4.36368 5.57279 5.84868 5.57279C7.33368 5.57279 8.58035 3.29945 8.83702 0.439453H2.86035Z"
                    fill="#FFCE31" />
                <path
                    d="M8.70926 9.97275H2.98926C2.98926 9.97275 4.27259 8.32275 5.84926 8.32275C7.42592 8.32275 8.70926 9.97275 8.70926 9.97275Z"
                    fill="#F2B200" />
                <path
                    d="M8.0313 9.97182H3.66797C3.66797 9.97182 4.63964 8.28516 5.84964 8.28516C7.05964 8.28516 8.0313 9.97182 8.0313 9.97182Z"
                    fill="#FFCE31" />
                <path
                    d="M2.14746 10.3406H9.55413V11.4406H2.14746V10.3406Z"
                    fill="#BC845E" />
                <path
                    d="M2.98926 9.97174H8.72759V10.3384H2.98926V9.97174Z"
                    fill="#916140" />
                <path
                    d="M4.01709 10.6145H7.68376V11.1645H4.01709V10.6145Z"
                    fill="#F2B200" />
                <path
                    d="M2.14746 10.3406H2.51413V11.4406H2.14746V10.3406Z"
                    fill="#CE9C7A" />
                <path
                    d="M9.18604 10.3406H9.5527V11.4406H9.18604V10.3406Z"
                    fill="#916140" />
                <path
                    d="M4.19971 10.6145H7.49971V11.1645H4.19971V10.6145Z"
                    fill="#FFCE31" />
            </svg>
            Bestseller
        </div>
    ` : '';
    pcBadge[2] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-ps-badge-ssv13 video-modal-ps-hotdeal-ssv13">
            <svg width="12" height="15" viewBox="0 0 12 15"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.7853 6.28973C11.7853 6.28973 11.091 6.94307 9.91058 7.71307C9.58654 5.82307 8.68388 3.48973 6.92485 0.643066C6.92485 0.643066 6.34622 3.69973 4.42517 6.56973C3.59194 5.26307 3.22162 4.2364 3.22162 4.2364C-2.79613 10.3264 2.20323 14.6431 5.35098 14.6431C9.37824 14.6431 12.9195 12.6831 11.7853 6.28973Z"
                    fill="#FF9D33" />
                <path
                    d="M9.39816 11.7041C9.74534 10.9341 9.99994 9.93073 10.0462 8.67073C10.0462 8.67073 9.56018 9.09073 8.72695 9.6274C8.4955 8.3674 7.87058 6.8274 6.64389 4.91406C6.64389 4.91406 6.25042 6.94406 4.908 8.88073C4.32937 8.0174 4.07477 7.3174 4.07477 7.3174C3.07953 8.90406 2.68606 10.1641 2.66292 11.1674C2.10743 10.9574 1.76025 10.7941 1.76025 10.7941C2.70921 13.6407 4.67655 14.2707 5.55606 14.2707C7.12994 14.2707 8.72695 13.8041 10.3008 11.5407C10.3008 11.5174 9.95365 11.6107 9.39816 11.7041Z"
                    fill="#FFCE31" />
                <path
                    d="M3.65592 10.4205C3.65592 10.4205 4.30399 11.3072 4.79004 11.0972C4.79004 11.0972 5.71585 9.62721 7.05827 8.81055C7.05827 8.81055 6.78052 11.0505 7.10456 11.4472C7.52117 11.9839 8.65528 10.8639 8.65528 10.8639C8.65528 12.1939 7.22028 13.8505 5.92415 13.8505C4.67431 13.8505 2.86899 12.4039 3.65592 10.4205Z"
                    fill="#FFDF85" />
                <path
                    d="M10.1147 4.39892C10.6008 3.69892 10.9248 2.95225 10.9248 2.95225C11.7349 4.30559 11.2488 5.12225 10.9017 5.37892C10.4156 5.75225 9.55923 5.21559 10.1147 4.39892ZM1.27326 4.16559C0.787211 3.34892 0.74092 2.32225 0.74092 2.32225C-0.416339 4.07225 0.0234196 5.05225 0.416888 5.33225C0.926082 5.72892 1.8056 5.12225 1.27326 4.16559ZM3.9581 2.34559C4.02754 1.78559 3.79608 1.22559 3.79608 1.22559C4.88391 1.94892 4.88391 2.55559 4.74504 2.81225C4.53673 3.11559 3.88866 2.97559 3.9581 2.34559Z"
                    fill="#FF9D33" />
            </svg>
            Hot deals
        </div>
    ` : '';
    pcBadge[3] = ssv13_brandCustomizations.product_tags == '1' ? `
        <div class="video-modal-ps-badge-ssv13 video-modal-ps-newarrival-ssv13">
            <svg width="27" height="27" viewBox="0 0 27 27"
                fill="#9C150C" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M26.5326 13.7943C26.5326 13.4898 26.383 13.2221 26.1552 13.0542L26.16 13.046L22.952 11.1939L24.7986 7.99541L24.7924 7.99163C24.9052 7.73289 24.9007 7.42633 24.7487 7.16312C24.5962 6.89956 24.333 6.74232 24.0519 6.71101V6.70207H20.347V3.00783H20.3395C20.3078 2.72707 20.1506 2.46421 19.8874 2.31213C19.6235 2.15971 19.3169 2.15524 19.0575 2.26912L19.053 2.26121L15.7909 4.14463L13.9846 1.01569L13.978 1.01947C13.8101 0.792391 13.5428 0.643066 13.2386 0.643066C12.9341 0.643066 12.6661 0.792735 12.4985 1.02051L12.4903 1.01569L10.654 4.19624L7.49204 2.37062L7.48825 2.37716C7.22917 2.26431 6.92295 2.26878 6.65974 2.42086C6.39584 2.57293 6.23895 2.83649 6.2073 3.11759H6.19801V6.79015H2.54678V6.79738C2.26602 6.82903 2.00315 6.98627 1.85108 7.24948C1.699 7.51303 1.69453 7.8196 1.80772 8.07868L1.79981 8.08349L3.60478 11.21L0.372624 13.0762L0.376408 13.0828C0.149325 13.2507 0 13.518 0 13.8222C0 14.1267 0.149669 14.3947 0.37744 14.5623L0.372624 14.5705L3.5807 16.4226L1.73409 19.6211L1.74029 19.6245C1.62743 19.8836 1.63191 20.1898 1.78398 20.453C1.9364 20.7166 2.19961 20.8738 2.48072 20.9051V20.9144H6.18528V24.6083H6.19284C6.2245 24.8891 6.38174 25.1519 6.64495 25.304C6.90885 25.4564 7.21575 25.4606 7.47483 25.347L7.47931 25.3549L10.7414 23.4715L12.5477 26.6004L12.5543 26.5967C12.7222 26.8237 12.9895 26.9731 13.2937 26.9731C13.5982 26.9731 13.8662 26.8234 14.0338 26.596L14.0417 26.6004L15.878 23.4199L19.0403 25.2455L19.0441 25.239C19.3031 25.3518 19.6094 25.3474 19.8726 25.1953C20.1365 25.0432 20.2934 24.7796 20.325 24.4985H20.3343V20.8263H23.9859V20.8191C24.2666 20.7874 24.5295 20.6302 24.6816 20.367C24.8337 20.1034 24.8381 19.7965 24.7249 19.5375L24.7328 19.533L22.9279 16.4065L26.16 14.5402L26.1562 14.5337C26.3833 14.3661 26.5326 14.0985 26.5326 13.7943ZM11.1037 17.7149L7.71602 16.2182L9.21099 18.8073L8.36596 19.2952L6.0738 15.3257L6.94256 14.8237L10.2215 16.2558L8.7816 13.762L9.62697 13.2741L11.9184 17.2436L11.1037 17.7149ZM12.7043 16.7908L10.4125 12.8209L13.2218 11.1994L13.6512 11.9432L11.6869 13.0769L12.1679 13.9103L14.0902 12.8006L14.5196 13.5438L12.5973 14.6541L13.1196 15.5587L15.0839 14.425L15.5132 15.1688L12.7043 16.7908ZM19.2092 13.0353L16.9391 10.7115L17.8223 13.8356L16.9239 14.3544L13.4953 11.0414L14.4415 10.4951L16.7942 12.9613L15.8938 9.65656L16.5544 9.27534L18.9604 11.711L18.0005 8.44029L18.9467 7.89391L20.1079 12.5168L19.2092 13.0353Z"
                    fill="#ffffff" />
            </svg>
            New
        </div>
    ` : '';

    videos.forEach(video => {
        // Carousel
        let cProduct = Object.keys(video.product).length ? `        
            <div class="video-bottom-product-ssv13" style="${ssv13_brandCustomizations.product_blog_img == '1' ? '' : 'display: none;'}">
                <div class="video-bp-img-block-ssv13">
                    <img class="video-bp-img-ssv13"
                        src="${productImagessv13(video.product[0].image, 60)}"
                        alt="Product thumbnail" title="Product thumbnail" />
                    <label class="video-bp-count-ssv13" style="${Object.keys(video.product).length > 1 ? '' : 'display: none !important;'}">${Object.keys(video.product).length}</label>
                </div>
                <div class="video-bp-detail-block-ssv13">
                    <p class="video-bp-title-ssv13">${video.product[0].title}</p>
                    <p class="video-bp-price-ssv13 JS-dynamic-price-${video.video_id}-${video.product[0].product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${video.product[0].currencysymbols}${formatCurrencyssv13(video.product[0].discount_price)}
                        <strike style="${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'display: none !important;'}">${video.product[0].currencysymbols}${formatCurrencyssv13(video.product[0].price)}</strike>
                        <label class="video-bp-off-ssv13" style="${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? '' : 'display: none !important;'}">${parseFloat(video.product[0].price) > parseFloat(video.product[0].discount_price) ? Math.round(((video.product[0].price - video.product[0].discount_price) * 100) / video.product[0].price) : ''}%</label>
                    </p>
                </div>
            </div>` : ``;
        let cTitle = ssv13_brandCustomizations.product_blog_img == '1' && cProduct ? `` : `
            <p class="video-title-ssv13" title="${video.video_title}" style="${ssv13_brandCustomizations.video_title == '1' ? '' : 'display: none;'}">
                ${video.video_title}
            </p>`;
        cSlides += `
            <div class="swiper-slide" onclick="openVideoModalssv13(${i}, ${no});">
                <video data-src="${video.cover_video}" data-srcf="${video.server_url}" data-id="${video.video_id}" class="carousel-video-ssv13 ${video.is_landscape == '0' ? 'JS-cvideo-L-ssv13' : 'JS-cvideo-P-ssv13'}" onplay="this.closest('.swiper-slide').querySelector('.carousel-video-play-ssv13').style.display='none';"
                    poster="${video.cover_image}" loop playsinline muted>                    
                </video>
                <svg class="carousel-video-play-ssv13" width="61" height="61" viewBox="0 0 61 61" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.143066" width="60" height="60" rx="30" fill="#2E2E33" fill-opacity="0.5" />
                    <g clip-path="url(#clip0_622_61478)">
                        <path
                            d="M25.19 21.9416L38.325 29.6041C38.4191 29.6592 38.4972 29.738 38.5515 29.8326C38.6057 29.9273 38.6343 30.0344 38.6343 30.1435C38.6343 30.2526 38.6057 30.3598 38.5515 30.4544C38.4972 30.549 38.4191 30.6278 38.325 30.6829L25.19 38.3454C25.0948 38.4009 24.9867 38.4303 24.8765 38.4306C24.7663 38.4308 24.658 38.402 24.5626 38.3469C24.4672 38.2918 24.388 38.2125 24.3331 38.117C24.2782 38.0214 24.2495 37.9131 24.25 37.8029V22.4816C24.25 22.3717 24.279 22.2636 24.334 22.1684C24.3891 22.0733 24.4683 21.9943 24.5637 21.9395C24.659 21.8847 24.7672 21.8561 24.8771 21.8564C24.9871 21.8568 25.095 21.8862 25.19 21.9416Z"
                            fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_622_61478">
                            <rect width="30" height="30" fill="white" transform="translate(15.5 15.1431)" />
                        </clipPath>
                    </defs>
                </svg>
                <div class="video-views-count-top-ssv13" style="${ssv13_brandCustomizations.views == '1' ? '' : 'display: none;'}">
                    <p>
                        <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.99978 0.398926C11.5944 0.398926 14.5851 2.98559 15.2124 6.39893C14.5858 9.81226 11.5944 12.3989 7.99978 12.3989C4.40511 12.3989 1.41444 9.81226 0.787109 6.39893C1.41378 2.98559 4.40511 0.398926 7.99978 0.398926ZM7.99978 11.0656C9.35942 11.0653 10.6787 10.6035 11.7417 9.7557C12.8047 8.90794 13.5484 7.72444 13.8511 6.39893C13.5473 5.07446 12.8031 3.89226 11.7402 3.04561C10.6773 2.19896 9.35865 1.73794 7.99978 1.73794C6.64091 1.73794 5.32224 2.19896 4.25936 3.04561C3.19648 3.89226 2.45229 5.07446 2.14844 6.39893C2.45117 7.72444 3.19489 8.90794 4.25787 9.7557C5.32085 10.6035 6.64013 11.0653 7.99978 11.0656ZM7.99978 9.39893C7.20413 9.39893 6.44107 9.08286 5.87846 8.52025C5.31585 7.95764 4.99978 7.19458 4.99978 6.39893C4.99978 5.60328 5.31585 4.84021 5.87846 4.27761C6.44107 3.715 7.20413 3.39893 7.99978 3.39893C8.79543 3.39893 9.55849 3.715 10.1211 4.27761C10.6837 4.84021 10.9998 5.60328 10.9998 6.39893C10.9998 7.19458 10.6837 7.95764 10.1211 8.52025C9.55849 9.08286 8.79543 9.39893 7.99978 9.39893ZM7.99978 8.06559C8.4418 8.06559 8.86573 7.89 9.17829 7.57744C9.49085 7.26488 9.66644 6.84095 9.66644 6.39893C9.66644 5.9569 9.49085 5.53298 9.17829 5.22041C8.86573 4.90785 8.4418 4.73226 7.99978 4.73226C7.55775 4.73226 7.13383 4.90785 6.82127 5.22041C6.5087 5.53298 6.33311 5.9569 6.33311 6.39893C6.33311 6.84095 6.5087 7.26488 6.82127 7.57744C7.13383 7.89 7.55775 8.06559 7.99978 8.06559Z"
                                fill="white" />
                        </svg>
                        ${numberToShorthandssv13(video.total_views)}
                    </p>
                </div>
                <div class="video-timer-top-ssv13">
                    <p>${video.video_len ? secondsToDurationssv13(video.video_len) : '00:00'}</p>
                </div>
                ${vcBadge[Object.keys(video.product).length ? video.product[0].product_tags : 0]}
                ${cProduct}
                ${cTitle}
            </div>
        `;

        // Modal        
        let pi = 0;
        let mProductSlider = '';
        let mReviewSlider = '';
        let mSliderReview = '';
        let mReviews = '';
        let mProductList = '';
        let mProducts = '';
        let mShareURL = window.location.href.split('?')[0] + '?ssv=' + window.btoa(video.video_id);

        let videoBuyBG = video.video_cta_bk ? video.video_cta_bk : ssv13_brandCustomizations.bk_color_buy_btn;
        let videoBuyFont = video.video_cta_fk ? video.video_cta_fk : ssv13_brandCustomizations.front_color_buy_btn;

        let videoCTA = Object.keys(video.product).length == 0 && video.product_link ? true : false;

        video.product.forEach(prd => {
            // Product IDs for addtocart
            if (ssv13_storeType == '1') {
                let productHandle = getHandlessv13(prd.url);
                fetch(`${window.Shopify.routes.root}products/${productHandle}.js`).then(response => response.json()).then(ps => {
                    ssv13_productIds[prd.product_id] = ps.variants[0]['id'];
                }).catch(error => {
                    console.log('Shopify product fetch failed:', error);
                });
            } else {
                ssv13_productIds[prd.product_id] = prd.brand_product_id;
            }

            mProductSlider += `
                <div class="swiper-slide" data-reviews="${Object.keys(prd.pReviews).length}">
                    <div class="video-modal-ps-card-ssv13"
                        onclick="openPhoneProductDetailssv13(this, ${i}, ${pi});"
                        style="${pcBadge[prd.product_tags] == '' ? '' : 'border-top-left-radius: 0'};">
                        <div class="video-modal-ps-img-ssv13">
                            <img class="video-modal-ps-image-ssv13"
                                src="${productImagessv13(prd.image, 150)}"
                                alt="Product thumbnail"
                                title="Product thumbnail" />
                        </div>
                        <div class="video-modal-ps-detail-ssv13">
                            <div class="video-modal-ps-ratting-ssv13" style="${prd.avgRating == 0 ? 'display: none !important;' : ''} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                                <svg width="13" height="12"
                                    viewBox="0 0 13 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.34814 0.440674L7.69523 4.58657H12.0545L8.52777 7.14888L9.87486 11.2948L6.34814 8.73247L2.82143 11.2948L4.16852 7.14888L0.641805 4.58657H5.00106L6.34814 0.440674Z"
                                        fill="#0B895C" />
                                </svg>
                                ${prd.avgRating}                                
                            </div>
                            <div class="video-modal-ps-ratting-ssv13" style="${prd.avgRating == 0 ? '' : 'display: none !important;'} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                                <svg style="margin-top: 4px !important;" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5814 12.6704L7.49974 10.477L11.4181 12.6704L10.9546 10.6798L9.69162 9.65549L9.85918 10.5242L7.49974 9.20369L5.14029 10.5242L5.66751 7.87257L3.68251 6.03646L4.90667 5.74971L3.83442 4.88553L2.72436 5.03691L1.15918 5.21702L4.4564 8.26591L3.5814 12.6704Z" fill="#5D5D60"/>
                                    <path d="M9.38085 4.68813L7.49974 0.610352C7.14917 1.50224 5.85402 3.24006 5.5166 3.95003L6.53916 4.7677L7.49974 3.26313L8.63196 5.71813L11.317 6.03646L10.3245 6.95452L9.8147 7.42783L10.7232 8.1505L11.3674 7.50368L12.1917 6.74146L13.8403 5.21702L9.38085 4.68813Z" fill="#5D5D60"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3029 11.3194L3.31738 4.04421L4.01656 3.18066L13.002 10.4558L12.3029 11.3194Z" fill="#5D5D60"/>
                                </svg>
                                no-review
                            </div>
                            <p class="video-modal-ps-title-ssv13">${prd.title}</p>
                            <p class="video-modal-ps-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                                <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                                <label class="video-modal-ps-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                            </p>
                            <div class="video-modal-ps-cta-ssv13" style="${ssv13_brandCustomizations.cta_on_tile == '0' ? 'display: none !important;' : ''}">
                                <button tabindex="-1" style="${ssv13_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important;' : ''} background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '1'); window.location='${prd.url}';"
                                    class="video-modal-ps-buynow-ssv13 JS-pc-ignore-ssv13">${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}</button>
                                <button tabindex="-1" style="${ssv13_brandCustomizations.buy_now == '0' ? 'width: 100% !important;' : ''} ${ssv13_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '2'); addtocartssv13(${video.video_id}, ${prd.product_id}, '${prd.sku_code}', this, 1);"
                                    class="video-modal-ps-addtocart-ssv13 JS-pc-ignore-ssv13">
                                    <svg class="JS-pc-ignore-ssv13" width="25"
                                        height="25" viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path class="JS-pc-ignore-ssv13" 
                                            d="M4.2002 16.4407V4.44067H2.2002V2.44067H5.2002C5.46541 2.44067 5.71977 2.54603 5.9073 2.73357C6.09484 2.9211 6.2002 3.17546 6.2002 3.44067V15.4407H18.6382L20.6382 7.44067L21.1528 5.44067H21.9202C22.0722 5.44068 22.2222 5.47533 22.3588 5.54201C22.4954 5.60869 22.615 5.70563 22.7085 5.82546C22.802 5.9453 22.867 6.08487 22.8985 6.23358C22.93 6.38229 22.9271 6.53622 22.8902 6.68367L20.3902 16.6837C20.336 16.8999 20.2111 17.0919 20.0354 17.229C19.8597 17.3662 19.6431 17.4407 19.4202 17.4407H5.2002C4.93498 17.4407 4.68063 17.3353 4.49309 17.1478C4.30555 16.9602 4.2002 16.7059 4.2002 16.4407ZM6.2002 23.4407C5.66976 23.4407 5.16105 23.23 4.78598 22.8549C4.41091 22.4798 4.2002 21.9711 4.2002 21.4407C4.2002 20.9102 4.41091 20.4015 4.78598 20.0265C5.16105 19.6514 5.66976 19.4407 6.2002 19.4407C6.73063 19.4407 7.23934 19.6514 7.61441 20.0265C7.98948 20.4015 8.2002 20.9102 8.2002 21.4407C8.2002 21.9711 7.98948 22.4798 7.61441 22.8549C7.23934 23.23 6.73063 23.4407 6.2002 23.4407ZM18.2002 23.4407C17.6698 23.4407 17.1611 23.23 16.786 22.8549C16.4109 22.4798 16.2002 21.9711 16.2002 21.4407C16.2002 20.9102 16.4109 20.4015 16.786 20.0265C17.1611 19.6514 17.6698 19.4407 18.2002 19.4407C18.7306 19.4407 19.2393 19.6514 19.6144 20.0265C19.9895 20.4015 20.2002 20.9102 20.2002 21.4407C20.2002 21.9711 19.9895 22.4798 19.6144 22.8549C19.2393 23.23 18.7306 23.4407 18.2002 23.4407Z"
                                            fill="#454549" />
                                        <path class="JS-pc-ignore-ssv13" 
                                            d="M12.4758 6.38245V2.72693H14.0453V6.28753H17.6187V8.0531H14.0453V11.7269H12.4758V8.0531H8.61865V6.38245H12.4758Z"
                                            fill="#454549" />
                                    </svg>
                                    <label style="${ssv13_brandCustomizations.buy_now == '1' ? 'display: none !important;' : 'display: inline-block !important;'}">Add to cart</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    ${pcBadge[prd.product_tags]}
                </div>
            `;

            mReviewSlider += `
                <div class="swiper-slide">
                    <div class="video-modal-pr-container-ssv13">
                        <div class="video-modal-pr-top-ssv13">
                            <div class="video-modal-pr-top-img-ssv13">
                                <img class="video-modal-pr-top-image-ssv13"
                                    src="${productImagessv13(prd.image, 80)}"
                                    alt="Product thumbnail"
                                    title="Product thumbnail" />
                            </div>
                            <div class="video-modal-pr-top-detail-ssv13">
                                <p class="video-modal-pr-top-bestseller-ssv13">
                                    <svg width="11" height="11"
                                        viewBox="0 0 11 11" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.96167 5.445C1.87 5.445 1.76 5.42667 1.68667 5.37167C1.44833 5.24333 1.155 4.91333 1.155 4.03333C1.155 2.2 0.165 1.13667 0.165 1.13667L0 0.953333L0.861667 0L1.00833 0.22C1.02667 0.238333 1.485 0.898333 2.2 0.715L2.29167 1.19167C1.57667 1.375 1.06333 0.99 0.806667 0.715L0.623333 0.953333C0.935 1.35667 1.595 2.42 1.595 4.03333C1.595 4.51 1.68667 4.84 1.87 4.93167C1.99833 5.005 2.2 4.93167 2.38333 4.74833C2.86 4.27167 3.20833 3.09833 3.20833 3.09833L3.61167 3.245C3.59333 3.3 3.22667 4.565 2.65833 5.115C2.42 5.335 2.18167 5.445 1.96167 5.445ZM9.03833 5.445C9.13 5.445 9.24 5.42667 9.31333 5.37167C9.55167 5.24333 9.845 4.91333 9.845 4.03333C9.845 2.18167 10.8167 1.13667 10.835 1.11833L11 0.953333L10.1383 0L9.99167 0.22C9.97333 0.238333 9.515 0.898333 8.8 0.715L8.70833 1.19167C9.42333 1.375 9.93667 0.99 10.1933 0.715L10.4133 0.953333C10.1017 1.35667 9.44167 2.42 9.44167 4.03333C9.44167 4.51 9.35 4.84 9.16667 4.93167C9.03833 5.005 8.83667 4.93167 8.65333 4.74833C8.17667 4.27167 7.82833 3.09833 7.82833 3.09833L7.425 3.245C7.44333 3.3 7.81 4.565 8.37833 5.115C8.58 5.335 8.81833 5.445 9.03833 5.445ZM4.95 4.19833H6.06833V8.69H4.95V4.19833Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M5.1709 4.19849H5.8309V8.69015H5.1709V4.19849Z"
                                            fill="#FFCE31" />
                                        <path
                                            d="M1.79785 0C2.10952 2.82333 3.64952 5.07833 5.50119 5.07833C7.35285 5.07833 8.89285 2.82333 9.20452 0H1.79785Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M2.50977 0C2.76643 2.86 4.0131 5.13333 5.4981 5.13333C6.9831 5.13333 8.22976 2.86 8.48643 0H2.50977Z"
                                            fill="#FFCE31" />
                                        <path
                                            d="M8.35867 9.5333H2.63867C2.63867 9.5333 3.92201 7.8833 5.49867 7.8833C7.07534 7.8833 8.35867 9.5333 8.35867 9.5333Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M7.68072 9.53237H3.31738C3.31738 9.53237 4.28905 7.8457 5.49905 7.8457C6.70905 7.8457 7.68072 9.53237 7.68072 9.53237Z"
                                            fill="#FFCE31" />
                                        <path
                                            d="M1.79785 9.90112H9.20452V11.0011H1.79785V9.90112Z"
                                            fill="#BC845E" />
                                        <path
                                            d="M2.63867 9.53223H8.37701V9.89889H2.63867V9.53223Z"
                                            fill="#916140" />
                                        <path
                                            d="M3.66699 10.175H7.33366V10.725H3.66699V10.175Z"
                                            fill="#F2B200" />
                                        <path
                                            d="M1.79785 9.90112H2.16452V11.0011H1.79785V9.90112Z"
                                            fill="#CE9C7A" />
                                        <path
                                            d="M8.83594 9.90112H9.2026V11.0011H8.83594V9.90112Z"
                                            fill="#916140" />
                                        <path
                                            d="M3.84961 10.175H7.14961V10.725H3.84961V10.175Z"
                                            fill="#FFCE31" />
                                    </svg>
                                    Bestseller
                                </p>
                                <p class="video-modal-pr-top-title-ssv13">${prd.title}</p>
                                <p class="video-modal-pr-top-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                                    <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                                    <label class="video-modal-pr-top-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                                </p>
                                <div class="video-modal-pr-top-ratting-ssv13" style="${prd.avgRating == 0 ? 'display: none !important;' : ''}">
                                    <p>
                                        <svg width="13" height="12"
                                            viewBox="0 0 13 12" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.34814 0.440674L7.69523 4.58657H12.0545L8.52777 7.14888L9.87486 11.2948L6.34814 8.73247L2.82143 11.2948L4.16852 7.14888L0.641805 4.58657H5.00106L6.34814 0.440674Z"
                                                fill="#0B895C" />
                                        </svg>
                                        ${prd.avgRating}
                                        <svg style="width: 7px !important;" width="1" height="12" viewBox="0 0 1 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="0.5" y1="2.18557e-08" x2="0.499999" y2="12" stroke="#A2A2A4"/>
                                        </svg>
                                        <svg style="height: 11px !important;" width="11" height="11"
                                            viewBox="0 0 11 11" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0 11C0 9.93913 0.421427 8.92172 1.17157 8.17157C1.92172 7.42143 2.93913 7 4 7C5.06087 7 6.07828 7.42143 6.82843 8.17157C7.57857 8.92172 8 9.93913 8 11H7C7 10.2044 6.68393 9.44129 6.12132 8.87868C5.55871 8.31607 4.79565 8 4 8C3.20435 8 2.44129 8.31607 1.87868 8.87868C1.31607 9.44129 1 10.2044 1 11H0ZM4 6.5C2.3425 6.5 1 5.1575 1 3.5C1 1.8425 2.3425 0.5 4 0.5C5.6575 0.5 7 1.8425 7 3.5C7 5.1575 5.6575 6.5 4 6.5ZM4 5.5C5.105 5.5 6 4.605 6 3.5C6 2.395 5.105 1.5 4 1.5C2.895 1.5 2 2.395 2 3.5C2 4.605 2.895 5.5 4 5.5ZM8.142 7.3515C8.84467 7.66796 9.44099 8.18062 9.85929 8.82786C10.2776 9.47509 10.5001 10.2294 10.5 11H9.5C9.50011 10.422 9.33328 9.85625 9.01954 9.37079C8.70581 8.88534 8.25854 8.50083 7.7315 8.2635L8.1415 7.3515H8.142ZM7.798 1.7065C8.30176 1.91415 8.73248 2.26677 9.03551 2.71962C9.33853 3.17246 9.5002 3.70512 9.5 4.25C9.50021 4.93617 9.24385 5.59761 8.78127 6.10441C8.31869 6.61121 7.68333 6.92673 7 6.989V5.9825C7.37047 5.92944 7.71417 5.75901 7.98065 5.49623C8.24713 5.23345 8.42235 4.89216 8.48058 4.52247C8.53881 4.15277 8.47699 3.77415 8.30419 3.44218C8.13139 3.1102 7.85672 2.84237 7.5205 2.678L7.798 1.7065Z"
                                                fill="#5D5D60" />
                                        </svg>
                                        ${Object.keys(prd.pReviews).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                        
            `;

            mSliderReview += `
                <div class="video-modal-pr-bottom-ssv13" style="display: ${pi == 0 ? 'block' : 'none'};">                
            `;

            if (Object.keys(prd.pReviews).length) {
                prd.pReviews.forEach(review => {
                    mSliderReview += `
                        <div class="video-modal-pr-bottom-review-card-ssv13">
                            <div>
                                ${reviewStarsSlider[Math.round(review.c_rating)]}
                            </div>
                            <p class="video-modal-pr-bottom-rc-review-ssv13">${review.c_comment}</p>
                            <h4 class="video-modal-pr-bottom-rc-user-ssv13">
                                ${review.c_name}
                                <svg width="4" height="5" viewBox="0 0 4 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.643066" width="4" height="4"
                                        rx="2" fill="#8B8B8E" />
                                </svg>
                                <label>${getTimeAgossv13((review.created_at_time * 1000))}</label>
                            </h4>
                        </div>
                    `;

                    mReviews += `
                        <div class="video-modal-sr-pb-pi-review-card-ssv13">
                            <div>
                                ${reviewStars[Math.round(review.c_rating)]}
                            </div>
                            <p class="video-modal-sr-pb-pi-rc-review-ssv13">${review.c_comment}</p>
                            <h4 class="video-modal-sr-pb-pi-rc-user-ssv13">
                                ${review.c_name}
                                <svg width="4" height="5" viewBox="0 0 4 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.643066" width="4" height="4" rx="2" fill="#8B8B8E" />
                                </svg>
                                <label>${getTimeAgossv13((review.created_at_time * 1000))}</label>
                            </h4>
                        </div>
                    `;
                });
            } else {
                mSliderReview += `
                <p style="text-align: center; margin: 0 !important; color: #8B8B8E; font-size: 14px; position: absolute; width: 100%; top: calc(50% - 24px); left: 0;">
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.153 23.6333L12.4999 19.5208L19.8467 23.6333L18.9778 19.901L16.6097 17.9804L16.9238 19.6094L12.4999 17.1333L8.07591 19.6094L9.06445 14.6375L5.34258 11.1948L7.63788 10.6571L5.6274 9.03676L3.54605 9.32061L0.611328 9.65831L6.79362 15.375L5.153 23.6333Z" fill="#8B8B8E"/>
                        <path d="M16.027 8.66665L12.4999 1.02081C11.8426 2.6931 9.41416 5.95152 8.78148 7.28272L10.6988 8.81584L12.4999 5.99477L14.6228 10.5979L19.6572 11.1948L17.7962 12.9161L16.8404 13.8036L18.5439 15.1586L19.7517 13.9458L21.2973 12.5166L24.3884 9.65831L16.027 8.66665Z" fill="#8B8B8E"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.506 21.1L4.6582 7.459L5.96916 5.83984L22.817 19.4808L21.506 21.1Z" fill="#8B8B8E"/>
                    </svg><br>            
                    No review has been recorded
                </p>`;
            }

            mSliderReview += `
                </div>
            `;

            mProductList += `
                <div class="video-modal-sr-pb-product-card-ssv13"
                    onclick="openProductDetailssv13(this, ${pi});">
                    <div class="video-modal-sr-pb-pc-img-ssv13">
                        <img class="video-modal-sr-pb-pc-pimage-ssv13"
                            src="${productImagessv13(prd.image, 110)}"
                            alt="Product thumbnail" title="Product thumbnail" style="${ssv13_brandCustomizations.product_reviews == '0' ? '' : 'border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0;'}" />
                        <p class="video-modal-sr-pb-pc-ratting-ssv13" style="${prd.avgRating == 0 ? 'display: none !important;' : ''} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0.643066L9.79611 6.17093H15.6085L10.9062 9.58734L12.7023 15.1152L8 11.6988L3.29772 15.1152L5.09383 9.58734L0.391548 6.17093H6.20389L8 0.643066Z"
                                    fill="#0B895C" />
                            </svg>
                            ${prd.avgRating}
                            <svg width="2" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.408 13.072H0.26V0.00999963H1.408V13.072Z" fill="#A2A2A4"/>
                            </svg>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.166504 12.4766C0.166504 11.2389 0.658169 10.0519 1.53334 9.17673C2.40851 8.30156 3.59549 7.8099 4.83317 7.8099C6.07085 7.8099 7.25783 8.30156 8.133 9.17673C9.00817 10.0519 9.49984 11.2389 9.49984 12.4766H8.33317C8.33317 11.5483 7.96442 10.6581 7.30804 10.0017C6.65167 9.34531 5.76143 8.97656 4.83317 8.97656C3.90491 8.97656 3.01467 9.34531 2.3583 10.0017C1.70192 10.6581 1.33317 11.5483 1.33317 12.4766H0.166504ZM4.83317 7.22656C2.89942 7.22656 1.33317 5.66031 1.33317 3.72656C1.33317 1.79281 2.89942 0.226562 4.83317 0.226562C6.76692 0.226562 8.33317 1.79281 8.33317 3.72656C8.33317 5.66031 6.76692 7.22656 4.83317 7.22656ZM4.83317 6.0599C6.12234 6.0599 7.1665 5.01573 7.1665 3.72656C7.1665 2.4374 6.12234 1.39323 4.83317 1.39323C3.544 1.39323 2.49984 2.4374 2.49984 3.72656C2.49984 5.01573 3.544 6.0599 4.83317 6.0599ZM9.6655 8.21998C10.4853 8.58918 11.181 9.18729 11.669 9.94239C12.157 10.6975 12.4166 11.5775 12.4165 12.4766H11.2498C11.25 11.8022 11.0553 11.1422 10.6893 10.5758C10.3233 10.0095 9.80147 9.56086 9.18659 9.28398L9.66492 8.21998H9.6655ZM9.26417 1.63415C9.85189 1.8764 10.3544 2.28779 10.7079 2.81611C11.0615 3.34443 11.2501 3.96587 11.2498 4.60156C11.2501 5.40209 10.951 6.17378 10.4113 6.76504C9.87165 7.35631 9.13039 7.72442 8.33317 7.79706V6.62281C8.76539 6.56091 9.16637 6.36207 9.47727 6.0555C9.78816 5.74892 9.99257 5.35075 10.0605 4.91944C10.1284 4.48813 10.0563 4.0464 9.85473 3.6591C9.65313 3.2718 9.33268 2.95933 8.94042 2.76756L9.26417 1.63415Z"
                                    fill="#5D5D60" />
                            </svg>
                            ${Object.keys(prd.pReviews).length}
                        </p>
                        <p class="video-modal-sr-pb-pc-ratting-ssv13" style="${prd.avgRating == 0 ? '' : 'display: none !important;'} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <svg style="margin-top: 1px !important;" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5814 12.6704L7.49974 10.477L11.4181 12.6704L10.9546 10.6798L9.69162 9.65549L9.85918 10.5242L7.49974 9.20369L5.14029 10.5242L5.66751 7.87257L3.68251 6.03646L4.90667 5.74971L3.83442 4.88553L2.72436 5.03691L1.15918 5.21702L4.4564 8.26591L3.5814 12.6704Z" fill="#5D5D60"/>
                                <path d="M9.38085 4.68813L7.49974 0.610352C7.14917 1.50224 5.85402 3.24006 5.5166 3.95003L6.53916 4.7677L7.49974 3.26313L8.63196 5.71813L11.317 6.03646L10.3245 6.95452L9.8147 7.42783L10.7232 8.1505L11.3674 7.50368L12.1917 6.74146L13.8403 5.21702L9.38085 4.68813Z" fill="#5D5D60"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3029 11.3194L3.31738 4.04421L4.01656 3.18066L13.002 10.4558L12.3029 11.3194Z" fill="#5D5D60"/>
                            </svg>   
                            no-review                     
                        </p>
                    </div>
                    <div class="video-modal-sr-pb-pc-details-ssv13">
                        <p class="video-modal-sr-pb-pc-title-ssv13">${prd.title}</p>
                        <p class="video-modal-sr-pb-pc-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                            <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                            <label class="video-modal-sr-pb-pc-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                        </p>
                        <div class="video-modal-sr-pb-pc-cta-ssv13" style="${ssv13_brandCustomizations.cta_on_tile == '0' ? 'display: none !important;' : ''}">
                            <button tabindex="-1" style="${ssv13_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important;' : ''} background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '1'); window.location='${prd.url}';" class="video-modal-sr-pb-pc-cta-buy-ssv13 JS-pc-ignore-ssv13">
                                ${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}
                            </button>
                            <button tabindex="-1" style="${ssv13_brandCustomizations.buy_now == '0' ? 'width: 100% !important;' : ''} ${ssv13_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '2'); addtocartssv13(${video.video_id}, ${prd.product_id}, '${prd.sku_code}', this, 1);" class="video-modal-sr-pb-pc-cta-cart-ssv13 JS-pc-ignore-ssv13">
                                <svg class="JS-pc-ignore-ssv13" width="21" height="22"
                                    viewBox="0 0 21 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="JS-pc-ignore-ssv13" 
                                        d="M2 14.6431V2.64307H0V0.643066H3C3.26522 0.643066 3.51957 0.748423 3.70711 0.93596C3.89464 1.1235 4 1.37785 4 1.64307V13.6431H16.438L18.438 5.64307H18V3.64307H19.0796H19.72C19.872 3.64307 20.022 3.67773 20.1586 3.7444C20.2952 3.81108 20.4148 3.90802 20.5083 4.02785C20.6019 4.14769 20.6668 4.28727 20.6983 4.43598C20.7298 4.58469 20.7269 4.73862 20.69 4.88607L18.19 14.8861C18.1358 15.1023 18.011 15.2943 17.8352 15.4314C17.6595 15.5686 17.4429 15.6431 17.22 15.6431H3C2.73478 15.6431 2.48043 15.5377 2.29289 15.3502C2.10536 15.1626 2 14.9083 2 14.6431ZM4 21.6431C3.46957 21.6431 2.96086 21.4324 2.58579 21.0573C2.21071 20.6822 2 20.1735 2 19.6431C2 19.1126 2.21071 18.6039 2.58579 18.2289C2.96086 17.8538 3.46957 17.6431 4 17.6431C4.53043 17.6431 5.03914 17.8538 5.41421 18.2289C5.78929 18.6039 6 19.1126 6 19.6431C6 20.1735 5.78929 20.6822 5.41421 21.0573C5.03914 21.4324 4.53043 21.6431 4 21.6431ZM16 21.6431C15.4696 21.6431 14.9609 21.4324 14.5858 21.0573C14.2107 20.6822 14 20.1735 14 19.6431C14 19.1126 14.2107 18.6039 14.5858 18.2289C14.9609 17.8538 15.4696 17.6431 16 17.6431C16.5304 17.6431 17.0391 17.8538 17.4142 18.2289C17.7893 18.6039 18 19.1126 18 19.6431C18 20.1735 17.7893 20.6822 17.4142 21.0573C17.0391 21.4324 16.5304 21.6431 16 21.6431Z"
                                        fill="#454549" />
                                    <path class="JS-pc-ignore-ssv13" 
                                        d="M9.74728 6.25806V2.60254H11.3168V6.16314H14.8901V7.92871H11.3168V11.6025H9.74728V7.92871H5.89014V6.25806H9.74728Z"
                                        fill="#454549" />
                                </svg>
                                <label style="${ssv13_brandCustomizations.buy_now == '1' ? 'display: none !important;' : 'display: inline-block !important;'}">Add to cart</label>
                            </button>
                        </div>
                        ${plBadge[prd.product_tags]}
                    </div>
                </div>
            `;

            let pbhCut = 0;
            if (window.innerWidth > 768) {
                pbhCut += 27;
                pbhCut += prd.avgRating > 0 && ssv13_brandCustomizations.product_reviews == '1' ? 57 : 0;
                pbhCut += ssv13_brandCustomizations.buy_now == '0' && ssv13_brandCustomizations.add_to_cart == '0' ? 0 : 60;
            } else {
                pbhCut += prd.avgRating > 0 && ssv13_brandCustomizations.product_reviews == '1' ? 87 : 30;
                pbhCut += ssv13_brandCustomizations.buy_now == '0' && ssv13_brandCustomizations.add_to_cart == '0' ? 0 : 60;
            }
            mProducts += `
                <div class="video-modal-sr-pb-product-info-ssv13" style="transform: none; display: none;">
                    <div class="video-modal-sr-pb-pi-header-ssv13">
                        <svg class="video-modal-sr-pb-pi-drager-ssv13" width="33" height="4"
                            viewBox="0 0 33 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                fill="#1A1A1A" fill-opacity="0.25" />
                        </svg>

                        <p class="video-modal-sr-pb-pi-back-ssv13"
                            onclick="closeProductDetailssv13(this);">
                            <svg width="6" height="11" viewBox="0 0 6 11" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.121 5.64312L5.8335 9.35562L4.773 10.4161L0 5.64312L4.773 0.870117L5.8335 1.93062L2.121 5.64312Z"
                                    fill="#454549" />
                            </svg>
                            Back
                        </p>
                        <div class="video-modal-sr-pb-pi-review-btn-ssv13" onclick="this.querySelector('.CSS-review-toogler-D-ssv13').dispatchEvent(new Event('click'));" style="${prd.avgRating == 0 ? 'display: none !important;' : ''} ${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <div class="video-modal-sr-pb-pi-review-btnL-ssv13">
                                <p class="video-modal-sr-pb-pi-review-title-ssv13">Reviews</p>
                                <p class="video-modal-sr-pb-pi-review-count-ssv13">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 0.643066L9.79611 6.17093H15.6085L10.9062 9.58734L12.7023 15.1152L8 11.6988L3.29772 15.1152L5.09383 9.58734L0.391548 6.17093H6.20389L8 0.643066Z"
                                            fill="#0B895C" />
                                    </svg>
                                    ${prd.avgRating}
                                    <svg width="2" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.908 13.072H0.76V0.00999963H1.908V13.072Z" fill="#A2A2A4"/>
                                    </svg>
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.166504 12.4766C0.166504 11.2389 0.658169 10.0519 1.53334 9.17673C2.40851 8.30156 3.59549 7.8099 4.83317 7.8099C6.07085 7.8099 7.25783 8.30156 8.133 9.17673C9.00817 10.0519 9.49984 11.2389 9.49984 12.4766H8.33317C8.33317 11.5483 7.96442 10.6581 7.30804 10.0017C6.65167 9.34531 5.76143 8.97656 4.83317 8.97656C3.90491 8.97656 3.01467 9.34531 2.3583 10.0017C1.70192 10.6581 1.33317 11.5483 1.33317 12.4766H0.166504ZM4.83317 7.22656C2.89942 7.22656 1.33317 5.66031 1.33317 3.72656C1.33317 1.79281 2.89942 0.226562 4.83317 0.226562C6.76692 0.226562 8.33317 1.79281 8.33317 3.72656C8.33317 5.66031 6.76692 7.22656 4.83317 7.22656ZM4.83317 6.0599C6.12234 6.0599 7.1665 5.01573 7.1665 3.72656C7.1665 2.4374 6.12234 1.39323 4.83317 1.39323C3.544 1.39323 2.49984 2.4374 2.49984 3.72656C2.49984 5.01573 3.544 6.0599 4.83317 6.0599ZM9.6655 8.21998C10.4853 8.58918 11.181 9.18729 11.669 9.94239C12.157 10.6975 12.4166 11.5775 12.4165 12.4766H11.2498C11.25 11.8022 11.0553 11.1422 10.6893 10.5758C10.3233 10.0095 9.80147 9.56086 9.18659 9.28398L9.66492 8.21998H9.6655ZM9.26417 1.63415C9.85189 1.8764 10.3544 2.28779 10.7079 2.81611C11.0615 3.34443 11.2501 3.96587 11.2498 4.60156C11.2501 5.40209 10.951 6.17378 10.4113 6.76504C9.87165 7.35631 9.13039 7.72442 8.33317 7.79706V6.62281C8.76539 6.56091 9.16637 6.36207 9.47727 6.0555C9.78816 5.74892 9.99257 5.35075 10.0605 4.91944C10.1284 4.48813 10.0563 4.0464 9.85473 3.6591C9.65313 3.2718 9.33268 2.95933 8.94042 2.76756L9.26417 1.63415Z"
                                            fill="#5D5D60" />
                                    </svg>
                                    ${Object.keys(prd.pReviews).length}
                                </p>
                            </div>
                            <div class="video-modal-sr-pb-pi-review-btnR-ssv13">
                                <svg class="CSS-review-toogler-D-ssv13" onclick="openReviewssv13(this);" style="pointer-events: none;" width="18" height="19"
                                    viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.81066 4.39307H7.5V2.89307H2.25V8.14307H3.75V5.45372L6.96967 8.67339L8.03032 7.61273L4.81066 4.39307ZM15.75 11.1431H14.25V13.8324L11.0303 10.6127L9.96968 11.6734L13.1894 14.8931H10.5V16.3931H15.75V11.1431Z"
                                        fill="#5D5D60" />
                                </svg>
                                <svg class="CSS-review-toogler-P-ssv13" onclick="openReviewssv13(this);" style="pointer-events: none;" width="12" height="8" 
                                    viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.99962 4.97656L10.1246 0.851562L11.303 2.0299L5.99962 7.33323L0.696289 2.0299L1.87462 0.851562L5.99962 4.97656Z" fill="#454549"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="video-modal-sr-pb-pi-middle-ssv13" style="height: calc(100% - ${pbhCut}px);">
                        <div class="video-modal-sr-pb-pi-reviews-ssv13">
                            ${mReviews}
                        </div>
                        <div class="video-modal-sr-pb-pi-pclosed-ssv13" onclick="this.querySelector('.CSS-product-toogler-ssv13').dispatchEvent(new Event('click'));">
                            <div class="video-modal-sr-pb-pic-pimg-ssv13">
                                <img src="${productImagessv13(prd.image, 80)}"
                                    alt="Product thumbnail" title="Product thumbnail" />
                            </div>
                            <div class="video-modal-sr-pb-pic-title-ssv13">
                                <p>${prd.title}</p>
                            </div>
                            <div class="video-modal-sr-pb-pic-btn-ssv13">
                                <svg style="pointer-events: none;" class="CSS-product-toogler-ssv13" onclick="closeReviewssv13(this);"
                                    width="18" height="19" viewBox="0 0 18 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.81066 4.39307H7.5V2.89307H2.25V8.14307H3.75V5.45372L6.96967 8.67339L8.03032 7.61273L4.81066 4.39307ZM15.75 11.1431H14.25V13.8324L11.0303 10.6127L9.96968 11.6734L13.1894 14.8931H10.5V16.3931H15.75V11.1431Z"
                                        fill="#5D5D60" />
                                </svg>
                            </div>
                        </div>
                        <div class="video-modal-sr-pb-pi-pdetails-ssv13">
                            <div class="video-modal-sr-pb-pi-pimage-ssv13">
                                <img class="video-modal-sr-pb-pi-pimg-ssv13"
                                    src="${productImagessv13(prd.image, 500)}"
                                    alt="Product thumbnail" title="Product thumbnail" />
                            </div>

                            ${pbBadge[prd.product_tags]}                           

                            <h3 class="video-modal-sr-pb-pi-ptitle-ssv13">${prd.title}</h3>

                            <p class="video-modal-sr-pb-pi-pprice-ssv13 JS-PB-dynamic-price-ssv13 JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13" style="${ssv13_brandCustomizations.product_price_status == '0' ? 'display: none !important;' : ''}">${prd.currencysymbols}${formatCurrencyssv13(prd.discount_price)}
                                <strike style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${prd.currencysymbols}${formatCurrencyssv13(prd.price)}</strike>
                                <label class="video-modal-sr-pb-pi-off-ssv13" style="${parseFloat(prd.price) > parseFloat(prd.discount_price) ? '' : 'display: none !important;'}">${parseFloat(prd.price) > parseFloat(prd.discount_price) ? Math.round(((prd.price - prd.discount_price) * 100) / prd.price) : ''}%</label>
                            </p>

                            <div class="JS-product-static-options-${video.video_id}-${prd.product_id}-ssv13" style="display: none;">
                            </div>                            

                            <div class="JS-product-dynamic-options-${video.video_id}-${prd.product_id}-ssv13" style="display: none;">
                            </div>                            

                            <div class="JS-product-quantity-ssv13" style="${ssv13_brandCustomizations.add_to_cart == '0' || ssv13_brandCustomizations.product_qty == '0' ? 'display: none !important;' : ''}">
                                <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">Qty.</h3>
                                <div class="video-modal-sr-pb-pi-qty-ssv13">
                                    <button tabindex="-1" class="qty-minus-ssv13" onclick="changeQtyssv13('minus', this);" disabled="disabled">
                                        <svg width="12" height="3" viewBox="0 0 12 3" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.166504 0.811035H11.8332V2.4777H0.166504V0.811035Z"
                                                fill="#8B8B8E" />
                                        </svg>
                                    </button>
                                    <input tabindex="-1" type="text" class="qty-val-ssv13" value="1" readonly />
                                    <button tabindex="-1" class="qty-plus-ssv13" onclick="changeQtyssv13('plus', this);">
                                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.1665 5.81104V0.811035H6.83317V5.81104H11.8332V7.4777H6.83317V12.4777H5.1665V7.4777H0.166504V5.81104H5.1665Z"
                                                fill="#8B8B8E" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">Details</h3>
                            <section class="video-modal-sr-pb-pi-pdesc-ssv13">
                                ${prd.desription}
                            </section>
                        </div>
                    </div>
                    <div class="video-modal-sr-pb-pi-footer-ssv13">                        
                        <button tabindex="-1" style="${ssv13_brandCustomizations.buy_now == '0' ? 'width: 100% !important; margin: 0 !important;' : ''} ${ssv13_brandCustomizations.add_to_cart == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '2'); addtocartssv13(${video.video_id}, ${prd.product_id}, '${prd.sku_code}', this, ${ssv13_brandCustomizations.product_qty == '0' ? 1 : 0});" class="video-modal-sr-pb-pi-cta-cart-ssv13">
                            <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 14.6431V2.64307H0V0.643066H3C3.26522 0.643066 3.51957 0.748423 3.70711 0.93596C3.89464 1.1235 4 1.37785 4 1.64307V13.6431H16.438L18.438 5.64307H18V3.64307H19.0796H19.72C19.872 3.64307 20.022 3.67773 20.1586 3.7444C20.2952 3.81108 20.4148 3.90802 20.5083 4.02785C20.6019 4.14769 20.6668 4.28727 20.6983 4.43598C20.7298 4.58469 20.7269 4.73862 20.69 4.88607L18.19 14.8861C18.1358 15.1023 18.011 15.2943 17.8352 15.4314C17.6595 15.5686 17.4429 15.6431 17.22 15.6431H3C2.73478 15.6431 2.48043 15.5377 2.29289 15.3502C2.10536 15.1626 2 14.9083 2 14.6431ZM4 21.6431C3.46957 21.6431 2.96086 21.4324 2.58579 21.0573C2.21071 20.6822 2 20.1735 2 19.6431C2 19.1126 2.21071 18.6039 2.58579 18.2289C2.96086 17.8538 3.46957 17.6431 4 17.6431C4.53043 17.6431 5.03914 17.8538 5.41421 18.2289C5.78929 18.6039 6 19.1126 6 19.6431C6 20.1735 5.78929 20.6822 5.41421 21.0573C5.03914 21.4324 4.53043 21.6431 4 21.6431ZM16 21.6431C15.4696 21.6431 14.9609 21.4324 14.5858 21.0573C14.2107 20.6822 14 20.1735 14 19.6431C14 19.1126 14.2107 18.6039 14.5858 18.2289C14.9609 17.8538 15.4696 17.6431 16 17.6431C16.5304 17.6431 17.0391 17.8538 17.4142 18.2289C17.7893 18.6039 18 19.1126 18 19.6431C18 20.1735 17.7893 20.6822 17.4142 21.0573C17.0391 21.4324 16.5304 21.6431 16 21.6431Z"
                                    fill="#454549"></path>
                                <path
                                    d="M9.74728 6.25806V2.60254H11.3168V6.16314H14.8901V7.92871H11.3168V11.6025H9.74728V7.92871H5.89014V6.25806H9.74728Z"
                                    fill="#454549"></path>
                            </svg>
                            Add to cart
                        </button>
                        <button tabindex="-1" style="${ssv13_brandCustomizations.add_to_cart == '0' ? 'width: 100% !important; margin: 0 !important;' : ''} background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' ? 'display: none !important;' : ''}" onclick="CTAClickssv13(${prd.product_id}, ${video.designer_id}, ${video.video_id}, '1'); window.location='${prd.url}';" class="video-modal-sr-pb-pi-cta-buy-ssv13">
                            ${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}
                        </button>
                    </div>
                </div>
            `;

            pi++;
        });

        mThumbs += i == 0 ? `
            <div class="video-modal-sl-thumb-toggler-ssv13" style="display: none !important;" onclick="toggleVideoThumbssv13(this)">
                <img src="${video.cover_image}"
                    alt="Video thumbnail">
            </div>
            <div class="video-modal-sl-thumb-container-ssv13">
                <img class="video-modal-sl-thumb-ssv13 CSS-img-thumb-ssv13 active-ssv13" onclick="changeModalVideossv13(${i})"
                    src="${video.cover_image}" alt="Video thumbnail">
                <div class="CSS-img-thumb-ssv13" onclick="this.previousElementSibling.dispatchEvent(new Event('click'));"></div>
            </div>
        ` : `
            <div class="video-modal-sl-thumb-container-ssv13">
                <img class="video-modal-sl-thumb-ssv13 CSS-img-thumb-ssv13" onclick="changeModalVideossv13(${i})"
                    src="${video.cover_image}" alt="Video thumbnail">
                <div class="CSS-img-thumb-ssv13" onclick="this.previousElementSibling.dispatchEvent(new Event('click'));"></div>
            </div>
        `;

        mSlides += `
            <div class="swiper-slide swiper-slide-m">
                <div class="video-modal-sl-video-container-ssv ${!Object.keys(video.product).length ? 'no-products-slide-ssv13' : ''}">
                    <video id="ssv13-video-m-${video.video_id}" data-src="${video.server_url}" data-products="${Object.keys(video.product).length}" data-id="${video.video_id}" class="video-modal-sl-video-ssv13 ${video.is_landscape == '0' ? 'JS-mvideo-L-ssv13' : 'JS-mvideo-P-ssv13'}"
                        ontimeupdate="updateProgressbarssv13(this);"
                        onclick="this.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13 svg').dispatchEvent(new Event('click'));" 
                        onpause="this.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13').style.display = 'flex';" 
                        onplay="this.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13').style.display = 'none';" 
                        poster="${video.cover_image}"
                        loop playsinline muted>                        
                    </video>
                    <div class="video-modal-sl-controls-ssv13" onclick="this.querySelector('.video-modal-sl-controls-ssv13 svg').dispatchEvent(new Event('click'));">
                        <svg onclick="videoPlayPausessv13(this);" style="pointer-events: none;" 
                            class="video-modal-sl-video-play-ssv13" width="32" height="38"
                            viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.5 0.916626H5.66667V37.0833H0.5V0.916626ZM26.3333 0.916626H31.5V37.0833H26.3333V0.916626Z"
                                fill="#F5F5F5" />
                        </svg>
                    </div>
                    <div class="video-modal-sl-top-controls-ssv13">
                        <label class="cart-count-ssv13" style="${ssv13_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}">0</label>
                        <svg style="${ssv13_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}" onclick="window.location='${ssv13_storeURL}/${ssv13_brandCustomizations.cust_cart_redirection_link}'" class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-cart-ssv13"
                            width="18" height="19" viewBox="0 0 18 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.83336 4.34494L0.130859 1.64328L1.31003 0.464111L4.01169 3.16661H16.7134C16.8433 3.1666 16.9713 3.19696 17.0874 3.25525C17.2035 3.31354 17.3043 3.39817 17.3819 3.50236C17.4594 3.60655 17.5116 3.72743 17.5341 3.85535C17.5566 3.98327 17.549 4.11469 17.5117 4.23911L15.5117 10.9058C15.4602 11.0775 15.3548 11.2281 15.211 11.3351C15.0671 11.4422 14.8926 11.5 14.7134 11.4999H4.50003V13.1666H13.6667V14.8333H3.66669C3.44568 14.8333 3.23372 14.7455 3.07744 14.5892C2.92116 14.4329 2.83336 14.221 2.83336 13.9999V4.34494ZM4.50003 4.83328V9.83328H14.0934L15.5934 4.83328H4.50003ZM4.08336 18.1666C3.75184 18.1666 3.4339 18.0349 3.19948 17.8005C2.96506 17.5661 2.83336 17.2481 2.83336 16.9166C2.83336 16.5851 2.96506 16.2671 3.19948 16.0327C3.4339 15.7983 3.75184 15.6666 4.08336 15.6666C4.41488 15.6666 4.73282 15.7983 4.96724 16.0327C5.20166 16.2671 5.33336 16.5851 5.33336 16.9166C5.33336 17.2481 5.20166 17.5661 4.96724 17.8005C4.73282 18.0349 4.41488 18.1666 4.08336 18.1666ZM14.0834 18.1666C13.7518 18.1666 13.4339 18.0349 13.1995 17.8005C12.9651 17.5661 12.8334 17.2481 12.8334 16.9166C12.8334 16.5851 12.9651 16.2671 13.1995 16.0327C13.4339 15.7983 13.7518 15.6666 14.0834 15.6666C14.4149 15.6666 14.7328 15.7983 14.9672 16.0327C15.2017 16.2671 15.3334 16.5851 15.3334 16.9166C15.3334 17.2481 15.2017 17.5661 14.9672 17.8005C14.7328 18.0349 14.4149 18.1666 14.0834 18.1666Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-toggle-ssv13"
                            onclick="openSharePopupssv13(this);" width="3" height="16"
                            viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.5 0.5C0.8125 0.5 0.25 1.0625 0.25 1.75C0.25 2.4375 0.8125 3 1.5 3C2.1875 3 2.75 2.4375 2.75 1.75C2.75 1.0625 2.1875 0.5 1.5 0.5ZM1.5 13C0.8125 13 0.25 13.5625 0.25 14.25C0.25 14.9375 0.8125 15.5 1.5 15.5C2.1875 15.5 2.75 14.9375 2.75 14.25C2.75 13.5625 2.1875 13 1.5 13ZM1.5 6.75C0.8125 6.75 0.25 7.3125 0.25 8C0.25 8.6875 0.8125 9.25 1.5 9.25C2.1875 9.25 2.75 8.6875 2.75 8C2.75 7.3125 2.1875 6.75 1.5 6.75Z"
                                fill="white" />
                        </svg>
                        
                        <svg style="${ssv13_brandCustomizations.pip_mode == '1' ? '' : 'display: none !important;'}" class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-pip-ssv13" onclick="openPIPssv13();"
                            width="20" height="19" viewBox="0 0 20 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 0.356445C19.2652 0.356445 19.5196 0.461802 19.7071 0.649338C19.8946 0.836875 20 1.09123 20 1.35645V8.35645H18V2.35645H2V16.3564H8V18.3564H1C0.734784 18.3564 0.48043 18.2511 0.292893 18.0636C0.105357 17.876 0 17.6217 0 17.3564V1.35645C0 1.09123 0.105357 0.836875 0.292893 0.649338C0.48043 0.461802 0.734784 0.356445 1 0.356445H19ZM19 10.3564C19.2652 10.3564 19.5196 10.4618 19.7071 10.6493C19.8946 10.8369 20 11.0912 20 11.3564V17.3564C20 17.6217 19.8946 17.876 19.7071 18.0636C19.5196 18.2511 19.2652 18.3564 19 18.3564H11C10.7348 18.3564 10.4804 18.2511 10.2929 18.0636C10.1054 17.876 10 17.6217 10 17.3564V11.3564C10 11.0912 10.1054 10.8369 10.2929 10.6493C10.4804 10.4618 10.7348 10.3564 11 10.3564H19ZM18 12.3564H12V16.3564H18V12.3564ZM4.707 3.64945L6.957 5.89945L9 3.85645V9.35645H3.5L5.543 7.31345L3.293 5.06345L4.707 3.64945Z" fill="white"/>
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-volume-ssv13"
                            onclick="videoVolumessv13(this);" width="25" height="19"
                            viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-share-ssv13"
                            onclick="openSharePopupssv13(this);" width="23" height="19"
                            viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.0833 12.8104H8.91667C7.13957 12.8097 5.39608 13.2948 3.8747 14.2132C2.35331 15.1316 1.1119 16.4484 0.284668 18.0212C0.261416 17.7293 0.249851 17.4366 0.250001 17.1437C0.250001 11.1605 5.10008 6.31038 11.0833 6.31038V0.352051L22.4583 9.56038L11.0833 18.7687V12.8104ZM8.91667 10.6437H13.25V14.2274L19.0144 9.56038L13.25 4.89338V8.47705H11.0833C9.83777 8.47565 8.60661 8.74335 7.47409 9.26184C6.34157 9.78033 5.33443 10.5374 4.52158 11.4811C5.92051 10.9267 7.41188 10.6425 8.91667 10.6437Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-close-ssv13"
                            onclick="closeVideoModalssv13(true);" width="11" height="12"
                            viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.49962 4.82178L9.62462 0.696777L10.803 1.87511L6.67796 6.00011L10.803 10.1251L9.62462 11.3034L5.49962 7.17844L1.37462 11.3034L0.196289 10.1251L4.32129 6.00011L0.196289 1.87511L1.37462 0.696777L5.49962 4.82178Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="video-modal-sl-bottom-controls-ssv13 ${ssv13_brandCustomizations.buy_now == '1' && videoCTA ? 'video-CTA-on' : ''}">
                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-volume-ssv13"
                            onclick="videoVolumessv13(this);" width="25" height="19"
                            viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z"
                                fill="white" />
                        </svg>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-reviews-ssv13"
                            onclick="openReviewSliderssv13(this);" width="25" height="22"
                            viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">
                            <path
                                d="M4.13024 18.9615L0.960941 21.8479L0.960938 1.65385C0.960938 1.34783 1.0825 1.05434 1.29889 0.837954C1.51528 0.621566 1.80876 0.5 2.11478 0.5H22.884C23.19 0.5 23.4835 0.621566 23.6999 0.837954C23.9163 1.05434 24.0379 1.34783 24.0379 1.65385V17.8077C24.0379 18.1137 23.9163 18.4072 23.6999 18.6236C23.4835 18.84 23.19 18.9615 22.884 18.9615H4.13024ZM4.13024 16.6538H21.7302V2.80769H3.26863V17.4036L4.13024 16.6538Z"
                                fill="white" />
                            <path
                                d="M12.8743 12.6006L9.48317 14.3833L10.1305 10.6079L7.38778 7.93333L11.1793 7.38179L12.8743 3.94679L14.5705 7.38179L18.3609 7.93333L15.6182 10.6079L16.2643 14.3833L12.8743 12.6006Z"
                                fill="white" />
                        </svg>
                        <p class="video-modal-sl-vc-reviews-count-ssv13" style="${ssv13_brandCustomizations.product_reviews == '0' ? 'display: none !important;' : ''}">${Object.keys(video.product).length ? Object.keys(video.product[0].pReviews).length : 0}</p>

                        <svg class="video-modal-sl-video-control-ssv13 video-modal-sl-vc-comments-ssv13" style="${ssv13_brandCustomizations.comment_mode == '0' ? 'display: none !important;' : ''}" 
                            onclick="openCommentssv13(this, ${i}); loadCommentssv13('${video.video_id}');" width="22" height="19"
                            viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 11.676V11.614C9 9.10595 11.016 6.99595 13.753 6.38095C13.389 4.07895 10.959 2.19995 7.9 2.19995C4.58 2.19995 2 4.41295 2 6.97995C2 7.94895 2.36 8.87995 3.04 9.67795C3.072 9.71595 3.123 9.77195 3.192 9.84295C3.7799 10.4472 4.13488 11.24 4.194 12.081C4.90809 11.6681 5.74197 11.5122 6.557 11.639C6.723 11.665 6.859 11.685 6.962 11.699C7.63908 11.7869 8.32518 11.7788 9 11.675V11.676ZM9.457 13.627C8.54728 13.7832 7.61924 13.8017 6.704 13.682C6.5524 13.6614 6.40106 13.6391 6.25 13.615C5.87628 13.5567 5.49398 13.6318 5.17 13.827L3.266 14.975C3.11936 15.0653 2.94764 15.1063 2.776 15.092C2.67219 15.0841 2.57095 15.0559 2.47809 15.0088C2.38522 14.9618 2.30255 14.8969 2.23483 14.8178C2.1671 14.7387 2.11565 14.6471 2.08341 14.5481C2.05118 14.4491 2.03881 14.3447 2.047 14.241L2.197 12.46C2.21569 12.2365 2.18617 12.0117 2.11043 11.8007C2.03469 11.5897 1.9145 11.3975 1.758 11.237C1.67488 11.1522 1.5945 11.0648 1.517 10.975C0.563 9.85495 0 8.47295 0 6.97895C0 3.23495 3.537 0.199951 7.9 0.199951C11.96 0.199951 15.303 2.82695 15.75 6.20795C19.122 6.36095 21.8 8.72295 21.8 11.614C21.8 12.807 21.344 13.91 20.571 14.804C20.52 14.864 20.455 14.934 20.376 15.014C20.2496 15.1412 20.1523 15.2944 20.0909 15.4629C20.0294 15.6314 20.0052 15.8112 20.02 15.99L20.141 17.413C20.1471 17.4964 20.1367 17.5802 20.1103 17.6596C20.084 17.739 20.0422 17.8124 19.9873 17.8756C19.9325 17.9388 19.8657 17.9905 19.7909 18.0278C19.716 18.0651 19.6345 18.0872 19.551 18.093C19.4121 18.1043 19.2731 18.0714 19.154 17.999L17.611 17.082C17.348 16.9263 17.0391 16.8666 16.737 16.913C16.59 16.936 16.467 16.9529 16.369 16.966C16.053 17.006 15.729 17.028 15.4 17.028C12.706 17.028 10.402 15.62 9.457 13.627ZM16.434 14.937C16.9983 14.8501 17.5755 14.91 18.11 15.111C18.2502 14.5438 18.5408 14.0249 18.951 13.609C19.001 13.559 19.038 13.519 19.057 13.497C19.546 12.932 19.8 12.284 19.8 11.614C19.8 9.80995 17.897 8.19995 15.4 8.19995C12.903 8.19995 11 9.80995 11 11.614C11 13.418 12.903 15.028 15.4 15.028C15.641 15.028 15.88 15.012 16.114 14.982C16.194 14.972 16.302 14.957 16.434 14.936V14.937Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="video-modal-sl-thumb-toggler-ssv13" onclick="toggleVideoThumbssv13(this)">
                        <img src="${video.cover_image}"
                            alt="Video thumbnail">
                    </div>
                    <div class="video-modal-sl-progressbar-ssv13">
                        <progress min='0' max='100' value='0'></progress>
                    </div>   
                    <div class="video-modal-product-slider-ssv13">
                        <div class="swiper swiper-product-ssv13 swiper-product-ssv13-${video.video_id}-${no}">
                            <div class="swiper-wrapper">
                                ${mProductSlider}
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                    <div class="video-modal-product-reviews-ssv13">
                        <div class="video-modal-pr-drager-ssv13">
                            <svg width="33" height="4" viewBox="0 0 33 4" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                    fill="#1A1A1A" fill-opacity="0.25" />
                            </svg>
                        </div>
                        <div class="video-modal-pr-top-outer-ssv13">
                            <div class="swiper swiper-review-ssv13 swiper-review-ssv13-${video.video_id}-${no}">
                                <div class="swiper-wrapper">   
                                    ${mReviewSlider}
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                        <div class="video-modal-pr-bottom-outer-ssv13">
                            ${mSliderReview}
                        </div>
                    </div>            
                    <div class="video-model-marquee-ssv13" style="${ssv13_brandCustomizations.marque_txt == '0' ? 'display: none !important;' : ''}" onanimationend="hideMarqueessv13(this)">
                        <span>${ssv13_brandCustomizations.disclaimer_text}</span>
                    </div>        
                    <div class="video-modal-fade-white-L-ssv13" onclick="closePopupssv13(this);"
                        style="display: none;"></div>
                    <div class="video-modal-share-popup-ssv13">
                        <svg class="video-modal-sp-drager-ssv13" width="33" height="4"
                            viewBox="0 0 33 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                fill="#E8E8E8" />
                        </svg>
                        <p class="video-modal-sp-pip-ssv13" onclick="openPIPssv13();" style="${ssv13_brandCustomizations.pip_mode == '1' ? '' : 'display: none !important;'}">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_897_10050)">
                                    <path
                                        d="M15.75 2.25C15.9489 2.25 16.1397 2.32902 16.2803 2.46967C16.421 2.61032 16.5 2.80109 16.5 3V8.25H15V3.75H3V14.25H7.5V15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H15.75ZM15.75 9.75C15.9489 9.75 16.1397 9.82902 16.2803 9.96967C16.421 10.1103 16.5 10.3011 16.5 10.5V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H9.75C9.55109 15.75 9.36032 15.671 9.21967 15.5303C9.07902 15.3897 9 15.1989 9 15V10.5C9 10.3011 9.07902 10.1103 9.21967 9.96967C9.36032 9.82902 9.55109 9.75 9.75 9.75H15.75ZM15 11.25H10.5V14.25H15V11.25ZM5.03025 4.71975L6.71775 6.40725L8.25 4.875V9H4.125L5.65725 7.46775L3.96975 5.78025L5.03025 4.71975Z"
                                        fill="#454549" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_897_10050">
                                        <rect width="18" height="18" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Picture in picture
                        </p>
                        <p class="video-modal-sp-download-ssv13" style="display: none;">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.75 9.129L10.773 5.106L11.8335 6.1665L6 12L0.166504 6.1665L1.227 5.106L5.25 9.129V0H6.75V9.129Z"
                                    fill="#454549" />
                            </svg>
                            Download video
                        </p>                        
                        <div class="video-modal-sp-social-ssv13">
                            <div class="video-modal-sp-social-icon-ssv13" onclick="this.querySelector('input').dispatchEvent(new Event('click'));">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" width="36" height="36" rx="18"
                                        fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61405)">
                                        <path
                                            d="M23.2143 20.3568L22.036 19.1785L23.2143 18.0002C23.5238 17.6906 23.7694 17.3232 23.9369 16.9187C24.1044 16.5143 24.1906 16.0808 24.1906 15.6431C24.1906 15.2053 24.1044 14.7719 23.9369 14.3674C23.7694 13.963 23.5238 13.5955 23.2143 13.286C22.9048 12.9765 22.5373 12.7309 22.1329 12.5634C21.7284 12.3959 21.295 12.3097 20.8572 12.3097C20.4195 12.3097 19.986 12.3959 19.5816 12.5634C19.1771 12.7309 18.8097 12.9765 18.5001 13.286L17.3218 14.4643L16.1435 13.286L17.3218 12.1077C18.2621 11.1826 19.5298 10.6665 20.8488 10.6719C22.1678 10.6773 23.4313 11.2036 24.364 12.1363C25.2967 13.069 25.823 14.3325 25.8284 15.6515C25.8338 16.9705 25.3177 18.2382 24.3926 19.1785L23.2143 20.3568ZM20.8568 22.7143L19.6785 23.8927C19.2156 24.3632 18.6641 24.7374 18.0559 24.9937C17.4476 25.25 16.7946 25.3833 16.1346 25.386C15.4746 25.3887 14.8206 25.2607 14.2102 25.0093C13.5999 24.758 13.0454 24.3883 12.5787 23.9216C12.112 23.4549 11.7423 22.9004 11.491 22.2901C11.2396 21.6797 11.1116 21.0257 11.1143 20.3657C11.117 19.7057 11.2503 19.0527 11.5066 18.4444C11.7629 17.8362 12.1371 17.2847 12.6076 16.8218L13.786 15.6435L14.9643 16.8218L13.786 18.0002C13.4764 18.3097 13.2309 18.6772 13.0634 19.0816C12.8959 19.486 12.8096 19.9195 12.8096 20.3572C12.8096 20.795 12.8959 21.2285 13.0634 21.6329C13.2309 22.0373 13.4764 22.4048 13.786 22.7143C14.0955 23.0239 14.463 23.2694 14.8674 23.4369C15.2718 23.6044 15.7053 23.6907 16.1431 23.6907C16.5808 23.6907 17.0143 23.6044 17.4187 23.4369C17.8231 23.2694 18.1906 23.0239 18.5001 22.7143L19.6785 21.536L20.8568 22.7143ZM20.8568 14.4643L22.036 15.6435L16.1435 21.5352L14.9643 20.3568L20.8568 14.4652V14.4643Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61405">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8.5 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Copy link</p>
                                <input tabindex="-1" type="text" value="${mShareURL}" style="display: none;" onclick="copyLinkssv13(this);">
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="window.open('https://api.whatsapp.com/send?text=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61408)">
                                        <path
                                            d="M14.0445 23.4115L14.6478 23.764C15.6653 24.3574 16.8225 24.6689 18.0003 24.6665C19.3189 24.6665 20.6078 24.2755 21.7041 23.543C22.8005 22.8104 23.655 21.7692 24.1595 20.5511C24.6641 19.3329 24.7961 17.9924 24.5389 16.6992C24.2817 15.406 23.6467 14.2181 22.7144 13.2858C21.782 12.3534 20.5941 11.7185 19.3009 11.4613C18.0077 11.204 16.6673 11.3361 15.4491 11.8406C14.2309 12.3452 13.1897 13.1997 12.4572 14.296C11.7247 15.3924 11.3337 16.6813 11.3337 17.9998C11.3337 19.1965 11.6478 20.344 12.237 21.3532L12.5887 21.9565L12.0445 23.9573L14.0445 23.4115ZM9.67034 26.3332L10.797 22.1932C10.0546 20.9205 9.66458 19.4732 9.667 17.9998C9.667 13.3973 13.3978 9.6665 18.0003 9.6665C22.6028 9.6665 26.3337 13.3973 26.3337 17.9998C26.3337 22.6023 22.6028 26.3332 18.0003 26.3332C16.5277 26.3355 15.0809 25.9458 13.8087 25.204L9.67034 26.3332ZM14.9928 14.0898C15.1045 14.0815 15.217 14.0815 15.3287 14.0865C15.3737 14.0898 15.4187 14.0948 15.4637 14.0998C15.5962 14.1148 15.742 14.1957 15.7912 14.3073C16.0395 14.8707 16.2812 15.4382 16.5145 16.0073C16.5662 16.134 16.5353 16.2965 16.437 16.4548C16.3694 16.5619 16.2962 16.6654 16.2178 16.7648C16.1237 16.8857 15.9212 17.1073 15.9212 17.1073C15.9212 17.1073 15.8387 17.2057 15.8703 17.3282C15.882 17.3748 15.9203 17.4423 15.9553 17.499L16.0045 17.5782C16.2178 17.934 16.5045 18.2948 16.8545 18.6348C16.9545 18.7315 17.052 18.8307 17.157 18.9232C17.547 19.2673 17.9887 19.5482 18.4653 19.7565L18.4695 19.7582C18.5403 19.789 18.5762 19.8057 18.6795 19.8498C18.7312 19.8715 18.7845 19.8907 18.8387 19.9048C18.8946 19.9191 18.9536 19.9164 19.008 19.8971C19.0625 19.8778 19.11 19.8428 19.1445 19.7965C19.7478 19.0657 19.8028 19.0182 19.8078 19.0182V19.0198C19.8498 18.9807 19.8995 18.9511 19.9539 18.9328C20.0082 18.9146 20.0658 18.9081 20.1228 18.914C20.1728 18.9173 20.2237 18.9265 20.2703 18.9473C20.7128 19.1498 21.437 19.4657 21.437 19.4657L21.922 19.6832C22.0037 19.7223 22.0778 19.8148 22.0803 19.904C22.0837 19.9598 22.0887 20.0498 22.0695 20.2148C22.0428 20.4307 21.9778 20.6898 21.9128 20.8257C21.8683 20.9184 21.8092 21.0033 21.7378 21.0773C21.6538 21.1656 21.5617 21.246 21.4628 21.3173C21.4286 21.3431 21.3939 21.3681 21.3587 21.3923C21.255 21.4581 21.1485 21.5193 21.0395 21.5757C20.8249 21.6896 20.588 21.7551 20.3453 21.7673C20.1912 21.7757 20.037 21.7873 19.882 21.779C19.8753 21.779 19.4087 21.7065 19.4087 21.7065C18.2239 21.3949 17.1282 20.8111 16.2087 20.0015C16.0203 19.8357 15.8462 19.6573 15.6678 19.4798C14.9262 18.7423 14.3662 17.9465 14.0262 17.1948C13.8521 16.8259 13.7581 16.4243 13.7503 16.0165C13.7469 15.5105 13.9123 15.0179 14.2203 14.6165C14.2812 14.5382 14.3387 14.4565 14.4378 14.3623C14.5437 14.2623 14.6103 14.209 14.6828 14.1723C14.7792 14.124 14.8844 14.0957 14.992 14.089L14.9928 14.0898Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61408">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Whatsapp</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61411)">
                                        <path
                                            d="M19.6663 19.2498H21.7497L22.583 15.9165H19.6663V14.2498C19.6663 13.3915 19.6663 12.5832 21.333 12.5832H22.583V9.78317C22.3113 9.74734 21.2855 9.6665 20.2022 9.6665C17.9397 9.6665 16.333 11.0473 16.333 13.5832V15.9165H13.833V19.2498H16.333V26.3332H19.6663V19.2498Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61411">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Facebook</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="window.open('https://twitter.com/share?url=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8"/>
                                    <path d="M15.222 11.0555H10.3608L16.0975 18.7045L10.6733 24.9444H12.5136L16.9499 19.841L20.7775 24.9444H25.6386L19.6606 16.9738L24.8054 11.0555H22.9651L18.8083 15.8373L15.222 11.0555ZM21.472 23.5555L13.1386 12.4444H14.5275L22.8608 23.5555H21.472Z" fill="#747477"/>
                                </svg>                            
                                <p>X</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13" onclick="copyEmailEmbedssv13('${mShareURL}', '${video.cover_image}', this);">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61417)">
                                        <path
                                            d="M10.5003 10.5H25.5003C25.7213 10.5 25.9333 10.5878 26.0896 10.7441C26.2459 10.9004 26.3337 11.1123 26.3337 11.3333V24.6667C26.3337 24.8877 26.2459 25.0996 26.0896 25.2559C25.9333 25.4122 25.7213 25.5 25.5003 25.5H10.5003C10.2793 25.5 10.0674 25.4122 9.91107 25.2559C9.75479 25.0996 9.66699 24.8877 9.66699 24.6667V11.3333C9.66699 11.1123 9.75479 10.9004 9.91107 10.7441C10.0674 10.5878 10.2793 10.5 10.5003 10.5ZM24.667 14.0317L18.0603 19.9483L11.3337 14.0133V23.8333H24.667V14.0317ZM11.7595 12.1667L18.0512 17.7183L24.252 12.1667H11.7595Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61417">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Mail</p>
                            </div>
                            <div class="video-modal-sp-social-icon-ssv13 video-modal-sp-sms-ssv13" onclick="window.open('sms:/?body=${mShareURL}', '_blank')">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#E8E8E8" />
                                    <g clip-path="url(#clip0_622_61420)">
                                        <path
                                            d="M15.2225 17.5923C15.0816 17.5933 14.9419 17.5663 14.8115 17.5129C14.6812 17.4594 14.5627 17.3806 14.4631 17.2809C14.3634 17.1813 14.2846 17.0628 14.2311 16.9325C14.1777 16.8021 14.1507 16.6624 14.1517 16.5215C14.1517 15.9232 14.6242 15.4498 15.2225 15.4498C15.82 15.4498 16.2933 15.9232 16.2933 16.5215C16.2933 17.119 15.82 17.5923 15.2225 17.5923ZM20.7775 17.5923C20.6366 17.5933 20.4969 17.5663 20.3665 17.5129C20.2362 17.4594 20.1177 17.3806 20.0181 17.2809C19.9184 17.1813 19.8396 17.0628 19.7861 16.9325C19.7327 16.8021 19.7057 16.6624 19.7067 16.5215C19.7067 15.9232 20.18 15.4498 20.7775 15.4498C21.3758 15.4498 21.8483 15.9232 21.8483 16.5215C21.8483 17.119 21.3758 17.5923 20.7775 17.5923ZM13.6858 24.0123L14.2817 23.649C14.9564 23.2376 15.7553 23.0793 16.5358 23.2023C16.7125 23.2298 16.8575 23.2515 16.9692 23.2657C17.3075 23.3107 17.6525 23.3332 18 23.3332C21.6833 23.3332 24.5833 20.8148 24.5833 17.8332C24.5833 14.8515 21.6833 12.3332 18 12.3332C14.3167 12.3332 11.4167 14.8515 11.4167 17.8332C11.4167 18.9715 11.8333 20.0607 12.61 20.984C12.65 21.0315 12.71 21.0982 12.7883 21.1798C13.1159 21.521 13.3671 21.9279 13.5253 22.3736C13.6835 22.8193 13.745 23.2935 13.7058 23.7648L13.685 24.0123H13.6858ZM13.1608 26.2848C13.0298 26.3668 12.8785 26.4108 12.7239 26.4117C12.5692 26.4126 12.4174 26.3705 12.2854 26.2901C12.1533 26.2097 12.0463 26.0941 11.9761 25.9563C11.906 25.8185 11.8756 25.6639 11.8883 25.5098L12.045 23.6265C12.0647 23.3909 12.034 23.1538 11.9549 22.9309C11.8759 22.7081 11.7504 22.5046 11.5867 22.334C11.4993 22.2443 11.4148 22.1517 11.3333 22.0565C10.3383 20.8723 9.75 19.4123 9.75 17.8332C9.75 13.8748 13.4433 10.6665 18 10.6665C22.5567 10.6665 26.25 13.8748 26.25 17.8332C26.25 21.7915 22.5567 24.9998 18 24.9998C17.575 24.9998 17.1583 24.9723 16.7508 24.9182C16.5925 24.8968 16.4344 24.8734 16.2767 24.8482C15.8862 24.7866 15.4866 24.8657 15.1492 25.0715L13.16 26.2848H13.1608Z"
                                            fill="#747477" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_622_61420">
                                            <rect width="20" height="20" fill="white"
                                                transform="translate(8 8)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>SMS</p>
                            </div>
                        </div>
                    </div>                    
                    <button tabindex="-1" class="video-cta-redi-button-ssv13" style="background: ${videoBuyBG} !important; color: ${videoBuyFont} !important; ${ssv13_brandCustomizations.buy_now == '0' || !videoCTA ? 'display: none !important;' : ''}" onclick="CTAClickssv13('0', ${video.designer_id}, ${video.video_id}, '1'); window.open('${video.product_link}', '_blank');">
                        ${video.cta_customization ? video.cta_customization : ssv13_brandCustomizations.buy_btn}
                    </button>                      
                    <p class="video-modal-alert-L-ssv13"></p>
                </div>
            </div>
        `;

        mRightBlocks += `
            <div class="video-modal-sr-product-block-ssv13 JS-product-master-ssv13" style="${i == 0 ? 'display: block;' : ''}">
                <div class="video-modal-sr-pb-header-ssv13">
                    <div class="video-modal-sr-pb-tabs-btn-ssv13">
                        <p class="JS-modal-PC-tab-ssv13 JS-modal-Product-tab-ssv13 active-ssv13"
                            onclick="changePCTabssv13(this, '.JS-product-section-ssv13');" style="${Object.keys(video.product).length == 0 ? 'display: none !important;' : ''}">
                            Product</p>
                        <p class="JS-modal-PC-tab-ssv13 JS-modal-comment-tab-ssv13" style="${ssv13_brandCustomizations.comment_mode == '0' ? 'display: none !important;' : ''}" 
                            onclick="changePCTabssv13(this, '.JS-comment-section-ssv13'); loadCommentssv13('${video.video_id}');">Comments</p>
                    </div>
                    <div class="video-modal-sr-pb-cart-btn-ssv13" style="${ssv13_brandCustomizations.view_cart == '0' ? 'display: none !important;' : ''}" onclick="window.location='${ssv13_storeURL}/${ssv13_brandCustomizations.cust_cart_redirection_link}'">
                        <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.99984 5.0569L0.756836 1.8149L2.17184 0.399902L5.41384 3.6429H20.6558C20.8117 3.64289 20.9654 3.67932 21.1047 3.74927C21.244 3.81922 21.365 3.92077 21.4581 4.0458C21.5511 4.17083 21.6137 4.31589 21.6407 4.46939C21.6678 4.62289 21.6586 4.78059 21.6138 4.9299L19.2138 12.9299C19.1521 13.136 19.0255 13.3167 18.853 13.4451C18.6804 13.5736 18.471 13.6429 18.2558 13.6429H5.99984V15.6429H16.9998V17.6429H4.99984C4.73462 17.6429 4.48027 17.5375 4.29273 17.35C4.10519 17.1625 3.99984 16.9081 3.99984 16.6429V5.0569ZM5.99984 5.6429V11.6429H17.5118L19.3118 5.6429H5.99984ZM5.49984 21.6429C5.10201 21.6429 4.72048 21.4849 4.43918 21.2036C4.15787 20.9223 3.99984 20.5407 3.99984 20.1429C3.99984 19.7451 4.15787 19.3635 4.43918 19.0822C4.72048 18.8009 5.10201 18.6429 5.49984 18.6429C5.89766 18.6429 6.27919 18.8009 6.5605 19.0822C6.8418 19.3635 6.99984 19.7451 6.99984 20.1429C6.99984 20.5407 6.8418 20.9223 6.5605 21.2036C6.27919 21.4849 5.89766 21.6429 5.49984 21.6429ZM17.4998 21.6429C17.102 21.6429 16.7205 21.4849 16.4392 21.2036C16.1579 20.9223 15.9998 20.5407 15.9998 20.1429C15.9998 19.7451 16.1579 19.3635 16.4392 19.0822C16.7205 18.8009 17.102 18.6429 17.4998 18.6429C17.8977 18.6429 18.2792 18.8009 18.5605 19.0822C18.8418 19.3635 18.9998 19.7451 18.9998 20.1429C18.9998 20.5407 18.8418 20.9223 18.5605 21.2036C18.2792 21.4849 17.8977 21.6429 17.4998 21.6429Z"
                                fill="#454549" />
                        </svg>
                        <label class="cart-count-ssv13">0</label>
                    </div>
                </div>
                <div class="video-modal-sr-pb-middle-ssv13 JS-pc-tab-content-ssv13 JS-product-section-ssv13">
                    <div class="video-modal-sr-pb-product-list-ssv13">
                        ${mProductList}
                    </div>
                    ${mProducts}

                </div>
                <div class="video-modal-sr-pb-middle-ssv13 JS-pc-tab-content-ssv13 JS-comment-section-ssv13" style="display: none;">
                    <div class="video-modal-sr-pb-comments-ssv13 JS-comments-${video.video_id}-ssv13" onscroll="pinCommentsFoldssv13(this);">
                        <div class="video-modal-sr-pb-cc-drager-ssv13">
                            <svg width="33" height="4" viewBox="0 0 33 4" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H30.5C31.6046 0 32.5 0.895431 32.5 2C32.5 3.10457 31.6046 4 30.5 4H2.5C1.39543 4 0.5 3.10457 0.5 2Z"
                                    fill="#1A1A1A" fill-opacity="0.25" />
                            </svg>
                        </div>
                        <div class="video-modal-sr-pb-cc-title-ssv13">
                            <p>Comments</p>
                        </div>
                        <div class="video-modal-sr-pb-pin-card-ssv13" onclick="scrolltoPinssv13(this);">
                            <p>
                                Pinned comment
                                <label class="JS-pinned-comment-counter-ssv13">0</label>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.8764 5.78136L11.9331 6.72402L11.4618 6.25269L8.63377 9.08069L8.16244 11.438L7.2191 12.3807L4.3911 9.55202L1.0911 12.852L0.148438 11.9094L3.44844 8.60936L0.619771 5.78136L1.56244 4.83802L3.92044 4.36669L6.74844 1.53869L6.2771 1.06736L7.21977 0.124023L12.8764 5.78136Z"
                                        fill="#334499" />
                                </svg>
                            </p>
                        </div>
                        <p class="JS-pinned-comment-loading-ssv13" style="text-align: center; margin-top: 80px;"><i>Loading comments...</i></p>                        
                    </div>
                    <div class="video-modal-sr-pb-comment-form-ssv13">
                        <div class="video-modal-sr-pb-cf-input-ssv13">
                            <form onsubmit="return addCommentssv13('${video.video_id}', this);">
                                <input tabindex="-1" type="text" oninput="charLimitssv13(this);" placeholder="Add a comment" required autocomplete="off" />
                            </form>
                        </div>
                        <div class="video-modal-sr-pb-cf-btn-ssv13">
                            <button tabindex="-1" onclick="this.closest('.video-modal-sr-pb-comment-form-ssv13').querySelector('form').dispatchEvent(new Event('submit'));">
                                <svg width="17" height="19" viewBox="0 0 17 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.5 10.4762H5.5V8.80958H0.5V1.18124C0.500012 1.10884 0.518892 1.03769 0.554778 0.974802C0.590664 0.911916 0.642317 0.859467 0.704647 0.822625C0.766977 0.785782 0.837832 0.765817 0.910228 0.764698C0.982623 0.763579 1.05406 0.781345 1.1175 0.816244L16.5025 9.27791C16.5678 9.31388 16.6223 9.36672 16.6602 9.43092C16.6982 9.49513 16.7182 9.56833 16.7182 9.64291C16.7182 9.71749 16.6982 9.79069 16.6602 9.8549C16.6223 9.9191 16.5678 9.97194 16.5025 10.0079L1.1175 18.4696C1.05406 18.5045 0.982623 18.5222 0.910228 18.5211C0.837832 18.52 0.766977 18.5 0.704647 18.4632C0.642317 18.4264 0.590664 18.3739 0.554778 18.311C0.518892 18.2481 0.500012 18.177 0.5 18.1046V10.4762Z"
                                        fill="#8B8B8E" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        i++;
    });

    target.innerHTML = `
        <div class="swiper swiper-ssv13-c swiper-ssv13-c${no}">
            <div class="swiper-wrapper">
                ${cSlides}
            </div>
            <div class="swiper-button-next-ssv13-c">
                <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                    <g clip-path="url(#clip0_455_23499)">
                        <path
                            d="M27.1717 26.6433L22.2217 21.6933L23.6357 20.2793L29.9997 26.6433L23.6357 33.0073L22.2217 31.5933L27.1717 26.6433Z"
                            fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_455_23499">
                            <rect width="24" height="24" fill="white" transform="translate(14 14.6431)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div class="swiper-button-prev-ssv13-c">
                <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                    <g clip-path="url(#clip0_455_23488)">
                        <path
                            d="M24.7307 26.6429L30.0932 32.0054L28.5613 33.5372L21.667 26.6429L28.5613 19.7485L30.0932 21.2804L24.7307 26.6429Z"
                            fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_455_23488">
                            <rect width="26" height="26" fill="white" transform="translate(13 13.6431)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    `;

    let mDiv = document.createElement('div');
    let previewThumbCSS = ssv13_brandCustomizations.next_previous_preview == '0' && window.innerWidth > 768 ? `
        .swirl-short-videos-m-ssv13-${no} .swiper-ssv13-m .swiper-slide-m:not(.swiper-slide-fully-visible) {                
            opacity: 0;                          
        }
    ` : ``;
    let iOSImpCSS = getMobileOSssv13() == 'iOS' ? `
        .video-modal-sl-top-controls-ssv13, .video-modal-sl-bottom-controls-ssv13, .video-modal-product-slider-ssv13, .video-modal-sl-controls-ssv13, .video-modal-sl-progressbar-ssv13, .video-modal-product-reviews-ssv13, .video-modal-fade-white-L-ssv13, .video-modal-share-popup-ssv13, .video-model-marquee-ssv13, .video-cta-redi-button-ssv13, .video-modal-alert-P-ssv13, .video-modal-alert-L-ssv13, .video-modal-alert-R-ssv13, .video-modal-sl-thumbs-block-ssv13 {                
            will-change: transform;
        }
    ` : '';
    mDiv.innerHTML = `
        <style>
            ${previewThumbCSS}
            ${iOSImpCSS}
        </style>
        <div class="swirl-short-videos-m-ssv13 swirl-short-videos-m-ssv13-${no}">
            <div class="video-modal-ssv13">
                <div class="video-modal-container-ssv13">
                    <svg class="video-modal-close-btn-ssv13" onclick="closeVideoModalssv13(true);" width="37" height="37"
                        viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.40332" y="0.643066" width="36" height="36" rx="18" fill="#2E2E33" fill-opacity="0.6" />
                        <g clip-path="url(#clip0_323_30588)">
                            <path
                                d="M18.4029 17.4648L22.5279 13.3398L23.7063 14.5182L19.5813 18.6432L23.7063 22.7682L22.5279 23.9465L18.4029 19.8215L14.2779 23.9465L13.0996 22.7682L17.2246 18.6432L13.0996 14.5182L14.2779 13.3398L18.4029 17.4648Z"
                                fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_323_30588">
                                <rect width="20" height="20" fill="white" transform="translate(8.40332 8.64307)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="video-modal-structure-ssv13">
                        <div class="video-modal-structure-left-ssv13">
                            <div class="video-modal-sl-thumbs-block-ssv13">
                                ${mThumbs}
                            </div>
                            <div class="video-modal-sl-video-block-ssv13">
                                <div class="swiper swiper-ssv13-m swiper-ssv13-m${no}">
                                    <div class="swiper-wrapper">
                                        ${mSlides}
                                    </div>
                                    <div class="swiper-button-next-ssv13-m">
                                        <svg width="52" height="53" viewBox="0 0 52 53" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                                            <g clip-path="url(#clip0_455_23499)">
                                                <path
                                                    d="M27.1717 26.6433L22.2217 21.6933L23.6357 20.2793L29.9997 26.6433L23.6357 33.0073L22.2217 31.5933L27.1717 26.6433Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_455_23499">
                                                    <rect width="24" height="24" fill="white"
                                                        transform="translate(14 14.6431)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="swiper-button-prev-ssv13-m">
                                        <svg width="52" height="53" viewBox="0 0 52 53" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect y="0.643066" width="52" height="52" rx="26" fill="#2E2E33" />
                                            <g clip-path="url(#clip0_455_23488)">
                                                <path
                                                    d="M24.7307 26.6429L30.0932 32.0054L28.5613 33.5372L21.667 26.6429L28.5613 19.7485L30.0932 21.2804L24.7307 26.6429Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_455_23488">
                                                    <rect width="26" height="26" fill="white"
                                                        transform="translate(13 13.6431)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>                                                        
                        </div>
                        <div class="video-modal-structure-right-ssv13">
                            ${mRightBlocks}
                            <div class="video-modal-fade-white-R-ssv13" style="display: none;"></div>
                            <div class="user-verification-form-ssv13">
                                <svg class="uvf-close-btn-ssv13" onclick="closeUserVerificationssv13();" width="12"
                                    height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.99962 4.82178L10.1246 0.696777L11.303 1.87511L7.17796 6.00011L11.303 10.1251L10.1246 11.3034L5.99962 7.17844L1.87462 11.3034L0.696289 10.1251L4.82129 6.00011L0.696289 1.87511L1.87462 0.696777L5.99962 4.82178Z"
                                        fill="#454549" />
                                </svg>
                                <form onsubmit="return addUserssv13(this);"> 
                                    <input tabindex="-1" type="text" pattern=".{3,25}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' onpaste='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32' title="Minimum 3 Maximum 25 character, No special characters, No Digits." required placeholder="Full name" class="uvf-input-ssv13 uvf-input-fname-ssv13"
                                        autocomplete="off">
                                    <div class="uvf-phone-country-ssv13">
                                        <div class="uvf-country-ssv13">
                                            <div class="country-selected-ssv13">
                                                <i class="uvf-country-flag-icon uvf-cfi-in" data-code="+91"></i>
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4.99956 3.879L8.71206 0.166504L9.77256 1.227L4.99956 6L0.226562 1.227L1.28706 0.166504L4.99956 3.879Z"
                                                        fill="#A2A2A4" />
                                                </svg>
                                            </div>
                                            <div class="country-drop-ssv13" style="display: none;">
                                                <ul>
                                                    <li data-code="IN" data-name="India" data-cid="c124" data-code="+91"><i
                                                            class="uvf-country-flag-icon uvf-cfi-in"></i>India (+91)</li>
                                                    <li data-code="US" data-name="United States" data-cid="c255" data-code="+1"><i
                                                            class="uvf-country-flag-icon uvf-cfi-us"></i>United States(+1)</li>
                                                    <li data-code="GB" data-name="United Kingdom" data-cid="c254" data-code="+44"><i
                                                            class="uvf-country-flag-icon uvf-cfi-gb"></i>United Kingdom (+44)
                                                    </li>
                                                    <li data-code="AE" data-name="United Arab Emirates" data-cid="c253" data-code="+971"><i
                                                            class="uvf-country-flag-icon uvf-cfi-ae"></i>United Arab Emirates
                                                        (+971)</li>
                                                    <li data-code="PK" data-name="Pakistan" data-cid="c189" data-code="+92"><i
                                                            class="uvf-country-flag-icon uvf-cfi-pk"></i>Pakistan (+92)</li>
                                                    <li data-code="QA" data-name="Qatar" data-cid="c201" data-code="+974"><i
                                                            class="uvf-country-flag-icon uvf-cfi-qa"></i>Qatar (+974)</li>
                                                    <li data-code="SA" data-name="Saudi Arabia" data-cid="c216" data-code="+966"><i
                                                            class="uvf-country-flag-icon uvf-cfi-sa"></i>Saudi Arabia(+966)</li>
                                                    <li data-code="KW" data-name="Kuwait" data-cid="c140" data-code="+965"><i
                                                            class="uvf-country-flag-icon uvf-cfi-kw"></i>Kuwait (+965)</li>
                                                    <li data-code="OM" data-name="Oman" data-cid="c188" data-code="+968"><i
                                                            class="uvf-country-flag-icon uvf-cfi-om"></i>Oman (+968)</li>
                                                    <li data-code="YE" data-name="Yemen" data-cid="c264" data-code="+967"><i
                                                            class="uvf-country-flag-icon uvf-cfi-ye"></i>Yemen (+967)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="uvf-phone-ssv13">
                                            <input tabindex="-1" type="text" placeholder="Phone number" onkeypress='return event.charCode >= 48 && event.charCode <= 57' 
                                                class="uvf-input-ssv13 uvf-input-phone-ssv13" required autocomplete="off">
                                        </div>
                                    </div>
                                    <button tabindex="-1" class="uvf-submit-ssv13">Subscribe to comment
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.9763 6.16689L6.50634 1.69689L7.68467 0.518555L14.1663 7.00022L7.68467 13.4819L6.50634 12.3036L10.9763 7.83355H0.833008V6.16689H10.9763Z"
                                                fill="#454549" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div class="video-modal-cart-popup-ssv13">
                                <svg class="cart-popup-btn-close-ssv13" onclick="closeCartPopupssv13();" width="12"
                                    height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.99962 4.82178L10.1246 0.696777L11.303 1.87511L7.17796 6.00011L11.303 10.1251L10.1246 11.3034L5.99962 7.17844L1.87462 11.3034L0.696289 10.1251L4.82129 6.00011L0.696289 1.87511L1.87462 0.696777L5.99962 4.82178Z"
                                        fill="#454549" />
                                </svg>
                                <p class="cart-popup-msg-ssv13">${ssv13_brandCustomizations.cart_success_message}</p>
                                <div class="cart-popup-flex-ssv13">
                                    <button tabindex="-1" class="cart-popup-btn-viewcart-ssv13" onclick="window.location='${ssv13_storeURL}/${ssv13_brandCustomizations.cust_cart_redirection_link}'">
                                        ${ssv13_brandCustomizations.view_cart_txt}
                                    </button>
                                    <button tabindex="-1" class="cart-popup-btn-continue-ssv13" onclick="closeCartPopupssv13();" style="background: ${ssv13_brandCustomizations.bk_color_buy_btn} !important; color: ${ssv13_brandCustomizations.front_color_buy_btn} !important;">
                                        ${ssv13_brandCustomizations.shopping_text}
                                    </button>
                                </div>
                            </div>
                            <p class="video-modal-alert-R-ssv13"></p>
                        </div>
                        <p class="video-modal-alert-P-ssv13"></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(mDiv);

    // pip append
    if (no == 0 && ssv13_brandCustomizations.pip_mode == '1') {
        let pDiv = document.createElement('div');
        pDiv.innerHTML = `
            <div class="swirl-short-video-pip-ssv13" onclick="fsPIPssv13();">
                <video class="ssv-pip-video-ssv13" poster="" loop playsinline muted>                    
                </video>
                <svg class="ssv-pip-close-ssv13 JS-ignore-fs-click" onclick="closePIPssv13();" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect class="JS-ignore-fs-click" x="0.40332" y="0.643066" width="36" height="36" rx="18" fill="#2E2E33" fill-opacity="0.6"></rect>
                    <g class="JS-ignore-fs-click" clip-path="url(#clip0_323_30588)">
                        <path class="JS-ignore-fs-click" d="M18.4029 17.4648L22.5279 13.3398L23.7063 14.5182L19.5813 18.6432L23.7063 22.7682L22.5279 23.9465L18.4029 19.8215L14.2779 23.9465L13.0996 22.7682L17.2246 18.6432L13.0996 14.5182L14.2779 13.3398L18.4029 17.4648Z" fill="white"></path>
                    </g>
                    <defs class="JS-ignore-fs-click">
                        <clipPath class="JS-ignore-fs-click" id="clip0_323_30588">
                            <rect class="JS-ignore-fs-click" width="20" height="20" fill="white" transform="translate(8.40332 8.64307)"></rect>
                        </clipPath>
                    </defs>
                </svg>
                <svg class="ssv-pip-volume-ssv13 JS-ignore-fs-click"
                    onclick="pipVolumessv13(this);" width="25" height="19"
                    viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="JS-ignore-fs-click" 
                        d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z"
                        fill="white" />
                </svg>
                <div class="ssv-pip-fullscreen-ssv13"></div>
            </div>
        `;
        document.body.appendChild(pDiv);
    }

    countryDropdownssv13(`.swirl-short-videos-m-ssv13-${no} .country-selected-ssv13`, `.swirl-short-videos-m-ssv13-${no} .country-drop-ssv13`);

    // Looping contents
    videos.forEach(video => {
        ssv13_swiper_product[`sw${video.video_id}-${no}`] = new Swiper(`.swiper-product-ssv13-${video.video_id}-${no}`, {
            slidesPerView: 1.1,
            direction: 'horizontal',
            spaceBetween: 0,
            centeredSlidesBounds: true,
            centerInsufficientSlides: true,
            centeredSlides: true,
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            on: {
                slideChange: function () {
                    let activeInd = ssv13_swiper_product[`sw${video.video_id}-${no}`].activeIndex;
                    let slide = document.querySelectorAll(`.swiper-product-ssv13-${video.video_id}-${no} .swiper-slide`)[activeInd];
                    let reviews = slide.dataset.reviews;
                    slide.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-vc-reviews-count-ssv13').innerHTML = reviews;
                }
            }
        });

        if (ssv13_brandCustomizations.product_reviews == '1') {
            ssv13_swiper_review[`sw${video.video_id}-${no}`] = new Swiper(`.swiper-review-ssv13-${video.video_id}-${no}`, {
                slidesPerView: 1,
                direction: 'horizontal',
                spaceBetween: 0,
                centeredSlidesBounds: true,
                centerInsufficientSlides: true,
                centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
                on: {
                    init: function () {
                        setTimeout(() => {
                            if (!ssv13_swiper_review[`sw${video.video_id}-${no}`].slides.length) {
                                document.querySelector(`.swiper-review-ssv13-${video.video_id}-${no}`).closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-vc-reviews-ssv13').setAttribute('style', 'display: none!important;');
                                document.querySelector(`.swiper-review-ssv13-${video.video_id}-${no}`).closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-vc-reviews-count-ssv13').setAttribute('style', 'display: none!important;');
                            }
                        }, 1000);
                    },
                    slideChange: function () {
                        let activeInd = ssv13_swiper_review[`sw${video.video_id}-${no}`].activeIndex;
                        let slide = ssv13_swiper_review[`sw${video.video_id}-${no}`].slides[activeInd];
                        let reviewDivs = slide.closest('.video-modal-product-reviews-ssv13').querySelectorAll('.video-modal-pr-bottom-ssv13');
                        reviewDivs.forEach(e => {
                            e.style.display = 'none';
                        });
                        reviewDivs[activeInd].style.display = 'block';
                        reviewDivs[activeInd].scrollTop = 0;
                    }
                }
            });
        }

        // NNNow cart option           
        if (typeof video.product[0] != 'undefined' && ssv13_storeType == '6' && ssv13_brandCustomizations.add_to_cart == '1') {
            video.product.forEach(prd => {
                const settings = {
                    url: `https://api.omuni.com/d/api/productSearch/albl/${prd.sku_code}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": "Basic U3dpcmw6MzExamZaRGtLMEFVM2lE"
                    }
                };

                fetch(settings.url, {
                    method: settings.method,
                    headers: settings.headers
                }).then(response => response.json()).then(response => {
                    if (typeof response.data !== 'undefined') {
                        if (Object.keys(response.data.skus).length) {
                            let i = null;
                            let sel = false;
                            let staticOption = `
                                <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">Color</h3>
                                <p class="video-modal-sr-pb-pi-attrvalue-ssv13">${response.data.primaryColor}</p>                                
                            `;

                            let dynamicOption = `
                                <h3 class="video-modal-sr-pb-pi-attrtitle-ssv13">Size</h3>
                                <div class="video-modal-sr-pb-pi-attrselection-ssv13">
                            `;
                            response.data.skus.forEach((sku, s) => {
                                i = (i === null && sku.quantity > 0) ? s : i;
                                dynamicOption += `
                                    <p onclick="selectProductOptionssv13(this); updatePriceBySKUssv13(this, '${prd.currencysymbols}');" data-sku="${sku.skuId}" data-mrp="${sku.mrp}" data-selling="${sku.sellingPrice}" class="${sku.quantity > 0 && !sel ? 'selected-ssv13' : ''} ${sku.quantity === 0 ? 'disabled-ssv13' : ''}">${sku.size}</p>                                    
                                `;
                                sel = sku.quantity > 0 && !sel ? true : sel;
                            });

                            dynamicOption += `
                                </div>
                            `;

                            document.querySelector(`.JS-product-static-options-${video.video_id}-${prd.product_id}-ssv13`).innerHTML = staticOption;
                            document.querySelector(`.JS-product-static-options-${video.video_id}-${prd.product_id}-ssv13`).style.display = 'block';
                            document.querySelector(`.JS-product-dynamic-options-${video.video_id}-${prd.product_id}-ssv13`).innerHTML = dynamicOption;
                            document.querySelector(`.JS-product-dynamic-options-${video.video_id}-${prd.product_id}-ssv13`).style.display = 'block';

                            i = i === null ? 0 : i;

                            ssv13_productIds[prd.product_id] = response.data.skus[i].skuId;

                            document.querySelectorAll(`.JS-dynamic-price-${video.video_id}-${prd.product_id}-ssv13`).forEach(p => {
                                let dis = parseFloat(response.data.skus[i].mrp) > parseFloat(response.data.skus[i].sellingPrice) ? true : false;

                                let strk = p.querySelector('strike');
                                strk.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
                                strk.innerHTML = prd.currencysymbols + '' + formatCurrencyssv13(response.data.skus[i].mrp);

                                let lbl = p.querySelector('label');
                                lbl.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
                                lbl.innerHTML = `${parseFloat(response.data.skus[i].mrp) > parseFloat(response.data.skus[i].sellingPrice) ? Math.round(((response.data.skus[i].mrp - response.data.skus[i].sellingPrice) * 100) / response.data.skus[i].mrp) : ''}% OFF`;

                                let finalPrice = prd.currencysymbols + '' + formatCurrencyssv13(response.data.skus[i].sellingPrice);
                                finalPrice += strk ? strk.outerHTML : '';
                                finalPrice += lbl ? lbl.outerHTML : '';
                                p.innerHTML = finalPrice;
                            });
                        }
                    }
                }).catch(error => console.log('NNNow cart option fetch failed:', error));
            });
        }
    });

    if (!ssv13_pipMode && carouselLoad) {
        ssv13_swiper[no] = new Swiper(`.swiper-ssv13-c${no}`, {
            slidesPerView: 2,
            direction: 'horizontal',
            spaceBetween: 15,
            centeredSlidesBounds: true,
            centerInsufficientSlides: true,
            // centeredSlides: true,
            cssMode: true,
            breakpoints: {
                600: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                    centeredSlides: false,
                },
                1080: {
                    slidesPerView: 4,
                    centeredSlides: false,
                    cssMode: false
                },
                1366: {
                    slidesPerView: 5,
                    centeredSlides: false,
                    cssMode: false
                }
            },
            navigation: {
                nextEl: '.swiper-button-next-ssv13-c',
                prevEl: '.swiper-button-prev-ssv13-c',
            },
            on: {
                init: function () {
                    if (ssv13_brandCustomizations.auto_play == '1') {
                        let pff = window.innerWidth > 768 ? 5 : 2;
                        document.querySelectorAll(`.swiper-ssv13-c${no} .carousel-video-ssv13`).forEach(elm => {
                            if (pff > 0) {
                                elm.src = elm.dataset.src;
                                elm.load();
                                elm.play();
                            }
                            pff--;
                        });
                    }

                    setTimeout(() => {
                        updateCarouselVideoHeightssv13(no);
                    }, 1000);
                },
                slideChange: function () {
                    this.slides.forEach(s => {
                        let vdo = s.querySelector('.carousel-video-ssv13');
                        if (vdo.src == '') {
                            vdo.src = vdo.dataset.src;
                            vdo.load();
                            vdo.play();
                        }
                    });
                }
            }

        });
    }

    ssv13_swiper_modal[no] = new Swiper(`.swiper-ssv13-m${no}`, {
        slidesPerView: 1,
        direction: "vertical",
        spaceBetween: 0,
        clickable: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next-ssv13-m',
            prevEl: '.swiper-button-prev-ssv13-m',
        },
        breakpoints: {
            768: {
                direction: "horizontal",
                slidesPerView: 1.2,
            },
        },
        effect: window.innerWidth > 768 ? 'coverflow' : '',
        coverflowEffect: {
            depth: 600,
            modifier: 1,
            rotate: 0,
            scale: 1.2,
            slideShadows: false,
            stretch: 10
        },
        on: {
            init: function () {
                if (ssv13_pipMode) {
                    ssv13_globalMute = true;
                    openPIPssv13(true);
                }

                if (typeof getParamssv13['ssv'] != 'undefined') {
                    setTimeout(() => {
                        ssv13_globalMute = true;
                        let videoId = window.atob(getParamssv13['ssv']);
                        let slide = document.querySelector(`video[data-id="${videoId}"]`).closest('.swiper-slide');
                        slide.dispatchEvent(new Event('click'));
                    }, 500);
                }

                if (ssv13_pdppip && ssv13_brandCustomizations.pdppip == '1') {
                    ssv13_globalMute = true;
                    let pipData = JSON.stringify({
                        src: videos[0].server_url,
                        poster: videos[0].cover_image
                    });

                    localStorage.setItem('ssv13_pip', pipData);
                    localStorage.setItem('ssv13_storePlaylist', '');

                    openPIPssv13(true);
                }

                setTimeout(() => {
                    updateModalVideoHeightssv13(no);
                }, 1000);
            },
            slideChange: function () {
                let activeInd = ssv13_swiper_modal[no].activeIndex;

                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-ssv13`).forEach(elm => {
                    elm.classList.remove('active-ssv13');
                });
                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-ssv13`)[activeInd].classList.add('active-ssv13');
                document.querySelector(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-toggler-ssv13 img`).src = document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-sl-thumb-ssv13`)[activeInd].src;

                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`).forEach(elm => {
                    elm.style.display = 'none';
                    // fadeOutssv13(elm);
                });
                document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[activeInd].style.display = 'block';
                // fadeInssv13(document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[activeInd]);

                pauseAllModalVideossv13();

                playModalVideossv13(activeInd);
            },
            navigationNext: function () {
                if (window.innerWidth > 768) {
                    let activeInd = ssv13_swiper_modal[no].activeIndex;

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-fade-white-L-ssv13`)[(activeInd - 1)].dispatchEvent(new Event('click'));

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd - 1)].querySelector('.JS-modal-PC-tab-ssv13').dispatchEvent(new Event('click'));

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd - 1)].querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
                        // elm.style.transform = 'translateX(110%)';
                        elm.style.display = 'none';
                    });

                    document.querySelector(`.swirl-short-videos-m-ssv13-${no} .uvf-close-btn-ssv13`).dispatchEvent(new Event('click'));
                    document.querySelector(`.swirl-short-videos-m-ssv13-${no} .cart-popup-btn-close-ssv13`).dispatchEvent(new Event('click'));
                }
            },
            navigationPrev: function () {
                if (window.innerWidth > 768) {
                    let activeInd = ssv13_swiper_modal[no].activeIndex;

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .video-modal-fade-white-L-ssv13`)[(activeInd + 1)].dispatchEvent(new Event('click'));

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd + 1)].querySelector('.JS-modal-PC-tab-ssv13').dispatchEvent(new Event('click'));

                    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${no} .JS-product-master-ssv13`)[(activeInd + 1)].querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
                        // elm.style.transform = 'translateX(110%)';
                        elm.style.display = 'none';
                    });

                    document.querySelector(`.swirl-short-videos-m-ssv13-${no} .uvf-close-btn-ssv13`).dispatchEvent(new Event('click'));
                    document.querySelector(`.swirl-short-videos-m-ssv13-${no} .cart-popup-btn-close-ssv13`).dispatchEvent(new Event('click'));
                }
            }
        }
    });
}

// Common

function charLimitssv13(inp) {
    if (inp.value.length > 250) {
        inp.value = inp.value.substring(0, 250);
        videoAlertssv13('Max 250 character.', 2000, inp);
    }
}

function updateCarouselVideoHeightssv13(no) {
    if (document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-P-ssv13`).length && document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-L-ssv13`).length) {
        let maxHeight = Array.prototype.map.call(document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-P-ssv13`), function (e) {
            return e.offsetHeight;
        });
        maxHeight = Math.max.apply(null, maxHeight);

        document.querySelectorAll(`.swiper-ssv13-c${no} .JS-cvideo-L-ssv13`).forEach(e => {
            e.style.height = maxHeight + 'px';
            console.log(maxHeight);
        });
    }
}

function updateModalVideoHeightssv13(no) {
    if (document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-P-ssv13`).length && document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-L-ssv13`).length) {
        let maxHeight = Array.prototype.map.call(document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-P-ssv13`), function (e) {
            return e.offsetHeight;
        });
        let maxWidth = Array.prototype.map.call(document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-P-ssv13`), function (e) {
            return e.offsetWidth;
        });
        maxWidth = Math.max.apply(null, maxWidth);
        maxHeight = Math.max.apply(null, maxHeight);

        document.querySelectorAll(`.swiper-ssv13-m${no} .JS-mvideo-L-ssv13`).forEach(e => {
            e.style.width = maxWidth + 'px';
            e.style.height = maxHeight + 'px';
        });
    }
}

function productImagessv13(img, w) {
    if (img.includes('imagekit')) return img;
    let imgParts = img.split('coverimages');
    return imgParts[0] + `coverimages/tr:w-${w}` + imgParts[1];
}

function getHandlessv13(url) {
    let handle = url ? url.split('?')[0] : '';
    handle = handle ? handle.split('#')[0] : '';
    handle = handle ? handle.substring(handle.lastIndexOf('/') + 1) : '';

    return handle;
}

function formatCurrencyssv13(number) {
    // Add thousands separator    
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Format the number as a currency string
    return formattedNumber;
}

function secondsToDurationssv13(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    return String(m).padStart(2, "0") + ':' + String(s).padStart(2, "0");
}

function fadeInssv13(element) {
    element.style.display = 'block';
    element.style.opacity = 0;
    requestAnimationFrame(function () {
        element.style.transition = 'opacity 2s';
        element.style.opacity = 1;
    });
}

function fadeOutssv13(element) {
    element.style.display = 'none';
    element.style.opacity = 1;
    requestAnimationFrame(function () {
        element.style.transition = 'opacity 2s';
        element.style.opacity = 0;
    });
}

function isElementVisiblessv13(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getElementPositionInMasterDivssv13(masterDiv, element) {
    const masterRect = masterDiv.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const position = {
        top: elementRect.top - masterRect.top,
        left: elementRect.left - masterRect.left
    };

    return position;
}

function setCookiessv13(cname, cvalue, exdays, domain = '') {
    domain = domain ? 'domain=' + domain + ';' : '';
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + domain;
}

function getCookiessv13(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getTimeAgossv13(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 0) {
        return interval == 1 ? interval + " year ago" : interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
        return interval == 1 ? interval + " month ago" : interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
        return interval == 1 ? interval + " day ago" : interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
        return interval == 1 ? interval + " hour ago" : interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
        return interval == 1 ? interval + " minute ago" : interval + " minutes ago";
    }
    if (Math.floor(seconds) < 10) {
        return "Just now";
    }
    return Math.floor(seconds) + " seconds ago";
}

function getMobileOSssv13() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function updatePriceBySKUssv13(op, cSymbol) {
    let p = op.closest('.video-modal-sr-pb-pi-pdetails-ssv13').querySelector('.JS-PB-dynamic-price-ssv13');
    let mrp = parseFloat(op.dataset.mrp);
    let selling = parseFloat(op.dataset.selling);
    let dis = mrp > selling ? true : false;

    let strk = p.querySelector('strike');
    strk.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
    strk.innerHTML = cSymbol + '' + formatCurrencyssv13(mrp);

    let lbl = p.querySelector('label');
    lbl.style.setProperty('display', dis ? 'inline-block' : 'none', 'important');
    lbl.innerHTML = `${mrp > selling ? Math.round(((mrp - selling) * 100) / mrp) : ''}% OFF`;

    let finalPrice = cSymbol + '' + formatCurrencyssv13(selling);
    finalPrice += strk ? strk.outerHTML : '';
    finalPrice += lbl ? lbl.outerHTML : '';
    p.innerHTML = finalPrice;
}

function replaceUrlsWithAnchorssv13(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a target="_blank" class="break-words-ssv13" href="$1">$1</a>');
}

function numberToShorthandssv13(number) {
    number = parseInt(number);
    if (number >= 10000000) {
        return (number / 10000000).toFixed(1) + 'Cr'; // Cr for Crore (10 million)
    } else if (number >= 100000) {
        return (number / 100000).toFixed(1) + 'L'; // L for Lakh (100 thousand)
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'; // K for Thousand
    } else {
        return number.toString(); // Return the number as is if it's less than 1000
    }
}

// Functions

function selectProductOptionssv13(op) {
    op.closest('.video-modal-sr-pb-pi-attrselection-ssv13').querySelectorAll('p').forEach(o => {
        o.classList.remove('selected-ssv13');
    });

    op.classList.add('selected-ssv13');
}

function openVideoModalssv13(slideNo, mNo) {
    closePIPssv13();

    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${mNo} .video-modal-sl-video-ssv13`).forEach(element => {
        if (element.src == '') {
            element.src = element.dataset.src;
            element.load();
        }
    });

    ssv13_currentModal = mNo;
    ssv13_modalState = 1;

    let activeInd = ssv13_swiper_modal[ssv13_currentModal].activeIndex;
    ssv13_swiper_modal[ssv13_currentModal].slideTo(slideNo);

    if (slideNo == activeInd) {
        playModalVideossv13(activeInd);
    }

    setPopupHightssv13();
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-ssv13`).style.transform = 'scaleY(1)';

    if (ssv13_storeType == '1') updateShopifyCartssv();

    disableScrollssv13();
}

function closeVideoModalssv13(byUser = false) {
    ssv13_modalState = 0;

    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-ssv13`).style.transform = 'scaleY(0)';
    pauseAllModalVideossv13();

    if (byUser) {
        localStorage.setItem('ssv13_pip', '');
    }

    enableScrollssv13();

    // close popups
    let activeInd = ssv13_swiper_modal[ssv13_currentModal].activeIndex;
    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-L-ssv13`)[activeInd].dispatchEvent(new Event('click'));

    // Analytics code
    pushAnalyticsdatassv13();
}

function playModalVideossv13(slideNo) {
    let vdo = document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-sl-video-ssv13`)[slideNo];

    // if (vdo.src == '') {
    //     vdo.src = vdo.dataset.src;
    //     vdo.load();
    // }

    vdo.currentTime = 0;
    vdo.muted = true;
    // ssv13_globalMute = getMobileOSssv13() == 'iOS' ? true : ssv13_globalMute;
    let playPromise = vdo.play();
    playPromise.then(_ => {
        let btn = vdo.closest('.video-modal-sl-video-container-ssv').querySelectorAll('.video-modal-sl-vc-volume-ssv13');
        vdo.muted = ssv13_globalMute;
        btn[0].innerHTML = btn[1].innerHTML = vdo.muted ? `
            <path d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
        ` : `
            <path d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
        `;

        // Analytics code
        initializeVideoDatassv13(vdo.id, vdo.src, document.querySelectorAll(`.swirl-short-videos-c-ssv13`)[ssv13_currentModal].dataset.playlist);
    }).catch(error => { });

    // no product
    let pc = vdo.dataset.products;
    let ms = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-structure-ssv13`);
    ms.classList.remove('no-product-ssv13');
    if (pc == '0' && ssv13_brandCustomizations.comment_mode == '0') ms.classList.add('no-product-ssv13');
    if (pc == '0' && ssv13_brandCustomizations.comment_mode == '1') document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .JS-modal-comment-tab-ssv13`)[slideNo].dispatchEvent(new Event('click'));

    // Pip
    if (ssv13_brandCustomizations.pip_mode == '1') {
        let pipData = JSON.stringify({
            src: vdo.src,
            poster: vdo.poster
        });
        let cPlaylist = document.querySelector(`video[data-srcf="${vdo.src}"]`).closest('.swirl-short-videos-c-ssv13').dataset.playlist;

        localStorage.setItem('ssv13_pip', pipData);
        localStorage.setItem('ssv13_storePlaylist', cPlaylist);
    }

    // Navigation icon position
    if (window.innerWidth > 768) setNavigationIconssv13(vdo);
}

function pauseAllModalVideossv13() {
    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-sl-video-ssv13`).forEach(elm => {
        elm.pause();
    });
}

function changeModalVideossv13(slideNo) {
    ssv13_swiper_modal[ssv13_currentModal].slideTo(slideNo);
}

function openPIPssv13(mode = false) {
    if (!localStorage.getItem('ssv13_pip')) return;
    let pipData = JSON.parse(localStorage.getItem('ssv13_pip'));

    if (!mode) closeVideoModalssv13();

    let vdo = document.querySelector('.ssv-pip-video-ssv13');
    vdo.src = pipData.src;
    vdo.poster = pipData.poster;

    vdo.load();

    document.querySelector('.swirl-short-video-pip-ssv13').style.transform = 'scaleY(1)';
    setTimeout(() => {
        let playPromise = vdo.play();
        playPromise.then(_ => {
            vdo.muted = ssv13_globalMute;
            document.querySelector('.ssv-pip-volume-ssv13').innerHTML = vdo.muted ? `
                <path class="JS-ignore-fs-click" d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
            ` : `
                <path class="JS-ignore-fs-click" d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
            `;
        }).catch(error => {
        });
    }, 500);
}

function pipVolumessv13(btn) {
    let vdo = document.querySelector('.ssv-pip-video-ssv13');
    if (vdo.muted) {
        vdo.muted = false;
        ssv13_globalMute = false;
        btn.innerHTML = `
            <path class="JS-ignore-fs-click" d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
        `;
    } else {
        vdo.muted = true;
        ssv13_globalMute = true;
        btn.innerHTML = `
            <path class="JS-ignore-fs-click" d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
        `;
    }
}

function closePIPssv13() {
    let vdo = document.querySelector('.ssv-pip-video-ssv13');
    if (!vdo) return;

    vdo.pause();

    document.querySelector('.swirl-short-video-pip-ssv13').style.transform = 'scaleY(0)';

    localStorage.setItem('ssv13_pip', '');
}

function fsPIPssv13() {
    if (event.target.classList.contains('JS-ignore-fs-click')) return;

    let src = document.querySelector('.ssv-pip-video-ssv13').src;
    let slide = document.querySelector(`video[data-srcf="${src}"]`).closest('.swiper-slide');

    closePIPssv13();

    slide.dispatchEvent(new Event('click'));
}

function showMarqueessv13(vdo) {
    setTimeout(() => {
        if (window.getComputedStyle(vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-model-marquee-ssv13')).display == 'none') {
            var marquee = vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-model-marquee-ssv13 span');
            var mContainer = vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-model-marquee-ssv13');
            mContainer.style.display = "block";
            var mContentWidth = marquee.offsetWidth;
            var mSpeedFactor = 70; // Adjust this value to control the speed
            var mAnimationDurations = (mContentWidth / mSpeedFactor) + "s";
            marquee.style.animationDuration = mAnimationDurations;
            marquee.style.transform = `translateX(${mContainer.clientWidth}px)`;

            // elements taken up
            // ['.video-modal-product-slider-ssv13', '.video-modal-sl-bottom-controls-ssv13', '.video-cta-redi-button-ssv13'].forEach(e => {
            //     let elm = vdo.closest('.video-modal-sl-video-container-ssv').querySelector(e);
            //     let btm = parseInt(window.getComputedStyle(elm).getPropertyValue('bottom').replace('px', ''));
            //     elm.style.bottom = (btm + 45) + 'px';
            // });
        }
    }, 600);
}

function hideMarqueessv13(m) {
    m.style.display = "none";
    // ['.video-modal-product-slider-ssv13', '.video-modal-sl-bottom-controls-ssv13', '.video-cta-redi-button-ssv13'].forEach(e => {
    //     let elm = m.closest('.video-modal-sl-video-container-ssv').querySelector(e);
    //     let btm = parseInt(window.getComputedStyle(elm).getPropertyValue('bottom').replace('px', ''));
    //     elm.style.bottom = (btm - 45) + 'px';
    // });
}

function changePCTabssv13(tab, target) {
    tab.closest('.video-modal-sr-pb-tabs-btn-ssv13').querySelectorAll('p').forEach(elm => {
        elm.classList.remove('active-ssv13');
    });
    tab.classList.add('active-ssv13');

    tab.closest('.JS-product-master-ssv13').querySelectorAll('.JS-pc-tab-content-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    tab.closest('.JS-product-master-ssv13').querySelector(target).style.display = 'block';
}

function openProductDetailssv13(pc, n) {
    if (event.target.classList.contains('JS-pc-ignore-ssv13')) return;
    pc.closest('.JS-product-master-ssv13').querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
        // elm.style.transform = 'translateX(110%)';
        elm.style.display = 'none';
    });

    // pc.closest('.JS-product-master-ssv13').querySelectorAll('.video-modal-sr-pb-product-info-ssv13')[n].style.transform = 'translateX(0%)';
    pc.closest('.JS-product-master-ssv13').querySelectorAll('.video-modal-sr-pb-product-info-ssv13')[n].style.display = 'block';
}

function closeProductDetailssv13(btn) {
    // btn.closest('.video-modal-sr-pb-product-info-ssv13').style.transform = 'translateX(110%)';
    btn.closest('.video-modal-sr-pb-product-info-ssv13').style.display = 'none';

    let reviewDiv = btn.closest('.video-modal-sr-pb-pi-header-ssv13').querySelector('.video-modal-sr-pb-pi-review-btn-ssv13');
    if (reviewDiv.classList.contains('open-ssv13')) {
        reviewDiv.dispatchEvent(new Event('click'));
    }
}

function openReviewssv13(btn) {
    if (!btn.closest('.video-modal-sr-pb-pi-review-btn-ssv13').classList.contains('open-ssv13')) {
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-reviews-ssv13').style.maxHeight = 'calc(100% - 80px)';
        btn.closest('.video-modal-sr-pb-pi-review-btn-ssv13').classList.add('open-ssv13');
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-D-ssv13').innerHTML = `
            <path d="M9.25 0.643126H7.75V5.89314H13V4.39313H10.3106L13.5303 1.17345L12.4697 0.112793L9.25 3.33246V0.643126ZM1.00006 8.89307H3.68939L0.469727 12.1127L1.53038 13.1734L4.75006 9.95372V12.6431H6.25007V7.39307H1.00006V8.89307Z" fill="#5D5D60"/>
        `;
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-P-ssv13').innerHTML = `
            <path d="M5.99962 3.02329L1.87462 7.14829L0.696289 5.96996L5.99962 0.666626L11.303 5.96996L10.1246 7.14829L5.99962 3.02329Z" fill="#454549"/>
        `;
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-pclosed-ssv13').style.display = 'flex';

        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-reviews-ssv13').scrollTop = 0;
    } else {
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-reviews-ssv13').style.maxHeight = '0%';
        btn.closest('.video-modal-sr-pb-pi-review-btn-ssv13').classList.remove('open-ssv13');
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-D-ssv13').innerHTML = `
            <path d="M4.81066 4.39307H7.5V2.89307H2.25V8.14307H3.75V5.45372L6.96967 8.67339L8.03032 7.61273L4.81066 4.39307ZM15.75 11.1431H14.25V13.8324L11.0303 10.6127L9.96968 11.6734L13.1894 14.8931H10.5V16.3931H15.75V11.1431Z" fill="#5D5D60" />
        `;
        btn.closest('.video-modal-sr-pb-pi-review-btnR-ssv13').querySelector('.CSS-review-toogler-P-ssv13').innerHTML = `
            <path d="M5.99962 4.97656L10.1246 0.851562L11.303 2.0299L5.99962 7.33323L0.696289 2.0299L1.87462 0.851562L5.99962 4.97656Z" fill="#454549"/>
        `;
        btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-pclosed-ssv13').style.display = 'none';
    }
}

function closeReviewssv13(btn) {
    btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-review-btnR-ssv13 svg').dispatchEvent(new Event('click'));
}

function updateProgressbarssv13(vdo) {
    let percentage = vdo.duration > 0 ? Math.floor((100 / vdo.duration) * vdo.currentTime) : 0;
    vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-progressbar-ssv13 progress').value = percentage;

    // marquee
    if (ssv13_brandCustomizations.marque_txt == '1') {
        var halfwayPoint = vdo.duration / 2;
        var halfwayBeetween = halfwayPoint + 1;
        if ((vdo.currentTime >= halfwayPoint && vdo.currentTime <= halfwayBeetween) || (vdo.currentTime > 0 && vdo.currentTime <= 1)) {
            showMarqueessv13(vdo);
        }
    }
}

function openUserVerificationssv13() {
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'block';
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .user-verification-form-ssv13`).style.transform = 'translateY(0%)';
}

function closeUserVerificationssv13() {
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .user-verification-form-ssv13`).style.transform = 'translateY(110%)';
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'none';
}

function openCartPopupssv13() {
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'block';
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-cart-popup-ssv13`).style.transform = 'translateY(0%)';
}

function closeCartPopupssv13() {
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-cart-popup-ssv13`).style.transform = 'translateY(110%)';
    document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-fade-white-R-ssv13`).style.display = 'none';
}

function videoVolumessv13(btn) {
    let vdo = btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-video-ssv13');
    if (vdo.muted) {
        vdo.muted = false;
        ssv13_globalMute = false;
        btn.innerHTML = `
            <path d="M9.8335 4.82185L6.15341 7.83352H2.25016V12.1669H6.15341L9.8335 15.1785V4.82185ZM5.37991 14.3335H1.16683C0.879512 14.3335 0.603961 14.2194 0.400797 14.0162C0.197633 13.8131 0.0834961 13.5375 0.0834961 13.2502V6.75019C0.0834961 6.46287 0.197633 6.18732 0.400797 5.98415C0.603961 5.78099 0.879512 5.66685 1.16683 5.66685H5.37991L11.1151 0.973853C11.1944 0.908795 11.2906 0.867617 11.3925 0.855112C11.4943 0.842607 11.5976 0.859289 11.6904 0.903216C11.7831 0.947144 11.8615 1.01651 11.9163 1.10324C11.9712 1.18997 12.0002 1.29049 12.0002 1.3931V18.6073C12.0002 18.7099 11.9712 18.8104 11.9163 18.8971C11.8615 18.9839 11.7831 19.0532 11.6904 19.0972C11.5976 19.1411 11.4943 19.1578 11.3925 19.1453C11.2906 19.1328 11.1944 19.0916 11.1151 19.0265L5.381 14.3335H5.37991ZM20.0233 18.812L18.4893 17.278C19.5163 16.3642 20.3379 15.2432 20.9 13.9887C21.462 12.7342 21.7518 11.3748 21.7502 10.0002C21.7515 8.55512 21.431 7.12789 20.8118 5.82217C20.1927 4.51645 19.2905 3.36502 18.1708 2.45152L19.7092 0.913186C21.0292 2.03069 22.0895 3.42271 22.8162 4.99215C23.5429 6.56158 23.9185 8.27066 23.9168 10.0002C23.9168 13.4918 22.4153 16.6324 20.0233 18.812ZM16.1851 14.9738L14.6446 13.4333C15.1705 13.0289 15.5964 12.5089 15.8892 11.9136C16.1821 11.3183 16.3341 10.6636 16.3335 10.0002C16.3335 8.45102 15.521 7.09144 14.2968 6.32552L15.8557 4.7666C16.6763 5.37022 17.3433 6.15852 17.8027 7.06773C18.2621 7.97693 18.501 8.98151 18.5002 10.0002C18.5002 11.9957 17.601 13.781 16.1851 14.9738Z" fill="white"/>
        `;
    } else {
        vdo.muted = true;
        ssv13_globalMute = true;
        btn.innerHTML = `
            <path d="M9.8335 4.46541L6.15341 7.47707H2.25016V11.8104H6.15341L9.8335 14.8221V4.46541ZM5.37991 13.9771H1.16683C0.879512 13.9771 0.603961 13.8629 0.400797 13.6598C0.197633 13.4566 0.0834961 13.1811 0.0834961 12.8937V6.39374C0.0834961 6.10642 0.197633 5.83087 0.400797 5.62771C0.603961 5.42454 0.879512 5.31041 1.16683 5.31041H5.37991L11.1151 0.617407C11.1944 0.55235 11.2906 0.511172 11.3925 0.498667C11.4943 0.486161 11.5976 0.502844 11.6904 0.546771C11.7831 0.590699 11.8615 0.660064 11.9163 0.746793C11.9712 0.833521 12.0002 0.934043 12.0002 1.03666V18.2508C12.0002 18.3534 11.9712 18.454 11.9163 18.5407C11.8615 18.6274 11.7831 18.6968 11.6904 18.7407C11.5976 18.7846 11.4943 18.8013 11.3925 18.7888C11.2906 18.7763 11.1944 18.7351 11.1151 18.6701L5.381 13.9771H5.37991ZM21.1153 9.64374L24.946 13.4744L23.4142 15.0062L19.5835 11.1756L15.7528 15.0062L14.221 13.4744L18.0517 9.64374L14.221 5.81307L15.7528 4.28124L19.5835 8.11191L23.4142 4.28124L24.946 5.81307L21.1153 9.64374Z" fill="white" />
        `;
    }
}

function openSharePopupssv13(btn) {
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';
    if (window.innerWidth > 768) {
        btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.display = 'block';
    } else {
        btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.transform = 'translateY(0%)';
    }

    disableSwiperssv13();
}

function closePopupssv13(bg) {
    if (window.getComputedStyle(bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13')).transform == 'matrix(1, 0, 0, 1, 0, 0)') {
        if (window.innerWidth > 768) {
            bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.display = 'none';
        } else {
            bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-share-popup-ssv13').style.transform = 'translateY(110%)';
        }
        bg.style.display = 'none';
    }

    if (window.getComputedStyle(bg.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13')).transform == 'matrix(1, 0, 0, 1, 0, 0)') {
        bg.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13').style.transform = 'translateY(110%)';
        bg.style.display = 'none';

        bg.closest('.video-modal-structure-ssv13').querySelector('.uvf-close-btn-ssv13').dispatchEvent(new Event('click'));
        bg.closest('.video-modal-structure-ssv13').querySelector('.cart-popup-btn-close-ssv13').dispatchEvent(new Event('click'));

        let reviewDiv = bg.closest('.video-modal-structure-ssv13').querySelector('.video-modal-sr-pb-pi-review-btn-ssv13.open-ssv13');
        if (reviewDiv) reviewDiv.dispatchEvent(new Event('click'));
    }

    if (window.getComputedStyle(bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-product-reviews-ssv13')).transform == 'matrix(1, 0, 0, 1, 0, 0)') {
        bg.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-product-reviews-ssv13').style.transform = 'translateY(110%)';
        bg.style.display = 'none';
    }

    enableSwiperssv13();
}

function pinCommentsFoldssv13(elm) {
    if (elm.querySelectorAll('.pinned-ssv13').length) {
        // let lastPin = elm.querySelectorAll('.pinned-ssv13')[(elm.querySelectorAll('.pinned-ssv13').length - 1)];
        // let isVisible = isElementVisiblessv13(lastPin);
        let firstPin = elm.querySelectorAll('.pinned-ssv13')[0];
        let isVisible = isElementVisiblessv13(firstPin);

        if (isVisible) {
            elm.querySelector('.video-modal-sr-pb-pin-card-ssv13').style.display = 'none';
        } else {
            elm.querySelector('.video-modal-sr-pb-pin-card-ssv13').style.display = 'block';
        }
    }
}

function scrolltoPinssv13(elm) {
    elm.closest('.video-modal-sr-pb-comments-ssv13').scrollTo(0, 0);
}

function showControlssv13(vdo) {
    let controls = vdo.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-controls-ssv13');
    controls.style.display = 'flex';
    setTimeout(() => {
        controls.style.display = 'none';
    }, 3000);
}

function videoPlayPausessv13(btn) {
    let vdo = btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-sl-video-ssv13');
    if (vdo.paused) {
        vdo.play();
        btn.innerHTML = `
            <path d="M0.5 0.916626H5.66667V37.0833H0.5V0.916626ZM26.3333 0.916626H31.5V37.0833H26.3333V0.916626Z" fill="#F5F5F5" />
        `;
    } else {
        vdo.pause();
        btn.innerHTML = `                
            <path d="M30.055 21.0747L2.67424 39.3285C2.47973 39.458 2.25375 39.5322 2.02038 39.5434C1.787 39.5546 1.55497 39.5022 1.34899 39.3919C1.14301 39.2816 0.970802 39.1176 0.850702 38.9172C0.730603 38.7167 0.667113 38.4875 0.666992 38.2539V1.7462C0.667113 1.51256 0.730603 1.28332 0.850702 1.08291C0.970802 0.8825 1.14301 0.718416 1.34899 0.608137C1.55497 0.497857 1.787 0.445512 2.02038 0.456676C2.25375 0.46784 2.47973 0.542096 2.67424 0.671534L30.055 18.9254C30.2319 19.0433 30.3769 19.2031 30.4773 19.3906C30.5776 19.5781 30.6301 19.7874 30.6301 20C30.6301 20.2127 30.5776 20.422 30.4773 20.6095C30.3769 20.7969 30.2319 20.9567 30.055 21.0747Z" fill="#F5F5F5"/>
        `;
    }
}

function videoAlertssv13(msg, sec, btn, side = '') {
    let cModal = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal}`);
    let btnPos = btn ? getElementPositionInMasterDivssv13(cModal.querySelector(`${window.innerWidth > 768 ? '.video-modal-structure-right-ssv13' : '.video-modal-structure-ssv13'}`), btn) : '';
    let aElm = cModal.querySelector(`${window.innerWidth > 768 ? '.video-modal-alert-R-ssv13' : '.video-modal-alert-P-ssv13'}`);
    aElm = side && window.innerWidth > 768 ? cModal.querySelectorAll('.video-modal-alert-L-ssv13')[(ssv13_swiper_modal[ssv13_currentModal].activeIndex)] : aElm;
    aElm.innerHTML = msg;
    aElm.style.display = 'block';
    aElm.style.top = btnPos != '' ? (btnPos.top - 80) + "px" : '50%';
    setTimeout(() => {
        aElm.style.display = 'none';
    }, sec);
}

function copyLinkssv13(inp) {
    inp.select();
    inp.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inp.value);

    videoAlertssv13('Link copied!', 2000, '', 'L');

    return;
}

function copyEmailEmbedssv13(link, poster, elm) {
    let tc = document.createElement('div');
    tc.innerHTML = ` <textarea class="email-share-txt-ssv13" style="display: none !important;" onclick="copyFormatedssv(this);"></textarea>`;
    document.body.appendChild(tc);

    let tArea = document.querySelector('.email-share-txt-ssv13');

    tArea.value = `
        <center>
            <a href="${link}">
            <table cellpadding="0" cellspacing="0" border="0" style="min-height: 640px; min-width: 360px">
                <tbody>
                <tr>
                    <td aria-label="videoPreviewImage" style="background-image: url(${poster}); background-repeat: no-repeat; background-size: cover; background-position: center; border-radius: 25px; min-width: 100%;">
                    <span style="display: none">.</span>
                    <!--[if gte mso 9]>
                        <v:image xmlns:v="urn:schemas-microsoft-com:vml" id="videoGifPreview" src="${poster}" style="behavior: url(#default#VML); height: {@height}; width: {@width}; top: 0; left: 0; border: 0; z-index: 1;"/>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="false" stroke="false" style="position: relative;">
                        <![endif]-->
                    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="min-width: 100%">
                        <tbody>
                        <tr>
                            <td height="640" width="360" background="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play-icon.webp" style="background-image: url(https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play-icon.webp); background-repeat: no-repeat; background-position: center; position: relative; display: inline-block; height: 640px; width:360px; min-width: 100%;">
                            <!--[if gte mso 9]><v:image xmlns:v="urn:schemas-microsoft-com:vml" id="videoGifPlayButton" src={@button_url} style="behavior: url(#default#VML); position: absolute; top: {floor((@height/2)-40)}px; left:  {floor((@width/2)-40)}px; height: 80px; width: 80px; "/><![endif]-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!--[if gte mso 9]></v:rect><![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
            </a>
        </center>
    `;

    let htmlEditor = CodeMirror.fromTextArea(tArea, {
        mode: 'text/html'
    });
    copyFormattedHtmlssv13(htmlEditor.getValue());
    document.body.removeChild(tc);

    videoAlertssv13('Embed code copied!', 2000, '', 'L');
}

function copyFormattedHtmlssv13(html) {
    // Create an iframe (isolated container) for the HTML
    let container = document.createElement('div');
    container.innerHTML = html;

    // Hide element
    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.opacity = 0;

    // Detect all style sheets of the page
    let activeSheets = Array.prototype.slice.call(document.styleSheets)
        .filter(function (sheet) {
            return !sheet.disabled;
        })

    // Mount the iframe to the DOM to make `contentWindow` available
    document.body.appendChild(container);

    // Copy to clipboard
    window.getSelection().removeAllRanges();

    let range = document.createRange();
    range.selectNode(container);
    window.getSelection().addRange(range);

    document.execCommand('copy');
    // for (let i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true
    document.execCommand('copy');
    // for (let i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false

    // Remove the iframe
    document.body.removeChild(container);
}

function toggleVideoThumbssv13(btn) {
    let sBoard = btn.closest('.video-modal-structure-ssv13').querySelector('.video-modal-sl-thumbs-block-ssv13');
    sBoard.style.width = '100%';
    sBoard.style.overflowY = 'scroll';
    sBoard.style.transform = 'translateX(0)';
    btn.style.display = 'none';
    setTimeout(() => {
        sBoard.style.width = 'auto';
        sBoard.style.width = 'max-content';
        sBoard.style.overflowY = 'visible';
        sBoard.style.transform = 'translateX(-100%)';
        btn.style.display = 'block';
    }, 4000);
}

function openPhoneProductDetailssv13(pc, n, pn) {
    if (event.target.classList.contains('JS-pc-ignore-ssv13')) return;

    pc.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';

    let pMaster = pc.closest('.video-modal-structure-ssv13').querySelectorAll('.JS-product-master-ssv13')[n];

    pMaster.querySelectorAll('.JS-pc-tab-content-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    pMaster.querySelector('.JS-product-section-ssv13').style.display = 'block';

    pMaster.querySelectorAll('.video-modal-sr-pb-product-info-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    pMaster.querySelectorAll('.video-modal-sr-pb-product-info-ssv13')[pn].style.display = 'block';

    pc.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13').style.transform = 'translateY(0%)';

    disableSwiperssv13();
}

function openCommentssv13(btn, n) {
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';

    let pMaster = btn.closest('.video-modal-structure-ssv13').querySelectorAll('.JS-product-master-ssv13')[n];

    pMaster.querySelectorAll('.JS-pc-tab-content-ssv13').forEach(elm => {
        elm.style.display = 'none';
    });
    pMaster.querySelector('.JS-comment-section-ssv13').style.display = 'block';

    btn.closest('.video-modal-structure-ssv13').querySelector('.video-modal-structure-right-ssv13').style.transform = 'translateY(0%)';

    disableSwiperssv13();
}

function addCommentsListnerssv13(vId) {
    ssv13_commentsLoaded.push(vId);
    ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).collection('comments').orderBy('isPinned', 'desc').orderBy('createdAt', 'desc').limit(30).onSnapshot((snapshot) => {
        if (snapshot.size) {
            let commentsAll = snapshot.docChanges().reverse();
            commentsAll.forEach((change) => {
                document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).style.display = 'none';
                let comment = change.doc.data();
                let cId = change.doc.id;
                let cMaster = document.querySelector(`.JS-comments-${vId}-ssv13`);
                if (change.type === "added") {
                    // console.log("New document: ", change.doc.data());                                                    
                    comment.comment = replaceUrlsWithAnchorssv13(comment.comment);

                    let cProfile = typeof comment.brand_logo != 'undefined' ? `
                        <img src="${comment.brand_logo}" alt="Brand logo" title="Brand logo" />
                        ` : `
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_b_284_9460)">
                                <circle cx="15" cy="15.6431" r="15" fill="#E8E8E8" />
                            </g>
                            <g clip-path="url(#clip0_284_9460)">
                                <path
                                    d="M9.66699 22.3096C9.66699 20.8951 10.2289 19.5385 11.2291 18.5383C12.2293 17.5381 13.5858 16.9762 15.0003 16.9762C16.4148 16.9762 17.7714 17.5381 18.7716 18.5383C19.7718 19.5385 20.3337 20.8951 20.3337 22.3096H19.0003C19.0003 21.2487 18.5789 20.2313 17.8288 19.4811C17.0786 18.731 16.0612 18.3096 15.0003 18.3096C13.9395 18.3096 12.922 18.731 12.1719 19.4811C11.4218 20.2313 11.0003 21.2487 11.0003 22.3096H9.66699ZM15.0003 16.3096C12.7903 16.3096 11.0003 14.5196 11.0003 12.3096C11.0003 10.0996 12.7903 8.30957 15.0003 8.30957C17.2103 8.30957 19.0003 10.0996 19.0003 12.3096C19.0003 14.5196 17.2103 16.3096 15.0003 16.3096ZM15.0003 14.9762C16.4737 14.9762 17.667 13.7829 17.667 12.3096C17.667 10.8362 16.4737 9.6429 15.0003 9.6429C13.527 9.6429 12.3337 10.8362 12.3337 12.3096C12.3337 13.7829 13.527 14.9762 15.0003 14.9762Z"
                                    fill="#747477" />
                            </g>
                            <defs>
                                <filter id="filter0_b_284_9460" x="-10" y="-9.35693" width="50"
                                    height="50" filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
                                    <feComposite in2="SourceAlpha" operator="in"
                                        result="effect1_backgroundBlur_284_9460" />
                                    <feBlend mode="normal" in="SourceGraphic"
                                        in2="effect1_backgroundBlur_284_9460" result="shape" />
                                </filter>
                                <clipPath id="clip0_284_9460">
                                    <rect width="16" height="16" fill="white"
                                        transform="translate(7 7.64307)" />
                                </clipPath>
                            </defs>
                        </svg>
                    `;
                    let cCard = `
                        <div class="video-modal-sr-pb-comment-card-ssv13">
                            <div class="video-modal-sr-pb-cc-profile-ssv13">
                                ${cProfile}
                            </div>
                            <div class="video-modal-sr-pb-cc-content-ssv13">
                                <h4 class="video-modal-sr-pb-cc-user-ssv13">
                                    ${comment.uName}
                                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.643066" width="4" height="4" rx="2" fill="#8B8B8E" />
                                    </svg>
                                    <label>${getTimeAgossv13(comment.createdAt)}</label>
                                </h4>
                                <p class="video-modal-sr-pb-cc-comment-ssv13">${comment.comment}</p>
                                <svg class="video-modal-sr-pb-cc-pin-ssv13" width="13" height="14"
                                    viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.8764 6.42442L11.9331 7.36709L11.4618 6.89576L8.63377 9.72376L8.16244 12.0811L7.2191 13.0238L4.3911 10.1951L1.0911 13.4951L0.148438 12.5524L3.44844 9.25242L0.619771 6.42442L1.56244 5.48109L3.92044 5.00976L6.74844 2.18176L6.2771 1.71042L7.21977 0.76709L12.8764 6.42442Z"
                                        fill="#334499" />
                                </svg>
                            </div>
                        </div>
                    `;

                    let cDiv = document.createElement('div');
                    cDiv.classList.add('JS-r-comment');
                    cDiv.classList.add('JS-comments-all');
                    cDiv.id = `JS-comment-${cId}`;
                    cDiv.innerHTML = cCard;
                    cMaster.appendChild(cDiv);

                    if (comment.isPinned == '1') {
                        // Clone same div
                        let oComment = document.querySelector(`#JS-comment-${cId}`);
                        let pComment = oComment.cloneNode(true);
                        pComment.classList.remove('JS-r-comment');
                        pComment.classList.add('JS-p-comment');
                        pComment.classList.add('JS-comments-all');
                        pComment.id = `JS-comment-p-${cId}`;
                        pComment.querySelector('.video-modal-sr-pb-comment-card-ssv13').classList.add('pinned-ssv13');

                        let rCommentsAll = document.querySelectorAll(`.JS-comments-${vId}-ssv13 .JS-r-comment`);
                        if (rCommentsAll.length) {
                            cMaster.insertBefore(pComment, rCommentsAll[0]);
                        } else {
                            cMaster.appendChild(pComment);
                        }

                        let pc = document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-counter-ssv13`);
                        pc.innerHTML = (parseInt(pc.innerHTML) + 1);
                    }

                    let elmHeight = cMaster.scrollHeight;
                    cMaster.scrollTop = elmHeight;
                }
                if (change.type === "modified") {
                    // console.log("Modified document: ", change.doc.data());
                    if (comment.isPinned == '1') {
                        // Clone same div
                        let oComment = document.querySelector(`#JS-comment-${cId}`);
                        let pComment = oComment.cloneNode(true);
                        pComment.classList.remove('JS-r-comment');
                        pComment.classList.add('JS-p-comment');
                        pComment.classList.add('JS-comments-all');
                        pComment.id = `JS-comment-p-${cId}`;
                        pComment.querySelector('.video-modal-sr-pb-comment-card-ssv13').classList.add('pinned-ssv13');

                        let rCommentsAll = document.querySelectorAll(`.JS-comments-${vId}-ssv13 .JS-r-comment`);
                        if (rCommentsAll.length) {
                            cMaster.insertBefore(pComment, rCommentsAll[0]);
                        } else {
                            cMaster.appendChild(pComment);
                        }

                        let pc = document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-counter-ssv13`);
                        pc.innerHTML = (parseInt(pc.innerHTML) + 1);
                    }

                    if (comment.isPinned == '0') {
                        document.querySelector(`.JS-comments-${vId}-ssv13 #JS-comment-p-${cId}`).remove();
                        let pc = document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-counter-ssv13`);
                        pc.innerHTML = (parseInt(pc.innerHTML) - 1);
                    }
                }
                if (change.type === "removed") {
                    // console.log("Removed document: ", change.doc.data());                    
                    let cr = document.querySelector(`.JS-comments-${vId}-ssv13 #JS-comment-${cId}`);
                    let cp = document.querySelector(`.JS-comments-${vId}-ssv13 #JS-comment-p-${cId}`);
                    if (cr) cr.remove();
                    if (cp) cp.remove();
                }
            });
            if (document.querySelectorAll(`.JS-comments-${vId}-ssv13 .JS-comments-all`).length == 0) {
                document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).innerHTML = 'No Comments';
                document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).style.display = 'block';
            }
        } else {
            document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).innerHTML = 'No Comments';
        }
    }, (error) => {
        console.log(`Video ${vId}: Comments fetch failed: ${error}`);
    });
}

function loadCommentssv13(vId) {
    // Check if the document exists
    ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            // Listner
            if (!ssv13_commentsLoaded.includes(vId)) {
                addCommentsListnerssv13(vId);
            }
        } else {
            document.querySelector(`.JS-comments-${vId}-ssv13 .JS-pinned-comment-loading-ssv13`).innerHTML = 'No Comments';
        }
    }).catch((error) => {
        console.log(`Video ${vId}: Comments fetch failed: ${error}`);
    });
}

function addUserssv13(frm) {
    let uName = frm.querySelector('.uvf-input-fname-ssv13').value;
    let uPhone = frm.querySelector('.uvf-input-phone-ssv13').value;
    let uPhoneCode = frm.querySelector('.country-selected-ssv13 i').dataset.code;

    let regName = /^[a-zA-Z ]+$/;
    if (!uName.match(regName)) {
        videoAlertssv13('Please enter valid name.', 2000, frm);
        return false;
    }
    let regPhone = /^\d{10}$/;
    if (!uPhone.match(regPhone)) {
        videoAlertssv13('Please enter valid phone number.', 2000, frm);
        return false;
    }

    let uData = {
        uName: uName,
        uPhone: uPhone,
        uPhoneCode: uPhoneCode
    }

    ssv13_userData = uData;
    localStorage.setItem('ssv13_user', JSON.stringify(uData));
    document.querySelectorAll(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .video-modal-sr-pb-cf-btn-ssv13 button`)[ssv13_swiper_modal[ssv13_currentModal].activeIndex].dispatchEvent(new Event('click'));
    frm.closest('.user-verification-form-ssv13').querySelector('.uvf-close-btn-ssv13').dispatchEvent(new Event('click'));

    return false;
}

function addCommentssv13(vId, frm) {
    let inp = frm.querySelector('input');
    if (inp.value == '') { inp.reportValidity(); return false; }

    if (ssv13_userData) {
        let cData = {
            uName: ssv13_userData.uName,
            uPhone: ssv13_userData.uPhone,
            uPhoneCode: ssv13_userData.uPhoneCode,
            comment: inp.value,
            createdAt: new Date().getTime(),
            isPinned: 0
        }

        try {
            ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).set({}).then(() => {
                ssv13_fsdb.collection("ssv13_comments").doc(`v${vId}`).collection("comments").add(cData).then((vcref) => {
                    if (!ssv13_commentsLoaded.includes(vId)) {
                        addCommentsListnerssv13(vId);
                    }
                }).catch((error) => {
                    console.log("Error adding video comment document: ", error);
                });
            }).catch((error) => {
                console.log("Error adding video comment document: ", error);
            });
        } catch (error) {
            console.log("Error adding video comment document: ", error);
        }
        inp.value = '';
    } else {
        openUserVerificationssv13();
    }

    return false;
}

function openReviewSliderssv13(btn) {
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-fade-white-L-ssv13').style.display = 'block';
    btn.closest('.video-modal-sl-video-container-ssv').querySelector('.video-modal-product-reviews-ssv13').style.transform = 'translateY(0%)';

    btn.closest('.video-modal-sl-video-container-ssv').querySelectorAll('.video-modal-pr-bottom-ssv13').forEach(e => {
        e.scrollTop = 0;
    });

    let slide = ssv13_swiper_modal[ssv13_currentModal].slides[ssv13_swiper_modal[ssv13_currentModal].activeIndex];
    let vId = slide.querySelector('video').dataset.id;
    ssv13_swiper_review[`sw${vId}-${ssv13_currentModal}`].slideTo(ssv13_swiper_product[`sw${vId}-${ssv13_currentModal}`].activeIndex);

    disableSwiperssv13();
}

function changeQtyssv13(action, btn) {
    let qtyLimit = 10;
    let qInp = btn.closest('.video-modal-sr-pb-pi-qty-ssv13').querySelector('.qty-val-ssv13');
    let minus = btn.closest('.video-modal-sr-pb-pi-qty-ssv13').querySelector('.qty-minus-ssv13');
    let plus = btn.closest('.video-modal-sr-pb-pi-qty-ssv13').querySelector('.qty-plus-ssv13');
    let cVal = parseInt(qInp.value);
    if (action == 'minus') {
        qInp.value = (cVal - 1);
    } else if (action == 'plus') {
        qInp.value = (cVal + 1);
    }
    if (qInp.value == 1) { minus.disabled = true; } else { minus.disabled = false; }
    if (qInp.value == qtyLimit) { plus.disabled = true; } else { plus.disabled = false; }
}

let graphqlCartId = '';
function addtocartssv13(videoId, productId, skuCode, btn, qty = 0) {
    productId = ssv13_productIds[productId];

    let quantity = qty ? qty : btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.qty-val-ssv13').value;

    let aPopup = btn.classList.contains('video-modal-sr-pb-pi-cta-cart-ssv13') ? true : false;

    let btnText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `
        <svg style="height: 35px; width: 35px; padding: 0;" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <path fill="#131306" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
            </path>
        </svg>
    `;

    if (ssv13_storeType == '1') {  // Shopify        
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    {
                        id: productId,
                        quantity: quantity
                    }
                ]
            })
        }).then(response => {
            if (!response.ok) {
                console.log('SSV Add to cart: Network response was not ok');
                btn.innerHTML = btnText;
                btn.disabled = false;
                videoAlertssv13('Failed to add.', 2000, btn);
            }
            return response.json();
        }).then(response => {
            btn.innerHTML = btnText;
            btn.disabled = false;
            if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                openCartPopupssv13();
            } else {
                videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
            }
            updateShopifyCartssv();
        }).catch(error => {
            // Handle error
            console.log('SSV Add to cart: There was a problem with the fetch operation: ' + error);
            btn.innerHTML = btnText;
            btn.disabled = false;
            videoAlertssv13('Sold out.', 2000, btn);
        });
    } if (ssv13_storeType == '2') {  // Woo commerse
        if (ssv13_brandCustomizations.ajax_cart_class == '') {
            // if ('undefined' === typeof wc_add_to_cart_params) {
            //     return false;
            // }
            // let data = {
            //     product_id: productId,
            //     quantity: quantity,
            // };
            // jQuery.post(wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'), data, function (response) {
            //     if (!response) {
            //         videoAlertssv13('Faied to add.', 2000, btn);
            //         return;
            //     }
            //     if (response.error && response.product_url) {
            //         videoAlertssv13('Out of stock.', 2000, btn);
            //     } else {
            //         videoAlertssv13('Added to cart.', 2000, btn);                    
            //         jQuery(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash]);
            //         if (ssv13_brandCustomizations.dot_class) {
            //             if (jQuery(`.${ssv13_brandCustomizations.dot_class}`).length > 0) {
            //                 jQuery('.cart-count-ssv').html(parseInt(jQuery(`.${ssv13_brandCustomizations.dot_class}`).html()));
            //             }
            //         }
            //     }
            //     jQuery(btn).html(ssv13_brandCustomizations.add_to_cart_btn);
            //     jQuery(btn).removeAttr('disabled');
            //     jQuery('.quantity-inp-ssv').val('1');
            //     return
            // });
            btn.innerHTML = btnText;
            btn.disabled = false;
            if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                openCartPopupssv13();
            } else {
                videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
            }
        } else {
            let aTag = document.createElement('a');
            aTag.href = '/?add-to-cart=' + productId;
            aTag.setAttribute('data-quantity', quantity);
            aTag.setAttribute('data-product_id', productId);

            document.body.appendChild(aTag);

            aTag.dispatchEvent(new Event('click'));

            document.body.removeChild(aTag);

            setTimeout(() => {
                btn.innerHTML = btnText;
                btn.disabled = false;
                if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                    openCartPopupssv13();
                } else {
                    videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
                }
            }, 1500);
        }
    } if (ssv13_storeType == '6') {  // NNNow                 
        let sOp = !qty ? btn.closest('.video-modal-sr-pb-product-info-ssv13').querySelector('.video-modal-sr-pb-pi-attrselection-ssv13 p.selected-ssv13') : '';
        skuCode = qty ? productId : sOp.dataset.sku;

        if (getCookiessv13('accessToken')) { // logged in              
            let accessT = getCookiessv13('accessToken');

            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessT}`);
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Module", "odin");

            let raw = JSON.stringify({
                "products": [
                    {
                        "skuId": skuCode,
                        "qty": quantity
                    }
                ]
            });

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.nnnow.com/d/api/myBag/v3", requestOptions).then(response => response.text()).then(result => {
                if (result.status == true) {
                    btn.innerHTML = btnText;
                    btn.disabled = false;
                    if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                        openCartPopupssv13();
                    } else {
                        videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
                    }
                    updateVideoCartCountssv13(response.data.bagTotalItemCount);
                } else {
                    videoAlertssv13('Faied to add.', 2000, btn);
                }
            }).catch(error => { videoAlertssv13('Faied to add.', 2000, btn); });
        } else { // logout            
            let cg = '';
            let bagC = 0;
            let newCG = [];
            let cgMatch = false;
            if (getCookiessv13('cart-guest')) {
                cg = JSON.parse(getCookiessv13('cart-guest'));
                cg.forEach(cgi => {
                    bagC += cgi.qty;
                    if (cgi.skuId == skuCode) {
                        cgi.qty += quantity;
                        cgMatch = true;
                    }
                    newCG.push(cgi);
                });
                if (!cgMatch) {
                    newCG.push({ skuId: skuCode, qty: quantity });
                }
                cg = newCG;
                cg = JSON.stringify(cg);
                bagC += quantity;
            } else {
                cg = JSON.stringify([{ skuId: skuCode, qty: quantity }]);
                bagC = quantity;
            }

            setCookiessv13('cart-guest', cg, 365, '.nnnow.com');

            btn.innerHTML = btnText;
            btn.disabled = false;
            if (ssv13_brandCustomizations.show_add_to_cart_popup == '1' && aPopup) {
                openCartPopupssv13();
            } else {
                videoAlertssv13(ssv13_brandCustomizations.cart_success_message, 2000, btn);
            }
            updateVideoCartCountssv13(bagC);
        }
    }

    // setTimeout(() => {
    //     btn.innerHTML = btnText;
    //     btn.disabled = false;
    // }, 2000);
}

function updateVideoCartCountssv13(cnt) {
    document.querySelectorAll('.cart-count-ssv13').forEach(elm => {
        elm.innerHTML = cnt;
    });
}
function updateShopifyCartssv() {
    fetch('/cart.js', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            console.log('SSV fetch cart: Network response was not ok');
        }
        return response.json();
    }).then(data => {
        updateVideoCartCountssv13(data.item_count);
    }).catch(error => {
        console.log('SSV fetch cart: There was a problem with the fetch operation:' + error);
    });
}

function countryDropdownssv13(selector, drp) {
    let Selected = document.querySelector(selector);
    let Drop = document.querySelector(drp);
    let DropItem = Drop.querySelectorAll('li');

    Selected.addEventListener('click', function () {
        Selected.classList.toggle('open-ssv13');
        if (Drop.style.display === 'none') {
            Drop.style.display = 'block';
        } else {
            Drop.style.display = 'none';
        }
    });

    Drop.querySelectorAll('li').forEach(function (item) {
        item.addEventListener('click', function () {
            Selected.classList.remove('open-ssv13');
            Drop.style.display = 'none';
            Selected.innerHTML = `
                <i class="${item.querySelector('i').getAttribute('class')}" data-code="${item.dataset.code}"></i>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.99956 3.879L8.71206 0.166504L9.77256 1.227L4.99956 6L0.226562 1.227L1.28706 0.166504L4.99956 3.879Z"
                        fill="#A2A2A4" />
                </svg>
            `;
        });
    });
}

function CTAClickssv13(pId, dId, vId, cType) {
    let requestData = new URLSearchParams();
    requestData.append('designer_id', dId);
    requestData.append('product_id', pId);
    requestData.append('user_id', '');
    requestData.append('video_id', vId);
    requestData.append('type', cType);

    // Send the POST request using Fetch API
    fetch('https://api.goswirl.live/index.php/shopify/actionbuttons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestData.toString()
    }).then(response => {
        if (!response.ok) {
            console.log('SSV CTA store: Network response was not ok');
        }
        return response.json();
    }).then(data => { }).catch(error => {
        console.error('SSV CTA store: Track failed!' + error);
    });
}

function disableSwiperssv13() {
    if (window.innerWidth <= 768) {
        ssv13_swiper_modal[ssv13_currentModal].allowSlideNext = false;
        ssv13_swiper_modal[ssv13_currentModal].allowSlidePrev = false;
        ssv13_swiper_modal[ssv13_currentModal].allowTouchMove = false;
    }
}

function enableSwiperssv13() {
    if (window.innerWidth <= 768) {
        ssv13_swiper_modal[ssv13_currentModal].allowSlideNext = true;
        ssv13_swiper_modal[ssv13_currentModal].allowSlidePrev = true;
        ssv13_swiper_modal[ssv13_currentModal].allowTouchMove = true;
    }
}

let allOverElements = [];
let allOverElementsSticky = [];
function disableScrollssv13() {
    let scrollPosition = [
        window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    let html = document.querySelector('html');
    html.setAttribute('data-scroll-position', JSON.stringify(scrollPosition));
    html.setAttribute('data-previous-overflow', html.style.overflow);
    html.style.overflow = 'hidden';
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Exclude
    let clientImpClasses = [];
    if (ssv13_storeType == '1' && ssv13_brandCustomizations.dot_class) {
        ssv13_brandCustomizations.dot_class.split(',').forEach(cls => {
            clientImpClasses.push(cls.trim());
        });
    }

    // hide all fixed visible elements
    let allOverElements = [];
    document.querySelectorAll('*').forEach(function (el) {
        if (window.getComputedStyle(el).position === 'fixed' && el.offsetParent !== null && el.offsetWidth > 0 && el.offsetHeight > 0) {
            let classof = el.classList.length > 0 ? el.classList[0] : 'NoClass';
            if (!el.classList.contains('video-modal-ssv13') && !el.classList.contains('swirl-short-video-pip-ssv13') && !clientImpClasses.includes(classof)) {
                el.style.display = 'none';
                allOverElements.push(el);
            }
        }

        if (window.getComputedStyle(el).position === 'sticky' && el.offsetParent !== null && el.offsetWidth > 0 && el.offsetHeight > 0) {
            let classof = el.classList.length > 0 ? el.classList[0] : 'NoClass';
            if (!el.classList.contains('video-modal-ssv13') && !el.classList.contains('swirl-short-video-pip-ssv13') && !clientImpClasses.includes(classof)) {
                el.style.display = 'none';
                allOverElements.push(el);
            }
        }
    });
}

function enableScrollssv13() {
    let html = document.querySelector('html');
    let scrollPosition = JSON.parse(html.getAttribute('data-scroll-position'));
    html.style.overflow = html.getAttribute('data-previous-overflow');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // Show again all hidden fixed elements
    allOverElements.forEach(function (element) {
        element.style.display = '';
    });

    // Show again all hidden fixed elements
    allOverElementsSticky.forEach(function (element) {
        element.style.display = '';
    });
}

function setPopupHightssv13() {
    document.querySelectorAll('.video-modal-ssv13').forEach(elm => {
        elm.style.height = window.innerHeight + 'px';
        elm.style.width = window.innerWidth + 'px';
    });
}

function setNavigationIconssv13(vdo) {
    if (ssv13_brandCustomizations.next_previous_preview == '0') {
        let btnNext = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-next-ssv13-m`);
        let btnPrev = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-prev-ssv13-m`);
        let half = Math.floor(vdo.clientWidth / 2) + 15;
        btnNext.style.right = `calc(50% - ${half}px - 50px)`;
        btnPrev.style.left = `calc(50% - ${half}px - 50px)`;
    } else {
        let btnNext = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-next-ssv13-m`);
        let btnPrev = document.querySelector(`.swirl-short-videos-m-ssv13-${ssv13_currentModal} .swiper-ssv13-m .swiper-button-prev-ssv13-m`);
        let half = Math.floor(vdo.clientWidth / 2) + 15;
        btnNext.style.right = `0`;
        btnNext.style.width = `calc(50% - ${half}px)`;
        btnNext.style.top = `0`;
        btnNext.style.margin = `0`;
        btnNext.style.height = `100%`;
        btnNext.style.justifyContent = `left`;
        btnNext.style.cursor = `default`;
        btnNext.querySelector('svg').style.width = `auto`;
        btnNext.querySelector('svg').style.cursor = `pointer`;

        btnPrev.style.left = `0`;
        btnPrev.style.width = `calc(50% - ${half}px)`;
        btnPrev.style.top = `0`;
        btnPrev.style.margin = `0`;
        btnPrev.style.height = `100%`;
        btnPrev.style.justifyContent = `right`;
        btnPrev.style.cursor = `default`;
        btnPrev.querySelector('svg').style.width = `auto`;
        btnPrev.querySelector('svg').style.cursor = `pointer`;
    }
}

addEventListener('keydown', function (event) {
    if (event.key === "Escape" && ssv13_modalState) {
        closeVideoModalssv13(true);
    } else if (event.keyCode == 37 && ssv13_modalState) {
        ssv13_swiper_modal[ssv13_currentModal].slidePrev(); //on left arrow
    } else if (event.keyCode == 39 && ssv13_modalState) {
        ssv13_swiper_modal[ssv13_currentModal].slideNext(); //on right arrow
    }
});

addEventListener('resize', (event) => {
    setPopupHightssv13();
    updateCarouselVideoHeightssv13(ssv13_currentModal);
    updateModalVideoHeightssv13(ssv13_currentModal);
});