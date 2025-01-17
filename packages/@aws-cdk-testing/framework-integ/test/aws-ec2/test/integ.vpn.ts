import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-ec2-vpn');

const vpc = new ec2.Vpc(stack, 'MyVpc', {
  cidr: '10.10.0.0/16',
  vpnConnections: {
    Dynamic: { // Dynamic routing
      ip: '52.85.255.164',
      tunnelOptions: [
        {
          preSharedKey: 'secretkey1234',
        },
      ],
    },
  },
});

vpc.addVpnConnection('Static', { // Static routing
  ip: '52.85.255.197',
  staticRoutes: [
    '192.168.10.0/24',
    '192.168.20.0/24',
  ],
});

app.synth();
