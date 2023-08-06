import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from '@/app/components/base/icons/src/vender/line/arrows'
import { Check, SearchLg } from '@/app/components/base/icons/src/vender/line/general'
import { XCircle } from '@/app/components/base/icons/src/vender/solid/general'
import {
  Anthropic,
  Chatglm,
  Huggingface,
  OpenaiGreen,
  OpenaiViolet,
  Replicate,
} from '@/app/components/base/icons/src/public/llm'
import {
  Minimax,
  Tongyi,
} from '@/app/components/base/icons/src/image/llm'

const models = [
  { type: 'provider', name: 'OpenAI' },
  { type: 'model', name: 'GPT-3.5-Turbo-16K', value: 'GPT-3.5-Turbo-16K', icon: OpenaiGreen },
  { type: 'model', name: 'GPT-4', value: 'GPT-4', icon: OpenaiViolet },
  { type: 'provider', name: 'Anthropic' },
  { type: 'model', name: 'Claude-2', value: 'Claude-2', icon: Anthropic },
  { type: 'model', name: 'Claude-Instant', value: 'Claude-Instant', icon: Anthropic },
  { type: 'provider', name: 'Replicate' },
  { type: 'model', name: 'xxx/xxx-chat', value: 'xxx/xxx-chat', icon: Replicate },
  { type: 'provider', name: 'Hugging Face' },
  { type: 'model', name: 'xxx-chat', value: 'xxx-chat', icon: Huggingface },
  { type: 'provider', name: 'TONGYI QIANWEN' },
  { type: 'model', name: 'TONGYI-GPT', value: 'TONGYI-GPT', icon: Tongyi },
  { type: 'provider', name: 'ChatGLM' },
  { type: 'model', name: 'ChatGLM-3', value: 'ChatGLM-3', icon: Chatglm },
  { type: 'provider', name: 'MINIMAX' },
  { type: 'model', name: 'MINIMAX-GPT', value: 'MINIMAX-GPT', icon: Minimax },
]

const ModelSelector = () => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<{ type: string; name: string; value?: string; icon?: any }>()
  const [search, setSearch] = useState('')

  return (
    <div className=''>
      <Popover className='relative'>
        <Popover.Button className='flex items-center px-2.5 w-full h-9 bg-gray-100 rounded-lg'>
          {
            ({ open }) => (
              <>
                {
                  selected
                    ? (
                      <>
                        <selected.icon className='mr-1.5 w-5 h-5' />
                        <div className='mr-1.5 grow text-left text-sm text-gray-900'>{selected?.name}</div>
                      </>
                    )
                    : (
                      <div className='grow text-left text-sm text-gray-800 opacity-60'>{t('common.modelProvider.selectModel')}</div>
                    )
                }
                <ChevronDown className={`w-4 h-4 text-gray-700 ${open ? 'opacity-100' : 'opacity-60'}`} />
              </>
            )
          }
        </Popover.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Panel className='absolute top-10 p-1 w-full max-h-[366px] bg-white border-[0.5px] border-gray-200 rounded-lg shadow-lg overflow-auto z-10'>
            <div className='px-2 pt-2 pb-1'>
              <div className='flex items-center px-2 h-8 bg-gray-100 rounded-lg'>
                <div className='mr-1.5 p-[1px]'><SearchLg className='w-[14px] h-[14px] text-gray-400' /></div>
                <div className='grow px-0.5'>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={`
                      block w-full h-8 bg-transparent text-[13px] text-gray-700
                      outline-none appearance-none border-none
                    `}
                    placeholder={t('common.modelProvider.searchModel') || ''}
                  />
                </div>
                {
                  search && (
                    <div className='ml-1 p-0.5 cursor-pointer' onClick={() => setSearch('')}>
                      <XCircle className='w-3 h-3 text-gray-400' />
                    </div>
                  )
                }
              </div>
            </div>
            {
              models.map((model) => {
                if (model.type === 'provider') {
                  return (
                    <div
                      className='px-3 pt-2 pb-1 text-xs font-medium text-gray-500'
                      key={`${model.type}-${model.name}`}
                    >
                      {model.name}
                    </div>
                  )
                }

                if (model.type === 'model') {
                  const Icon: any = model.icon
                  return (
                    <Popover.Button
                      key={`${model.type}-${model.name}`}
                      className={`
                        flex items-center px-3 w-full h-8 rounded-lg cursor-pointer hover:bg-gray-50
                        ${selected === model.value && 'bg-gray-50'}
                      `}
                      onClick={() => setSelected(model)}
                    >
                      <Icon className='mr-2 w-4 h-4' />
                      <div className='grow text-left text-sm text-gray-900'>{model.name}</div>
                      { selected === model.value && <Check className='w-4 h-4 text-primary-600' /> }
                    </Popover.Button>
                  )
                }

                return null
              })
            }
            <div className='px-3 pt-1.5 h-[30px] text-center text-xs text-gray-500'>{t('common.modelProvider.noModelFound')}</div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default ModelSelector