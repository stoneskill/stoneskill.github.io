/* Original script for stoneskill.github.io. No libraries. */
(function () {
  "use strict";

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));

  function setCurrent(id) {
    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      var href = link.getAttribute("href") || "";
      if (href.charAt(0) === "#") setCurrent(href.slice(1));
    });
  });

  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var list = document.getElementById("bookmark-list");
  var status = document.getElementById("bookmark-status");
  if (!list) return;

  fetch("json/browser_bookmark.json", { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (items) {
      if (!Array.isArray(items)) throw new Error("bad json");
      renderBookmarks(list, items);
      if (status) {
        status.textContent =
          "已读取 json/browser_bookmark.json，共 " +
          items.length +
          " 条。同一份内容也在 images/browser_bookmark.json。";
      }
    })
    .catch(function () {
      if (status) {
        status.textContent = "当前显示页内写好的书签。JSON 文件放在 json/ 与 images/ 目录。";
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
