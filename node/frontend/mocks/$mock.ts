/* eslint-disable */
import { AxiosInstance } from 'axios'
import mockServer from 'axios-mock-server'
import mock0 from './api/users/user'
import mock1 from './api/login'
import mock2 from './api/auth/logout'
import mock3 from './api/auth/login'
import mock4 from './api/admin/userlog'
import mock5 from './api/admin/userinfo'
import mock6 from './api/admin/calender'
import mock7 from './api/admin/account'

export default (client?: AxiosInstance) => mockServer([
  {
    path: '/api/users/user',
    methods: mock0
  },
  {
    path: '/api/login',
    methods: mock1
  },
  {
    path: '/api/auth/logout',
    methods: mock2
  },
  {
    path: '/api/auth/login',
    methods: mock3
  },
  {
    path: '/api/admin/userlog',
    methods: mock4
  },
  {
    path: '/api/admin/userinfo',
    methods: mock5
  },
  {
    path: '/api/admin/calender',
    methods: mock6
  },
  {
    path: '/api/admin/account',
    methods: mock7
  }
], client, '')
