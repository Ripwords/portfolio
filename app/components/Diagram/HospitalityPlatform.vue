<template>
  <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
    <defs>
      <marker id="hosp-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6" fill="currentColor" class="text-muted-foreground" />
      </marker>
      <marker id="hosp-arrow-primary" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6" fill="currentColor" class="text-primary/60" />
      </marker>
    </defs>

    <!-- Row labels -->
    <text x="16" y="62" class="fill-muted-foreground" font-size="11" font-weight="600" letter-spacing="1">FRONTEND</text>
    <text x="16" y="172" class="fill-muted-foreground" font-size="11" font-weight="600" letter-spacing="1">SHARED</text>
    <text x="16" y="282" class="fill-muted-foreground" font-size="11" font-weight="600" letter-spacing="1">BACKEND</text>

    <!-- PMS Web App -->
    <rect x="120" y="40" width="180" height="60" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="210" y="68" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">PMS Web App</text>
    <text x="210" y="86" text-anchor="middle" class="fill-muted-foreground" font-size="11">Next.js</text>

    <!-- POS Desktop -->
    <rect x="320" y="40" width="180" height="60" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="410" y="68" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">POS Desktop</text>
    <text x="410" y="86" text-anchor="middle" class="fill-muted-foreground" font-size="11">Electron</text>

    <!-- E-Invoice Portal -->
    <rect x="520" y="40" width="180" height="60" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="610" y="68" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">E-Invoice Portal</text>
    <text x="610" y="86" text-anchor="middle" class="fill-muted-foreground" font-size="11">Next.js</text>

    <!-- Shared TS Package - hero element (full width) -->
    <rect x="120" y="150" width="580" height="50" rx="8" class="stroke-primary/50 fill-card" stroke-width="2" stroke-dasharray="6 3" />
    <text x="410" y="178" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">Shared TypeScript Package</text>
    <text x="410" y="194" text-anchor="middle" class="fill-primary" font-size="10">Types, validators, utilities</text>

    <!-- NestJS API -->
    <rect x="300" y="260" width="180" height="60" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="390" y="288" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">NestJS API</text>
    <text x="390" y="306" text-anchor="middle" class="fill-muted-foreground" font-size="11">REST + WebSocket</text>

    <!-- PostgreSQL -->
    <rect x="520" y="260" width="140" height="60" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="590" y="296" text-anchor="middle" class="fill-foreground" font-size="13" font-weight="600">PostgreSQL</text>

    <!-- SuperTokens -->
    <rect x="120" y="260" width="140" height="60" rx="8" class="stroke-border fill-card" stroke-width="1.5" />
    <text x="190" y="288" text-anchor="middle" class="fill-foreground" font-size="12" font-weight="600">SuperTokens</text>
    <text x="190" y="306" text-anchor="middle" class="fill-muted-foreground" font-size="11">Auth</text>

    <!-- Arrows: Frontend -> Shared (straight down) -->
    <line x1="210" y1="100" x2="210" y2="148" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#hosp-arrow)" />
    <line x1="410" y1="100" x2="410" y2="148" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#hosp-arrow)" />
    <line x1="610" y1="100" x2="610" y2="148" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#hosp-arrow)" />
    <text x="625" y="130" class="fill-muted-foreground" font-size="9">imports</text>

    <!-- Shared -> NestJS (straight down center) -->
    <line x1="390" y1="200" x2="390" y2="258" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#hosp-arrow)" />
    <text x="405" y="232" class="fill-muted-foreground" font-size="9">typed API calls</text>

    <!-- POS -> NestJS (WebSocket - routed along right side) -->
    <path d="M 500 95 L 730 95 L 730 285 L 482 285" class="stroke-primary/60" stroke-width="1.5" stroke-dasharray="5 3" fill="none" marker-end="url(#hosp-arrow-primary)" />
    <text x="745" y="195" text-anchor="middle" class="fill-primary" font-size="9" writing-mode="tb">WebSocket</text>

    <!-- NestJS -> PostgreSQL -->
    <line x1="480" y1="290" x2="518" y2="290" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#hosp-arrow)" />

    <!-- NestJS -> SuperTokens -->
    <line x1="298" y1="290" x2="262" y2="290" class="stroke-muted-foreground" stroke-width="1.5" marker-end="url(#hosp-arrow)" />
    <text x="280" y="283" text-anchor="middle" class="fill-muted-foreground" font-size="9">auth</text>

    <!-- Legend -->
    <line x1="120" y1="340" x2="150" y2="340" class="stroke-muted-foreground" stroke-width="1.5" />
    <text x="155" y="344" class="fill-muted-foreground" font-size="10">Synchronous</text>
    <line x1="260" y1="340" x2="290" y2="340" class="stroke-primary/60" stroke-width="1.5" stroke-dasharray="5 3" />
    <text x="295" y="344" class="fill-muted-foreground" font-size="10">Real-time (WebSocket)</text>
  </svg>
</template>
