# AWS - Pulumi - CircleCI

This is a minimal Pulumi program written in TypeScript that deploys AWS resources every time a push is made to this repository (by a CircleCI pipeline).

The Pulumi project creates an ECS Cluster and a Load Balancer, which will be assigned to a Fargate service later, then it creates a Docker image and push it to an AWS ECR repository. Once the image has been pushed successfully, Pulumi registers a Fargate service based on the already pushed image.
