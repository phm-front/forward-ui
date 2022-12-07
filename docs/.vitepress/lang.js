;(() => {
  // 跳转zh-CN站点
  // vitepress nav部分对logo部分默认跳转是<a href='/'>,暂不支持配置
  // 所以点击logo时，会先跳转到/,再跳转到/zh-CN
  const defaultLang = 'zh-CN'
  if (!location.pathname.startsWith(`/${defaultLang}`)) {
    const toPath = [`/${defaultLang}`]
      .concat(location.pathname.split('/').slice(2))
      .join('/')

    location.pathname =
      toPath.endsWith('.html') || toPath.endsWith('/')
        ? toPath
        : toPath.concat('/')
  }
})()
