# BiasRadar Product Pages - Design Guidelines

## Design Approach
**System**: Material Design-inspired corporate style with enterprise SaaS best practices. Drawing from established platforms like Stripe, HubSpot, and Salesforce for professional B2B product presentation.

**Core Principles**: 
- Trust-building through clarity and precision
- Data visualization prominence
- Professional hierarchy with generous whitespace
- Feature-rich without overwhelming

---

## Typography System

**Headings (Montserrat)**:
- H1: 56px/64px, weight 700, -0.02em tracking
- H2: 40px/48px, weight 700, -0.01em tracking  
- H3: 32px/40px, weight 600
- H4: 24px/32px, weight 600
- H5: 20px/28px, weight 600

**Body Text (Inter)**:
- Large: 18px/28px, weight 400
- Base: 16px/24px, weight 400
- Small: 14px/20px, weight 400
- Caption: 12px/16px, weight 500

**Emphasis**: 
- Semibold (600) for labels and callouts
- Medium (500) for secondary emphasis

---

## Layout & Spacing System

**Tailwind Units**: Consistently use 4, 6, 8, 12, 16, 20, 24, 32 for spacing (p-4, mb-8, gap-12, etc.)

**Section Padding**: py-20 (desktop), py-12 (mobile)

**Container Strategy**:
- Full-width hero: w-full
- Content sections: max-w-7xl mx-auto px-6
- Text content: max-w-4xl for readability
- Feature grids: max-w-6xl

**Grid Patterns**:
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Comparison tables: grid-cols-1 lg:grid-cols-2 gap-12
- Statistics: grid-cols-2 md:grid-cols-4 gap-6

---

## Component Library

### Navigation Header
Sticky header with logo left, nav center, CTA right. Height: 80px. Background: white with subtle shadow on scroll. Nav links use Inter 15px weight 500. Primary CTA button in royal blue.

### Hero Section (Large Image)
Full-width hero spanning 85vh. Large hero image showcasing AI dashboard/technology. Overlay gradient from deep navy (60% opacity) to transparent. Content positioned left-aligned or centered with max-w-3xl. Headline + subheadline + dual CTA buttons (primary + secondary with blur backdrop). Buttons use backdrop-blur-md with semi-transparent backgrounds.

### Feature Showcase Sections
**Three-column grid**: Icon (48px) + heading + description. Icons in royal blue. Alternate between white and light gray backgrounds (every other section). Each feature card with subtle hover lift effect.

**Two-column split**: Left side: heading + detailed description + bullet points. Right side: dashboard screenshot or illustration with subtle shadow and rounded corners (border-radius: 12px).

### Statistics Bar
Four-column grid on dark background (deep navy). Large numbers (48px Montserrat 700) in white, labels (14px Inter) in light blue/gray. Centered alignment.

### Technology Stack Display
Grid showcase of detection capabilities. Cards with icon + technology name + detection score visualization. Use progress bars or circular percentage indicators in royal blue gradient.

### Comparison Table
Side-by-side layout comparing "With BiasRadar" vs "Without BiasRadar". Checkmarks and X marks for features. Highlight BiasRadar column with subtle royal blue background tint.

### Integration Showcase
Logo grid of supported platforms/frameworks (TensorFlow, PyTorch, etc.). Grayscale logos with color on hover. 5-6 columns on desktop, 2-3 on mobile.

### Testimonial Cards
Two-column grid. Each card: quote text + author photo (64px circle) + name/company. White cards with subtle shadow. Company logos in grayscale.

### Pricing Section (if needed)
Three-column pricing cards. Center card elevated/highlighted. Each tier: name + price + feature list + CTA button. Annual/monthly toggle at top.

### CTA Section
Full-width section with royal blue background. Centered content: headline + description + form (email input + submit button inline) or dual buttons. White text with high contrast.

### Footer
Four-column layout: Company info + Product links + Resources + Social/contact. Dark background (deep navy), light text. Bottom bar with copyright and legal links.

---

## Images Specification

**Hero Image**: 
Full-width, high-quality photo of AI dashboard interface, data visualization, or abstract tech imagery representing bias detection algorithms. Image should convey professionalism and cutting-edge technology. Dimensions: 2400x1400px minimum.

**Feature Section Images**:
- Dashboard screenshots showing BiasRadar interface (1200x800px)
- Data visualization graphics showing bias detection metrics
- Before/after comparison visuals
- Team collaboration imagery if showing use cases

**Icon Set**: Use Heroicons (outline style) for consistency. 24px standard, 48px for feature highlights.

---

## Buttons & Interactive Elements

**Primary Button**: 
Royal blue background, white text, 16px Inter weight 500, py-3 px-8, rounded-lg (8px). Includes hover state with slight darkening and scale effect.

**Secondary Button**: 
Transparent with royal blue border (2px), royal blue text. Same sizing as primary.

**Buttons on Images**: 
Apply backdrop-blur-md, background with rgba opacity (white at 20% or dark at 30%). No additional hover/active states needed.

**Form Inputs**: 
Border gray (light), rounded-lg, py-3 px-4, focus state with royal blue ring. Label above input in 14px weight 500.

---

## Page Structure for BiasRadar

1. **Hero** (85vh with large image)
2. **Problem Statement** (centered content, max-w-3xl)
3. **Key Features** (three-column grid, white background)
4. **How It Works** (two-column alternating splits, 3-4 steps)
5. **Statistics/Impact** (four metrics on dark background)
6. **Technology Stack** (grid of detection capabilities)
7. **Use Cases** (two-column cards with industry examples)
8. **Integration Partners** (logo grid)
9. **Testimonials** (two-column cards)
10. **Pricing** (three-tier comparison)
11. **CTA Section** (royal blue background, demo request)
12. **Footer** (comprehensive links and info)

**Consistent Vertical Rhythm**: Alternate section backgrounds (white → light gray → white) for visual separation. Maintain py-20 spacing throughout.