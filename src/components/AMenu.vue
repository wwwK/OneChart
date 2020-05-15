<template>
  <div class="amenu scroll" :class="{ 'amenu--collapse': isCollapse }">
    <div class="amenu-title">
      <span v-show="!isCollapse">功能菜单</span>
      <el-tooltip :disabled="!isCollapse" content="功能菜单" placement="right">
        <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="CollapseMenu()"></i>
      </el-tooltip>
    </div>
    <el-menu text-color="#DDD" active-text-color="#FF9326" :collapse="isCollapse" router v-cloak>
      <template v-for="route in $router.options.routes">
        <el-submenu v-if="route.children && route.children.length" :key="route.name" :index="route.path">
          <!-- <template>此种方式不能自定义样式，且不可控制高度，除非全局覆盖。还是会有渲染template，热更新没渲染出来</template> -->
          <!-- <div slot="title" class="menu_title"></div> -->
          <template slot="title">
            <i class="el-icon-suitcase"></i>
            <span>{{ route.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="child in route.children" :key="child.name" :index="child.path">
              <i class="el-icon-notebook-1"></i>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="route.path" :key="route.name">
          <i class="el-icon-s-platform"></i>
          <span>{{ route.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    CollapseMenu() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.amenu {
  height: 100%;
  border-right: 1px solid rgba(221, 221, 221, 0.4);
  width: 64px;

  &.amenu--collapse {
    .amenu-title {
      i {
        right: 22px;
      }
    }
  }

  &:not(.amenu--collapse) {
    width: 200px;
  }

  .amenu-title {
    position: relative;
    height: @menuitem-height;
    line-height: @menuitem-height;
    color: #eee;
    font-size: 20px;
    text-align: left;
    padding-left: 20px;
    border-bottom: 1px dashed gray;

    i {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
