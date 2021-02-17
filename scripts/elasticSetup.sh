#!/bin/bash

if [[ -d "elasticsearch-7.11.0-darwin-x86_64.tar.gz" ]]
then
  echo "Tarball already exists! Skipping download"
else
  echo "Downloading Elasticsearch Tarball"
  curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.11.0-darwin-x86_64.tar.gz
fi

if [[ -d "elasticsearch-7.11.0" ]]
then
  echo "Tarball already unzipped. Skipping unzip"
else
  echo "Unzipping Elasticsearch Tarball"
  tar -xvf elasticsearch-7.11.0-darwin-x86_64.tar.gz
fi

echo "Starting Elasticsearch"
sh ./elasticsearch-7.11.0/bin/elasticsearch
