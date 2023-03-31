"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cx_api_1 = require("aws-cdk-lib/cx-api");
const integ = require("@aws-cdk/integ-tests-alpha");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const app = new aws_cdk_lib_1.App({ context: { [cx_api_1.IAM_IMPORTED_ROLE_STACK_SAFE_DEFAULT_POLICY_NAME]: true } });
const roleStack = new aws_cdk_lib_1.Stack(app, 'integ-iam-imported-role-role-stack');
const role = new aws_iam_1.Role(roleStack, 'TestRole', {
    assumedBy: new aws_iam_1.ServicePrincipal('sqs.amazonaws.com'),
});
const firstStack = new aws_cdk_lib_1.Stack(app, 'integ-iam-imported-role-1');
const roleInFirstStack = aws_iam_1.Role.fromRoleName(firstStack, 'Role', role.roleName);
roleInFirstStack.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({ resources: ['arn:aws:sqs:*:*:firstQueue'], actions: ['sqs:SendMessage'] }));
const secondStack = new aws_cdk_lib_1.Stack(app, 'integ-iam-imported-role-2');
secondStack.addDependency(firstStack, 'So that this stack can be tested after both are deployed.');
const roleInSecondStack = aws_iam_1.Role.fromRoleName(secondStack, 'Role', role.roleName);
roleInSecondStack.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({ resources: ['arn:aws:sqs:*:*:secondQueue'], actions: ['sqs:SendMessage'] }));
const assertionStack = new aws_cdk_lib_1.Stack(app, 'ImportedRoleTestAssertions');
assertionStack.addDependency(roleStack);
assertionStack.addDependency(firstStack);
assertionStack.addDependency(secondStack);
const test = new integ.IntegTest(app, 'ImportedRoleTest', {
    testCases: [roleStack],
    assertionStack,
});
test.assertions
    .awsApiCall('IAM', 'listRolePolicies', { RoleName: role.roleName })
    .assertAtPath('PolicyNames.0', integ.ExpectedResult.stringLikeRegexp('^Policyintegiamimportedrole1Role.{8}$'))
    .assertAtPath('PolicyNames.1', integ.ExpectedResult.stringLikeRegexp('^Policyintegiamimportedrole2Role.{8}$'));
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuaW1wb3J0ZWQtcm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLmltcG9ydGVkLXJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUM7QUFDekMsK0NBRTRCO0FBQzVCLG9EQUFvRDtBQUNwRCxpREFBOEU7QUFFOUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyx5REFBZ0QsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUUvRixNQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFLLENBQUMsR0FBRyxFQUFFLG9DQUFvQyxDQUFDLENBQUM7QUFFdkUsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRTtJQUMzQyxTQUFTLEVBQUUsSUFBSSwwQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztDQUNyRCxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxJQUFJLG1CQUFLLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLENBQUM7QUFDL0QsTUFBTSxnQkFBZ0IsR0FBRyxjQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlFLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLElBQUkseUJBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUV4SSxNQUFNLFdBQVcsR0FBRyxJQUFJLG1CQUFLLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLENBQUM7QUFDaEUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsMkRBQTJELENBQUMsQ0FBQztBQUNuRyxNQUFNLGlCQUFpQixHQUFHLGNBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEYsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsSUFBSSx5QkFBZSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRTFJLE1BQU0sY0FBYyxHQUFHLElBQUksbUJBQUssQ0FBQyxHQUFHLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztBQUNwRSxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDekMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUUxQyxNQUFNLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLGtCQUFrQixFQUFFO0lBQ3hELFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN0QixjQUFjO0NBQ2YsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLFVBQVU7S0FDWixVQUFVLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsRSxZQUFZLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUM3RyxZQUFZLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDO0FBRWpILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcCwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQge1xuICBJQU1fSU1QT1JURURfUk9MRV9TVEFDS19TQUZFX0RFRkFVTFRfUE9MSUNZX05BTUUsXG59IGZyb20gJ2F3cy1jZGstbGliL2N4LWFwaSc7XG5pbXBvcnQgKiBhcyBpbnRlZyBmcm9tICdAYXdzLWNkay9pbnRlZy10ZXN0cy1hbHBoYSc7XG5pbXBvcnQgeyBQb2xpY3lTdGF0ZW1lbnQsIFJvbGUsIFNlcnZpY2VQcmluY2lwYWwgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcblxuY29uc3QgYXBwID0gbmV3IEFwcCh7IGNvbnRleHQ6IHsgW0lBTV9JTVBPUlRFRF9ST0xFX1NUQUNLX1NBRkVfREVGQVVMVF9QT0xJQ1lfTkFNRV06IHRydWUgfSB9KTtcblxuY29uc3Qgcm9sZVN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ2ludGVnLWlhbS1pbXBvcnRlZC1yb2xlLXJvbGUtc3RhY2snKTtcblxuY29uc3Qgcm9sZSA9IG5ldyBSb2xlKHJvbGVTdGFjaywgJ1Rlc3RSb2xlJywge1xuICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKCdzcXMuYW1hem9uYXdzLmNvbScpLFxufSk7XG5cbmNvbnN0IGZpcnN0U3RhY2sgPSBuZXcgU3RhY2soYXBwLCAnaW50ZWctaWFtLWltcG9ydGVkLXJvbGUtMScpO1xuY29uc3Qgcm9sZUluRmlyc3RTdGFjayA9IFJvbGUuZnJvbVJvbGVOYW1lKGZpcnN0U3RhY2ssICdSb2xlJywgcm9sZS5yb2xlTmFtZSk7XG5yb2xlSW5GaXJzdFN0YWNrLmFkZFRvUHJpbmNpcGFsUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoeyByZXNvdXJjZXM6IFsnYXJuOmF3czpzcXM6KjoqOmZpcnN0UXVldWUnXSwgYWN0aW9uczogWydzcXM6U2VuZE1lc3NhZ2UnXSB9KSk7XG5cbmNvbnN0IHNlY29uZFN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ2ludGVnLWlhbS1pbXBvcnRlZC1yb2xlLTInKTtcbnNlY29uZFN0YWNrLmFkZERlcGVuZGVuY3koZmlyc3RTdGFjaywgJ1NvIHRoYXQgdGhpcyBzdGFjayBjYW4gYmUgdGVzdGVkIGFmdGVyIGJvdGggYXJlIGRlcGxveWVkLicpO1xuY29uc3Qgcm9sZUluU2Vjb25kU3RhY2sgPSBSb2xlLmZyb21Sb2xlTmFtZShzZWNvbmRTdGFjaywgJ1JvbGUnLCByb2xlLnJvbGVOYW1lKTtcbnJvbGVJblNlY29uZFN0YWNrLmFkZFRvUHJpbmNpcGFsUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoeyByZXNvdXJjZXM6IFsnYXJuOmF3czpzcXM6KjoqOnNlY29uZFF1ZXVlJ10sIGFjdGlvbnM6IFsnc3FzOlNlbmRNZXNzYWdlJ10gfSkpO1xuXG5jb25zdCBhc3NlcnRpb25TdGFjayA9IG5ldyBTdGFjayhhcHAsICdJbXBvcnRlZFJvbGVUZXN0QXNzZXJ0aW9ucycpO1xuYXNzZXJ0aW9uU3RhY2suYWRkRGVwZW5kZW5jeShyb2xlU3RhY2spO1xuYXNzZXJ0aW9uU3RhY2suYWRkRGVwZW5kZW5jeShmaXJzdFN0YWNrKTtcbmFzc2VydGlvblN0YWNrLmFkZERlcGVuZGVuY3koc2Vjb25kU3RhY2spO1xuXG5jb25zdCB0ZXN0ID0gbmV3IGludGVnLkludGVnVGVzdChhcHAsICdJbXBvcnRlZFJvbGVUZXN0Jywge1xuICB0ZXN0Q2FzZXM6IFtyb2xlU3RhY2tdLFxuICBhc3NlcnRpb25TdGFjayxcbn0pO1xuXG50ZXN0LmFzc2VydGlvbnNcbiAgLmF3c0FwaUNhbGwoJ0lBTScsICdsaXN0Um9sZVBvbGljaWVzJywgeyBSb2xlTmFtZTogcm9sZS5yb2xlTmFtZSB9KVxuICAuYXNzZXJ0QXRQYXRoKCdQb2xpY3lOYW1lcy4wJywgaW50ZWcuRXhwZWN0ZWRSZXN1bHQuc3RyaW5nTGlrZVJlZ2V4cCgnXlBvbGljeWludGVnaWFtaW1wb3J0ZWRyb2xlMVJvbGUuezh9JCcpKVxuICAuYXNzZXJ0QXRQYXRoKCdQb2xpY3lOYW1lcy4xJywgaW50ZWcuRXhwZWN0ZWRSZXN1bHQuc3RyaW5nTGlrZVJlZ2V4cCgnXlBvbGljeWludGVnaWFtaW1wb3J0ZWRyb2xlMlJvbGUuezh9JCcpKTtcblxuYXBwLnN5bnRoKCk7XG4iXX0=