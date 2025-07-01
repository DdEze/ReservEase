# ReservEase

![React Version](https://img.shields.io/badge/react-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-4.4-green)
![Node.js](https://img.shields.io/badge/node-%3E=16.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.18.2-black?logo=express&logoColor=white)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow?logo=javascript&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML](https://img.shields.io/badge/html5-HTML-orange?logo=html5&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/css3-CSS-blue?logo=css3&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Descripción

Este proyecto es un sistema de reservas para espacios, que permite a los usuarios registrarse, iniciar sesión, visualizar espacios disponibles, crear y gestionar reservas, y para los administradores, gestionar usuarios, roles, espacios y visualizar todas las reservas.

Cuenta con autenticación basada en JWT, un calendario interactivo, gestión de roles y notificaciones visuales para mejorar la experiencia de usuario.

---

## Funcionalidades

### Usuario

- Registro e inicio de sesión: Los usuarios pueden crear una cuenta, iniciar sesión y mantener su sesión activa mediante tokens JWT.

- Explorar espacios disponibles: Desde la sección de Espacios, el usuario puede visualizar todos los espacios registrados, con detalles como ubicación, capacidad y estado de disponibilidad.

- Reservar un espacio: A través del listado de espacios o desde el calendario interactivo.

    - Seleccionando fecha, hora de inicio y fin, y agregando una nota opcional.

    - Validaciones de disponibilidad horaria y reglas de formato (por ejemplo, minutos en 00 o 30).

- Mis Reservas:

    - Ver un listado con sus reservas activas.

    - Cancelar reservas si es necesario.

- Calendario de reservas:

    - Visualiza de forma gráfica las reservas existentes.

    - Posibilidad de crear nuevas reservas desde una fecha seleccionada en el calendario.

### Administrador

- Gestión de espacios: 

    - Crear, editar o eliminar espacios desde una vista tipo tabla.

    - Alternar disponibilidad de cada espacio.

- Gestión de reservas: 

    - Visualizar todas las reservas de todos los usuarios (panel administrativo).

- Gestión de usuarios: 

    - Ver el listado de usuarios.

    - Cambiar su rol (usuario ↔ administrador) mediante un switch.

### Experiencia de usuario (UX/UI)

- Snackbar para mostrar notificaciones de éxito o error.

- Loader (CircularProgress) en las acciones asíncronas (como carga de reservas).

- Validaciones visuales en formularios (campos requeridos, errores de horario, etc.).

- Diseño responsive con Material UI y paleta de colores amigable.

---

## Uso

- Registrar una cuenta o iniciar sesión.

- Consultar espacios disponibles y reservarlos desde un calendario interactivo.

- Visualizar, editar o cancelar reservas propias.

- Los administradores pueden gestionar espacios y usuarios, y visualizar todas las reservas.

---

## Tecnologías utilizadas

- **Frontend:** React.js, Material UI, FullCalendar, Axios, React Router  
- **Backend:** Node.js, Express.js, JWT para autenticación  
- **Base de datos:** MongoDB  
- **Librerías auxiliares:** dayjs, Context API para manejo de estado y notificaciones (Snackbar)

---

## Instalación y configuración

### Backend

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/tu-proyecto.git
cd tu-proyecto/backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno (por ejemplo, conexión a MongoDB, clave secreta JWT) en .env.

4. Ejecutar el servidor:

```bash
npm start dev
```
Por defecto correrá en http://localhost:5000.

### Frontend

Desde la raíz del proyecto, ingresar a la carpeta frontend:

```bash
cd ../frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar la app frontend:

```bash
npm start dev
```
La app se ejecutará en http://localhost:3000.

---

## Estructura del proyecto

reservease/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── reservationController.js
│   │   └── spaceController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── requireMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── Reservation.js
│   │   ├── Space.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoute.js
│   │   ├── authRoute.js
│   │   ├── reservation.Route.js
│   │   └── spaceRoute.js
│   ├── validators/
│   │   ├── authValidators.js
│   │   ├── reservationValidators.js
│   │   ├── spaceValidators.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axio.js
│   │   ├── components/
│   │   │   ├── NavBar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── SpaceForm.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SnackbarContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminReservation.jsx
│   │   │   │   ├── CreateSpace.jsx
│   │   │   │   ├── EditSpace.jsx
│   │   │   │   ├── SpaceList.jsx
│   │   │   │   ├── UserList.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyReservation.jsx
│   │   │   ├── NewReservation.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Space.jsx
│   │   ├── theme/
│   │   │   └── theme.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
├── .gitignore
└── README.md
```

## Licencia

This project is licensed under the MIT License. See the LICENSE file for details.