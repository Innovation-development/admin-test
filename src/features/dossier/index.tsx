import { useState } from 'react'
import {
  IconFileExport,
  IconPencil,
  IconPhone,
  IconMail,
  IconMapPin,
  IconBuilding,
  IconTrash,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { RiskGauge } from './components/risk-gauge'
import { Timeline, TimelineItem } from './components/timeline'

const timelineItems: TimelineItem[] = [
  { id: 1, text: 'Створено досьє', time: '2024-05-01 10:00' },
  { id: 2, text: 'Оновлено контактну інформацію', time: '2024-05-03 14:32' },
  { id: 3, text: 'Додано новий файл', time: '2024-05-04 09:20' },
]

export default function Dossier() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <div className='animate-fade-in space-y-4 bg-[#F2F4F8] p-4 font-[Inter] text-base'>
      {/* Header */}
      <Card className='rounded-xl bg-[#1E3A8A] text-white shadow-sm'>
        <CardContent className='flex flex-col gap-4 p-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-start gap-4'>
              <span className='rounded-md bg-white/20 p-3'>
                <IconBuilding size={40} />
              </span>
              <div>
                <h2 className='text-2xl font-bold'>ТОВ "Приклад"</h2>
                <p className='text-sm'>ІПН / ЄДРПОУ: 12345678</p>
                <Badge className='mt-1 bg-white/20 text-white'>Активний</Badge>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='ghost'
                className='focus:ring-2 focus:ring-[#2F80ED]'
              >
                <IconFileExport size={16} /> PDF Export
              </Button>
              <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogTrigger asChild>
                  <Button
                    variant='ghost'
                    className='text-[#E63946] focus:ring-2 focus:ring-[#2F80ED]'
                  >
                    <IconTrash size={16} /> Видалити
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Підтвердити видалення?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant='destructive'
                      onClick={() => setOpenDelete(false)}
                    >
                      Видалити
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Sheet open={openEdit} onOpenChange={setOpenEdit}>
                <SheetTrigger asChild>
                  <Button className='focus:ring-2 focus:ring-[#2F80ED]'>
                    <IconPencil size={16} /> Редагувати
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Редагувати досьє</SheetTitle>
                  </SheetHeader>
                  <div className='p-4'>Тут форма редагування...</div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <Tabs defaultValue='overview' className='sticky top-0'>
            <TabsList className='bg-transparent p-0'>
              <TabsTrigger value='overview'>Огляд</TabsTrigger>
              <TabsTrigger value='links'>Зв’язки</TabsTrigger>
              <TabsTrigger value='risks'>Ризики</TabsTrigger>
              <TabsTrigger value='files'>Файли</TabsTrigger>
              <TabsTrigger value='audit'>Аудит</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Content */}
      <div className='grid gap-4 lg:grid-cols-[480px_1fr]'>
        {/* Left column */}
        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Загальна інформація</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <p>Дата реєстрації: 01.05.2020</p>
              <p>Регіон: Київ</p>
              <p>КВЕДи:</p>
              <ul className='list-disc pl-5'>
                <li>62.01 Розроблення комп’ютерного програмного забезпечення</li>
                <li>63.11 Оброблення даних</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Контакти</CardTitle>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size='sm'
                    variant='ghost'
                    className='focus:ring-2 focus:ring-[#2F80ED]'
                  >
                    <IconPencil size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Редагувати контакти</SheetTitle>
                  </SheetHeader>
                  <div className='p-4'>Форма контактів...</div>
                </SheetContent>
              </Sheet>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex items-center gap-2'>
                <IconPhone size={16} /> <span>+380 44 111 22 33</span>
              </div>
              <div className='flex items-center gap-2'>
                <IconMail size={16} /> <span>info@example.com</span>
              </div>
              <div className='flex items-start gap-2'>
                <IconMapPin size={16} className='mt-0.5' />
                <span>
                  вул. Прикладна 1
                  <br /> м. Київ
                </span>
              </div>
            </CardContent>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full focus:ring-2 focus:ring-[#2F80ED]'
                  >
                    Додати контакт
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Новий контакт</SheetTitle>
                  </SheetHeader>
                  <div className='p-4'>Форма додавання контакту...</div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Рівень ризику</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskGauge value={72} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Останні дії</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline items={timelineItems} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
