# Docker Infrastructure

To enable the communication between supabase and powersync, the both need to be in the same external network.

Following code was added to both compose files:
```yaml
networks:
  supabase_network:
    external: true
```

Furthermore the network must be created manually with:
```bash
docker network create supabase_network
```