# Proyecto Frontend y Backend

Este proyecto contiene tanto el código fuente del frontend como del backend. A continuación, te explicamos cómo ejecutar ambos componentes localmente.

## 🚀 Instrucciones para ejecutar el proyecto

### 1. Ejecutar el Frontend

1.  **Navega a la carpeta `project`**:

    Abre una terminal y accede a la carpeta del frontend:

    ```bash
    cd project
    ```

2.  **Instala las dependencias del proyecto**:

    Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo**:

    Una vez que las dependencias estén instaladas, ejecuta el servidor de desarrollo con el siguiente comando:

    ```bash
    npm run dev
    ```

4.  **Accede al proyecto**:

    Abre tu navegador y visita la siguiente URL (dependiendo de tu configuración local, podría variar):

    ```
    http://localhost:5173/
    ```

### 2. Ejecutar el Backend

1.  **Navega a la carpeta `backend`**:

    Abre una nueva terminal y accede a la carpeta donde se encuentra el backend:

    ```bash
    cd backend
    ```

2.  **Crea un entorno virtual**:

    Si no tienes un entorno virtual configurado, puedes crearlo con:

    ```bash
    python -m venv venv
    ```

3.  **Activa el entorno virtual**:

    Para activar el entorno virtual, usa el siguiente comando (dependiendo de tu sistema operativo):

    **En Windows:**

    ```bash
    .\venv\Scripts\activate
    ```

    **En macOS/Linux:**

    ```bash
    source venv/bin/activate
    ```

4.  **Instala las dependencias del backend**:

    Una vez que el entorno virtual esté activo, instala las dependencias necesarias desde el archivo `requirements.txt`:

    ```bash
    pip install -r payment_schedule_api/requirements.txt
    ```

5.  **Ejecuta el servidor de desarrollo**:

    Una vez instaladas las dependencias, ejecuta el servidor backend con:

    ```bash
    uvicorn app.main:app --reload
    ```

6.  **Accede al backend**:

    El servidor backend estará disponible por defecto en:

    ```
    http://localhost:8000/
    ```
