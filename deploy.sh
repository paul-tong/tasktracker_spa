#!/bin/bash

export PORT=5107
export MIX_ENV=prod
export GIT_PATH=/home/tasktracker_spa/src/tasktracker_spa

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "root" ]; then
	echo "Error: must run as user 'root'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/tasktracker_spa ]; then
	echo mv ~/www/tasktracker_spa ~/old/$NOW
	mv ~/www/tasktracker_spa ~/old/$NOW
fi

mkdir -p ~/www/tasktracker_spa
REL_TAR=~/src/tasktracker_spa/_build/prod/rel/tasktracker_spa/releases/0.0.1/tasktracker_spa.tar.gz
(cd ~/www/tasktracker_spa && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/tasktracker_spa/src/tasktracker_spa/start.sh
CRONTAB

#. start.sh
