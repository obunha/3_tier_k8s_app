# 3-Tier Application Deployment on Kubernetes (AWS EKS)

This project demonstrates a complete end-to-end DevOps pipeline for a 3-tier application consisting of a React frontend, a Node.js backend, and a MySQL database, deployed on Amazon EKS.

## 🚀 Architecture Overview

- **Frontend**: React.js served by Nginx.
- **Backend**: Node.js/Express API.
- **Database**: MySQL 8.0.
- **Infrastructure**: AWS EKS (Elastic Kubernetes Service) + VPC.
- **CI/CD**: GitHub Actions $\rightarrow$ Amazon ECR $\rightarrow$ Amazon EKS.
- **Traffic Management**: Nginx Ingress Controller $\rightarrow$ AWS Application Load Balancer (ALB).

## 📁 Project Structure

```text
.
├── .github/workflows/  # CI/CD pipeline definitions
├── backend/           # Node.js API source code & Dockerfile
├── frontend/          # React frontend source code & Dockerfile
├── k8s/               # Kubernetes manifests (Deployment, Service, Ingress)
├── terraform/         # AWS Infrastructure as Code (EKS, VPC, ECR)
├── docker-compose.yaml # Local development setup
└── README.md          # Project documentation
```

## 🛠️ Setup & Deployment

### 1. Local Development
To run the application locally using Docker Compose:
\`\`\`bash
docker-compose up --build
\`\`\`
The app will be available at `http://localhost`.

### 2. Infrastructure Provisioning (Terraform)
1. Navigate to the terraform directory: `cd terraform`
2. Initialize Terraform: `terraform init`
3. Apply the configuration: `terraform apply`
   *This creates the VPC, ECR repositories, and the EKS cluster.*

### 3. CI/CD Pipeline (GitHub Actions)
The pipeline is fully automated. On every push to the `main` branch:
1. **CI**: Builds Docker images for frontend and backend.
2. **Push**: Uploads images to Amazon ECR with a unique commit SHA tag.
3. **CD**: Updates the Kubernetes manifests and deploys them to the EKS cluster.

**Required GitHub Secrets:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### 4. Manual Kubernetes Deployment (Optional)
If you prefer to deploy manually:
\`\`\`bash
kubectl apply -f k8s/namespace.yaml
kubectl create secret generic db-secret --from-literal=username=root --from-literal=password=yourpassword -n app
kubectl apply -f k8s/mysql.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
\`\`\`

## 🧪 Testing the App
Once deployed, you can verify the status:
\`\`\`bash
kubectl get pods,svc,ingress -n app
\`\`\`
Access the application via the DNS name provided by the AWS Load Balancer.
