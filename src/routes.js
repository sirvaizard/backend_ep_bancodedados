import { Router } from 'express'

import DivisaoController from './app/controllers/DivisaoController.js'
import GrupoArmadoController from './app/controllers/GrupoArmadoController.js'
import LiderPoliticoController from './app/controllers/LiderPoliticoController.js'
import ConflitoController from './app/controllers/ConflitoController.js'

const routes = new Router()

routes.post('/divisao', DivisaoController.store)

routes.post('/grupo_armado', GrupoArmadoController.store)

routes.post('/lider_politico', LiderPoliticoController.store)

routes.post('/conflito', ConflitoController.store)

export default routes