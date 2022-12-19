// TODO:根据文件自动生成json配置
const getSidebars = () => {
  return {
    '/zh-CN/guild/': [
      {
        text: '基础',
        items: [
          {
            text: '安装',
            link: '/zh-CN/guild/installation',
          },
          {
            text: '快速开始',
            link: '/zh-CN/guild/quickstart',
          },
        ],
      },
    ],
    '/zh-CN/component/': [
      {
        text: 'Basic 基础组件',
        items: [
          { text: 'Button 按钮', link: '/zh-CN/component/button' },
          { text: 'Border 边框', link: '/zh-CN/component/border' },
          { text: 'Link 链接', link: '/zh-CN/component/link' },
          { text: 'Container 布局容器', link: '/zh-CN/component/container' },
        ],
      },
      {
        text: 'Others 其他',
        items: [{ text: 'Divider 分割线', link: '/zh-CN/component/divider' }],
      },
    ],
  }
}

export const sidebar = getSidebars()
