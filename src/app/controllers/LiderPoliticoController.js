import { sql } from '@databases/pg'
import db from '../../database/index.js'

class LiderPoliticoController {
  async store(req, res) {
    const { cod_grupo, nome, apoios } = req.body

    const groupExists = await db.query(sql`
      SELECT * FROM grupo_armado WHERE cod_grupo = ${cod_grupo}
    `)

    if (groupExists.length === 0)
      return res.status(400).json({
        "erro": "Grupo armado não existe."
      })

    const leaderExists = await db.query(sql`
      SELECT * FROM lider_politico WHERE nome = ${nome} AND cod_grupo = ${cod_grupo}
    `)

    if (leaderExists.length > 0)
      return res.status(400).json({
        "erro": "Líder político já existe."
      })

    const response = await db.query(sql`
      INSERT INTO lider_politico (cod_grupo, nome, apoios)
      VALUES (${cod_grupo}, ${nome}, ${apoios})
    `)

    return res.status(200).json({ "msg": "Líder político criado com sucesso" })
  }
}

export default new LiderPoliticoController()