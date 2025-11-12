# 🎨 Documentación de Colores del Proyecto

## Paleta Actual (Original)

### Variables CSS Principales (`:root`)

#### Colores Base
- **`--primary-color`**: `#BFA77D` - Dorado/Beige (usado en navegación, títulos, elementos destacados)
- **`--secondary-color`**: `#C97A57` - Terracota/Naranja cobrizo (usado en acentos y decoraciones)
- **`--accent-color`**: `#A9A17A` - Verde oliva suave (usado en tarjetas y fondos de sección)
- **`--text-dark`**: `#7C3F44` - Vino/Marrón oscuro (texto principal)
- **`--text-light`**: `#F8F4EC` / `#E889A0` - Crema o Rosa claro (texto sobre fondos oscuros)
- **`--white`**: `#F8F4EC` - Crema/Blanco hueso (fondos claros)
- **`--background`**: `#EAD7B6` - Champagne/Beige claro (fondo principal del body)

#### Gradientes
- **`--gradient-1`**: `linear-gradient(135deg, #C97A57 0%, #7C3F44 100%)` - Terracota a vino
- **`--gradient-2`**: `linear-gradient(135deg, #E889A0 0%, #C97A57 100%)` - Rosa a terracota
- **`--gradient-3`**: `linear-gradient(135deg, #BFA77D 0%, #A9A17A 100%)` - Dorado a oliva

### Uso de Colores por Sección

#### Navigation (navbar)
- Fondo: `rgba(255, 255, 255, 0.95)` con backdrop-filter blur
- Logo: `var(--primary-color)`
- Links: `var(--text-dark)` (hover: `var(--primary-color)`)
- Hamburger: `var(--primary-color)`

#### Hero Section
- Texto: `var(--white)`
- Overlay gradiente radial: `rgba(234, 215, 182, 0.7)` a `rgba(234, 215, 182, 0.95)`
- Text shadow: sombras negras para legibilidad

#### Welcome Modal
- Overlay: `rgba(59, 47, 47, 0.98)` - Casi negro con transparencia
- Fondo interior: `var(--accent-color)` con textura de papel
- Título: `var(--text-dark)`
- Subtítulo: `var(--secondary-color)`
- Decoración corazón: `var(--secondary-color)`
- Input border: `rgba(59, 47, 47, 0.2)`
- Input focus: `var(--secondary-color)` con sombra `rgba(198, 140, 83, 0.1)`
- Botón: gradiente de `var(--text-dark)` a `var(--secondary-color)`

#### Invitation Section (Sobre)
- Fondo sección: `var(--white)`
- Nombres en sobre cerrado: `var(--primary-color)` con text-shadow
- Click hint: `var(--primary-color)`
- Botón cerrar: `var(--primary-color)` (hover: `var(--secondary-color)`)
- Info card: `rgba(248, 244, 236, 0.95)` - Crema translúcido
- Dash decorativo: `var(--text-dark)`
- Divider: `var(--primary-color)` con gradiente

#### Timeline Section
- Fondo: `var(--accent-color)`
- Línea central: `var(--primary-color)`
- Dot: `var(--primary-color)` con borde `var(--white)`
- Card fondo: `var(--white)`
- Título: `var(--primary-color)`
- Texto: `var(--text-dark)`, descripción: `var(--text-light)`

#### Info Section
- Fondo: `var(--white)`
- Cards: `var(--accent-color)`
- Icon gradiente: `var(--primary-color)` a `var(--secondary-color)`
- Títulos: `var(--primary-color)`
- Texto: `var(--text-light)`

#### RSVP Section
- Fondo: `var(--accent-color)`
- Form container: `var(--white)`
- Labels: `var(--text-dark)`
- Input border: `#e0e0e0` (focus: `var(--primary-color)`)
- Radio labels: `var(--accent-color)` (hover: `var(--primary-color)`)
- Botón: gradiente `var(--primary-color)` a `var(--secondary-color)`

#### Gifts Section
- Fondo: `var(--white)`
- Cards: `var(--accent-color)`
- Icon gradiente: `var(--primary-color)` a `var(--secondary-color)`
- Títulos: `var(--primary-color)`
- Texto: `var(--text-light)`
- Bank info: `var(--white)`

#### Video Section
- Fondo: `var(--accent-color)`
- Cards: `var(--white)`
- Texto: `var(--text-light)`
- Icons: `var(--primary-color)`
- Nota: fondo `#fff3cd`, borde `#ffc107`, texto `#856404`

#### Footer
- Fondo: gradiente `var(--primary-color)` a `var(--secondary-color)`
- Texto: `var(--white)`
- Social icons: `rgba(255, 255, 255, 0.2)` (hover: `var(--white)` fondo, `var(--primary-color)` texto)

## Colores Hardcodeados a Revisar

Estos colores están hardcodeados en algunos archivos y deberían usar variables CSS:

### En hero.css
- Gradiente radial: `rgba(234, 215, 182, 0.7)` y `rgba(234, 215, 182, 0.95)`
- Text shadows: varios `rgba(0, 0, 0, X)`

### En welcome-modal.css
- Overlay: `rgba(59, 47, 47, 0.98)`
- Input border: `rgba(59, 47, 47, 0.2)`
- Sombra focus: `rgba(198, 140, 83, 0.1)`

### En invitation.css
- Info card: `rgba(248, 244, 236, 0.95/0.98)`

### En styles.css (general)
- Inputs border: `#e0e0e0`
- Success message: `#d4edda`, `#155724`, `#c3e6cb`
- Error message: `#f8d7da`, `#721c24`, `#f5c6cb`
- Video nota: `#fff3cd`, `#ffc107`, `#856404`
- Navbar fondo: `rgba(255, 255, 255, 0.95)`
- Sombras: varios `rgba(0,0,0,X)`

## Recomendaciones para Nuevas Paletas

Para crear nuevas paletas efectivas:

1. **Mantener la jerarquía**: primary, secondary, accent, text-dark, text-light, white, background
2. **Actualizar gradientes** para que usen los nuevos colores
3. **Considerar contraste** para accesibilidad (especialmente texto sobre fondos)
4. **Probar en todas las secciones** antes de implementar permanentemente

## Nuevas Paletas Implementadas

### 1. Boho Constelaciones
Inspirada en cielos nocturnos, estrellas y naturaleza mística
- Primary: #D4AF37 (Dorado estelar)
- Secondary: #2C3E50 (Azul noche)
- Accent: #34495E (Gris azulado)

### 2. Cuarzo Rosa
Inspirada en minerales, tonos rosados suaves y elegancia contemporánea
- Primary: #E8B4B8 (Rosa cuarzo)
- Secondary: #C89FA3 (Rosa polvo)
- Accent: #F4E4E5 (Rosa muy claro)

### 3. Natural Celestial ⭐ NUEVA
Tonos naturales con detalles dorados y constelaciones. Elegancia terrestre y celestial
- Primary: #D9B57B (Dorado suave - constelaciones)
- Secondary: #C78B7B (Rosa coral - botones)
- Accent: #9A9E7E (Verde oliva - elementos naturales)
- Text Dark: #2C2E3E (Gris azulado - texto principal)
- Background: #E8DCC5 (Beige cálido)

**Ver documentación completa:** `PALETA_NATURAL_CELESTIAL.md`

