# Automate build, test and deployment

Configure build, test, and deployment automation for every project, ensuring consistency and reliability across environments.

## Problem

Manual build and deployment processes are inherently fragile, time-consuming, and difficult to reproduce. They rely on the operator knowing every specific step, which increases the risk of deploying broken code, missing configuration updates, or causing system failure due to human error.

## Good solution

Use CI/CD tools (e.g., GitHub Actions, GitLab CI, or Jenkins) triggered by version control events to automate the entire pipeline. If a full CI/CD setup isn't available, maintain dedicated scripts that can be executed locally to perform the same set of tasks repeatably.

```bash
# Example of a deployment script
./deploy.sh --env=production
```

## Bad solution

Performing deployment steps manually via SSH or FTP, such as copying files or restarting services individually.

```bash
# Manual and error-prone process
scp -R . root@production:/var/www/app
ssh root@production "cd /var/www/app && npm install && pm2 restart all"
```

## Why

- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Automation ensures that every deployment is performed in a clean, consistent, and predictable manner.
- **[Scalability](../../home/quality-attributes/positive/scalability.md)**: Allows the project to handle frequent releases and growing team sizes without linear increases in manual effort.
- **[Human factor](../../home/quality-attributes/negative/human-factor.md)**: Minimizes the risk of mistakes caused by forgetfulness, fatigue, or misunderstanding of the deployment process.

## Exceptions

- One-off experimental scripts or internal tools that are not part of any professional delivery pipeline.

## References

- [Wikipedia: CI/CD](https://en.wikipedia.org/wiki/CI/CD)
