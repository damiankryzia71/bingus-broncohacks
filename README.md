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
First, npm install all the packages from `package.json`:
```bash
cd bingus-broncohacks/frontend/
npm i
```
Install ShadCN UI just to be safe:
```bash
npm i -D @types/node
npx shadcn@latest init
```
When prompted about colors, choose neutral.
Then choose --force.

Run the dev server to see if everything worked:
```bash
npm run dev
```

### Backend Setup
After installing PostgreSQL, open pgAdmin and connect to the PostgreSQL 17 server (localhost).
Run:
```sql
CREATE DATABASE bingus;
```
Create and activate a Python virtual environment for the project, install packages:
```bash
cd bingus-broncohacks/backend/

python -m venv .
./Scripts/activate.ps1

python -m pip install Django
pip install djangorestframework
pip install markdown
pip install django-filter
pip install psycopg
pip install django-cors-headers
```
Go to the `bingus/bingus/` directory and open `settings.py`. Inside the file, change the `DATABASES` part to your correct values:
```py
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "bingus",
        "USER": "postgres",
        "PASSWORD": "12345",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```
Run migrations:
```bash
cd ../../
python manage.py migrate
```
Run the dev server:
```bash
python manage.py runserver
```

Finally, go to `localhost:5173` in your browser. If you see "API RESULT: Hello Bingus" then everything worked.
