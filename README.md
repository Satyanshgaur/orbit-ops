# Air Quality Forecasting Platform

⚠️ **Note:** For data preprocessing and ML workflows, switch to the **`Machine_learning`** branch. Key notebooks:  
- **`data_preprocessing.ipynb`** – Preprocess NASA TEMPO and other environmental data  
- **`air_quality_model.ipynb`** – Main ML forecasting models  
- **`tempo_complete_download.ipynb`** – TEMPO satellite data download workflow  

---

## Overview

A **scalable platform** to forecast **hyperlocal air quality** using multi-source environmental data. The system integrates **satellite (TEMPO), ground sensors (EPA, OpenAQ), and weather (NOAA)** data to provide **predictive, explainable, and personalized insights**.

---

## Features

- **Street-Level Forecasting:** hyperlocal predictions  
- **Data Fusion:** Combines satellite, ground, and meteorological data  
- **Explainable ML Models:** Feature importance visualization and uncertainty estimation  
- **Interactive Map:** Mapbox-powered interface showing real-time forecasts  
- **Personalized Alerts:** Threshold-based email notifications (MVP), scalable to SMS & push  

---

## Getting Started

### Prerequisites

- Python 3.10+  
- Docker (for containerized deployment)  
- Node.js 18+ (for frontend)  

### Installation

1. **Clone the repository:**  
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
