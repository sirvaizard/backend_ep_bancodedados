import { Router } from 'express'

import DivisaoController from './app/controllers/DivisaoController.js'
import GrupoArmadoController from './app/controllers/GrupoArmadoController.js'
import LiderPoliticoController from './app/controllers/LiderPoliticoController.js'
import ConflitoController from './app/controllers/ConflitoController.js'
import ChefeMilitarController from './app/controllers/ChefeMilitarController.js'

const routes = new Router()

routes.post('/divisao', DivisaoController.store)

routes.get('/grupo_armado', GrupoArmadoController.index)
routes.post('/grupo_armado', GrupoArmadoController.store)

routes.post('/lider_politico', LiderPoliticoController.store)

routes.get('/conflito', ConflitoController.index)
routes.post('/conflito', ConflitoController.store)

routes.post('/chefe_militar', ChefeMilitarController.store)

export default routes