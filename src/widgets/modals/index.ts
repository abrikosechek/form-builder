import { JSX, ReactNode } from 'react'
import { CreateFormModal } from './CreateForm'

type ModalList = Record<string, () => JSX.Element>
const modalsList: ModalList = { CreateFormModal }

export default modalsList
