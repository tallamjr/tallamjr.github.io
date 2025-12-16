// Simple theme-aware Mermaid initialization for MkDocs Material
document$.subscribe(() => {
  // Check if mermaid is loaded
  if (typeof mermaid !== "undefined") {
    // Initialize Mermaid with theme detection
    const isDark =
      document.querySelector('[data-md-color-scheme="slate"]') !== null;

    mermaid.initialize({
      startOnLoad: true,
      theme: isDark ? "dark" : "base",
      themeVariables: isDark
        ? {
            primaryColor: "#2e4f2e",
            primaryTextColor: "#e0e0e0",
            primaryBorderColor: "#66bb6a",
            lineColor: "#64b5f6",
            secondaryColor: "#4a2c4a",
            tertiaryColor: "#e65100",
            background: "transparent",
            mainBkg: "transparent",
            secondBkg: "#2d2d2d",
            textColor: "#e0e0e0",
          }
        : {
            primaryColor: "#e8f5e8",
            primaryTextColor: "#212121",
            primaryBorderColor: "#4caf50",
            lineColor: "#1976d2",
            secondaryColor: "#f3e5f5",
            tertiaryColor: "#fff3e0",
            background: "transparent",
            mainBkg: "transparent",
            secondBkg: "#f5f5f5",
            textColor: "#212121",
          },
    });
  }
});

// Reinitialize on theme change
const observer = new MutationObserver(() => {
  if (typeof mermaid !== "undefined") {
    location.reload(); // Simple approach: reload page when theme changes
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-md-color-scheme"],
});
