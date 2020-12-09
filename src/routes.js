import { Router } from 'express'

import DivisaoController from './app/controllers/DivisaoController.js'
import GrupoArmadoController from './app/controllers/GrupoArmadoController.js'

const routes = new Router()

routes.get('/divisao', DivisaoController.index)

routes.post('/grupo_armado', GrupoArmadoController.store)

export default routes