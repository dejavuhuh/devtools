import type { ProLayoutProps } from '@ant-design/pro-components'
import { SettingOutlined, ToolOutlined } from '@ant-design/icons'

const menus: ProLayoutProps['route'] = {
  children: [
    {
      path: '/settings',
      name: '系统管理',
      icon: <SettingOutlined />,
      children: [
        {
          path: '/settings/roles',
          name: '角色管理',
        },
        {
          path: '/settings/permissions',
          name: '权限管理',
        },
        {
          path: '/settings/menus',
          name: '菜单管理',
        },
      ],
    },
    {
      path: '/devtools',
      name: '开发者工具',
      icon: <ToolOutlined />,
      children: [
        {
          path: '/devtools/sql-benchmark',
          name: 'SQL 性能测试',
        },
      ],
    },
  ],
}

export default menus
