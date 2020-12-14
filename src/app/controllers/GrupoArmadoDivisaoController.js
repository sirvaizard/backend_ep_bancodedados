import { sql } from '@databases/pg'
import db from '../../database/index.js'

class GrupoArmadoDivisaoController {
  async show(req, res) {
    const { grupo_armado } = req.body

    const response = await db.query(sql`
      SELECT * FROM divisao WHERE cod_grupo = ${grupo_armado}
    `)

    return res.status(200).json(response)
  }
}

export default new GrupoArmadoDivisaoController()