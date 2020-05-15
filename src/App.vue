<template>
  <!-- 根Vue对象 -->
  <div id="app">
    <!-- 单页查看 -->
    <!-- <router-view></router-view> -->

    <!-- 目录查看 -->
    <el-container>
      <el-header height="68px">
        <svg t="1588750505929" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1187" width="48" height="48">
          <path
            d="M931.84 720.213333l-477.866667-375.466666c-3.413333-3.413333-10.24-3.413333-17.066666 0s-10.24 10.24-10.24 13.653333v648.533333c0 6.826667 3.413333 13.653333 13.653333 17.066667h3.413333c6.826667 0 10.24-3.413333 13.653334-6.826667l184.32-266.24H921.6c6.826667 0 13.653333-3.413333 17.066667-10.24 0-6.826667 0-17.066667-6.826667-20.48z"
            fill="#41B883"
            p-id="1188"
          ></path>
          <path
            d="M314.026667 655.36c-119.466667-51.2-194.56-167.253333-194.56-296.96C119.466667 180.906667 266.24 34.133333 443.733333 34.133333s324.266667 146.773333 324.266667 324.266667c0 27.306667-3.413333 54.613333-10.24 81.92-3.413333 10.24 3.413333 17.066667 13.653333 20.48 10.24 3.413333 17.066667-3.413333 20.48-13.653333 6.826667-30.72 10.24-61.44 10.24-88.746667C802.133333 160.426667 641.706667 0 443.733333 0S85.333333 160.426667 85.333333 358.4c0 143.36 85.333333 269.653333 215.04 327.68H307.2c6.826667 0 13.653333-3.413333 17.066667-10.24 3.413333-6.826667 0-17.066667-10.24-20.48z"
            fill="#41B883"
            p-id="1189"
          ></path>
        </svg>
        <h3>One Chart</h3>
        <span>{{ now }}</span>
      </el-header>
      <el-container>
        <el-aside width=""><AMenu></AMenu></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
    <!-- 页面结尾 -->
  </div>
</template>

<script>
import AMenu from './components/AMenu.vue'
export default {
  name: 'app',
  components: { AMenu },
  data() {
    return {
      now: ''
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  .full();

  .el-container {
    .full();
    background: url('./assets/view-bg.jpg') center center no-repeat;

    .el-header {
      .flex-center();
      background: url(assets/header-bg.png) rgba(45, 163, 211, 0.3) center center no-repeat;
    }

    .el-aside {
      background: rgba(38, 162, 231, 0.2);
    }
    .el-main {
      padding: 0;
    }
  }
}
</style>
