import { Router } from 'express'

import DivisaoController from './app/controllers/DivisaoController.js'

const routes = new Router()

routes.get('/divisao', DivisaoController.index)

export default routes