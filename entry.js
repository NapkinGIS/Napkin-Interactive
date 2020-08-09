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

const globeGif = require('./lib/Styles/globe.gif');
require('./lib/Styles/loader.css');

function loadMainScript() {
    // load the main chunk
    return new Promise((resolve, reject) => {
        require.ensure(['./index'], function(require) {
            resolve(require('./index'));
        }, function(error) {
            reject(error);
        }, 'index');
    });
}

function createLoader() {
    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add("loader-ui");
    const loaderGif = document.createElement('img');
    loaderGif.src = globeGif;
    const loaderLeft = document.createElement('div');
    loaderLeft.classList.add("loader-ui-left");
    const loaderGrabber = document.createElement('div');
    loaderGrabber.classList.add('loader-ui-grabber');
    const loaderRight = document.createElement('div');
    loaderRight.classList.add("loader-ui-right");
    loaderRight.append(loaderGif);

    loaderDiv.append(loaderLeft);
    loaderDiv.append(loaderRight);
    loaderDiv.append(loaderGrabber);
    loaderDiv.style.backgroundColor ='#383F4D';
    document.body.appendChild(loaderDiv);

    loadMainScript().catch(() => {
        // Ignore errors and try to show the map anyway
    }).then(() => {
        loaderDiv.classList.add('loader-ui-hide');
        setTimeout(()=> {
            document.body.removeChild(loaderDiv);
        }, 2000);
    });
}

createLoader();
