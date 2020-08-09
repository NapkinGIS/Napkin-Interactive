/*©agpl*************************************************************************
*                                                                              *
* Napkin Globe – Map-data interaction solution for the Napkin platform         *
* Copyright (C) 2020  Napkin AS                                                *
*                                                                              *
* This program is free software: you can redistribute it and/or modify         *
* it under the terms of the GNU Affero General Public License as published by  *
* the Free Software Foundation, either version 3 of the License, or            *
* (at your option) any later version.                                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* GNU Affero General Public License for more details.                          *
*                                                                              *
* You should have received a copy of the GNU Affero General Public License     *
* along with this program. If not, see <http://www.gnu.org/licenses/>.         *
*                                                                              *
*****************************************************************************©*/

import ReactDOM from "react-dom";
import RedBox from "redbox-react";
import React from "react";

export default function renderUi(terria, allBaseMaps, viewState) {
  let render = () => {
    const UI = require("./UserInterface").default;
    ReactDOM.render(
      <UI terria={terria} allBaseMaps={allBaseMaps} viewState={viewState} />,
      document.getElementById("ui")
    );
  };

  if (module.hot && process.env.NODE_ENV !== "production") {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = render;
    const renderError = error => {
      console.error(error);
      console.error(error.stack);
      ReactDOM.render(<RedBox error={error} />, document.getElementById("ui"));
    };
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };
    module.hot.accept("./UserInterface", () => {
      setTimeout(render);
    });
  }

  render();
}
