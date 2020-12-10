import { sql } from '@databases/pg'
import db from '../../database/index.js'

class ChefeMilitarController {
  async store(req, res) {
    const { cod_grupo_lider, nome_lider, num_divisao, cod_grupo_divisao, faixa } = req.body

    const leaderExists = await db.query(sql`
      SELECT * FROM lider_politico
      WHERE cod_grupo = ${cod_grupo_lider}
      AND nome = ${nome_lider}
    `)

    if (leaderExists.length === 0)
      return res.status(400).json({
        "erro": "Líder político não existe."
      })

    const divisionExists = await db.query(sql`
      SELECT * FROM divisao
      WHERE num_divisao = ${num_divisao}
      AND cod_grupo = ${cod_grupo_divisao}
    `)

    if (divisionExists.length === 0)
      return res.status(400).json({
        "erro": "Divisão não existe."
      })

    const response = await db.query(sql`
      INSERT INTO chefe_militar (cod_grupo_lider, nome_lider, num_divisao, cod_grupo_divisao, faixa)
      VALUES (${cod_grupo_lider}, ${nome_lider}, ${num_divisao}, ${cod_grupo_divisao}, ${faixa})
    `)

    return res.status(200).json({
      "msg": "Chefe militar criado com sucesso."
    })
  }
}

export default new ChefeMilitarController()