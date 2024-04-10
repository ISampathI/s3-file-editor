# AWS S3 Bucket Editor

This project aims to provide a user-friendly interface for editing files stored in an AWS S3 bucket. It utilizes React for the frontend and NestJS for the backend.

## Features

- **File Editing**: Users can view and edit files stored in the AWS S3 bucket directly from the web interface.
- **AWS Integration**: Seamless integration with AWS S3 for file storage and retrieval.
- **Responsive Design**: The application is designed to be responsive, ensuring a consistent experience across various devices.

## Technologies Used

- **Frontend**: React.js
- **Backend**: NestJS
- **AWS SDK**: Integration with AWS services

![ScreenShot](/screenshots/s1.png)
![ScreenShot](/screenshots/s2.png)
![ScreenShot](/screenshots/s3.png)
![ScreenShot](/screenshots/s4.png)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```
git clone https://github.com/ISampathI/s3-file-editor.git
```

2. Navigate to the project directory:

```
cd s3-file-editor
```

3. Install dependencies:

```
npm install
```

4. Configure AWS credentials in the backend:

```
// Example AWS configuration file (backend/.env)
AWS_ACCESS_KEY_ID = your_access_key_id
AWS_SECRET_ACCESS_KEY = your_secret_access_key
AWS_REGION = us-east-1
AWS_BUCKET_NAME = your_bucket_name`

5. Run the frontend and backend:

```
# Start the frontend
npm run start

# Start the backend
npm run start
```

6. Access the application in your web browser at `http://localhost:3000`.

