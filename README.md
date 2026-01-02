## Running the Project with Docker

This project is containerized using Docker and Docker Compose for easy setup and deployment. Below are the instructions and requirements specific to this project.

### Requirements & Versions
- **Python version:** 3.10 (as specified in the Dockerfile)
- **Poetry version:** 1.8.5 (used for dependency management)
- **Gunicorn** is used as the WSGI server to run the Django application.

### Environment Variables
- The Dockerfile sets `DJANGO_SETTINGS_MODULE=job_portal.settings` by default.
- You may provide additional environment variables (such as Django secret keys, database URLs, etc.) via a `.env` file. Uncomment the `env_file: ./.env` line in `docker-compose.yaml` to enable this.

### Build and Run Instructions
1. **(Optional)** Create and configure your `.env` file in the project root if your application requires custom environment variables.
2. **Build and start the application:**
   ```sh
   docker compose up --build
   ```
   This will build the Docker image and start the Django application using Gunicorn.

### Ports
- The Django application is exposed on **port 8000**. Access the app at [http://localhost:8000](http://localhost:8000).

### Special Configuration
- The application is run as a non-root user (`appuser`) inside the container for improved security.
- Dependencies are managed with Poetry and installed into a local virtual environment (`.venv`).
- Static files and templates are included in the image build process.
- The Docker Compose network is named `backend` for inter-service communication (add other services as needed).

---

_This section is up to date with the current Docker and Docker Compose setup for this project._