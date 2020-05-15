const routes = [{
  path: '/',
  component: () => import('../views/Home.vue')
},
{
  name: '折线图',
  path: '/LineView',
  component: () => import('../views/LineView.vue'),
  children: [{
    name: '简单折线',
    path: '/lines/SimpleLine',
    component: () =>
      import('../views/lines/SimpleLine.vue')
  }]
},
{
  name: '柱图',
  path: '/BarView',
  component: () => import('../views/BarView.vue'),
  children: [{
    name: '简单柱图',
    path: '/bars/SimpleBar',
    component: () =>
      import('../views/bars/SimpleBar.vue')
  }, {
    name: '继承柱图',
    path: '/bars/BaseBar',
    component: () =>
      import('../views/bars/BaseBar.vue')
  }, {
    name: '混入柱图',
    path: '/bars/MixiinBar',
    component: () =>
      import('../views/bars/MixiinBar.vue')
  }]
},
{
  name: '饼环图',
  path: '/PieView',
  component: () => import('../views/PieView.vue'),
  children: [{
    name: '简单饼环图',
    path: '/pies/SimplePie',
    component: () =>
      import('../views/pies/SimplePie.vue')
  }, {
    name: '混入饼环图',
    path: '/pies/MixinPie',
    component: () =>
      import('../views/pies/MixinPie.vue')
  }, {
    name: '自定义图例饼环图',
    path: '/pies/LegendPie',
    component: () =>
      import('../views/pies/LegendPie.vue')
  }]
},
{
  name: '雷达图',
  path: '/RadarView',
  component: () => import('../views/RadarView.vue'),
  children: [{
    name: '简单雷达图',
    path: '/radars/SimpleRadar',
    component: () =>
      import('../views/radars/SimpleRadar.vue')
  }, {
    name: '图例雷达图',
    path: '/radars/LegendRadar',
    component: () =>
      import('../views/radars/LegendRadar.vue')
  }]
}
]

export default routes
