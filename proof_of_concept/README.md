# Proof of Concept (PoC) — Offline-First Architecture with React Native, PowerSync (self-hosted) & Supabase

## 🧩 Goal

This Proof of Concept (PoC) validates the **Offline-First Architecture** with the following components:

- **React Native** as the mobile client app  
- **Local Database** (SQLite or WatermelonDB) for offline functionality  
- **Self-Hosted PowerSync Server** as the synchronization gateway  
- **Self-Hosted Supabase** (PostgreSQL, Auth, Realtime, PostgREST) as the central backend  

The PoC aims to demonstrate the complete **end-to-end data flow** – from offline activity, through synchronization, to server-side validation and real-time communication.

---

## 🧠 Objectives

1. Verify that offline operations (create, edit, delete) are locally persisted.  
2. Validate that the **PowerSync Server** securely syncs data with Supabase.  
3. Check that **Supabase Auth + RLS** are correctly applied when data reaches the backend.  
4. Ensure that **Realtime Events** are correctly distributed to clients via PowerSync.  
5. Collect initial performance, latency, and conflict resolution measurements.

---

## ⚙️ Component Overview

| Component                        | Type                  | Purpose                                      |
|-----------------------------------|-----------------------|----------------------------------------------|
| **React Native App**              | Client                | UI, local data storage, sync triggers        |
| **Local DB (SQLite/WatermelonDB)**| Client                | Offline persistence                          |
| **PowerSync Client SDK**          | Client                | Queue management, operation tracking         |
| **PowerSync Server**              | Middleware (self-hosted)| Synchronization logic, conflict resolution, proxy to Supabase |
| **Supabase Auth (GoTrue)**        | Backend               | Authentication, JWT management               |
| **Supabase PostgREST API**        | Backend               | RESTful access to PostgreSQL                 |
| **PostgreSQL + RLS**              | Backend               | Central data storage & access control        |
| **Supabase Realtime**             | Backend               | Event-based communication between clients    |

## 🧪 Test Objectives

- Create, edit, and delete records in offline mode  
- Automatic synchronization upon restoring the connection  
- Authentication check via Supabase Auth  
- Validation of RLS policies during server sync  
- (Receiving changes from other clients via Supabase Realtime)