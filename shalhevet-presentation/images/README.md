# Image Guide - Shalhevet Presentation

## Current Design Note

The current design uses **Lucide icons** as floating elements instead of images.
Images are **optional** but can be added to enhance specific sections.

---

## Optional Background Images

If you want to add subtle background textures or images, here are prompts:

### 1. `bg-cyber-grid.png`
**Usage:** Can be added as a very subtle background overlay
**Opacity:** Use at 5-10% opacity

**Prompt:**
```
Minimal cyberpunk grid pattern, dark black background.
Thin neon lines forming a perspective grid fading into distance.
Very dark, subtle, almost invisible.
Transparent PNG.
```

---

### 2. `fire-glow.png` (Section 1 - Opening)
**Usage:** Replace the CSS fire-glow with an actual glow image
**Size:** 400x400px

**Prompt:**
```
Abstract fire glow effect on transparent background.
Turquoise/cyan flames, soft edges, ethereal glow.
No defined shape, just light and color emanating from center.
Transparent PNG format.
```

---

## Section-Specific Images (Optional)

### For Zen Nadir Section (Pink)
**Filename:** `zennadir-abstract.png`
**Prompt:**
```
Abstract sound waves transforming into embracing shapes.
Neon pink and magenta gradients on transparent background.
Cyberpunk aesthetic, flowing energy, connection visualization.
Minimalist, no faces or realistic elements.
```

### For The Book Section (Yellow)
**Filename:** `epiphany-abstract.png`
**Prompt:**
```
Abstract lightbulb explosion, ideas radiating outward.
Neon yellow and gold particles on transparent background.
Brain synapses firing, geometric shapes expanding.
Cyberpunk minimalist style.
```

### For TailorPlayed Section (Purple)
**Filename:** `spark-abstract.png`
**Prompt:**
```
Creative spark visualization, flame becoming geometric shapes.
Neon purple and violet gradients on transparent background.
Dice and game elements transforming from light particles.
Abstract, minimalist cyberpunk.
```

### For BMAD Section (Orange)
**Filename:** `ai-agents-abstract.png`
**Prompt:**
```
Multiple connected nodes forming a network.
Neon orange glowing connections on transparent background.
Abstract humanoid silhouettes made of light and data.
Neural network aesthetic, cyberpunk style.
```

---

## How to Add Images to Sections

If you generate images, add them to the HTML like this:

```html
<!-- Inside any section, add after layer-back -->
<div class="parallax-layer layer-back">
    <img src="images/your-image.png" class="bg-image" alt="">
</div>
```

Add this CSS:

```css
.bg-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 60%;
    opacity: 0.15;
    filter: blur(2px);
}
```

---

## Color Reference

| Section | Color Name | Hex Code |
|---------|------------|----------|
| 1 - שלהבת | Turquoise | #00fff0 |
| 2 - זן נדיר | Pink | #ff00aa |
| 3 - לעשות כסף | Yellow | #ffe600 |
| 4 - TailorPlayed | Purple | #aa00ff |
| 5 - המסע המקצועי | Green | #00ff66 |
| 6 - BMAD | Orange | #ff6600 |
| 7 - מה זה יכול לתת לך | Turquoise | #00fff0 |
| 8 - תודה | Pink | #ff00aa |

---

## Note

The presentation currently looks complete without images.
The floating Lucide icons provide visual interest.
Only add images if you feel they would enhance the experience.

*Created for Shalhevet Presentation - January 2026*
