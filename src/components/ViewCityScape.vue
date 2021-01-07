<template>
  <div>
    <baidu-map
      :scrollWheelZoom="true"
      ref="baiduMap"
      class="map"
      :center="'成都'"
      :zoom="14"
    >
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-boundary
        name="成都市武侯区"
        :strokeWeight="2"
        strokeColor="blue"
        fillColor="blue"
      ></bm-boundary>
      <bm-boundary
        name="成都市锦江区"
        :strokeWeight="2"
        strokeColor="blue"
        fillColor="yellow"
      ></bm-boundary>
      <bml-heatmap :data="data" :max="100" :radius="20"></bml-heatmap>
    </baidu-map>
  </div>
</template>

<script>
 import {BmlHeatmap} from 'vue-baidu-map'

export default {
  components: {
     BmlHeatmap
  },
  data() {
    return {
      data: [
        { lng: 116.418261, lat: 39.921984, count: 50 },
        { lng: 116.423332, lat: 39.916532, count: 51 },
        { lng: 116.419787, lat: 39.930658, count: 15 },
        // ...此处添加更多的数据集
      ],
      test: "Hello",
    };
  },
  mounted() {
    //this.$refs.baiduMap.scrollWheelZoom = true;
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 500px;
}
</style>
