import NavigationCard from '@/components/navigation-card'
import { ConsoleSqlOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <NavigationCard description="快速比较不同 SQL 语句之间的性能差异" icon={<ConsoleSqlOutlined />} title="SQL 性能测试" to="/sql-benchmark" />
      <NavigationCard description="快速生成模拟数据以进行测试和开发" icon={<ConsoleSqlOutlined />} title="SQL 模拟数据" to="/sql-benchmark" />
    </div>
  )
}
