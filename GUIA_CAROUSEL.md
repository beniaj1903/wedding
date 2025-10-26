# 📸 Guía para Ajustar Fotos del Carousel

## Ubicación
Las fotos del carousel se configuran en: `components/hero.html`

## Cómo Ajustar Cada Foto

Cada foto tiene dos propiedades que puedes modificar en su estilo inline:

### 1️⃣ ZOOM (background-size)

Controla qué tan grande se ve la foto:

| Valor | Efecto |
|-------|--------|
| `cover` | La imagen cubre todo el espacio (default) ⭐ |
| `contain` | La imagen se ajusta completa dentro del marco |
| `150%` | Zoom al 150% (cualquier porcentaje) |
| `100%` | Tamaño original sin zoom |
| `120%` | Zoom ligero al 120% |
| `80%` | Zoom out al 80% |

### 2️⃣ POSICIÓN (background-position)

Controla dónde se posiciona la foto dentro del marco:

| Valor | Efecto |
|-------|--------|
| `center center` | Centrado (horizontal y vertical) ⭐ |
| `top center` | Arriba centrado |
| `bottom center` | Abajo centrado |
| `left center` | Izquierda centrado |
| `right center` | Derecha centrado |
| `top left` | Esquina superior izquierda |
| `top right` | Esquina superior derecha |
| `bottom left` | Esquina inferior izquierda |
| `bottom right` | Esquina inferior derecha |
| `30% 70%` | Posición personalizada (30% horizontal, 70% vertical) |

**Nota sobre porcentajes:**
- Primer número = Posición Horizontal (0% = izquierda, 50% = centro, 100% = derecha)
- Segundo número = Posición Vertical (0% = arriba, 50% = centro, 100% = abajo)

## 🎯 Ejemplos Prácticos

### Ejemplo 1: Zoom in con enfoque arriba
```html
<div class="slide-content" style="background-image: url('media/carousel/foto.jpeg'); background-size: 130%; background-position: center 20%;">
```

### Ejemplo 2: Zoom out mostrando toda la foto
```html
<div class="slide-content" style="background-image: url('media/carousel/foto.jpeg'); background-size: contain; background-position: center center;">
```

### Ejemplo 3: Enfoque en la parte derecha
```html
<div class="slide-content" style="background-image: url('media/carousel/foto.jpeg'); background-size: cover; background-position: 70% center;">
```

### Ejemplo 4: Enfoque en rostros (esquina superior derecha)
```html
<div class="slide-content" style="background-image: url('media/carousel/foto.jpeg'); background-size: 120%; background-position: top right;">
```

### Ejemplo 5: Posicionamiento muy preciso
```html
<div class="slide-content" style="background-image: url('media/carousel/foto.jpeg'); background-size: 140%; background-position: 35% 45%;">
```

## 🔄 Proceso de Ajuste

1. **Abre** `components/hero.html`
2. **Identifica** el slide que quieres ajustar (están numerados como comentarios)
3. **Modifica** los valores de `background-size` y `background-position`
4. **Guarda** el archivo
5. **Recarga** el navegador (http://localhost:8000)
6. **Repite** hasta que la foto se vea perfecta

## 💡 Tips

- **Comienza con zoom:** Ajusta primero `background-size` para definir el nivel de zoom
- **Luego posiciona:** Usa `background-position` para mover la foto al punto exacto
- **Usa porcentajes para precisión:** Los valores como `35% 65%` te dan control total
- **Prueba y error:** Es normal hacer varios intentos hasta encontrar el encuadre perfecto
- **background-size: cover vs porcentajes:**
  - `cover` siempre llena el marco (recomendado para la mayoría)
  - Porcentajes te dan más control pero pueden dejar espacios vacíos

## 📝 Plantilla

Copia y pega esta plantilla para modificar un slide:

```html
<!-- Slide X: Descripción de la foto -->
<div class="swiper-slide">
    <div class="slide-content" style="background-image: url('media/carousel/NOMBRE_FOTO.jpeg'); background-size: cover; background-position: center center;">
        <div class="hero-overlay"></div>
    </div>
</div>
```

## 🎨 Ancho del Marco

El marco actual está configurado al 70% del ancho de la pantalla.
Para cambiar esto, edita en `css/sections/hero.css`:

```css
.slide-content {
    width: 70%; /* Cambia este valor */
}
```

Valores sugeridos:
- `60%` = Marco más estrecho
- `70%` = Default actual ⭐
- `80%` = Marco más ancho
- `100%` = Pantalla completa

---

¿Necesitas ayuda? Revisa los ejemplos arriba o experimenta con diferentes valores. ¡Es muy intuitivo! 🎉

