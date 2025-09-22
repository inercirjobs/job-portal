# Use official Python slim image
FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Install system dependencies for Poetry and build tools
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry (latest stable)
RUN curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to PATH
ENV PATH="/root/.local/bin:$PATH"

# Copy only poetry files first for caching dependencies
COPY pyproject.toml poetry.lock* /app/

# Install dependencies with Poetry (no virtualenv)
RUN poetry config virtualenvs.create false \
 && poetry install --no-interaction --no-ansi --no-root

# Copy the rest of the app code
COPY . .

# Expose port
EXPOSE 8000

# Run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
