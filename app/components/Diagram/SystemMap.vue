<script lang="ts" setup>
type Tone = "default" | "primary" | "muted";
type LinkVariant = "default" | "primary" | "async";

interface DiagramLane {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DiagramGroup {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone?: Tone;
}

interface DiagramNode {
  id: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone?: Tone;
}

interface DiagramLink {
  id: string;
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  variant?: LinkVariant;
}

const props = withDefaults(
  defineProps<{
    viewBox?: string;
    markerId: string;
    lanes?: DiagramLane[];
    groups?: DiagramGroup[];
    nodes: DiagramNode[];
    links: DiagramLink[];
  }>(),
  {
    viewBox: "0 0 920 430",
    lanes: () => [],
    groups: () => [],
  },
);

const frame = computed(() => {
  const parts = props.viewBox.trim().split(/\s+/).map(Number);
  const x = Number.isFinite(parts[0]) ? parts[0] : 0;
  const y = Number.isFinite(parts[1]) ? parts[1] : 0;
  const width = Number.isFinite(parts[2]) ? parts[2] : 920;
  const height = Number.isFinite(parts[3]) ? parts[3] : 430;

  return {
    x: x + 1,
    y: y + 1,
    width: Math.max(width - 2, 0),
    height: Math.max(height - 2, 0),
  };
});

function nodeClasses(tone: Tone = "default") {
  return {
    "stroke-border fill-card": tone === "default",
    "stroke-primary/60 fill-primary/[0.06]": tone === "primary",
    "stroke-border fill-muted/25": tone === "muted",
  };
}

function groupClasses(tone: Tone = "default") {
  return {
    "stroke-border/70 fill-muted/10": tone === "default",
    "stroke-primary/35 fill-primary/[0.035]": tone === "primary",
    "stroke-border fill-muted/20": tone === "muted",
  };
}

function linkClasses(variant: LinkVariant = "default") {
  return {
    "stroke-muted-foreground": variant === "default",
    "stroke-primary/70": variant === "primary" || variant === "async",
    "diagram-dash": variant === "async",
  };
}

function markerFor(variant: LinkVariant = "default") {
  return variant === "primary" || variant === "async"
    ? `url(#${props.markerId}-arrow-primary)`
    : `url(#${props.markerId}-arrow)`;
}
</script>

<template>
  <svg :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
    <defs>
      <marker
        :id="`${markerId}-arrow`"
        markerWidth="9"
        markerHeight="9"
        refX="8"
        refY="4.5"
        orient="auto"
      >
        <path d="M0,1 L8,4.5 L0,8" fill="currentColor" class="text-muted-foreground" />
      </marker>
      <marker
        :id="`${markerId}-arrow-primary`"
        markerWidth="9"
        markerHeight="9"
        refX="8"
        refY="4.5"
        orient="auto"
      >
        <path d="M0,1 L8,4.5 L0,8" fill="currentColor" class="text-primary/70" />
      </marker>
    </defs>

    <rect
      :x="frame.x"
      :y="frame.y"
      :width="frame.width"
      :height="frame.height"
      rx="18"
      class="fill-background stroke-border/70"
    />

    <g v-for="lane in lanes" :key="lane.label">
      <rect
        :x="lane.x"
        :y="lane.y"
        :width="lane.width"
        :height="lane.height"
        rx="14"
        class="fill-muted/10"
      />
      <text
        :x="lane.x + 18"
        :y="lane.y + 26"
        class="fill-muted-foreground"
        font-size="11"
        font-weight="700"
        letter-spacing="1.4"
      >
        {{ lane.label }}
      </text>
    </g>

    <g v-for="group in groups" :key="group.label">
      <rect
        :x="group.x"
        :y="group.y"
        :width="group.width"
        :height="group.height"
        rx="16"
        :class="groupClasses(group.tone)"
        stroke-width="1.5"
        stroke-dasharray="7 6"
      />
      <text
        :x="group.x + 18"
        :y="group.y + 26"
        class="fill-muted-foreground"
        font-size="11"
        font-weight="700"
        letter-spacing="1.2"
      >
        {{ group.label }}
      </text>
    </g>

    <g v-for="link in links" :key="link.id">
      <path
        :d="link.d"
        :class="linkClasses(link.variant)"
        :marker-end="markerFor(link.variant)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <text
        v-if="link.label"
        :x="link.labelX"
        :y="link.labelY"
        text-anchor="middle"
        class="fill-muted-foreground"
        font-size="10"
        font-weight="600"
      >
        {{ link.label }}
      </text>
    </g>

    <g v-for="node in nodes" :key="node.id">
      <rect
        :x="node.x"
        :y="node.y"
        :width="node.width"
        :height="node.height"
        rx="12"
        :class="nodeClasses(node.tone)"
        stroke-width="1.6"
      />
      <text
        :x="node.x + node.width / 2"
        :y="node.y + node.height / 2 - (node.subtitle ? 6 : -4)"
        text-anchor="middle"
        class="fill-foreground"
        font-size="14"
        font-weight="700"
      >
        {{ node.title }}
      </text>
      <text
        v-if="node.subtitle"
        :x="node.x + node.width / 2"
        :y="node.y + node.height / 2 + 15"
        text-anchor="middle"
        class="fill-muted-foreground"
        font-size="11"
        font-weight="500"
      >
        {{ node.subtitle }}
      </text>
    </g>
  </svg>
</template>

<style scoped>
.diagram-dash {
  stroke-dasharray: 7 7;
}
</style>
