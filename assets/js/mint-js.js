(function ($) {
  $(document).ready(function () {
    const siteUrl =
      typeof mintData !== "undefined" && mintData.siteUrl
        ? mintData.siteUrl
        : window.location.origin + "/mint/";

    $('a[href^="#"]').on("click", function (e) {
      const targetId = $(this).attr("href");

      // Skip empty links
      if (!targetId || targetId === "#") return;

      e.preventDefault();

      const currentPath = window.location.pathname;
      const isHome =
        currentPath === "/mint/" ||
        currentPath === "/mint" ||
        currentPath === "/mint/index.php";

      if (isHome) {
        // ✅ Smooth scroll on homepage
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", currentPath);
        }
      } else {
        // ✅ Redirect to homepage section (always absolute)
        window.location.href = siteUrl.replace(/\/$/, "") + "/" + targetId;
      }
    });
  });
})(jQuery);
