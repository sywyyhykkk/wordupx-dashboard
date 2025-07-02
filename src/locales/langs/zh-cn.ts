const local: App.I18n.Schema = {
  system: {
    title: 'Soybean 管理系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    home: '首页',
    users: '用户',
    user: '用户',
    decks: '卡组',
    user_cards: '卡片',
    user_decks: '卡组',
    exception: '异常页',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500'
  },
  form: {
    required: '不能为空',
    username: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    }
  },
  common: {
    logout: '退出登录',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    tip: '提示',
    logoutConfirm: '确认退出登录?'
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  page: {
    cards: {
      deckIdPlaceholder: '请选择卡组',
      next: '下一个',
      review: '复习',
      flip: '翻转',
      yr: '年',
      wk: '周',
      d: '天',
      hr: '小时',
      min: '分钟'
    },
    login: {
      pwdLogin: {
        title: '用户名/密码',
        rememberMe: '记住我'
      },
      common: {
        usernamePlaceholder: '用户名',
        passwordPlaceholder: '密码',
        userTypePlaceholder: '用户类型',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来',
        admin: '管理员',
        user: '用户'
      }
    }
  },
  table: {
    user: {
      username: '用户名',
      email: '邮箱'
    },
    deck: {
      name: '名称',
      owner: '创建人',
      fields: '条目',
      template: '模版',
      rate: '频率'
    },
    common: {
      createdAt: '创建于',
      actions: '操作'
    }
  }
};

export default local;
