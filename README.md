# MicroSoleil

## Overview  
MicroSoleil’s app enables data collection in rural environments where connectivity is limited and devices are often basic. The system must work reliably offline, sync gracefully when a connection becomes available, and present information in ways that can be understood by users with diverse literacy levels.  
At the same time the platform must give administrators the ability to review and analyze the collected information, maintain data security, and support future extensions such as market access or data-sharing modules.

This project describes how farmers, focal points, and MicroSoleil staff collect, manage, review, and use agricultural data to support better decisions and improve farming outcomes.

## Core Capabilities  
The requirements are organized as epics in Jira. This repository captures the rationale behind the most important areas of functionality:

### **1. Farmer Data Collection**  
Farmers and focal points record data offline on simple Android devices. The system manages drafts, versioning, syncing, and conflict resolution and must remain responsive even with large offline queues.

### **2. Form Management**  
Admins create and update data collection forms without developer support. Changes must propagate to all users while preserving old submissions and remaining compatible with analytics.

### **3. Data Review and Analysis**  
Admins work with dashboards to inspect submitted forms, identify issues, run standard analyses, ask natural questions about the data, and generate simple charts or tables for reporting.

### **4. Real-Time Form Monitoring**  
Focal points can observe a farmer’s form as it is being filled out. This supports coaching and improves data quality without altering the farmer’s entry.

### **5. Insights and Visualization for Farmers**  
Farmers see simple visual summaries of their own information. Icons, charts, and maps reduce reliance on text, and the interface adapts to local languages.

### **6. Data Security and Permissions**  
Strict access rules ensure farmers only see their own data while MicroSoleil staff can view aggregated information for analysis. All storage and transfer mechanisms follow secure practices.


### **8. Future Modules**  
Some areas are planned for future development, including:
- anonymized data sharing  
- revenue-generating insights  
- connecting farmers with buyers through a market access feature  

These modules depend on the stability of the core data system.

## Repository Purpose  
This repository serves as the source of truth for requirement documents, supporting materials, and architectural decisions that stem from these epics.  
It allows developers, product managers, partners, and field staff to collaborate on specifications that guide implementation.

## Contributing  
Updates to requirements should follow these principles:
- Maintain clarity and consistency  
- Align new needs with existing epics when possible  
- Document assumptions and edge cases  
- Keep farmer usability and offline reliability at the center of decisions  

Pull requests should focus on a single requirement or refinement. Complex additions may require a design discussion before merging.