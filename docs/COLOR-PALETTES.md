# Sistema de Paletas

El sitio usa variables CSS centralizadas (`css/base.css`) y un selector visual (`color-selector.html`) que permite probar diferentes combinaciones. Las paletas se definen en `js/modules/color-palette.js`.

## Paletas disponibles

| Clave | Descripción |
| --- | --- |
| `champagne` *(default)* | Champagne claro + dusty rose + vino apagado. Tono cálido boho. |
| `original` | Tonos terrosos dorados (versión inicial del sitio). |
| `boho` | Inspirada en constelaciones (azules profundos + dorado). |
| `rose` | Cuarzo rosa / minerales suaves. |
| `celestial` | “Natural Celestial”: verdes y dorados con crema. |

## Variables clave

```
--primary-color         Botones/microinteracciones
--secondary-color       Detalles secundarios
--accent-color          Tarjetas e ilustraciones
--text-dark / light     Tipografía
--white / background    Base general
--detail-color          Bordes y líneas
--gradient-1..3         Fondos decorativos
```

Cada paleta define las mismas propiedades, por lo que cambiar de tema no requiere modificar CSS adicionales.

## Selector de paletas

`color-selector.html` carga `color-selector-main.js`, muestra tarjetas con vistas previas y persiste la selección en `localStorage`. Una vez elegida, `loadSavedPalette()` se ejecuta al iniciar el sitio y aplica los valores seleccionados en `:root`.

### Agregar una paleta nueva

1. Edita `js/modules/color-palette.js`, agrega un nuevo objeto dentro de `palettes`.
2. Utiliza las mismas claves (`colors`, `gradients`).
3. Actualiza `color-selector.html` para mostrar la tarjeta correspondiente (se genera manualmente).
4. Si quieres que sea default, cambia `DEFAULT_PALETTE` en el mismo módulo.

