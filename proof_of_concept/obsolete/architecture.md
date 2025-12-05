## 🧩 Proof-of-Concept architecture

```mermaid
flowchart LR
    %% CLIENT SIDE
    subgraph CLIENT["React Native App"]
        UI["UI & Business Logic"]
        LocalDB["Local DB (SQLite/WatermelonDB)"]
        PSClient["PowerSync Client SDK"]
    end

    %% POWERSYNC SERVER
    subgraph POWERSYNC["PowerSync Server (self-hosted)"]
        SyncAPI["Sync API / Operation Queue"]
        Conflict["Conflict Resolver"]
        AuthProxy["Auth Integration"]
    end

    %% SUPABASE BACKEND
    subgraph SUPABASE["Supabase Backend (self-hosted)"]
        Auth["Supabase Auth (GoTrue)"]
        API["PostgREST API"]
        DB["PostgreSQL (mit RLS)"]
        Realtime["Realtime Service"]
    end

    %% CONNECTIONS
    UI --> LocalDB
    LocalDB --> PSClient
    PSClient -- "Push/Pull via HTTPS" --> SyncAPI
    SyncAPI --> Conflict
    Conflict --> API
    API --> DB
    DB --> Realtime
    Realtime -- "Event Stream" --> SyncAPI
    SyncAPI -- "Notify" --> PSClient
    PSClient --> LocalDB
    AuthProxy --> Auth
