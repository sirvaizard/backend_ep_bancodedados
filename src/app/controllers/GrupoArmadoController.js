import { sql } from '@databases/pg'
import db from '../../database/index.js'

class GrupoArmadoController {
  async index(req, res) {
    const response = await db.query(sql`
      SELECT nome as nome_grupo, nome_trafica
      FROM fornece NATURAL JOIN grupo_armado
      WHERE nome_arma = 'Barret M82' OR nome_arma = 'M200 intervention'
    `)

    return res.status(200).json(response)
  }

  async store(req, res) {
    const { nome } = req.body

    const groupExists = await db.query(sql`
      SELECT * FROM grupo_armado WHERE nome = ${nome}
    `)

    if (groupExists.length > 0)
      return res.status(400).json({
        "erro": "Grupo armado com esse nome já existe."
      })

    const response = await db.query(sql`
      INSERT INTO grupo_armado (nome) VALUES (${nome})
    `)

    return res.status(200).json({ "msg": "Grupo armado criado com sucesso" })
  }
}

export default new GrupoArmadoController()