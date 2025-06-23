<template>
    <div class="container">
      <h1>Shopping cart page</h1>
      <p>On the shopping cart page, you may need to submit an order, then jump to the payment page, and then jump to the shopping cart page after the payment is successful, and refresh the page. The implementation in the App is very simple, but the implementation in the web H5 is still relatively difficult, But this component solves this problem.</p> 
      <button @click="layer.show1 = true">go to the submit order page</button>
  
      <!-- This first pop-up layer (Submit order page) -->
      <PopupLayer 
        :visible="layer.show1" 
        @update:visible="(val:boolean) => layer.show1 = val"
        @onOpen="open" 
        @onClose="close" 
        :extra="{ lv: 1 }" 
        ref="lv1"
      >
        <h3>Submit order page</h3>
        <button @click="layer.show1 = false">Physically return/manually close the page</button>
        <button @click="layer.show2 = true">go to the payment page</button>
  
        <!-- This second pop-up layer (Payment page) -->
        <PopupLayer 
          :visible="layer.show2" 
          @update:visible="(val:boolean) => layer.show2 = val"
          :extra="{ lv: 2 }" 
          @onOpen="open" 
          @onClose="close" 
          ref="lv2"
        >
          <h3>Payment page</h3>
          <button @click="layer.show2 = false">Physically return/manually close the page</button>
          <button @click="closeAll">The payment is successfully redirected to the shopping cart page</button>
        </PopupLayer>
      </PopupLayer>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import PopupLayer from '@/components/PopupLayer.vue'
  
  // 定义类型
  interface LayerState {
    show1: boolean
    show2: boolean
  }
  
  interface PopupLayerInstance {
    backLvBy: (targetLv: number, totalLv: number, callback: (i: number) => void) => void
  }
  
  interface ExtraData {
    lv: number
  }
  
  interface CloseEvent {
    isPopstate: boolean
  }
  
  const layer = ref<LayerState>({
    show1: false,
    show2: false
  })
  
  const lv1 = ref<PopupLayerInstance | null>(null)
  const lv2 = ref<PopupLayerInstance | null>(null)
  
  const open = (id: string, extra: ExtraData) => {
    console.log('Pop-up layer opened: ' + extra.lv, id, extra)
  }
  
  const close = (event: CloseEvent, extra: ExtraData) => {
    console.log(
      event.isPopstate 
        ? 'Click the physical return button to close the pop-up layer: ' + extra.lv 
        : 'Manually closed the popup layer: ' + extra.lv, 
      extra
    )
  }
  
  const closeAll = () => {
    if (!lv1.value) return
    
    // back the root level 0, total level 2
    lv1.value.backLvBy(0, 2, (i: number) => {
      layer.value[`show${i}` as keyof LayerState] = false
    })
  }
  </script>