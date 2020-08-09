# /*©agpl*************************************************************************
# *                                                                              *
# * Napkin Globe – Map-data interaction solution for the Napkin platform         *
# * Copyright (C) 2020  Napkin AS                                                *
# *                                                                              *
# * This program is free software: you can redistribute it and/or modify         *
# * it under the terms of the GNU Affero General Public License as published by  *
# * the Free Software Foundation, either version 3 of the License, or            *
# * (at your option) any later version.                                          *
# *                                                                              *
# * This program is distributed in the hope that it will be useful,              *
# * but WITHOUT ANY WARRANTY; without even the implied warranty of               *
# * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
# * GNU Affero General Public License for more details.                          *
# *                                                                              *
# * You should have received a copy of the GNU Affero General Public License     *
# * along with this program. If not, see <http://www.gnu.org/licenses/>.         *
# *                                                                              *
# *****************************************************************************©*/

SOURCE=datasources/00_National_Data_Sets.json
OUTDIR=datasources/00_National_Data_Sets

if [[ -z `which jq` ]]; then
  echo "You need to install jq, in order to use this. Try one of: "
  echo "  sudo apt-get install jq"
  echo "  sudo brew install jq"
  exit
fi


echo  "Replacing files in ${OUTDIR}/ with individual groups split from $SOURCE"

read -p "Continue? (Y/N)" choice
echo
case "$choice" in
    y|Y ) ;;
    * ) exit ;;
esac

mkdir -p "$OUTDIR"
rm "$OUTDIR"/*.json

i=0
while true; do
  name=`jq -r ".catalog[0].items[$i].name" < "$SOURCE"`
  if [[ $name == "null" ]]; then
    exit
  fi
  name="00_`printf "%02d" $i`_${name// /_}.json"
  echo $name
  jq ".catalog=([.catalog[0]|.items = [.items[$i]]])" < "$SOURCE" > "$OUTDIR/$name"
  ((i++))

done
rm "$SOURCE"
