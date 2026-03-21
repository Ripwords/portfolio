<template>
  <svg viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
    <defs>
      <marker id="edge-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6" fill="currentColor" class="text-muted-foreground" />
      </marker>
      <marker id="edge-arrow-primary" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6" fill="currentColor" class="text-primary/60" />
      </marker>
      <marker id="edge-arrow-left" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
        <path d="M8,0 L0,3 L8,6" fill="currentColor" class="text-primary/60" />
      </marker>
    </defs>

    <!-- Column labels -->
    <text x="110" y="22" text-anchor="middle" class="fill-muted-foreground" font-size="11" font-weight="600" letter-spacing="1">CLIENT</text>
    <text x="400" y="22" text-anchor="middle" class="fill-muted-foreground" font-size="11" font-weight="600" letter-spacing="1">SYNC LAYER</text>
    <text x="680" y="22" text-anchor="middle" class="fill-muted-foreground" font-size="11" font-weight="600" letter-spacing="1">BACKEND</text>

    <!-- Tauri Desktop Apps -->
    <rect x="20" y="45" width="180" height="85" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="110" y="74" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">Tauri Desktop Apps</text>
    <text x="110" y="92" text-anchor="middle" class="fill-muted-foreground" font-size="11">Vi2 / V-Dosing</text>
    <rect x="55" y="102" width="110" height="22" rx="4" class="fill-muted/50 stroke-border" stroke-width="1" />
    <text x="110" y="117" text-anchor="middle" class="fill-muted-foreground" font-size="10">SQLite</text>

    <!-- PWA -->
    <rect x="20" y="180" width="180" height="55" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="110" y="206" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">PWA Companion</text>
    <text x="110" y="224" text-anchor="middle" class="fill-muted-foreground" font-size="11">MongoDB</text>

    <!-- MQTT Broker -->
    <rect x="310" y="170" width="180" height="50" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="400" y="201" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">MQTT Broker</text>

    <!-- ElectricSQL - hero element -->
    <rect x="310" y="45" width="180" height="70" rx="8" class="stroke-primary/50 fill-card" stroke-width="2" stroke-dasharray="6 3" />
    <text x="400" y="74" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">ElectricSQL</text>
    <text x="400" y="97" text-anchor="middle" class="fill-primary" font-size="10">Offline-first sync</text>

    <!-- Hono API -->
    <rect x="590" y="45" width="180" height="60" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="680" y="73" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">Hono API</text>
    <text x="680" y="91" text-anchor="middle" class="fill-muted-foreground" font-size="11">Server</text>

    <!-- PostgreSQL -->
    <rect x="590" y="160" width="180" height="50" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="680" y="191" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">PostgreSQL</text>

    <!-- Arrows -->
    <!-- Tauri -> ElectricSQL (writes) -->
    <line x1="200" y1="68" x2="308" y2="68" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#edge-arrow)" />
    <text x="254" y="62" text-anchor="middle" class="fill-muted-foreground" font-size="9">writes</text>

    <!-- ElectricSQL -> Tauri (subscriptions) -->
    <line x1="308" y1="92" x2="200" y2="92" class="stroke-primary/60" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#edge-arrow-left)" />
    <text x="254" y="108" text-anchor="middle" class="fill-primary" font-size="9">subscriptions</text>

    <!-- Tauri -> MQTT (telemetry) - straight horizontal then down -->
    <path d="M 200 125 L 260 125 L 260 192 L 308 192" class="stroke-muted-foreground" stroke-width="1.5" fill="none" marker-end="url(#edge-arrow)" />
    <text x="270" y="158" class="fill-muted-foreground" font-size="9">telemetry</text>

    <!-- MQTT -> Hono - straight horizontal then up -->
    <path d="M 490 192 L 545 192 L 545 80 L 588 80" class="stroke-muted-foreground" stroke-width="1.5" fill="none" marker-end="url(#edge-arrow)" />

    <!-- PWA -> Hono - route along bottom then up -->
    <path d="M 200 210 L 560 210 L 560 100 L 588 100" class="stroke-muted-foreground" stroke-width="1.5" stroke-dasharray="5 3" fill="none" marker-end="url(#edge-arrow)" />
    <text x="380" y="224" text-anchor="middle" class="fill-muted-foreground" font-size="9">REST</text>

    <!-- ElectricSQL <-> PostgreSQL -->
    <line x1="490" y1="68" x2="588" y2="68" class="stroke-primary/60" stroke-width="1.5" marker-end="url(#edge-arrow-primary)" />
    <line x1="588" y1="88" x2="490" y2="88" class="stroke-primary/60" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#edge-arrow-left)" />
    <text x="539" y="60" text-anchor="middle" class="fill-primary" font-size="9">sync</text>

    <!-- Hono -> PostgreSQL -->
    <line x1="680" y1="105" x2="680" y2="158" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#edge-arrow)" />

    <!-- Legend -->
    <line x1="30" y1="280" x2="60" y2="280" class="stroke-muted-foreground" stroke-width="1.5" />
    <text x="65" y="284" class="fill-muted-foreground" font-size="10">Synchronous</text>
    <line x1="170" y1="280" x2="200" y2="280" class="stroke-primary/60" stroke-width="1.5" stroke-dasharray="5 3" />
    <text x="205" y="284" class="fill-muted-foreground" font-size="10">Bidirectional sync</text>
  </svg>
</template>
