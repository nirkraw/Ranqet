#!/bin/bash

echo Enter in AWS Access Key:
read awsAccessKey
echo Enter in AWS Secret Key:
read awsSecretKey

export AWSPROPERTIES_ACCESSKEY=$(echo $awsAccessKey)
export AWSPROPERTIES_SECRETKEY=$(echo $awsSecretKey)