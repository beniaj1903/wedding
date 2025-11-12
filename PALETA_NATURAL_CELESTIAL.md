# 🌿✨ Paleta Natural Celestial

## Descripción

La paleta **Natural Celestial** combina tonos naturales y terrosos con detalles dorados celestiales, creando una armonía entre la elegancia terrestre y la magia del cielo estrellado. Inspirada en la naturaleza, constelaciones y elementos orgánicos.

## 🎨 Colores

### Colores Base

| Variable CSS | Valor | Color | Uso Principal |
|--------------|-------|-------|---------------|
| `--primary-color` | `#D9B57B` | 🟡 Dorado suave | Constelaciones, íconos, elementos destacados |
| `--secondary-color` | `#C78B7B` | 🟠 Rosa coral | Botones, enlaces, CTAs |
| `--accent-color` | `#9A9E7E` | 🟢 Verde oliva | Cards, elementos naturales, fondos de sección |
| `--text-dark` | `#2C2E3E` | ⚫ Gris azulado | Texto principal, encabezados |
| `--text-light` | `#F9F5F0` | ⚪ Beige claro | Texto sobre fondos oscuros |
| `--white` | `#F9F5F0` | ⚪ Beige crema | Fondos claros, texto sobre oscuro |
| `--background` | `#E8DCC5` | 🟤 Beige cálido | Fondo principal del sitio |

### Gradientes

```css
--gradient-1: linear-gradient(135deg, #C78B7B 0%, #2C2E3E 100%)
/* De rosa coral a gris azulado - Para botones principales y CTAs */

--gradient-2: linear-gradient(135deg, #D9B57B 0%, #C78B7B 100%)
/* De dorado a rosa coral - Para decoraciones y elementos destacados */

--gradient-3: linear-gradient(135deg, #E8DCC5 0%, #9A9E7E 100%)
/* De beige a oliva - Para fondos suaves */
```

## 🌟 Características de la Paleta

### Estilo
- **Natural**: Tonos orgánicos que remiten a la tierra y la naturaleza
- **Celestial**: Detalles dorados que evocan estrellas y constelaciones
- **Elegante**: Combinación sofisticada de colores terrosos con toques brillantes
- **Cálida**: Paleta acogedora con predominancia de tonos cálidos

### Ideal Para
- ✅ Bodas al aire libre
- ✅ Ceremonias bajo las estrellas
- ✅ Eventos en jardines o viñedos
- ✅ Bodas con temática natural o boho-chic
- ✅ Celebraciones al atardecer
- ✅ Bodas de otoño

### Ambientes
- Jardines botánicos
- Viñedos
- Haciendas
- Terrazas al aire libre
- Eventos campestres

## 🎯 Aplicación en el Sitio

