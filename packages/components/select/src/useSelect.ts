import { reactive } from 'vue';
import type { FSelectProps } from './select';

export function useSelectStates(props: FSelectProps) {
  return reactive({
    options: new Map(),
    cachedOptions: new Map(),
    createdLabel: null,
    createdSelected: false,
    selected: props.multiple ? [] : ({} as any),
    inputLength: 20,
    inputWidth: 0,
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: false,
    softFocus: false,
    selectedLabel: '',
    hoverIndex: -1,
    query: '',
    previousQuery: null,
    inputHovering: false,
    cachedPlaceHolder: '',
    currentPlaceholder: '选择',
    menuVisibleOnFocus: false,
    isOnComposition: false,
    isSilentBlur: false,
    prefixWidth: 11,
    tagInMultiLine: false,
    mouseEnter: false,
  })
}

type States = ReturnType<typeof useSelectStates>

export function useSelect(props: FSelectProps, states: States, ctx: { emit: any }) {
  return {
    
  }
}
