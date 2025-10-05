Air Quality Forecasting Platform

⚠️ Note: For data preprocessing and ML workflows, switch to the Machine_learning branch. Key notebooks:

data_preprocessing.ipynb – Preprocess NASA TEMPO and other environmental data

air_quality_model.ipynb – Main ML forecasting models

tempo_complete_download.ipynb – TEMPO satellite data download workflow

Overview

A scalable platform to forecast hyperlocal air quality using multi-source environmental data. The system combines satellite data (TEMPO), ground sensors (EPA, OpenAQ), and weather data (NOAA) to provide predictive, explainable, and personalized insights.

Features

Street-Level Forecasting – 1 km × 1 km hyperlocal predictions

Data Fusion – Satellite, ground, and meteorological data integrated

Explainable ML Models – Feature importance visualization and uncertainty estimation

Interactive Map – Mapbox-powered interface showing real-time forecasts

Personalized Alerts – Threshold-based email notifications (MVP), scalable to SMS & push

Getting Started
Prerequisites

Python 3.10+

Docker (for containerized deployment)

Node.js 18+ (for frontend)

Installation

Clone the repository:
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

Install Python dependencies:
pip install -r requirements.txt

Run backend API:
cd src/api
uvicorn main:app --reload

Run frontend:
cd app/frontend
npm install
npm run dev

Usage

Preprocess data (Machine_learning branch):
jupyter notebook notebooks/data_preprocessing.ipynb

Train and test ML models:
jupyter notebook notebooks/air_quality_model.ipynb

Download TEMPO satellite data:
jupyter notebook notebooks/tempo_complete_download.ipynb

Access web app at http://localhost:8080

Future Work

Deploy multi-city cloud version (GCP/AWS)

Integrate LSTM & Graph Neural Networks for spatio-temporal modeling

Expand multi-channel notifications: SMS, push, email

Real-time data ingestion and alert system

License

MIT License

