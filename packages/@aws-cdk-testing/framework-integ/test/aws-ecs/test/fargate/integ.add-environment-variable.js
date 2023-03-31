"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ec2 = require("aws-cdk-lib/aws-ec2");
const cdk = require("aws-cdk-lib");
const ecs = require("aws-cdk-lib/aws-ecs");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-ecs-integ');
const vpc = new ec2.Vpc(stack, 'Vpc', { maxAzs: 2 });
const cluster = new ecs.Cluster(stack, 'FargateCluster', { vpc });
const taskDefinition = new ecs.FargateTaskDefinition(stack, 'TaskDef', {
    memoryLimitMiB: 1024,
    cpu: 512,
});
// new container with firelens log driver, firelens log router will be created automatically.
const container = taskDefinition.addContainer('nginx', {
    image: ecs.ContainerImage.fromRegistry('nginx'),
});
container.addPortMappings({
    containerPort: 80,
    protocol: ecs.Protocol.TCP,
});
// Create a security group that allows tcp @ port 80
const securityGroup = new ec2.SecurityGroup(stack, 'websvc-sg', { vpc });
securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));
new ecs.FargateService(stack, 'Service', {
    cluster,
    taskDefinition,
    securityGroup,
    assignPublicIp: true,
});
container.addEnvironment('nameOne', 'valueOne');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuYWRkLWVudmlyb25tZW50LXZhcmlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcuYWRkLWVudmlyb25tZW50LXZhcmlhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTJDO0FBQzNDLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFFM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUNsRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRWxFLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDckUsY0FBYyxFQUFFLElBQUk7SUFDcEIsR0FBRyxFQUFFLEdBQUc7Q0FDVCxDQUFDLENBQUM7QUFFSCw2RkFBNkY7QUFDN0YsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7SUFDckQsS0FBSyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztDQUNoRCxDQUFDLENBQUM7QUFFSCxTQUFTLENBQUMsZUFBZSxDQUFDO0lBQ3hCLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUc7Q0FDM0IsQ0FBQyxDQUFDO0FBRUgsb0RBQW9EO0FBQ3BELE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN6RSxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtJQUN2QyxPQUFPO0lBQ1AsY0FBYztJQUNkLGFBQWE7SUFDYixjQUFjLEVBQUUsSUFBSTtDQUNyQixDQUFDLENBQUM7QUFFSCxTQUFTLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUVoRCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgZWNzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3MnO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKGFwcCwgJ2F3cy1lY3MtaW50ZWcnKTtcbmNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHN0YWNrLCAnVnBjJywgeyBtYXhBenM6IDIgfSk7XG5jb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHN0YWNrLCAnRmFyZ2F0ZUNsdXN0ZXInLCB7IHZwYyB9KTtcblxuY29uc3QgdGFza0RlZmluaXRpb24gPSBuZXcgZWNzLkZhcmdhdGVUYXNrRGVmaW5pdGlvbihzdGFjaywgJ1Rhc2tEZWYnLCB7XG4gIG1lbW9yeUxpbWl0TWlCOiAxMDI0LFxuICBjcHU6IDUxMixcbn0pO1xuXG4vLyBuZXcgY29udGFpbmVyIHdpdGggZmlyZWxlbnMgbG9nIGRyaXZlciwgZmlyZWxlbnMgbG9nIHJvdXRlciB3aWxsIGJlIGNyZWF0ZWQgYXV0b21hdGljYWxseS5cbmNvbnN0IGNvbnRhaW5lciA9IHRhc2tEZWZpbml0aW9uLmFkZENvbnRhaW5lcignbmdpbngnLCB7XG4gIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbVJlZ2lzdHJ5KCduZ2lueCcpLFxufSk7XG5cbmNvbnRhaW5lci5hZGRQb3J0TWFwcGluZ3Moe1xuICBjb250YWluZXJQb3J0OiA4MCxcbiAgcHJvdG9jb2w6IGVjcy5Qcm90b2NvbC5UQ1AsXG59KTtcblxuLy8gQ3JlYXRlIGEgc2VjdXJpdHkgZ3JvdXAgdGhhdCBhbGxvd3MgdGNwIEAgcG9ydCA4MFxuY29uc3Qgc2VjdXJpdHlHcm91cCA9IG5ldyBlYzIuU2VjdXJpdHlHcm91cChzdGFjaywgJ3dlYnN2Yy1zZycsIHsgdnBjIH0pO1xuc2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShlYzIuUGVlci5hbnlJcHY0KCksIGVjMi5Qb3J0LnRjcCg4MCkpO1xubmV3IGVjcy5GYXJnYXRlU2VydmljZShzdGFjaywgJ1NlcnZpY2UnLCB7XG4gIGNsdXN0ZXIsXG4gIHRhc2tEZWZpbml0aW9uLFxuICBzZWN1cml0eUdyb3VwLFxuICBhc3NpZ25QdWJsaWNJcDogdHJ1ZSxcbn0pO1xuXG5jb250YWluZXIuYWRkRW52aXJvbm1lbnQoJ25hbWVPbmUnLCAndmFsdWVPbmUnKTtcblxuYXBwLnN5bnRoKCk7XG4iXX0=