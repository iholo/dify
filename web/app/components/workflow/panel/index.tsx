import type { FC } from 'react'
import {
  memo,
  useMemo,
} from 'react'
import { Panel as NodePanel } from '../nodes'
import { useStore } from '../store'
import WorkflowInfo from './workflow-info'
import DebugAndPreview from './debug-and-preview'

const Panel: FC = () => {
  const mode = useStore(state => state.mode)
  const selectedNode = useStore(state => state.selectedNode)
  const {
    showWorkflowInfoPanel,
    showNodePanel,
    showDebugAndPreviewPanel,
  } = useMemo(() => {
    return {
      showWorkflowInfoPanel: mode === 'workflow' && !selectedNode,
      showNodePanel: !!selectedNode,
      showDebugAndPreviewPanel: mode === 'chatbot' && !selectedNode,
    }
  }, [mode, selectedNode])

  return (
    <div className='absolute top-14 right-0 bottom-2 flex'>
      {
        showNodePanel && (
          <NodePanel {...selectedNode!} />
        )
      }
      {
        showWorkflowInfoPanel && (
          <WorkflowInfo />
        )
      }
      {
        showDebugAndPreviewPanel && (
          <DebugAndPreview />
        )
      }
    </div>
  )
}

export default memo(Panel)