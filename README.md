# figma-consApp

Aplicacion Android construida con Jetpack Compose que implementa una pantalla de inicio de sesion llamada Hawk. El proyecto actualmente funciona como una maqueta funcional de interfaz, con una vista principal responsive que adapta su distribucion entre formato movil y formato ancho.

## Estado actual del proyecto

Hoy el proyecto incluye una unica pantalla principal:

- Login con titulo "Welcome back"
- Campos de email y password
- Checkbox "Remember for 30 days"
- Texto de accion "Forgot password"
- Boton "Login"
- Imagen lateral o superior cargada desde `app/src/main/res/drawable-nodpi/login_foliage.jpg`

La distribucion cambia segun el ancho disponible:

- En pantallas compactas, la imagen se muestra arriba y el formulario abajo.
- En pantallas anchas, la imagen se muestra a la izquierda y el formulario centrado a la derecha.

## Tecnologias usadas

- Kotlin
- Android Studio / Gradle Kotlin DSL
- Jetpack Compose
- Material 3
- AndroidX Activity Compose
- Compose Preview

## Configuracion del proyecto

- `applicationId`: `com.utadeo.hawk`
- `namespace`: `com.utadeo.hawk`
- `minSdk`: `26`
- `targetSdk`: `35`
- `compileSdk`: `35`
- Java: `17`
- Kotlin JVM target: `17`

## Estructura principal

```text
app/
	src/main/
		java/com/utadeo/hawk/
			MainActivity.kt
			ui/theme/
				Color.kt
				Theme.kt
				Type.kt
		res/
			drawable-nodpi/
				login_foliage.jpg
			values/
				strings.xml
				themes.xml
```

## Archivos clave

- `MainActivity.kt`: contiene la actividad principal y toda la UI actual del login en Compose.
- `ui/theme/Theme.kt`: define el tema claro y oscuro de Material 3.
- `ui/theme/Color.kt`: colores base del tema.
- `ui/theme/Type.kt`: tipografia base.
- `AndroidManifest.xml`: declara la aplicacion Hawk y la `MainActivity` como launcher.

## Como ejecutar el proyecto

1. Abre el proyecto en Android Studio.
2. Asegurate de tener instalado un SDK de Android compatible con `compileSdk 35`.
3. Usa JDK 17.
4. Sincroniza Gradle.
5. Ejecuta la app en un emulador o dispositivo fisico.

Tambien puedes compilar desde terminal con:

```bash
./gradlew assembleDebug
```

En Windows, si usas PowerShell:

```powershell
.\gradlew.bat assembleDebug
```

## Dependencias principales

El modulo `app` usa, entre otras, estas dependencias:

- `androidx.compose:compose-bom:2024.09.03`
- `androidx.activity:activity-compose:1.9.2`
- `androidx.compose.material3:material3:1.3.0`
- `androidx.compose.material:material-icons-extended`
- `androidx.window:window:1.3.0`

## Notas

- No hay navegacion ni integracion con backend por ahora.
- El boton de login y el enlace de recuperacion no ejecutan una accion funcional todavia.
- El proyecto esta orientado actualmente a maquetacion UI y adaptacion responsive en Compose.