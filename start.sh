#!/bin/bash

export PORT=5107

cd ~/www/tasktracker_spa
./bin/tasktracker_spa stop || true
./bin/tasktracker_spa start

