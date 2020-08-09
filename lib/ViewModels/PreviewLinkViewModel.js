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

"use strict";

/*global require*/
var knockout = require("terriajs-cesium/Source/ThirdParty/knockout");
var loadView = require("terriajs/lib/Core/loadView");
var URI = require("urijs");

function PreviewLinkViewModel(options) {
  this.terria = options.terria;

  this.isShown =
    window.location &&
    window.location.href &&
    new URI(window.location.href).hash().length === 0;

  knockout.track(this, ["isShown"]);
}

PreviewLinkViewModel.prototype.hide = function(container) {
  this.isShown = false;
};

PreviewLinkViewModel.create = function(options) {
  var viewModel = new PreviewLinkViewModel(options);
  loadView(require("../Views/PreviewLink.html"), options.container, viewModel);
  return viewModel;
};

module.exports = PreviewLinkViewModel;
