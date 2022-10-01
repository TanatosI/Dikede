<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <el-menu-item>
        <router-link to="./">帝可得</router-link>
      </el-menu-item>
      <el-menu-item>
        <span>工单管理</span>
      </el-menu-item>
      <el-menu-item>
        <span>点位管理</span>
      </el-menu-item>
      <el-menu-item>
        <span>设备管理</span>
      </el-menu-item>
      <!-- Personnel  -->
      <el-menu-item>
        <span>人员管理</span>
        <!-- 人员列表 -->
        <p />
        <!-- 人效统计 -->
        <p />
        <!-- 工作量列表 -->
        <p />
      </el-menu-item>

      <el-menu-item>
        <span>商品管理</span>
      </el-menu-item>
      <el-menu-item>
        <span>策略管理</span>
      </el-menu-item>
      <el-menu-item>
        <span>订单管理</span>
      </el-menu-item>
      <el-menu-item>
        <span>对账统计</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
// import Item from './Item'
// import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
// import Item from './Item.vue'

export default {
  name: 'SidebarItem', // 侧边导航栏
  // components: { Item, AppLinkItem },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
