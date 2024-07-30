
# KubeControl

KubeControl is a containerized application deployment platform built using Amazon Elastic Kubernetes Service (EKS) and Kubernetes. It provides a user-friendly interface for deploying and managing a variety of applications, making it an efficient and scalable solution for container orchestration.

## Features

- **Containerized Deployment Platform**: Utilizes EKS and Kubernetes to host applications.
- **Frontend Development**: Built with React.js for an interactive and responsive user interface.
- **Backend Server**: Developed with Flask to handle API calls to Kubernetes.
- **Improved Management**: Enhances management of deployed applications through a user-friendly UI.
- **Reduced Deployment Time**: Streamlines the deployment process, making it quicker and more efficient.
- **Scalable Platform**: Designed to be easy to manage and capable of handling scaling needs.

## Getting Started

### Prerequisites

- Docker
- Node.js
- Python
- Kubernetes CLI (kubectl)
- AWS CLI

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/kaushaln1/KubeControl.git
    cd KubeControl
    ```

2. **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    npm start
    ```

3. **Backend Setup:**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    python app.py
    ```

4. **Deploy to EKS:**
    - Note: Configuration for EKS is not yet updated in this repository. Please configure your EKS cluster manually and update the deployment scripts accordingly.
  
      
5. **Future Scope:**
   - Chatbot Integration: Implement a chatbot to interact with the infrastructure deployed. This will allow users to perform deployment and management tasks through conversational interfaces, making the platform even more accessible and user-friendly.

## Usage

- Navigate to `http://localhost:3000` to access the frontend interface.
- Use the frontend UI to manage your application deployments, view statuses, and perform other management tasks.
