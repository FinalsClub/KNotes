#!/bin/bash
# Karma Notes dev. env deployment script Alpha 0.01
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


NODE_VER=v0.6.13
SETUP_DIR=/tmp/fc_dev_env
KARMA_HOME=/var/www/KNotes
WEB_APP_ROOT=/var/www
GIT_REPO=https://github.com/FinalsClub/KNotes.git


rm_node() {
	echo "Removing current Node.js ver..."

}

setup_env() {
	mkdir $WEB_APP_ROOT
	mkdir $SETUP_DIR
}

node_install() {
	cd $SETUP_DIR	
	curl http://nodejs.org/dist/$NODE_VER/node-$NODE_VER.tar.gz > node-$NODE_VER.tar.gz
	tar xzvf node-$NODE_VER.tar.gz
	cd node-$NODE_VER
	./configure
	make
	sudo make install
}

npm_install() {
	cd $SETUP_DIR
	git clone http://github.com/isaacs/npm.git	
	cd npm
	sudo make install
	sudo npm install nodemon -g
	sudo npm install forever -g
  # TODO append /usr/local/bin to $PATH of the node or the www user instead of this
	cd /usr/bin
	ln -sf /usr/local/bin/node .
	sudo ln -sf /usr/local/bin/node .
	sudo ln -sf /usr/local/bin/forever .
}

get_knotes() {
	cd /var/www
	git clone $GIT_REPO

}

npm_mod_install() {
	echo 'installing Karma Notes npm modules...\n'	
	cd $KARMA_HOME
	npm install .

}

clean_up() {
	echo "Cleaning up $SETUP_DIR ...\n"
	rm -fr $SETUP_DIR
}
	
apt-get install git-core g++ libssl-dev curl make haproxy ruby rubygems mongodb-server # Will be replaced with OS Ver / check for Fedora, Deb, OS X and BSD.
setup_env
command -v node >/dev/null 2>&1 || { echo >&2 " Node is not installed"; node_install ; } # If [ return 1 ] install node else rm_node
command -v npm >/dev/null 2>&1 || { echo >&2 " Node is not installed"; npm_install ; }	# Same with npm
get_knotes
npm_mod_install
clean_up

echo "Please run sudo node /var/www/KNotes/app.js& if no errors were returned"
