# API Documentation for Predictix

This document provides an overview of the available APIs in the Predictix system, their functionalities, and example usage.

---

## **1. `/machines/`**
### **Description:**
Fetches all machines and their details.

### **Method:**
`GET`

### **Response Example:**
```json
[
    {
        "machine_id": "M001",
        "machine_name": "Machine-A",
        "vibration": 1.2,
        "temperature": 75.3,
        "pressure": 3.1,
        "status": "Operational",
        "last_maintenance_date": "2024-01-10",
        "next_maintenance_date": "2025-01-10",
        "up_time": 120,
        "down_time": 5
    }
]
```

---

## **2. `/overview/`**
### **Description:**
Provides a high-level overview of the system, including:
- Total machines.
- Machines needing maintenance.
- Total downtime in hours for the next 7 days.

### **Method:**
`GET`

### **Response Example:**
```json
{
    "total_machines": 100,
    "needs_maintenance_machines": 15,
    "down_time_hours_next_7_days": 320
}
```

---

## **3. `/alerts/`**
### **Description:**
Fetches a list of machines with:
- Status `Failed`.
- Critical metrics, such as:
  - Vibration > 2.0
  - Temperature > 100
  - Pressure > 150

### **Method:**
`GET`

### **Response Example:**
```json
[
    {
        "machine_id": "M002",
        "machine_name": "Machine-B",
        "status": "Failed",
        "vibration": 2.5,
        "temperature": 105,
        "pressure": 160
    },
    {
        "machine_id": "M031",
        "machine_name": "Machine-C",
        "vibration": 2.8,
        "temperature": 120,
        "pressure": 140,
        "status": "Needs Maintenance"
    }
]
```

---

## **4. `/scheduled-maintenance/`**
### **Description:**
Returns a list of machines scheduled for maintenance in the next 7 days.

### **Method:**
`GET`

### **Response Example:**
```json
[
    {
        "machine_id": "M012",
        "machine_name": "Machine-D",
        "status": "Operational",
        "next_maintenance_date": "2025-01-08"
    },
    {
        "machine_id": "M046",
        "machine_name": "Machine-E",
        "status": "Needs Maintenance",
        "next_maintenance_date": "2025-01-15"
    }
]
```

---

## **5. `/critical-machines/`**
### **Description:**
Returns the top 10 machines in `Needs Maintenance` status, sorted by the highest `down_time`.

### **Method:**
`GET`

### **Response Example:**
```json
[
    {
        "machine_id": "M025",
        "machine_name": "Machine-F",
        "status": "Needs Maintenance",
        "down_time": 64,
        "vibration": 2.12,
        "temperature": 65,
        "pressure": 147
    },
    {
        "machine_id": "M042",
        "machine_name": "Machine-G",
        "status": "Needs Maintenance",
        "down_time": 50,
        "vibration": 0.61,
        "temperature": 81,
        "pressure": 175
    }
]
```

---

## **6. `/predict-failure/`**
### **Description:**
Predicts the status of a machine based on its metrics using a pre-trained machine learning model.

### **Method:**
`GET`

### **Query Parameters:**
- `vibration` (float)
- `temperature` (float)
- `pressure` (float)
- `up_time` (float)
- `down_time` (float)

### **Response Example:**
```json
{
    "predicted_status": "Needs Maintenance"
}
```

### **Example Request:**
```bash
curl "http://localhost:8000/predict-failure/?vibration=2.5&temperature=105&pressure=150&up_time=120&down_time=10"
```

---

## **How to Use These APIs**

1. **Accessing the APIs:**
   - Use tools like Postman or `curl` to test the endpoints.
   - Ensure the Django server is running: `python manage.py runserver`.

2. **Authentication (if applicable):**
   - Add headers or tokens if the API requires authentication.

3. **Customizing Responses:**
   - Modify the filters and data returned by each endpoint in the views for project-specific needs.

---

## **Enhancements**
- Add authentication for sensitive endpoints.
- Paginate large responses (e.g., `/machines/`).
- Add more filters to endpoints for flexibility (e.g., date ranges, machine types).

