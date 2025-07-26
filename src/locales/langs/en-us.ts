const local: App.I18n.Schema = {
  system: {
    title: 'Wordupx',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then logout user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    home: 'Home',
    users: 'Users',
    user: 'User',
    decks: 'Decks',
    user_facts: 'Facts',
    user_cards: 'Cards',
    user_decks: 'Decks',
    user_cards_hidden: 'Hidden',
    user_cards_learn: 'Learn',
    exception: 'Exception',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500'
  },
  form: {
    pleaseEnter: 'Please enter {field}',
    required: 'The field is required',
    email: {
      required: 'Please enter email address',
      invalid: 'Email address format is incorrect'
    },
    username: {
      required: 'Please enter username',
      invalid: 'Username format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    field: {
      required: 'Please enter {field}'
    }
  },
  common: {
    logout: 'Logout',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    tip: 'Tip',
    logoutConfirm: 'Confirm to logout?',
    error: 'Error',
    saveSuccess: 'Save successfully',
    addNew: 'Add new {name}',
    createNew: 'Create New {name}',
    back: 'Back'
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  page: {
    cards: {
      deckIdPlaceholder: 'Please select a deck',
      next: 'NEXT',
      flip: 'FLIP',
      yr: ' Year',
      wk: ' Week',
      d: ' Day',
      hr: ' Hour',
      min: ' Minute',
      hide: 'Hide'
    },
    login: {
      pwdLogin: {
        title: 'Username/Password',
        rememberMe: 'Remember me'
      },
      register: {
        title: 'Register'
      },
      common: {
        usernamePlaceholder: 'Username',
        passwordPlaceholder: 'Password',
        userTypePlaceholder: 'User type',
        confirmPasswordPlaceholder: 'Confirm password',
        emailPlaceholder: 'Email address',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back',
        admin: 'Admin',
        user: 'User',
        loginOrRegister: 'Login or register'
      }
    }
  },
  table: {
    user: {
      username: 'USERNAME',
      email: 'EMAIL'
    },
    deck: {
      name: 'NAME',
      owner: 'OWNER',
      fields: 'FIELDS',
      template: 'TEMPLATE',
      rate: 'RATE'
    },
    card: {
      hidden: 'HIDDEN'
    },
    common: {
      createdAt: 'CREATED AT',
      actions: 'ACTIONS'
    }
  }
};

export default local;
