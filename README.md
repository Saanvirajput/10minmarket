# 10minmarket ⚡

A high-performance replica of **Zepto** built to showcase and validate advanced backend orchestration, the **Saga Pattern**, and real-time inventory management.

This project was developed as a technical validation of my [Zepto Case Study](https://saanvirajput.github.io/saanvirajput-PORTFOLIO/case-studies/zepto).

## 🚀 Architecture Highlights

- **Next.js 16 (Turbopack)**: A blazing fast frontend with a premium, animated UI.
- **Java Spring Boot Backend**: A robust backend implementing sophisticated systems logic.
- **Distributed Saga Pattern**: Real-time orchestration of order transactions with automated compensation logic.
- **Atomic Inventory Management**: Simulated Redis cluster behavior for high-concurrency stock safety.
- **Real-time System Observation**: Live event streaming from the Java backend to a frontend dashboard via **SSE (Server-Sent Events)**.

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS 4, Framer Motion, Zustand, Lucide React.
- **Backend**: Java 21, Spring Boot, Spring Data JPA, H2 (In-Memory), Lombok.

## 📦 Project Structure

- `/src`: Next.js frontend application.
- `/backend`: Java Spring Boot backend application.

## 🚦 Getting Started

### 1. Start the Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 2. Start the Frontend
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the live demo.

## 🧪 System Monitoring
Toggle the **Architecture Observer** (bottom-right button) to watch real-time Kafka events and Saga state transitions as you place orders!
