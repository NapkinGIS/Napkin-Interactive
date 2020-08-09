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

import {
  Menu,
  Nav,
  ExperimentalMenu
} from "terriajs/lib/ReactViews/StandardUserInterface/customizable/Groups";
import MeasureTool from "terriajs/lib/ReactViews/Map/Navigation/MeasureTool";
import MenuItem from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuItem";
import PropTypes from "prop-types";
import React from "react";
import SplitPoint from "terriajs/lib/ReactViews/SplitPoint";
import StandardUserInterface from "terriajs/lib/ReactViews/StandardUserInterface/StandardUserInterface.jsx";
import version from "../../version";

import "./global.scss";

function loadAugmentedVirtuality(callback) {
  require.ensure(
    "terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool",
    () => {
      const AugmentedVirtualityTool = require("terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool");
      callback(AugmentedVirtualityTool);
    },
    "AugmentedVirtuality"
  );
}

function isBrowserSupportedAV() {
  return /Android|iPhone|iPad/i.test(navigator.userAgent);
}

export default function UserInterface(props) {
  return (
    <StandardUserInterface {...props} version={version}>
      <Nav>
        <MeasureTool terria={props.viewState.terria} key="measure-tool" />
      </Nav>
      <ExperimentalMenu>
        <If condition={isBrowserSupportedAV()}>
          <SplitPoint
            loadComponent={loadAugmentedVirtuality}
            viewState={props.viewState}
            terria={props.viewState.terria}
            experimentalWarning={true}
          />
        </If>
      </ExperimentalMenu>
    </StandardUserInterface>
  );
}

UserInterface.propTypes = {
  terria: PropTypes.object,
  viewState: PropTypes.object
};
