import Store from 'electron-store'

export const appConfig = new Store({
  defaults: {
    'mainWindowDimension': {
      isCollapsed: false,
      width: 590,
      height: 300
    },
    'mainWindowPosition': {
      x: 0,
      y: 0
    },
    'assistWinSize': {},
    'hotkeyTasksCache': [],
    'stoppedTasksCache': [],
    'scheduledTasksCache': [],
    'eventsCache': [],
    'appHome': '',
    'logPath': '',
    'license': {
      'key': 'A-384DE2-821F87EF-AA2833W',
      'valid': false,
      'plan': '',
      'renew': ''
    },
    'isTaskSchMenuCollapsed': true,
    'isSettingsMenuCollapsed': true,
    'pathSeparator': '/',
    'taskSch': {
      'showType': 'running',
    },
    'apps': [],
    'helperWindowsList': [
      {
        'isChecked': true,
        'label': "ChatGPT",
        'value': "https://chat.openai.com/",
      },
      {
        'isChecked': true,
        'label': "TinyWow Toolbox",
        'value': "https://tinywow.com/",
      },
      {
        'isChecked': true,
        'label': "Todo Lists",
        'value': "https://tasks-app-aridsm.netlify.app",
      },
      {
        'isChecked': true,
        'label': "AuTool Documents",
        'value': "https://danalite.github.io/autool/",
      }],
    'isLocalServerActive': false
  }
})