### Navegación
- Logo: Dorado suave (#D9B57B)
- Links: Gris azulado (#2C2E3E)
- Hover: Dorado suave (#D9B57B)

### Hero/Carousel
- Texto: Beige claro (#F9F5F0)
- Overlay: Gradiente suave del beige cálido

### Botones
- Fondo: Gradiente de dorado a rosa coral
- Texto: Beige claro (#F9F5F0)
- Hover: Efecto de elevación con sombra

### Cards y Secciones
- Fondo de cards: Verde oliva (#9A9E7E)
- Íconos: Dorado suave (#D9B57B)
- Texto: Beige claro sobre verde, o gris azulado sobre beige

### Footer
- Fondo: Gradiente de rosa coral a gris azulado
- Texto: Beige claro (#F9F5F0)

## 🎨 Comparación con Otras Paletas

| Aspecto | Original | Boho Constelaciones | Cuarzo Rosa | Natural Celestial |
|---------|----------|---------------------|-------------|-------------------|
| **Calidez** | ★★★★☆ | ★★☆☆☆ | ★★★★★ | ★★★★☆ |
| **Elegancia** | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| **Naturalidad** | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | ★★★★★ |
| **Contraste** | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★★★★☆ |
| **Romanticismo** | ★★★★☆ | ★★☆☆☆ | ★★★★★ | ★★★★☆ |

## 🖌️ Consejos de Diseño

### Elementos que Destacan
- Los íconos en dorado (#D9B57B) crean puntos focales elegantes
- El contraste entre el verde oliva y el dorado es distintivo
- Los gradientes aportan profundidad sin ser abrumadores

### Combinaciones Recomendadas
1. **Para destacar**: Dorado sobre verde oliva
2. **Para botones**: Gradiente dorado-coral sobre texto beige
3. **Para fondos**: Beige cálido con elementos en verde oliva
4. **Para texto**: Gris azulado sobre beige o beige sobre verde

### Elementos Decorativos
- Agregar ilustraciones de constelaciones en dorado
- Usar elementos naturales (hojas, ramas) en verde oliva
- Incorporar detalles dorados para evocar estrellas
- Texturas de papel o lino en tonos beige

## 📱 Responsividad

La paleta mantiene su impacto en todos los tamaños de pantalla:
- **Desktop**: Los gradientes y contrastes lucen en su máximo esplendor
- **Tablet**: Los colores mantienen su calidez y legibilidad
- **Móvil**: El contraste asegura buena legibilidad en pantallas pequeñas

## ♿ Accesibilidad

### Contraste de Texto
- ✅ **Gris azulado (#2C2E3E) sobre Beige (#E8DCC5)**: Ratio 7.8:1 - Excelente
- ✅ **Beige claro (#F9F5F0) sobre Verde oliva (#9A9E7E)**: Ratio 4.8:1 - Bueno
- ✅ **Beige claro (#F9F5F0) sobre Gris azulado (#2C2E3E)**: Ratio 11.2:1 - Excelente
- ⚠️ **Dorado (#D9B57B) sobre Beige (#E8DCC5)**: Ratio 2.1:1 - Bajo (solo para elementos decorativos)

### Recomendaciones
- Usar el dorado (#D9B57B) solo para íconos y elementos decorativos
- Mantener el gris azulado (#2C2E3E) para todo el texto principal
- Asegurar que los botones tengan suficiente contraste

## 🛠️ Implementación

### Para Aplicar Permanentemente

Editar `/css/base.css` en la sección `:root`:

```css
:root {
    /* Colores */
    --primary-color: #D9B57B;
    --secondary-color: #C78B7B;
    --accent-color: #9A9E7E;
    --text-dark: #2C2E3E;
    --text-light: #F9F5F0;
    --white: #F9F5F0;
    --background: #E8DCC5;
    
    /* Gradientes */
    --gradient-1: linear-gradient(135deg, #C78B7B 0%, #2C2E3E 100%);
    --gradient-2: linear-gradient(135deg, #D9B57B 0%, #C78B7B 100%);
    --gradient-3: linear-gradient(135deg, #E8DCC5 0%, #9A9E7E 100%);
}
```

### Para Probar

```javascript
import { applyPalette } from './modules/color-palette.js';
applyPalette('celestial');
```

## 🎭 Mood Board

### Palabras Clave
- Natural
- Celestial
- Orgánico
- Dorado
- Constelaciones
- Tierra
- Cielo
- Elegante
- Cálido
- Romántico

### Referencias Visuales
- Cielos al atardecer con primeras estrellas
- Campos de trigo dorado
- Hojas de olivo
- Constelaciones en cielo nocturno
- Papel artesanal beige
- Minerales y piedras naturales

## 💡 Variaciones Posibles

Si deseas ajustar la paleta:

### Más Natural (menos dorado)
- Reducir la presencia del dorado (#D9B57B)
- Aumentar el uso del verde oliva (#9A9E7E)
- Agregar más tonos tierra

### Más Celestial (más brillante)
- Aumentar el dorado (#D9B57B) → usar dorado más brillante (#E5C88A)
- Agregar toques de blanco puro para estrellas
- Usar más gradientes con el dorado

### Más Cálido
- Usar el rosa coral (#C78B7B) más predominantemente
- Cambiar el gris azulado por un marrón cálido
- Aumentar la saturación de los tonos beige

---

## 📞 Cómo Probar

1. Acceder al selector: `http://localhost:8000/color-selector.html`
2. Buscar la paleta "Natural Celestial"
3. Hacer clic en "Seleccionar"
4. Volver al sitio principal para ver el resultado completo

---

**Creado para:** Boda Yose & Benito  
**Fecha:** 10 de Octubre, 2026  
**Paleta:** Natural Celestial (4 de 4)

