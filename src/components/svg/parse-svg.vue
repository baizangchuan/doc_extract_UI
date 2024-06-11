<script setup>
defineOptions({
  name: 'HomeSvg'
})

defineProps({
  fillColor: {
    type: String,
    default: '#6C7995'
  }
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none"
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <defs>
      <clipPath id="master_svg0_1_17321">
        <rect x="0" y="0" width="16" height="16" rx="0" />
      </clipPath>
    </defs>
    <g clip-path="url(#master_svg0_1_17321)">
      <g>
        <rect
          x="1.9580078125"
          y="1.89453125"
          width="5.529343605041504"
          height="12.210383415222168"
          rx="1"
          :fill="fillColor"
          fill-opacity="1"
        />
        <rect
          x="2.4580078125"
          y="2.39453125"
          width="4.529343605041504"
          height="11.210383415222168"
          rx="0.5"
          fill-opacity="0"
          stroke-opacity="1"
          :stroke="fillColor"
          fill="none"
          stroke-width="1"
        />
      </g>
      <g>
        <rect
          x="8.4609375"
          y="1.89453125"
          width="5.582078456878662"
          height="4.8448944091796875"
          rx="1"
          :fill="fillColor"
          fill-opacity="1"
        />
        <rect
          x="8.9609375"
          y="2.39453125"
          width="4.582078456878662"
          height="3.8448944091796875"
          rx="0.5"
          fill-opacity="0"
          stroke-opacity="1"
          :stroke="fillColor"
          fill="none"
          stroke-width="1"
        />
      </g>
      <g>
        <rect
          x="8.4609375"
          y="7.708984375"
          width="5.582078456878662"
          height="6.395729064941406"
          rx="1"
          :fill="fillColor"
          fill-opacity="1"
        />
        <rect
          x="8.9609375"
          y="8.208984375"
          width="4.582078456878662"
          height="5.395729064941406"
          rx="0.5"
          fill-opacity="0"
          stroke-opacity="1"
          :stroke="fillColor"
          fill="none"
          stroke-width="1"
        />
      </g>
    </g>
  </svg>
</template>
