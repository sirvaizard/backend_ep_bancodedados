import { sql } from '@databases/pg'
import db from '../../database/index.js'

class TraficanteGrupoArmadoController {
  async index(req, res) {
    const response = await db.query(sql`
      SELECT nome as nome_grupo, nome_trafica
      FROM fornece NATURAL JOIN grupo_armado
      WHERE nome_arma = 'Barret M82' OR nome_arma = 'M200 intervention'
    `)

    return res.status(200).json(response)
  }
}

export default new TraficanteGrupoArmadoController()