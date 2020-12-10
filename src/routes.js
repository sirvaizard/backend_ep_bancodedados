import { Router } from 'express'

import DivisaoController from './app/controllers/DivisaoController.js'
import GrupoArmadoController from './app/controllers/GrupoArmadoController.js'
import LiderPoliticoController from './app/controllers/LiderPoliticoController.js'
import ConflitoController from './app/controllers/ConflitoController.js'
import ChefeMilitarController from './app/controllers/ChefeMilitarController.js'
import TraficanteGrupoArmadoController from './app/controllers/TraficanteGrupoArmadoController.js'
import HistogramaController from './app/controllers/HistogramaController.js'
import TopController from './app/controllers/TopController.js'

const routes = new Router()

routes.get('/traficante_grupoarmado', TraficanteGrupoArmadoController.index)
routes.get('/histograma', HistogramaController.index)

routes.post('/divisao', DivisaoController.store)

routes.post('/grupo_armado', GrupoArmadoController.store)

routes.post('/lider_politico', LiderPoliticoController.store)

routes.get('/top/conflito', TopController.conflicts)
routes.get('/top/organizacao', TopController.organizations)
routes.get('/top/grupo_armado', TopController.armed_group)
routes.get('/top/conflito_religioso', TopController.religious_conflict)

routes.post('/conflito', ConflitoController.store)

routes.post('/chefe_militar', ChefeMilitarController.store)

export default routes