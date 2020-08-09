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

/*global __dirname*/
const path = require('path');

// Pass through additional arguments that might ultimately have come from
// something like `npm run start -- --port 3009`
const argpos = process.argv.indexOf('--');
const args = argpos > -1 ? process.argv.slice(argpos + 1) : [];

module.exports = {
  apps : [{
    name: path.basename(__dirname),
    script: require.resolve('terriajs-server'),

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // passed to app, so any valid arguments in options.js are allowed.
    args: args.join(' '),
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
