<template>
  <svg viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
    <defs>
      <marker id="ai-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6" fill="currentColor" class="text-muted-foreground" />
      </marker>
      <marker
        id="ai-arrow-primary"
        markerWidth="8"
        markerHeight="6"
        refX="8"
        refY="3"
        orient="auto"
      >
        <path d="M0,0 L8,3 L0,6" fill="currentColor" class="text-primary/60" />
      </marker>
    </defs>

    <!-- Column labels -->
    <text
      x="90"
      y="22"
      text-anchor="middle"
      class="fill-muted-foreground"
      font-size="11"
      font-weight="600"
      letter-spacing="1"
    >
      FRONTEND
    </text>
    <text
      x="370"
      y="22"
      text-anchor="middle"
      class="fill-muted-foreground"
      font-size="11"
      font-weight="600"
      letter-spacing="1"
    >
      AI ORCHESTRATION
    </text>
    <text
      x="670"
      y="22"
      text-anchor="middle"
      class="fill-muted-foreground"
      font-size="11"
      font-weight="600"
      letter-spacing="1"
    >
      DATA & INTEGRATIONS
    </text>

    <!-- Chat UI -->
    <rect
      x="20"
      y="100"
      width="140"
      height="70"
      rx="8"
      class="stroke-border fill-card"
      stroke-width="1.5"
    />
    <text
      x="90"
      y="132"
      text-anchor="middle"
      class="fill-foreground"
      font-size="13"
      font-weight="600"
    >
      Chat UI
    </text>
    <text x="90" y="150" text-anchor="middle" class="fill-muted-foreground" font-size="11">
      Nuxt
    </text>

    <!-- Mastra Framework -->
    <rect
      x="240"
      y="45"
      width="200"
      height="50"
      rx="8"
      class="stroke-border fill-card"
      stroke-width="1.5"
    />
    <text
      x="340"
      y="73"
      text-anchor="middle"
      class="fill-foreground"
      font-size="13"
      font-weight="600"
    >
      Mastra Framework
    </text>
    <text x="340" y="89" text-anchor="middle" class="fill-muted-foreground" font-size="11">
      Orchestrator
    </text>

    <!-- AI Agents group -->
    <rect
      x="240"
      y="115"
      width="200"
      height="160"
      rx="8"
      class="stroke-primary/30"
      stroke-width="1.5"
      stroke-dasharray="6 3"
      fill="none"
    />
    <text
      x="340"
      y="135"
      text-anchor="middle"
      class="fill-primary"
      font-size="10"
      font-weight="600"
    >
      AI AGENTS
    </text>

    <!-- Financial Advisor -->
    <rect
      x="260"
      y="145"
      width="160"
      height="34"
      rx="6"
      class="stroke-border fill-card"
      stroke-width="1"
    />
    <text
      x="340"
      y="167"
      text-anchor="middle"
      class="fill-foreground"
      font-size="11"
      font-weight="500"
    >
      Financial Advisor
    </text>

    <!-- Account Assistant -->
    <rect
      x="260"
      y="189"
      width="160"
      height="34"
      rx="6"
      class="stroke-border fill-card"
      stroke-width="1"
    />
    <text
      x="340"
      y="211"
      text-anchor="middle"
      class="fill-foreground"
      font-size="11"
      font-weight="500"
    >
      Account Assistant
    </text>

    <!-- Contact Manager -->
    <rect
      x="260"
      y="233"
      width="160"
      height="34"
      rx="6"
      class="stroke-border fill-card"
      stroke-width="1"
    />
    <text
      x="340"
      y="255"
      text-anchor="middle"
      class="fill-foreground"
      font-size="11"
      font-weight="500"
    >
      Contact Manager
    </text>

    <!-- MCP Server -->
    <rect
      x="540"
      y="45"
      width="160"
      height="55"
      rx="8"
      class="stroke-primary/50 fill-card"
      stroke-width="2"
      stroke-dasharray="6 3"
    />
    <text
      x="620"
      y="72"
      text-anchor="middle"
      class="fill-foreground"
      font-size="13"
      font-weight="600"
    >
      MCP Server
    </text>
    <text x="620" y="90" text-anchor="middle" class="fill-primary" font-size="10">Tool bridge</text>

    <!-- Accounting API (external) -->
    <rect
      x="540"
      y="125"
      width="160"
      height="45"
      rx="6"
      class="stroke-border fill-muted/30"
      stroke-width="1"
    />
    <text x="620" y="153" text-anchor="middle" class="fill-muted-foreground" font-size="11">
      Accounting API
    </text>

    <!-- PostgreSQL + pgvector -->
    <rect
      x="540"
      y="210"
      width="160"
      height="60"
      rx="8"
      class="stroke-border fill-card"
      stroke-width="1.5"
    />
    <text
      x="620"
      y="238"
      text-anchor="middle"
      class="fill-foreground"
      font-size="13"
      font-weight="600"
    >
      PostgreSQL
    </text>
    <text x="620" y="258" text-anchor="middle" class="fill-muted-foreground" font-size="11">
      + pgvector
    </text>

    <!-- Arrows -->
    <!-- Chat UI -> Mastra (SSE streaming) - horizontal -->
    <line
      x1="160"
      y1="130"
      x2="190"
      y2="130"
      class="stroke-primary/60"
      stroke-width="1.5"
      stroke-dasharray="5 3"
      fill="none"
    />
    <path
      d="M 190 130 L 190 70 L 238 70"
      class="stroke-primary/60"
      stroke-width="1.5"
      stroke-dasharray="5 3"
      fill="none"
      marker-end="url(#ai-arrow-primary)"
    />
    <text x="200" y="106" class="fill-primary" font-size="9">SSE stream</text>

    <!-- Mastra -> Agents (delegates) -->
    <line
      x1="340"
      y1="95"
      x2="340"
      y2="113"
      class="stroke-muted-foreground"
      stroke-width="1.5"
      marker-end="url(#ai-arrow)"
    />

    <!-- Agents -> MCP (tool calls) - horizontal from right side of agents group -->
    <line
      x1="440"
      y1="162"
      x2="490"
      y2="162"
      class="stroke-muted-foreground"
      stroke-width="1.5"
      fill="none"
    />
    <path
      d="M 490 162 L 490 72 L 538 72"
      class="stroke-muted-foreground"
      stroke-width="1.5"
      fill="none"
      marker-end="url(#ai-arrow)"
    />
    <text x="502" y="120" class="fill-muted-foreground" font-size="9">tool calls</text>

    <!-- MCP -> Accounting API (straight down) -->
    <line
      x1="620"
      y1="100"
      x2="620"
      y2="123"
      class="stroke-muted-foreground"
      stroke-width="1.5"
      marker-end="url(#ai-arrow)"
    />

    <!-- Agents -> PostgreSQL (semantic search - horizontal) -->
    <line
      x1="440"
      y1="240"
      x2="538"
      y2="240"
      class="stroke-muted-foreground"
      stroke-width="1.5"
      marker-end="url(#ai-arrow)"
    />
    <text x="489" y="234" text-anchor="middle" class="fill-muted-foreground" font-size="9">
      semantic search
    </text>

    <!-- Legend -->
    <line x1="20" y1="305" x2="50" y2="305" class="stroke-muted-foreground" stroke-width="1.5" />
    <text x="55" y="309" class="fill-muted-foreground" font-size="10">Synchronous</text>
    <line
      x1="160"
      y1="305"
      x2="190"
      y2="305"
      class="stroke-primary/60"
      stroke-width="1.5"
      stroke-dasharray="5 3"
    />
    <text x="195" y="309" class="fill-muted-foreground" font-size="10">Streaming / async</text>
    <rect
      x="310"
      y="298"
      width="14"
      height="14"
      rx="3"
      class="stroke-primary/50"
      stroke-width="1.5"
      stroke-dasharray="4 2"
      fill="none"
    />
    <text x="330" y="309" class="fill-muted-foreground" font-size="10">Key component</text>
  </svg>
</template>
