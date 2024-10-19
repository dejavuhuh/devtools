import type { ProColumns } from '@ant-design/pro-components'
import type { OnMount } from '@monaco-editor/react'
import api from '@/api'
import CodeHighlighter from '@/components/code-highlighter'
import { useRaisedShadow } from '@/hooks/use-raised-shadow'
import { BarChartOutlined, FormatPainterOutlined, PlusOutlined, TableOutlined } from '@ant-design/icons'
import { ProCard, ProForm, ProFormDigit, ProTable } from '@ant-design/pro-components'
import { Editor } from '@monaco-editor/react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useCopyToClipboard, useList } from '@uidotdev/usehooks'
import { Button, Empty, message, Modal, Segmented, Spin, Tag, Tooltip, Typography } from 'antd'

import { AnimatePresence, Reorder, useMotionValue } from 'framer-motion'
import { group } from 'radash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export const Route = createFileRoute('/sql-benchmark/')({
  component: SqlBenchmarkPage,
})

interface StatementProps {
  index: number
  sql: string
  onRemove: () => void
}

function Statement({ sql, index, onRemove }: StatementProps) {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const [, copyToClipboard] = useCopyToClipboard()
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <Reorder.Item
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      style={{ boxShadow, y }}
      transition={{ duration: 0.1 }}
      value={sql}
    >

      <Tooltip
        overlayInnerStyle={{
          background: '#1F2430',
          padding: 12,
        }}
        overlayStyle={{
          maxWidth: 'unset',
        }}
        title={(
          <CodeHighlighter
            code={sql}
            options={{
              lang: 'sql',
              theme: 'theme',
            }}
          />
        )}
      >
        <div className="p-4 rounded bg-info flex items-center cursor-move hover:bg-info-hover transition-colors select-none">
          <div className="text-white bg-[#314659] size-5 rounded-full flex justify-center items-center shrink-0 mr-4">{index}</div>
          <Typography.Text
            ellipsis
            className="mr-4"
            type="secondary"
          >
            {sql}
          </Typography.Text>
          {contextHolder}
          <Button
            className="ml-auto"
            color="default"
            size="small"
            variant="filled"
            onClick={() => {
              copyToClipboard(sql)
              messageApi.success('复制成功')
            }}
          >
            复制
          </Button>
          <Button
            className="ml-2.5"
            color="danger"
            size="small"
            variant="filled"
            onClick={onRemove}
          >
            删除
          </Button>
        </div>
      </Tooltip>
    </Reorder.Item>

  )
}

type EditorInstance = Parameters<OnMount>[0]
interface BenchmarkOptions {
  runTimes: number
  repeatTimes: number
}

