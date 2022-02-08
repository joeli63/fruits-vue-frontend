<template>
  <aside
    class="fixed left-0 right-0 z-10 flex-col flex-shrink-0 h-full overflow-hidden transition-all bg-transparent bottom-10 xl:h-screen top-16 xl:static xl:z-auto"
    :class="{
      'flex xl:w-64': isSidebarOpen,
      'hidden xl:flex xl:w-24': !isSidebarOpen,
    }"
  >
    <div
      class="flex-shrink-0 hidden max-h-14 xl:items-center xl:justify-start xl:space-x-3 xl:flex xl:max-h-20 xl:h-full xl:px-8 border-b-2 border-b-grey-light"
    >
      <a
        href="#"
        class="flex flex-shrink-0 text-xl font-bold tracking-widest text-blue-800 uppercase items-center gap-4"
      >
        <img class="block object-cover ml-2" src="../../../assets/logo.svg" alt="logo" />
        <div v-if="isSidebarOpen">MVP Factory</div>
      </a>
    </div>

    <div
      class="fixed left-0 flex flex-col flex-1 max-h-screen px-2 overflow-hidden right-3 top-16 bottom-10 xl:static xl:pt-2 xl:pl-4 xl:mb-4"
    >
      <div
        :class="{ 'min-w-full xl:w-14': isSidebarOpen }"
        class="flex-1 max-h-full py-4 overflow-hidden bg-white rounded-md"
      >
        <nav class="">
          <ul class="space-y-2">
            <li v-for="menu in menus" :key="menu.label" class="pb-3">
              <button class="flex items-center px-2">
                <img class="block object-cover mx-4" :src="menu.icon" alt="menu dashboard" />
                <router-link
                  class="font-bold text-lg"
                  :class="{
                    'xl:hidden': !isSidebarOpen,
                    'text-secondary': currentPath === menu.to,
                    'text-grey': currentPath !== menu.to,
                  }"
                  :to="menu.to"
                >
                  {{ menu.label }}
                </router-link>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "vue"
import { useRoute } from "vue-router"

import MenuDashboardGreyIcon from "../../../assets/menu-dashboard-grey.svg"
import MenuMonitorGreyIcon from "../../../assets/menu-monitor-grey.svg"
import MenuPowerGreyIcon from "../../../assets/menu-power-grey.svg"
import MenuReportColorIcon from "../../../assets/menu-report-color.svg"
import MenuViewGreyIcon from "../../../assets/menu-view-grey.svg"

interface AppNavigationMenu {
  label: string
  icon: string
  to: string
}

export default defineComponent({
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const route = useRoute()

    const { sidebarOpen } = toRefs(props)
    const menus = ref<AppNavigationMenu[]>([
      { label: "Dashboard", icon: MenuDashboardGreyIcon, to: "/" },
      { label: "View", icon: MenuViewGreyIcon, to: "/" },
      { label: "Power", icon: MenuPowerGreyIcon, to: "/" },
      { label: "Reports", icon: MenuReportColorIcon, to: "/reports" },
      { label: "Monitor", icon: MenuMonitorGreyIcon, to: "/" },
    ])

    return {
      isSidebarOpen: sidebarOpen,
      menus,
      currentPath: route.path,
    }
  },
})
</script>
