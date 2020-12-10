import { Router } from 'express'

import DivisaoController from './app/controllers/DivisaoController.js'
import GrupoArmadoController from './app/controllers/GrupoArmadoController.js'

const routes = new Router()

routes.post('/divisao', DivisaoController.store)

routes.post('/grupo_armado', GrupoArmadoController.store)

export default routes