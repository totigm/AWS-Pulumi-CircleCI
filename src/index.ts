import { ecs, lb } from '@pulumi/awsx';

// Create an ECS Fargate cluster.
const cluster = new ecs.Cluster('cluster');

// Create Load Balancer.
const alb = new lb.ApplicationLoadBalancer('net-lb', {
    external: true,
    securityGroups: cluster.securityGroups,
});
const web = alb.createListener('web', { port: 80, external: true });

// Build and publish a Docker image to a private ECR registry.
const img = ecs.Image.fromPath('app-img', '../');

// Create a Fargate service task.
new ecs.FargateService('app-svc', {
    cluster,
    taskDefinitionArgs: {
        container: {
            image: img,
            cpu: 102 /* 10% of 1024 */,
            memory: 50 /* MB */,
            portMappings: [web],
        },
    },
    desiredCount: 1,
});

// Export the Internet address for the service.
export const url = web.endpoint.hostname;
