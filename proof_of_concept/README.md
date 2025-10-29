# Proof of Concept (PoC) — Offline-First Architektur mit React Native, PowerSync (self-hosted) & Supabase

## 🧩 Ziel

Dieser Proof of Concept (PoC) validiert die **Offline-First Architektur** mit folgenden Komponenten:

- **React Native** als mobile Client-App  
- **Lokale Datenbank** (SQLite oder WatermelonDB) für Offline-Funktionalität  
- **Self-Hosted PowerSync Server** als Synchronisations-Gateway  
- **Self-Hosted Supabase** (PostgreSQL, Auth, Realtime, PostgREST) als zentrales Backend  

Der PoC soll den vollständigen **End-to-End-Datenfluss** demonstrieren – von Offline-Aktivität über Synchronisation bis zur serverseitigen Validierung und Realtime-Kommunikation.

---

## 🧠 Zielsetzung

1. Verifizieren, dass Offline-Operationen (Erstellen, Bearbeiten, Löschen) lokal persistiert werden.  
2. Validieren, dass der **PowerSync Server** Daten sicher mit Supabase synchronisiert.  
3. Überprüfen, dass **Supabase Auth + RLS** korrekt greifen, sobald Daten im Backend ankommen.  
4. Sicherstellen, dass **Realtime-Events** über PowerSync korrekt an Clients verteilt werden.  
5. Erste Messungen zu Performance, Latenz und Konfliktverhalten erfassen.

---

## ⚙️ Komponentenübersicht

| Komponente | Typ | Aufgabe |
|-------------|-----|---------|
| **React Native App** | Client | UI, lokale Datenhaltung, Trigger für Sync |
| **Lokale DB (SQLite/WatermelonDB)** | Client | Offline-Persistenz |
| **PowerSync Client SDK** | Client | Queue-Management, Operation Tracking |
| **PowerSync Server** | Middleware (self-hosted) | Synchronisationslogik, Konfliktlösung, Proxy zu Supabase |
| **Supabase Auth (GoTrue)** | Backend | Authentifizierung, JWT-Verwaltung |
| **Supabase PostgREST API** | Backend | RESTful Zugriff auf PostgreSQL |
| **PostgreSQL + RLS** | Backend | Zentrale Datenspeicherung & Zugriffsschutz |
| **Supabase Realtime** | Backend | Event-basierte Kommunikation zwischen Clients |


## 🧪 Testziele

- Erstellen, Bearbeiten und Löschen von Datensätzen im Offline-Modus  
- Automatische Synchronisation nach Wiederherstellung der Verbindung  
- Prüfung der Authentifizierung via Supabase Auth  
- Validierung von RLS-Policies beim Server-Sync  
- (Empfang von Änderungen anderer Clients über Supabase Realtime)