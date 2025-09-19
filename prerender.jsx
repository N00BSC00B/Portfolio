// prerender.jsx - Server-side rendering entry point
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./src/App.jsx";

// Function to render the app to HTML string
export function render(url = "/") {
  // Wrap the app in StaticRouter for server-side rendering
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  return html;
}