function AddStatementButton({ onOk }: { onOk: (sql: string) => boolean }) {
  const [open, setOpen] = useState(false)
  const editorRef = useRef<EditorInstance>()

  const handleOk = () => {
    const sql = editorRef.current?.getValue()
    if (!sql) {
      message.error('请输入 SQL 语句')
      return
    }
    if (onOk(sql)) {
      setOpen(false)
    }
  }

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        <PlusOutlined />
        添加 SQL 语句
      </Button>
      <Modal
        destroyOnClose
        open={open}
        title="添加 SQL 语句"
        width={800}
        onCancel={() => setOpen(false)}
        onOk={handleOk}
      >
        <div className="border border-[#f3f5f6] rounded-md overflow-hidden">
          <div className="h-10 px-3 flex items-center border-b-[#f3f5f6]">
            <Tag bordered={false} color="#45505E">SQL</Tag>
            <Button
              className="ml-auto gap-1"
              color="default"
              icon={<FormatPainterOutlined />}
              size="small"
              variant="filled"
              onClick={() => editorRef.current?.getAction('editor.action.formatDocument')?.run()}
            >
              格式化
            </Button>
          </div>
          <Editor
            className="h-[50vh]"
            language="sql"
            options={{
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
            theme="theme"
            onMount={editor => editorRef.current = editor}
          />
        </div>
      </Modal>
    </>
  )
}

interface BenchmarkResult {
  runTime: number
  statementIndex: number
  elapsedMs: number
}

type DataDisplayType = 'table' | 'chart'

let statementCount = 0
let repeatTimes = 0

const columns: ProColumns<BenchmarkResult>[] = [
  {
    dataIndex: 'runTime',
    title: '运行轮次',
    onCell: (_, index) => {
      if (index === undefined) {
        return {}
      }
      if (index % statementCount === 0) {
        return {
          rowSpan: statementCount,
        }
      }
      return {
        rowSpan: 0,
      }
    },
  },
  {
    dataIndex: 'statementIndex',
    title: 'SQL语句编号',
    renderText: statementIndex => <div className="text-white bg-[#314659] size-5 rounded-full flex justify-center items-center">{statementIndex + 1}</div>,
  },
  {
    dataIndex: 'elapsedMs',
    title: '每轮总耗时(ms)',
  },
  {
    dataIndex: 'elapsedMs',
    title: '单次平均耗时(ms)',
    renderText: elapsedMs => elapsedMs / repeatTimes,
  },
]

interface ChartData {
  name: string
  [key: number]: number
}

interface DataChartProps {
  data: ChartData[]
  barCount: number
}

const BAR_COLORS = ['#8884d8', '#82ca9d', '#ffc658']

function DataChart({ data, barCount }: DataChartProps) {
  return (
    <ResponsiveContainer height={600} width="100%">
      <BarChart barGap={0} data={data}>
        <CartesianGrid strokeDasharray="3" vertical={false} />
        <XAxis dataKey="name" label={{ value: '运行轮次', position: 'insideBottomRight' }} />
        <YAxis label={{ value: '每轮总耗时(ms)', angle: -90, position: 'insideLeft' }} />
        <RechartsTooltip labelFormatter={name => `${name}总耗时(ms)`} />
        <Legend />
        {/* eslint-disable-next-line react/no-array-index-key */}
        {Array.from({ length: barCount }).map((_, index) => <Bar barSize={35} dataKey={`${index + 1}`} fill={BAR_COLORS[index % BAR_COLORS.length]} key={index} />)}
      </BarChart>
    </ResponsiveContainer>
  )
}

function convertToChartData(data: BenchmarkResult[]): ChartData[] {
  const groupedByRunTime = group(data, data => data.runTime)
  const result = []
  for (const [runTime, items = []] of Object.entries(groupedByRunTime)) {
    const chartData: ChartData = {
      name: `第${runTime}轮`,
    }
    for (const item of items) {
      chartData[item.statementIndex + 1] = item.elapsedMs
    }
    result.push(chartData)
  }
  return result
}

function SqlBenchmarkPage() {
  const [dataDisplayType, setDataDisplayType] = useState<DataDisplayType>('table')
  const [statements, { push, removeAt, set }] = useList<string>([])

  const { data, mutateAsync, reset, isPending } = useMutation({
    mutationFn: (options: BenchmarkOptions) => api.post<BenchmarkResult[]>('sql-benchmark', {
      json: { statements, options },
    }).json(),
    onError() {
      message.error('SQL 运行失败，请检查 SQL 语法是否正确')
    },
  })

  const chartData = useMemo(() => convertToChartData(data ?? []), [data])

  const handleRemove = (index: number) => {
    removeAt(index)
    reset()
  }

  const handleOk = (sql: string) => {
    if (statements.includes(sql)) {
      message.error('SQL 语句已存在')
      return false
    }
    push(sql)
    return true
  }

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, [dataDisplayType])

  return (
    <div className="space-y-4">
      <ProCard
        extra={<AddStatementButton onOk={handleOk} />}
        title="SQL 性能测试"
      >
        {
          statements.length === 0
            ? <Empty description="请添加 SQL 语句" />
            : (
                <Reorder.Group
                  axis="y"
                  className="space-y-2.5"
                  values={statements}
                  onReorder={set}
                >
                  <AnimatePresence>
                    {statements.map((sql, index) => (
                      <Statement index={index + 1} key={sql} sql={sql} onRemove={() => handleRemove(index)} />
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              )
        }
      </ProCard>
      {statements.length > 0 && (
        <ProCard>
          <div className="space-y-4">
            <div className="flex items-center">
              <ProForm<BenchmarkOptions>
                initialValues={{
                  runTimes: 5,
                  repeatTimes: 1000,
                }}
                layout="inline"
                submitter={{
                  searchConfig: {
                    submitText: '运行',
                  },
                }}
                onFinish={options => mutateAsync(options).then(() => {
                  statementCount = statements.length
                  repeatTimes = options.repeatTimes
                  return true
                })}
              >
                <ProFormDigit
                  fieldProps={{ precision: 0, addonAfter: '轮' }}
                  label="总共运行"
                  min={1}
                  name="runTimes"
                  width={100}
                />
                <ProFormDigit
                  fieldProps={{ precision: 0, addonAfter: '次' }}
                  label="每轮重复"
                  min={1}
                  name="repeatTimes"
                  width={130}
                />
              </ProForm>
              <Segmented<DataDisplayType>
                className="ml-auto"
                options={[
                  {
                    value: 'table',
                    icon: <TableOutlined />,
                  },
                  {
                    value: 'chart',
                    icon: <BarChartOutlined />,
                  },
                ]}
                value={dataDisplayType}
                onChange={setDataDisplayType}
              />
            </div>
            <Spin spinning={isPending}>
              {dataDisplayType === 'table' && (
                <ProTable
                  bordered
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  search={false}
                  toolBarRender={false}
                />
              )}
              {dataDisplayType === 'chart' && (
                <DataChart barCount={statementCount} data={chartData} />
              )}
            </Spin>
          </div>
        </ProCard>
      )}

    </div>
  )
}
