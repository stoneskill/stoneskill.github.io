/* Original script for the stoneskill bookmark page. No libraries. */
(function () {
  "use strict";

  var list = document.getElementById("bookmark-list");
  var status = document.getElementById("bookmark-status");
  if (!list) return;

  fetch("jsons/browser_bookmark.json", { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (items) {
      if (!Array.isArray(items)) throw new Error("bad json");
      renderBookmarks(list, items);
      if (status) {
        status.textContent = "已读取 jsons/browser_bookmark.json，共 " + items.length + " 条。";
      }
    })
    .catch(function () {
      if (status) {
        status.textContent = "没读到 JSON，下面是页内的同一份书签。";
      }
    });

  function renderBookmarks(listEl, items) {
    var frag = document.createDocumentFragment();
    items.forEach(function (item, index) {
      if (!item || typeof item.url !== "string" || typeof item.title !== "string") return;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      var idx = document.createElement("span");
      idx.className = "bm-idx";
      idx.textContent = String(index + 1).padStart(2, "0");

      var title = document.createElement("span");
      title.className = "bm-title";
      title.textContent = item.title;

      var url = document.createElement("span");
      url.className = "bm-url";
      url.textContent = item.url;

      var hint = document.createElement("span");
      hint.className = "vh";
      hint.textContent = "（在新窗口打开）";

      a.appendChild(idx);
      a.appendChild(title);
      a.appendChild(url);
      a.appendChild(hint);
      li.appendChild(a);
      frag.appendChild(li);
    });
    listEl.textContent = "";
    listEl.appendChild(frag);
  }
})();
