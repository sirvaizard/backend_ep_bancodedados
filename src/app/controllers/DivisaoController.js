import { sql } from '@databases/pg'
import db from '../../database/index.js'

class DivisaoController {
  async index(req, res) {
    const response = await db.query(sql`
      SELECT * FROM divisao
    `)

    return res.json(response)
  }

  async store(req, res) {
    const { cod_grupo, num_barcos, num_avioes, num_tanques, num_homens, num_baixas } = req.body

    const groupExists = await db.query(sql`
      SELECT * FROM grupo_armado
      WHERE cod_grupo = ${cod_grupo}
    `)

    if (groupExists.length === 0)
      return res.status(400).json({
        "erro": "Grupo armado não existe."
      })

    const response = await db.query(sql`
      INSERT INTO divisao (cod_grupo, num_barcos, num_avioes, num_tanques, num_homens, num_baixas)
      VALUES (${cod_grupo}, ${num_barcos}, ${num_avioes}, ${num_tanques}, ${num_homens}, ${num_baixas})
    `)

    return res.status(200).json({
      "msg": "Divisão criada com sucesso."
    })
  }
}

export default new DivisaoController()