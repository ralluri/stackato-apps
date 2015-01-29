define("PubSub", [], function () {
  var g = {}, e = {}, h = 0;
  return{sub:function (a, d) {
    if (typeof d !== "function") {
      return-1;
    }
    var c = g[a];
    c || (c = g[a] = []);
    c.push(++h);
    e[h] = {channel:a, callback:d};
    return h
  }, unsub:function (a) {
    if (-1 === a || !e[a]) {
      return!1;
    }
    var d = e[a] && g[e[a].channel];
    delete e[a];
    for (var c = d.length; c;) {
      if (d[--c] === a) {
        return d.splice(c, 1), !0;
      }
    }
    return!1
  }, pub:function (a, d) {
    var c = a.split("."), i, h = c.length, k = "", l = 0;
    for (i = 0; i < h; ++i) {
      k += (0 === i ? "" : ".") + c[i];
      var b;
      var f = k;
      b = d;
      if (g[f]) {
        b ? typeof b !== "object" && (b = {data:b}) : b =
        {};
        b.channel = f;
        for (var f = g[f].slice(), j = void 0, j = 0; j < f.length; ++j) {
          e[f[j]].callback(b);
        }
        b = j
      } else {
        b = 0;
      }
      l += b
    }
    return l
  }}
});