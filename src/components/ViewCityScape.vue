<template>
  <div>
<<<<<<< HEAD
    <baidu-map scrollWheelZoom="true" ref="baiduMap" class="map" :center="'成都'" :zoom="14">
=======
    <baidu-map
      scrollWheelZoom="true"
      ref="baiduMap"
      class="map"
      :center="'成都'"
      :zoom="14"
    >
>>>>>>> parent of e93f230... 实现基本功能
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-boundary name="成都市武侯区" :strokeWeight="2" strokeColor="blue" fillColor="blue"></bm-boundary>
      <bm-boundary name="成都市锦江区" :strokeWeight="2" strokeColor="blue" fillColor="yellow"></bm-boundary>
      <bm-boundary name="成都市成华区" :strokeWeight="2" strokeColor="blue" fillColor="white"></bm-boundary>
      <bm-boundary name="成都市青羊区" :strokeWeight="2" strokeColor="blue" fillColor="grey"></bm-boundary>
      <bm-boundary name="成都市金牛区" :strokeWeight="2" strokeColor="blue" fillColor="red"></bm-boundary>
      <!-- <bm-boundary name="成都市温江区" :strokeWeight="2" strokeColor="blue" fillColor="green"></bm-boundary>
      <bm-boundary name="成都市新都区" :strokeWeight="2" strokeColor="blue" fillColor="purple"></bm-boundary>
      <bm-boundary name="成都市郫都区" :strokeWeight="2" strokeColor="blue" fillColor="pink"></bm-boundary>
      <bm-boundary name="成都市龙泉驿区" :strokeWeight="2" strokeColor="blue" fillColor="red"></bm-boundary>
      <bm-boundary name="成都市双流县" :strokeWeight="2" strokeColor="blue" fillColor="red"></bm-boundary> -->
      <bml-heatmap :data="data" :max="100" :radius="20"></bml-heatmap>
    </baidu-map>
  </div>
</template>

<script>
// import {BmlHeatmap} from 'vue-baidu-map'

export default {
  components: {
    // BmlHeatmap
  },
  data() {
    return {
      data: [
        { lng: 116.418261, lat: 39.921984, count: 50 },
        { lng: 116.423332, lat: 39.916532, count: 51 },
        { lng: 116.419787, lat: 39.930658, count: 15 }
        // ...此处添加更多的数据集
      ],
      test: "Hello"
    };
  },
  mounted() {
    //this.$refs.baiduMap.scrollWheelZoom = true;
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 700px;
}
</style>
