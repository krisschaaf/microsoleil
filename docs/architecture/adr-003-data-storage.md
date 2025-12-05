# ADR-005: Data Storage 

**Date:** 2025-12-05 

## Context
Incoming survey responses arrive as semi-structured JSON exported from KoBoToolbox. The data model varies across forms and evolves over time. The system must support reliable storage, efficient querying of well-known entities, and future analytical expansion. Early analysis workloads are moderate with the possibility of significant growth. The design must balance flexibility with maintainability while keeping a clear path toward higher performance analytics when required.

The operational environment should also minimize setup overhead and provide managed PostgreSQL features. Supabase is under consideration as the hosting platform.

## Decision
Use PostgreSQL with the storage pattern described in Pattern A. Each raw survey response is stored in a `jsonb` column and stable fields are extracted into normalized relational tables. Indexing will be added only where query patterns justify it. Analytical workloads will run directly on normalized tables or materialized views. A columnar system will be introduced only if analytical demands grow beyond what PostgreSQL can support efficiently.

Supabase will be used as the managed PostgreSQL provider. It offers standard Postgres capabilities, JSONB support, reliable hosting and operational convenience without locking the project into a proprietary database engine.

## Rationale
- PostgreSQL provides a strong relational core and supports flexible semi-structured fields through `jsonb`.  
- The approach avoids constant schema migrations while still enabling efficient structured queries.  
- Supabase exposes a full PostgreSQL instance with backups, scaling, dashboards and optional API layers which reduces operational overhead.  
- If the analytics workload grows, the design keeps the option open to introduce a columnar warehouse fed by ETL from the primary store.  
- Using Supabase does not prevent future migration since the underlying engine is standard PostgreSQL.

## Consequences
### Positive
- Evolving survey forms can be stored without blocking ingestion.  
- Stable downstream analytics gain predictable structure through normalized tables.  
- A shift to a columnar system can occur later without reorganizing the primary storage.  
- Supabase reduces operational burden and provides a straightforward development workflow.

### Negative
- Deeply nested fields may need targeted indexes or extraction logic to achieve acceptable performance.  
- ETL code must be maintained as new forms appear.  
- The model stores raw and normalized representations side by side.  
- Heavy analytical loads may eventually exceed what a managed PostgreSQL instance can handle and require an additional system.

## Alternatives Considered
- **Document store only**: Offers flexibility but complicates cross-entity queries and would require a secondary analytics platform earlier.  
- **Columnar database as primary storage**: Well-suited for heavy analytics but not ideal for transactional ingestion or frequent incremental writes.  
- **Fully normalized relational schema without JSONB**: Too rigid for changing survey formats.  
- **Self-hosted PostgreSQL**: Offers full control but increases operational workload compared to Supabase.

## Future Work
- Track query performance to determine when a columnar analytics layer becomes necessary.  
- Build an ETL workflow that can later target a columnar system without design changes.  
- Document transformations for each survey form to ensure the process remains reproducible.