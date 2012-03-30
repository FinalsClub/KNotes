#!/bin/bash
# Finals Club MongoDB backup script
#
# Copyright (C) 2012  Robert Call
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

curdate=`date +"%Y-%m-%d"`
yearlydate=`date +"%Y-__-__"`
monthlydate=`date +"____-%m-__"`
dailydate=`date +"____-__-%d"`
bakdir=db-backups/$curdate

mk_tmp_dir() {
mkdir -p $bakdir 
cd $bakdir
}

dump_db() {
echo 'dumping DB(s)...'
mongodump --host localhost
}

tar_db_dump() {
cd ../
tar czf db-dump_$curdate.tgz $curdate/dump
}

clean_tmp_dir() {
rm -rf $curdate
}

mk_tmp_dir
dump_db
tar_db_dump
clean_tmp_dir
