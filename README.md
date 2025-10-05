# Air Quality Forecasting – Machine Learning Branch

This branch contains all **data preprocessing, ML modeling, and TEMPO satellite data workflows**.

---

## Key Notebooks

- **`data_preprocessing.ipynb`** – Preprocess NASA TEMPO and other environmental data  
- **`air_quality_model.ipynb`** – Train, evaluate, and test ML forecasting models  
- **`tempo_complete_download.ipynb`** – Automated download of TEMPO satellite data  

---

## Overview

Processes multi-source environmental data to generate **hyperlocal air quality predictions**. Uses **Random Forest / Gradient Boosting** (MVP) with explainable feature outputs. Prepares datasets for downstream **FastAPI backend** and visualization in the main branch.

---

## Usage

1. **Preprocess data:**  
```bash
jupyter notebook data_preprocessing.ipynb
