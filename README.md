# ApplyHub

SafePass es una aplicación web diseñada para ayudar a los usuarios a gestionar sus contraseñas de manera segura y eficiente. Los usuarios pueden agregar, editar y eliminar contraseñas, además de ver detalles importantes relacionados con sus credenciales de acceso.

## Tecnologías

- **Nuxt 3**: Framework de Vue.js para el desarrollo de aplicaciones web.
- **Supabase**: Proporciona la base de datos y autenticación.
- *¨*shadcn/vue**: Utilizado para los componentes de la interfaz de usuario.

## Características

- Registro e inicio de sesión mediante Supabase (incluye autenticación con Google).
- Gestión de contraseñas: agregar, editar, eliminar y ver contraseñas guardadas.
- Sincronización en tiempo real gracias a Supabase para mantener los datos actualizados.
- Almacenamiento seguro de contraseñas utilizando encriptación para proteger los datos sensibles.

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/Ulises-Saucedo/SafePass.git
    cd safepass
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto. Asegúrate de agregar tus credenciales de Supabase:

    ```
    SECRET_KEY=
    SUPABASE_URL=
    SUPABASE_KEY=
    ```

4. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

    El sitio estará disponible en `http://localhost:3000`.
