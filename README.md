# Bingus Setup

### Prerequsites
[Git](https://github.com/git-for-windows/git/releases/download/v2.49.0.windows.1/Git-2.49.0-64-bit.exe)

[Node.js 22.14](https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi)

[Python 13.3.3](https://www.python.org/ftp/python/3.13.3/python-3.13.3-amd64.exe)

[PostgreSQL](https://sbp.enterprisedb.com/getfile.jsp?fileid=1259505)

### Clone the repo
```bash
git clone https://github.com/damiankryzia71/bingus-broncohacks.git
```

### Frontend Setup
The frontend is already set up, you just need to npm install.
```bash
cd bingus-broncohacks/frontend/
npm i
```

### Backend Setup
After installing PostgreSQL, open pgAdmin and connect to the PostgreSQL 17 server (localhost).
Run:
```sql
CREATE DATABASE bingus;
```
Create and activate a Python virtual environment for the project:
```bash
cd bingus-broncohacks/backend/
python -m venv .
./Scripts/activate.ps1
```
