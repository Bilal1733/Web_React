import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';

const AppComponent = lazy(() => import('./App'));
const HomeComponent = lazy(() => import('./component/Home'));
const AboutComponent = lazy(() => import('./component/About'));

window.CustomRender = (container_Id,component) => {
  appRenderer(Component_map[component],container_Id)
}
const appRenderer = (UIComponent, target) => {
  const root = ReactDOM.createRoot(document.getElementById(target));
  root.render(
    <React.StrictMode>
      <UIComponent />
    </React.StrictMode>
  );
}
const Component_map = {
  'app': AppComponent,
  'home':  HomeComponent,
  'about': AboutComponent,
}

function htmlRenderer(compType, elementId, threshold = 0) {
  if (document.readyState === "complete"
      || document.readyState === "loaded"
      || document.readyState === "interactive" || window.CustomRender) {
      window.CustomRender(elementId, compType)
  } else if (threshold < 10) {
      threshold++;
      setTimeout(function () {
          htmlRenderer(compType, elementId, threshold++)
      }, 800);
  }
}
htmlRenderer('home', 'root', 5)
