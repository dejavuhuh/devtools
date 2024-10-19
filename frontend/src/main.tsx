import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { App, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import { AliveScope } from 'react-activation'
import ReactDOM from 'react-dom/client'
import './index.css'
import './monaco'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        form={{
          validateMessages: {
            // eslint-disable-next-line no-template-curly-in-string
            required: '${label}不能为空！',
          },
        }}
        locale={zhCN}
        theme={{
          cssVar: true,
          components: {
            Button: {
              contentFontSizeSM: 12,
            },
          },
        }}
      >
        <AliveScope>
          <App className="h-full">
            <RouterProvider router={router} />
          </App>
        </AliveScope>
      </ConfigProvider>
    </QueryClientProvider>,
  )
}
