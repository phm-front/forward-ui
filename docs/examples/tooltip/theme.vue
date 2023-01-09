<template>
  <f-tooltip content="Top center" placement="top">
    <f-button>Dark</f-button>
  </f-tooltip>
  <f-tooltip content="Bottom center" placement="bottom" effect="light">
    <f-button>Light</f-button>
  </f-tooltip>

  <f-tooltip content="Bottom center" effect="customized">
    <f-button>Customized theme</f-button>
  </f-tooltip>
</template>

<style>
.f-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.f-popper.is-customized .f-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
